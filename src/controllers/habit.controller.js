import { pool } from '../config/db.js';

// GET /api/v1/habits - Fetch all habits
export const getAllHabits = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM habits ORDER BY created_at DESC');
        res.status(200).json({ success: true, count: rows.length, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// POST /api/v1/habits - Create a new habit
export const createHabit = async (req, res) => {
    try {
        const { title, frequency } = req.body;

        if (!title) {
            return res.status(400).json({ success: false, message: 'Habit title is required' });
        }

        const freq = frequency || 'daily';
        const [result] = await pool.query(
            'INSERT INTO habits (title, frequency) VALUES (?, ?)',
            [title, freq]
        );

        res.status(201).json({
            success: true,
            data: {
                id: result.insertId,
                title,
                frequency: freq,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// PATCH /api/v1/habits/:id/toggle - Toggle completion for a specific date
export const toggleHabitDate = async (req, res) => {
    try {
        const habitId = req.params.id;
        const { date } = req.body; // Expected format: "YYYY-MM-DD"

        if (!date) {
            return res.status(400).json({ success: false, message: 'Date string is required (YYYY-MM-DD)' });
        }

        const [habits] = await pool.query('SELECT * FROM habits WHERE id = ?', [habitId]);
        if (habits.length === 0) {
            return res.status(404).json({ success: false, message: 'Habit not found' });
        }

        const [existingLogs] = await pool.query(
            'SELECT * FROM habit_logs WHERE habit_id = ? AND completed_date = ?',
            [habitId, date]
        );

        if (existingLogs.length > 0) {
            // If already logged, remove it
            await pool.query(
                'DELETE FROM habit_logs WHERE habit_id = ? AND completed_date = ?',
                [habitId, date]
            );
            return res.status(200).json({ success: true, message: 'Habit marked uncompleted for this date' });
        } else {
            // If not logged, add it
            await pool.query(
                'INSERT INTO habit_logs (habit_id, completed_date) VALUES (?, ?)',
                [habitId, date]
            );
            return res.status(200).json({ success: true, message: 'Habit marked completed for this date' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// DELETE /api/v1/habits/:id - Delete a habit
export const deleteHabit = async (req, res) => {
    try {
        const habitId = req.params.id;
        const [result] = await pool.query('DELETE FROM habits WHERE id = ?', [habitId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Habit not found' });
        }

        res.status(200).json({ success: true, message: 'Habit deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};