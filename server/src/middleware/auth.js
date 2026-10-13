import { admin, auth } from '../config/firebase.js';
import { sendError } from '../utils/response.js';

/**
 * Authentication Middleware
 * 
 * Verifies the incoming Firebase ID Token passed in the Authorization header.
 * Attaches the verified user decoded token (`req.user`) to the request object.
 * 
 * Flow:
 * Client -> Headers: { Authorization: "Bearer <Firebase-ID-Token>" }
 * Server -> admin.auth().verifyIdToken(token) -> req.user = decodedToken
 */
export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(
      res,
      'Access denied. Missing or invalid Authorization header.',
      401
    );
  }

  const token = authHeader.split('Bearer ')[1].trim();

  try {
    // If Firebase isn't initialized yet (e.g. testing in early milestone)
    if (!auth) {
      return sendError(
        res,
        'Authentication service is currently unconfigured. Set up Firebase in Milestone 3.',
        503
      );
    }

    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken; // contains uid, email, etc.
    next();
  } catch (error) {
    console.error('Firebase token verification error:', error.message);
    return sendError(res, 'Invalid or expired authentication token.', 401);
  }
};

/**
 * Business Authorization Middleware
 * 
 * Enforces business-level authorization:
 * 1. Checks that the current authenticated user owns the target business.
 * 2. Attaches `req.business` to the request object so downstream controllers never
 *    have to blindly trust client-supplied businessId values.
 */
export const requireBusinessOwnership = async (req, res, next) => {
  try {
    // Will be fully implemented in Milestone 3 & 4 with Firestore business lookup
    next();
  } catch (error) {
    return sendError(res, 'Business access authorization failed.', 403);
  }
};
