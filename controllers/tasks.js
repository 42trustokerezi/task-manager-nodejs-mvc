const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')

/** GET ALL TASKS */
exports.getAllTasks = asyncWrapper( async (req, res) => {
        const tasks = await Task.find({});
        res.status(200).json({ tasks})
});

/** CREATE TASK */
exports.createTask = async (req, res) => {
    const newTask = new Task(
        {
            name: req.body.name,
            completed: req.body.completed
        }
    )
        try{
            const savedTask = await newTask.save();
            res.status(200).json({savedTask})
        }catch(err){
            res.status(500).json(err);
        }
};

exports.getSingleTask = async(req, res) => {
    try{
        const {id: taskId} = req.params
        const singleTask = await Task.findOne({_id:taskId})
        if(!singleTask){
            return res.status(404).json({msg: 'No Task found with the id: ' + req.params.id})
         }
        res.status(200).json({singleTask})
    }
    catch(err){
        res.status(500).json({err: err})
    }
};

exports.UpdateTask = async (req, res) => {
    try{
        const {id: taskId} = req.params
        const task = await Task.findByIdAndUpdate({_id:taskId}, req.body, {
            new: true,
            runValidators: true,
        });
        if(!task){
            return( res.status(404).json({msg: `no task with id: ${taskId}`}))
        }

        res.status(200).json({task})
    }
    catch(err){
        res.status(500).json({err: err})
    }
};

exports.DeleteTask = async (req, res)=> {
    try{
        const task = await Task.findOneAndDelete({id: req.params.id})
        if(!task){
            return res.status(404).json({err: 'Task not found'});
        }
        res.status(200).json({task})
    }
    catch(err){
        res.status(500).json({err: err.message});
    }
}