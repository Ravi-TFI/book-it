const db = require('../config/db');

exports.createBooking = async (req, res) => {
  const { slot_id, user_name, user_email, promo_code, final_price } = req.body;

  if (!slot_id || !user_name || !user_email || !final_price) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  try {
    await db.query('BEGIN');

    const slotRes = await db.query('SELECT * FROM slots WHERE id = $1 FOR UPDATE', [slot_id]);
    const slot = slotRes.rows[0];

    if (!slot || slot.slots_booked >= slot.total_capacity) {
      throw new Error('This slot is already sold out.');
    }

    await db.query('UPDATE slots SET slots_booked = slots_booked + 1 WHERE id = $1', [slot_id]);

    const refId = `HD-${Date.now().toString().slice(-4)}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    const bookingResult = await db.query(
      `INSERT INTO bookings (slot_id, user_name, user_email, promo_code, final_price, booking_ref_id)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING booking_ref_id`,
      [slot_id, user_name, user_email, promo_code, final_price, refId]
    );

    await db.query('COMMIT');
    res.status(201).json({ success: true, refId: bookingResult.rows[0].booking_ref_id });

  } catch (err) {
    await db.query('ROLLBACK');
    res.status(500).json({ success: false, message: err.message || 'Server Error' });
  }
};