# MollyPR Solution: Authentication & Cookie Fix

This directory contains the complete solution addressing the authentication cookie parsing bug and associated session handling improvements in BiteCraft.

## Bug Summary
In Express, cookies sent from client browsers (such as `req.cookies?.token`) are not parsed by default unless `cookie-parser` is mounted as middleware. Additionally, standard CORS configurations reject credentialed cross-origin requests. As a result, protected routes returned `401 Unauthorized` even after successful logins.

## Changes Included in this Solution:
1. **`cookie-parser` Middleware**:
   - Added `cookie-parser` dependency and registered `app.use(cookieParser())` in `backend/src/server.js`.
2. **Dynamic CORS with Credentials**:
   - Enabled `credentials: true` and origin validation in `backend/src/server.js` so browsers can securely send and receive cookies across ports.
3. **Dual-Strategy Token Extraction**:
   - Updated `backend/src/middleware/auth.js` to seamlessly extract tokens from either `Cookie: token=...` or `Authorization: Bearer <token>`.
4. **Hardened Cookie Options**:
   - Enhanced `backend/src/controllers/authController.js` with `httpOnly`, environment-aware `sameSite`, and explicit `maxAge`.
5. **Session Lifecycle Endpoints**:
   - Added `POST /api/auth/logout` (cookie invalidation) and `GET /api/auth/me` (session user profile) in `backend/src/routes/authRoutes.js`.
