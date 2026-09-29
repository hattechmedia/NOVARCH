import { Response, NextFunction } from 'express';
import { AdminAuthRequest, verifyAdminToken } from './jwt.middleware.js';

export type Permission =
  | 'project:read'
  | 'project:create'
  | 'project:update'
  | 'project:publish'
  | 'project:archive'
  | 'project:delete'
  | 'inquiry:read'
  | 'inquiry:update'
  | 'inquiry:delete'
  | 'dashboard:read'
  | 'system:manage';

export type Role = 'admin' | 'editor' | 'viewer' | 'system';

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    'project:read',
    'project:create',
    'project:update',
    'project:publish',
    'project:archive',
    'project:delete',
    'inquiry:read',
    'inquiry:update',
    'inquiry:delete',
    'dashboard:read',
    'system:manage',
  ],
  editor: [
    'project:read',
    'project:create',
    'project:update',
    'project:publish',
    'project:archive',
    'inquiry:read',
    'inquiry:update',
    'dashboard:read',
  ],
  viewer: [
    'project:read',
    'inquiry:read',
    'dashboard:read',
  ],
  system: [
    'project:read',
    'project:create',
    'project:update',
    'project:publish',
    'project:archive',
    'project:delete',
    'inquiry:read',
    'inquiry:update',
    'inquiry:delete',
    'dashboard:read',
    'system:manage',
  ],
};

export function hasPermission(role: string, permission: Permission): boolean {
  const userRole = (role || 'viewer').toLowerCase() as Role;
  const permissions = ROLE_PERMISSIONS[userRole] || [];
  return permissions.includes(permission);
}

export function requirePermission(permission: Permission) {
  return (req: AdminAuthRequest, res: Response, next: NextFunction): void => {
    // Ensure token is verified first if not already present
    if (!req.adminUser) {
      verifyAdminToken(req, res, () => {
        checkUserPermission(req, res, next, permission);
      });
      return;
    }

    checkUserPermission(req, res, next, permission);
  };
}

function checkUserPermission(
  req: AdminAuthRequest,
  res: Response,
  next: NextFunction,
  permission: Permission
): void {
  const role = req.adminUser?.role || 'admin';

  if (!hasPermission(role, permission)) {
    res.status(403).json({
      error: 'Forbidden',
      message: `Access denied. Role '${role}' lacks '${permission}' permission.`,
    });
    return;
  }

  next();
}
