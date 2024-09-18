const db = require("../database")

const getTodos = async (req, res) => {
    try {
        const [result] = await db.query(`SELECT todos.id, todos.todo, categories.name AS category FROM todos INNER JOIN categories ON todos.category_id = categories.id`);
        res.json({ status: 200, message: "Success", data: result });
    } catch (error) {
        console.error("Something went wrong: " + error.stack);
        res.json({ status: 400, error });
    }
};

const addTodo = async (req, res) => {
    const { category_id, todo } = req.body;

    if (!category_id || !todo) {
        return res.json({status: 400, message: "Todo is required"})
    }

    try {
        const [result] = await db.query(`INSERT INTO todos (category_id, todo) VALUES (?, ?)`, [category_id, todo]);
        const newTodoId = result.insertId;
        res.status(201).json({ id: newTodoId, category_id, todo });
    } catch (err) {
        console.error(err);
        res.json({status: 400, message: "Something went wrong"});
    }
};

const getTodoById = async (req, res) => {
    const todoId = req.params.id;
    try {
        const [result] = await db.query(`SELECT todos.id, todos.todo, categories.name AS category FROM todos INNER JOIN categories ON todos.category_id = categories.id WHERE todos.id = ?`, [todoId]);
        if (result.length === 0) {
            return res.json({status: 400, message: "Todo not found"});
        }
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.json({status: 400, message: "Something went wrong"});
    }
};

const editTodo = async (req, res) => {
  
        const { id } = req.params;
        const { todo, category_id } = req.body;

        try {
        const [result] = await db.query(`SELECT todos.id, todos.todo, categories.name AS category FROM todos INNER JOIN categories ON todos.category_id = categories.id WHERE todos.id = ?`, [todoId]);
        // const [result] = await db.query(`SELECT * from todos where id = ?`, [id])
    

        console.log(result)
        if (result.length === 0) {
            return res.json({status: 400, message: "Todo not found"});
        }

        // res.json(result[0]);
        
        console.log(2)

        const updateEdit = `UPDATE todos SET todo = ?, category_id = ? WHERE id = ?`;
        await db.query(updateEdit, [todo, category_id, id]);

        res.json({ status: 200, message: "Success" });
        console.log(3)

    } catch (error) {
        console.error("Something went wrong: " + error.stack);
        res.json({ status: 400, error: error.message });
    }
};

const deleteTodo = async (req, res) => {
    const todoId = req.params.id;
    try {
        const [result] = await db.query(`DELETE FROM todos WHERE id = ?`, [todoId]);

        if (result.length === 0) {
            return res.json({status: 400, message: "Todo not found"});
        }

        res.status(204).send(); // No content
    } catch (err) {
        console.error(err);
        res.json({ status: 400, error: error.message });
    }
};

module.exports = {
    getTodos, addTodo, getTodoById, editTodo, deleteTodo
}