const Skill = require('../models/skillmodel'); 

exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.getAllSkills();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSkillById = async (req, res) => {
  try {
    const skill = await Skill.getSkillById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createSkill = async (req, res) => {
  try {
    if (!req.body.skill_name) {
      return res.status(400).json({ message: 'Skill name is required' });
    }
    const newSkill = await Skill.createSkill(req.body.skill_name);
    res.status(201).json(newSkill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateSkill = async (req, res) => {
  try {
    if (!req.body.skill_name) {
      return res.status(400).json({ message: 'Skill name is required' });
    }
    const updatedSkill = await Skill.updateSkill(req.params.id, req.body.skill_name);
    res.json(updatedSkill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    await Skill.deleteSkill(req.params.id);
    res.json({ message: 'Skill deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
