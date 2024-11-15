// routes/developers.js
import express from 'express';
import {
  createDeveloper,
  getAllDevelopers,
  getDeveloperById,
  updateDeveloper,
  deleteDeveloper
} from '../controllers/developerController.js';

const router = express.Router();

router.post('/', createDeveloper);
router.get('/', getAllDevelopers);
router.get('/:id', getDeveloperById);
router.put('/:id', updateDeveloper);
router.delete('/:id', deleteDeveloper);

export default router;
