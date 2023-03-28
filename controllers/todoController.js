const Todo = require("../models/todo.model.js");

exports.home = (req, res) => {
    res.status(200).json({
        message: "Welcome to the home page",
    });
};

// create todo

exports.create = async (req, res) => {
    if (!req.body.title || !req.body.description) {
        return res.status(400).json({
            message: "Title & Description can not be empty",
        });
    }
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
    });
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.todos = (req, res) => {
    //   find all todos
    try {
        Todo.find()
            .then((todos) => {
                res.status(200).json(todos);
            })
            .catch((err) => {
                res.status(500).json({
                    message: err.message,
                });
            });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.todoFindById = (req, res) => {
    Todo.findById(req.params.id)
        .then((todo) => {
            if (!todo) {
                return res.status(404).json({
                    message: "Todo not found with id " + req.params.id,
                });
            }
            res.status(200).json(todo);
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).json({
                    message: "Todo not found with id " + req.params.id,
                });
            }
            return res.status(500).json({
                message: "Error retrieving todo with id " + req.params.id,
            });
        });
};
