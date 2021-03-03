const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const logger = require('../../util/logger');

const Todo = require('../../models/Todo');

/**
 * @route       GET /api/todo
 * @description Get all Todo items
 * @access      Public
 */
router.get('/', async (req, res) => {
  try {
    const items = await Todo.find({});

    res.json(items);
  } catch (error) {
    logger.error(error.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route       POST /api/todo
 * @description Create a new Todo item
 * @access      Public
 */
router.post(
  '/',
  check('text', 'Please include a todo item text!').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const items = await Todo.find({});

      const newTodo = Todo({
        text: req.body.text,
        completedDate: null,
        dueDate: null,
        order: items.length,
      });

      const todo = await newTodo.save();

      res.json(todo);
    } catch (error) {
      logger.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route       PUT /api/todo/text/:id
 * @description Update Todo item Text
 * @access      Public
 */
router.put(
  '/text/:id',
  check('text', 'Please include a todo item text!').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const todo = await Todo.findById(req.params.id);

      if (!todo) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Todo item cannot found' }] });
      }

      todo.text = req.body.text;

      await todo.save();

      res.json(todo);
    } catch (error) {
      logger.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route       PUT /api/todo/complete/:id
 * @description Change Completeness status of Todo item
 * @access      Public
 */
router.put('/complete/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Todo item cannot found' }] });
    }

    todo.completedDate = todo.completedDate ? null : Date.now();

    await todo.save();

    res.json(todo);
  } catch (error) {
    logger.error(error.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route       PUT /api/todo/due/:id
 * @description Change Due date of Todo item
 * @access      Public
 */
router.put('/due/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Todo item cannot found' }] });
    }

    todo.dueDate = req.body.dueDate || null;

    await todo.save();

    res.json(todo);
  } catch (error) {
    logger.error(error.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route       DELETE /api/todo/:id
 * @description Delete Todo item
 * @access      Public
 */
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Todo item cannot found' }] });
    }

    await Todo.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: 'Todo Item Deleted' });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
