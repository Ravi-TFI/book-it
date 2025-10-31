const db = require('../config/db');
const experiencesData = require('./seed-data/experiences.json');
const slotsData = require('./seed-data/slots.json');
const promosData = require('./seed-data/promos.json');

const initializeDatabase = async () => {
  try {
    console.log('Starting database initialization...');
    
    await db.query(`
      CREATE TABLE IF NOT EXISTS experiences (
        id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, location_tag VARCHAR(100),
        description TEXT, price NUMERIC(10, 2) NOT NULL, image_url VARCHAR(255)
      );
      CREATE TABLE IF NOT EXISTS slots (
        id SERIAL PRIMARY KEY, experience_id INTEGER NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
        slot_date DATE NOT NULL, start_time TIME NOT NULL, total_capacity INTEGER NOT NULL DEFAULT 10,
        slots_booked INTEGER NOT NULL DEFAULT 0
      );
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY, slot_id INTEGER NOT NULL REFERENCES slots(id) ON DELETE CASCADE,
        user_name VARCHAR(255) NOT NULL, user_email VARCHAR(255) NOT NULL, promo_code VARCHAR(50),
        final_price NUMERIC(10, 2) NOT NULL, booking_ref_id VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS promos (
        id SERIAL PRIMARY KEY, code VARCHAR(50) UNIQUE NOT NULL,
        discount_type VARCHAR(20) NOT NULL, discount_value NUMERIC(10, 2) NOT NULL
      );
    `);
    console.log('Tables created or already exist.');

    const experienceCount = await db.query('SELECT COUNT(*) FROM experiences');
    if (experienceCount.rows[0].count > 0) {
      console.log('Database already seeded. Skipping data insertion.');
      return;
    }

    console.log('Seeding initial data...');

    const experienceIdMap = {};
    for (const exp of experiencesData) {
      const res = await db.query(
        `INSERT INTO experiences (title, location_tag, description, price, image_url) 
         VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [exp.title, exp.location_tag, exp.description, exp.price, exp.image_url]
      );
      experienceIdMap[exp.key] = res.rows[0].id;
    }
    console.log('Inserted experiences.');

    const slotValues = slotsData.map(slot => {
      const experienceId = experienceIdMap[slot.experienceKey];
      if (!experienceId) {
        console.warn(`Warning: Could not find experience for key: ${slot.experienceKey}. Skipping slot.`);
        return null;
      }
      return `(${experienceId}, '${slot.date}', '${slot.time}', 10, ${slot.booked})`;
    }).filter(Boolean); 

    if (slotValues.length > 0) {
      const slotsQuery = `
        INSERT INTO slots (experience_id, slot_date, start_time, total_capacity, slots_booked) VALUES 
        ${slotValues.join(',\n')};
      `;
      await db.query(slotsQuery);
      console.log('Inserted slots.');
    }

    const promoValues = promosData.map(p => `('${p.code}', '${p.type}', ${p.value})`);
    if (promoValues.length > 0) {
      const promosQuery = `
        INSERT INTO promos (code, discount_type, discount_value) VALUES
        ${promoValues.join(',\n')};
      `;
      await db.query(promosQuery);
      console.log('Inserted promos.');
    }
    
    console.log('Database initialization complete.');

  } catch (err) {
    console.error('Error initializing database:', err);
  }
};

module.exports = initializeDatabase;