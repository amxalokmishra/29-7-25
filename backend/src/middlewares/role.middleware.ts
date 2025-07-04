import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';
import { UserRole } from '../entities/User';

export const authorize =
  (roles: UserRole[]) => (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (!roles.includes(req.user.role as UserRole))
      return res.status(403).json({ message: 'Forbidden' });
    next();
  };