const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const { pool } = require('./db/connection');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// CREATE TODO
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query("INSERT INTO todos (description) VALUES($1) RETURNING *",
      [description]);
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message)
  }
})

//GET ALL TODOS
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todos");
    res.json(allTodos.rows)
  } catch (err) {
    console.error(err.message)
  }
})

//GET A TODO
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todos WHERE todo_id = $1",
      [id]);
    res.json(todo)
  } catch (err) {
    console.error(err.message)
  }
})

//UPDATE A TODO
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query("UPDATE todos SET description = $1 WHERE todo_id = $2",
      [description, id]);
    res.json("Todo was updated!")
  } catch (err) {
    console.error(err.message)
  }
})

//DELETE A TODO
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("DELETE FROM todos WHERE todo_id = $1",
      [id]);
    res.json("Todo was deleted!")
  } catch (err) {
    console.error(err.message)
  }
})

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});


app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
