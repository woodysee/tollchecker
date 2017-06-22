import express from 'express';
import chargesController from '../controllers/charges';
const router = express.Router();

router.get('/', chargesController.getAll);
router.get('/charges', chargesController.getAllCharges)
router.get('/charges/:id', chargesController.getOne);
router.post('/charges/create', chargesController.create);
router.put('/charges/:id', chargesController.update);
router.delete('/charges/:id', chargesController.delete)

module.exports = router;
