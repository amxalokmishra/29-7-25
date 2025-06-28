import { Router } from 'express';
import { getAnalytics } from '../controllers/analytics.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';
import { UserRole } from '../entities/User';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Admin dashboard data
 */

/**
 * @swagger
 * /analytics:
 *   get:
 *     summary: Get total expenses by category
 *     tags: [Analytics]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category:
 *                     type: string
 *                   total:
 *                     type: string
 */
router.get('/', authenticate, authorize([UserRole.ADMIN]), getAnalytics);

export default router;