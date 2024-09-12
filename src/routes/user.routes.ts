import { Router } from 'express';
import { findAll } from '../controllers/user.controllers';

const router = Router();

router.get('/', findAll);

export default router;
