import { Router } from 'express';
import IndexRoutes from './index.routes';
import UserRoutes from './user.routes';

const router = Router();

router.use('/', IndexRoutes);
router.use('/users', UserRoutes);

export default router;
