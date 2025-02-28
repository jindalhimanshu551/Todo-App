const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());

port = process.env.PORT || 3000;

app.post('/todo', async (req, res) => {
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);

    if(!parsePayload) {
        return res.status(411).json({
            msg: "You send the wrong inputs"
        });
    }

    //put in mongodb
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    });

    res.status(201).json({
        msg: "Todo created"
    });
});

app.get('/todos', async (req, res) => {

    const todos = await todo.find({});
    
    res.status(200).json({
        result: todos
    });

});

app.put('/completed', async(req, res) => {
    const updatePayload = req.body;
    const parsePayload = updateTodo.safeParse(updatePayload);
    
    if(!parsePayload) {
        return res.status(411).json({
            msg: "You send the wrong inputs"
        });
    }

    await todo.updateMany({
        _id: req.body.id
    }, {
        completed: true
    });

    res.status(201).json({
        msg: "Todo is marked as done"
    });
});

app.get("/todo/:id", async(req, res) => {
    const id = req.params.id

    const result = await todo.findOne({
        _id: id
    })

    res.status(200).json({
        result: result
    });
})

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})


