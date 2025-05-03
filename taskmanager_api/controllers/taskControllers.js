import Task from "../models/tasks.js";

// Create Tasks
export const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
    console.log("Request Body:", req.body);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  console.log("Request Body:", req.body);

};

// Get All tasks
export const getAllTasks = async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
};

// Get Single task
export const singleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: "Invalid Id" });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.status(200).json(task);
};

// Delete task
export const deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found!!" });
  res.status(200).json({ message: "Task deleted" });
};
