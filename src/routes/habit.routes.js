import { Router } from 'express';
import {
    getAllHabits,
    createHabit,
    toggleHabitDate,
    deleteHabit,
} from '../controllers/habit.controller.js';

const router = Router();

router.route('/')
    .get(getAllHabits) // GET /api/v1/habits
    .post(createHabit); // POST /api/v1/habits

router.route('/:id')
    .delete(deleteHabit); // DELETE /api/v1/habits/:id

router.route('/:id/toggle')
    .patch(toggleHabitDate); // PATCH /api/v1/habits/:id/toggle

export default router;

//by this page we have designed the habit routes and connected them to the controller functions. The routes allow us to get all habits, create a new habit, delete a habit by its ID, and toggle the completion status of a habit for a specific date.
