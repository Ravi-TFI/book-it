const db = require('../config/db');

exports.getAllExperiences = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM experiences ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getExperienceById = async (req, res) => {
  try {
    const experienceResult = await db.query('SELECT * FROM experiences WHERE id = $1', [req.params.id]);
    if (experienceResult.rows.length === 0) {
      return res.status(404).json({ msg: 'Experience not found' });
    }

    const slotsResult = await db.query(
      `SELECT id, slot_date, TO_CHAR(start_time, 'HH24:MI') as start_time, (total_capacity - slots_booked) as slots_left
       FROM slots WHERE experience_id = $1 AND slot_date >= CURRENT_DATE`,
      [req.params.id]
    );

    res.json({
      details: experienceResult.rows[0],
      slots: slotsResult.rows,
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};