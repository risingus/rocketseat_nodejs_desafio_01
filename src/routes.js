import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js';
import { Database } from './database.js';

const database = new Database();

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (typeof title !== 'string') {
        return res.writeHead(400).end()
      }
      if (typeof description !== 'string') {
        return res.writeHead(400).end()
      }

      if (title.trim().length === 0) {
        return res.writeHead(400).end()
      }
      if (description.trim().length === 0) {
        return res.writeHead(400).end()
      }

      const newTodo = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      }

      database.insert('todos', newTodo)

      console.log(newTodo, 'here')

      return res.writeHead(201).end()

    }
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query

      const todos = database.select('todos', search)

      return res.end(JSON.stringify(todos))
    }
  }
]