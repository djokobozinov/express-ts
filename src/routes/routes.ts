import { Router } from 'express';
import IndexRoutes from './index.routes';

const router = Router();

router.use('/', IndexRoutes);

export default router;
