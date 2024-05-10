import { Router } from 'express';
import { getAllUsers } from '../controllers/user.controllers';

const router = Router();

router.get('/', getAllUsers);

export default router;
