import * as express from 'express';
import { getAllSuppliers, getSupplier } from '../data/suppliers';
import { logger } from '../log';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    let suppliers = await getAllSuppliers();
    res.render('suppliers', { suppliers });
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    let supplier = await getSupplier(req.param('id'));
    res.render('suppliers/show', { supplier });
  } catch (e) {
    next(e);
  }
});

export default router;
