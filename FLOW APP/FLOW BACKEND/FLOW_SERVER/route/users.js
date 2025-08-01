const db = require("../utils/dbpool");
const { apiSuccess, apiError } = require("../utils/apiresult");
const { createToken } = require("../utils/jwtauth");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

// GET /users/:id
router.get("/:id", (req, resp) => {
    db.query("SELECT * FROM users WHERE user_id=?", [req.params.id],
        (err, results) => {
            if (err) return resp.send(apiError(err));
            if (results.length !== 1) return resp.send(apiError("User  not found"));
            return resp.send(apiSuccess(results[0]));
        }
    );
});

// GET /users/byemail/:email
router.get("/byemail/:email", (req, resp) => {
    return resp.send(apiSuccess("Yoo "))
   /* db.query("SELECT * FROM users WHERE email=?", [req.params.email],
        (err, results) => {
            if (err) return resp.send(apiError(err));
            if (results.length !== 1) return resp.send(apiError("User  not found"));
            //return resp.send(apiSuccess(results[0]));
            return resp.send(apiSuccess("Yoo "));
        }
    );*/
});

// POST /users/signin
router.post("/signin", (req, resp) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM users WHERE email=?", [email],
        (err, results) => {
            if (err) return resp.send(apiError(err));
            if (results.length !== 1) return resp.send(apiError("Invalid email"));
            const dbUser  = results[0];
            const isMatching = bcrypt.compareSync(password, dbUser .password);
            if (!isMatching) return resp.send(apiError("Invalid password"));
            const token = createToken(dbUser );
            resp.send(apiSuccess({ ...dbUser , token }));
        }
    );
});



// POST /users
router.post("/signup", (req, resp) => {
    const { name, email, phone, password, user_type } = req.body;
    const encPassword = bcrypt.hashSync(password, 10);
    //const encPassword = password;
    db.query("INSERT INTO users (name, email, phone, password, user_type) VALUES (?, ?, ?, ?, ?)",
        [name, email, phone, encPassword, user_type],
        (err, result) => {
            if (err) return resp.send(apiError(err));
            if (result.affectedRows === 1) {
                db.query("SELECT * FROM users WHERE user_id=?", [result.insertId],
                    (err, results) => {
                        if (err) return resp.send(apiError(err));
                        resp.send(apiSuccess(results[0]));
                    }
                );
            }
        }
    );
});

// PUT /users/:id
router.put("/:id", (req, resp) => {
    const { name, email, phone, user_type } = req.body;
    db.query("UPDATE users SET name=?, email=?, phone=?, user_type=? WHERE user_id=?",
        [name, email, phone, user_type, req.params.id],
        (err, result) => {
            if (err) return resp.send(apiError(err));
            if (result.affectedRows !== 1) return resp.send(apiError("User  not found"));
            resp.send(apiSuccess("User  updated successfully"));
        }
    );
});

// DELETE /users/:id
router.delete("/:id", (req, resp) => {
    db.query("DELETE FROM users WHERE user_id=?", [req.params.id],
        (err, results) => {
            if (err) return resp.send(apiError(err));
            if (results.affectedRows !== 1) return resp.send(apiError("User  not found"));
            return resp.send(apiSuccess("User  deleted"));
        }
    );
});

// PATCH /users/changepasswd
router.patch("/changepasswd", (req, resp) => {
    const { id, password } = req.body;
    const encPassword = bcrypt.hashSync(password, 10);
    db.query("UPDATE users SET password=? WHERE user_id=?", [encPassword, id],
        (err, result) => {
            if (err) return resp.send(apiError(err));
            if (result.affectedRows !== 1) return resp.send(apiError("User  not found"));
            resp.send(apiSuccess("User  password updated"));
        }
    );
});

module.exports = router;
