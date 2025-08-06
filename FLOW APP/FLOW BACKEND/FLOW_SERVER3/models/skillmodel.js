const pool = require('../config/db');

const Skill = {
  getAllSkills: async () => {
    const res = await pool.query('SELECT * FROM skills ORDER BY skill_name');
    return res.rows;
  },
  
  getSkillById: async (id) => {
    const res = await pool.query('SELECT * FROM skills WHERE skill_id = $1', [id]);
    return res.rows[0];
  },
  
  createSkill: async (skillName) => {
    const res = await pool.query(
      'INSERT INTO skills (skill_name) VALUES ($1) RETURNING *',
      [skillName]
    );
    return res.rows[0];
  },
  
  updateSkill: async (id, skillName) => {
    const res = await pool.query(
      'UPDATE skills SET skill_name = $1 WHERE skill_id = $2 RETURNING *',
      [skillName, id]
    );
    return res.rows[0];
  },
  
  deleteSkill: async (id) => {
    await pool.query('DELETE FROM skills WHERE skill_id = $1', [id]);
  }
};

module.exports = Skill;
