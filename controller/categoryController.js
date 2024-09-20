const db = require("../database");


const getCategories = async (req, res) => {
    try {
        const [result] = await db.query(`SELECT * from categories`);
        res.json({ status: 200, message: "Success", data: result });
    } catch (error) {
        console.error("Something went wrong: " + error.stack);
        res.json({ status: 400, error });
    }
};


const addCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || !name.trim()) {
            throw ("Name is required");
        }

        const query = `INSERT INTO categories (name) VALUES (?)`;
        const [result] = await db.query(query, [name]);

        res.json({ status: 200, message: "Successfully added", data: result });
    } catch (error) {
        console.error("Something went wrong: " + error.stack);
        res.json({ status: 400, error: error.message });
    }
};


const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw ("Category Id is required");
        }

        const query = `SELECT * FROM categories WHERE id = ?`;
        const [result] = await db.query(query, [id]);

        if (result.length === 0) {
            return res.json({ status: 404, error: "Category not found" });
        }

        res.json({ status: 200, message: "Successfully fetched", data: result[0] });
    } catch (error) {
        console.error("Something went wrong: " + error.stack);
        res.json({ status: 400, error: error.message });
    }
};

const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!id) {
            throw ("Id is required");
        }

        if (!name || !name.trim()) {
            throw ("Name is required");
        }

        const query = `SELECT * FROM categories WHERE id = ?`;
        const [categoryResult] = await db.query(query, [id]);

        if (categoryResult.length === 0) {
            return res.json({ status: 404, error: "Category not found" });
        }

        const updateEdit = `UPDATE categories SET name = ? WHERE id = ?`;
        await db.query(updateEdit, [name, id]);

        res.json({ status: 200, message: "Success" });
    } catch (error) {
        console.error("Something went wrong: " + error.stack);
        res.json({ status: 400, error: error.message });
    }
};

const delCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw ("Id is required");
        }

        const query = `SELECT * FROM categories WHERE id = ?`;
        const [result] = await db.query(query, [id]);

        if (result.length === 0) {
            return res.json({ status: 404, error: "Category not found" });
        }

        const delCategory = `DELETE FROM todos WHERE category_id = ?`
        await db.query(delCategory, [id]);

        const deleteCategory = `DELETE FROM categories WHERE id = ?`;
        await db.query(deleteCategory, [id]);
       
        res.json({ status: 200, message: "Success" });
    } catch (error) {
        console.error("Something went wrong: " + error.stack);
        res.json({ status: 400, error: error.message });
    }
};

module.exports = {
    getCategories, addCategory, getCategoryById, editCategory, delCategory
}