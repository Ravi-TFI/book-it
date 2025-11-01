const db = require('../config/db');

exports.validatePromoCode = async (req, res) => {
    const { code } = req.body;
    if (!code) {
        return res.status(400).json({ message: 'Promo code is required.' });
    }
    try {
        const result = await db.query('SELECT * FROM promos WHERE UPPER(code) = UPPER($1)', [code]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Invalid promo code.' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};