import { Router } from 'express';

import {
  pendingUsers, approveUser, approvedUser, rejectUser, rejectedUsers,
} from '../../controllers';
import { isAdmin } from '../../middleware';

const router = Router();

// Middleware to check Admin
router.use(isAdmin);
router.get('/waiting-list', pendingUsers);
router.patch('/approve/:userId', approveUser);
router.get('/approved-list', approvedUser);
router.patch('/reject/:userId', rejectUser);
router.get('/rejected-list', rejectedUsers);

export default router;
