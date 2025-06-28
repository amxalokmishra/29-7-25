import { Router } from 'express';
import {
  createExpense,
  getExpenses,
  approveExpense,
  rejectExpense,
} from '../controllers/expense.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';
import { UserRole } from '../entities/User';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: Expense management endpoints
 */

/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Submit new expense
 *     tags: [Expenses]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount, category, description, date]
 *             properties:
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Expense created
 */
router.post('/', authenticate, authorize([UserRole.EMPLOYEE]), createExpense);

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Get expenses (own or all)
 *     tags: [Expenses]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: List of expenses
 */
router.get('/', authenticate, getExpenses);

/**
 * @swagger
 * /expenses/{id}/approve:
 *   patch:
 *     summary: Approve an expense
 *     tags: [Expenses]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Expense approved
 */
router.patch('/:id/approve', authenticate, authorize([UserRole.ADMIN]), approveExpense);

/**
 * @swagger
 * /expenses/{id}/reject:
 *   patch:
 *     summary: Reject an expense
 *     tags: [Expenses]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Expense rejected
 */
router.patch('/:id/reject', authenticate, authorize([UserRole.ADMIN]), rejectExpense);

export default router;