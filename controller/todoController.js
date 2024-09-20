const db = require("../database")

const getTodos = async (req, res) => {
    try {
        const [result] = await db.query(`SELECT * FROM todos`);
        res.json({ status: 200, message: "Success", data: result });
    } catch (error) {
        console.error("Something went wrong: " + error.stack);
        res.json({ status: 400, error });
    }
};

const addTodo = async (req, res) => {
    const { category_id, todo } = req.body;

    if (!category_id) {
        return res.json({ status: 400, message: "Category Id is required" })
    }
    if (!todo || !todo.trim()) {
        return res.json({ status: 400, message: "Todo is required" })
    }

    try {
        const [result] = await db.query(`INSERT INTO todos (category_id, todo) VALUES (?, ?)`, [category_id, todo]);
        res.json({ status: 200, message: "Successfully added", data: result });
    } catch (err) {
        console.error(err);
        res.json({ status: 400, message: "Something went wrong" });
    }
};

const getTodoById = async (req, res) => {
    const { id } = req.params;

    if (!id || !id.trim()) {
        throw "Id is required"
    }

    try {
        const [result] = await db.query(`SELECT * FROM todos WHERE todos.id = ?`, [id]);
        if (result.length === 0) {
            return res.json({ status: 400, message: "Todo not found" });
        }
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.json({ status: 400, message: "Something went wrong" });
    }
};

const editTodo = async (req, res) => {
    const { id } = req.params;
    const { todo, category_id } = req.body;

    if (!id || !id.trim()) {
        return res.json({ status: 400, message: "Id is required" })
    }
    if (!category_id) {
        return res.json({ status: 400, message: "Category Id is required" })
    }
    if (!todo || !todo.trim()) {
        return res.json({ status: 400, message: "Todo is required" })
    }

    try {
        const [result] = await db.query(`SELECT * FROM todos WHERE todos.id = ?`, [id]);
        if (result.length === 0) {
            return res.json({ status: 400, message: "Todo not found" });
        }

        const updateEdit = `UPDATE todos SET todo = ?, category_id = ? WHERE id = ?`;
        await db.query(updateEdit, [todo, category_id, id]);

        res.json({ status: 200, message: "Success" });

    } catch (error) {
        console.error("Something went wrong: " + error.stack);
        res.json({ status: 400, error: error.message });
    }
};

const deleteTodo = async (req, res) => {
    const { id } = req.params;
    if (!id || !id.trim()) {
        return res.json({ status: 400, message: "Id is required" })
    }

    try {
        const [result] = await db.query(`DELETE FROM todos WHERE id = ?`, [id]);
        if (result.length === 0) {
            return res.json({ status: 400, message: "Todo not found" });
        }
        res.json({status: 200, message: "Success"});
    } catch (err) {
        console.error(err);
        res.json({ status: 400, error: err.message });
    }
};

module.exports = {
    getTodos, addTodo, getTodoById, editTodo, deleteTodo
}