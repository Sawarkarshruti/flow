const Worker = require('../models/workerModel');

exports.createWorker = async (req, res, next) => {
  try {
    const worker = await Worker.create(req.body);
    res.status(201).json(worker);
  } catch (error) {
    next(error);
  }
};

exports.getAllWorkers = async (req, res, next) => {
  try {
    const workers = await Worker.findAll();
    res.json(workers);
  } catch (error) {
    next(error);
  }
};

exports.getWorkerById = async (req, res, next) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    res.json(worker);
  } catch (error) {
    next(error);
  }
};

exports.updateWorker = async (req, res, next) => {
  try {
    const updatedWorker = await Worker.update(req.params.id, req.body);
    if (!updatedWorker) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    res.json(updatedWorker);
  } catch (error) {
    next(error);
  }
};

exports.deleteWorker = async (req, res, next) => {
  try {
    await Worker.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
