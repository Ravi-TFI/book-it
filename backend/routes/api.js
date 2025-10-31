// const express = require('express');
// const router = express.Router();
// const experience = require('../controllers/experience');



// router.get('/experiences', experience.getAllExperiences);
// router.get('/experiences/:id', experience.getExperienceById);



// module.exports = router;

const express = require('express');
const router = express.Router();

const experienceController = require('../controllers/experience');
const promoController = require('../controllers/promo');
const bookingController = require('../controllers/booking');


router.get('/experiences', experienceController.getAllExperiences);
router.get('/experiences/:id', experienceController.getExperienceById);
router.post('/promo/validate', promoController.validatePromoCode);
router.post('/bookings', bookingController.createBooking);

module.exports = router;