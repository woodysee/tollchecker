import express from 'express';
import gantryController from '../controllers/gantry';
const router = express.Router();

router.get('/', gantryController.getAll);
router.get('/gantry', gantryController.getAllGantries)
router.get('/gantry/:id', gantryController.getOne);
router.post('/gantry/create', gantryController.create);
router.put('/gantry/:id', gantryController.update);
router.delete('/gantry/:id', gantryController.delete)

module.exports = router;
