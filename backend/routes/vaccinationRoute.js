import express from 'express';
import { createVaccination, getAllVaccinations, getVaccinationsByUser } from '../controllers/vaccinationController.js';

const router = express.Router();

// Route to create a new vaccination
router.post('/vaccinations', createVaccination);

// Route to get all vaccinations
router.get('/vaccinations', getAllVaccinations);

// Route to get a single vaccination by ID
// In your routes file
router.get('/:userId', getVaccinationsByUser);

export default router;
