# Bug Fix: Registration Privilege Escalation & Unhandled Crash Prevention

## 🐞 Bug Description
In the upstream BiteCraft repository (`backend/src/controllers/authController.js`), the `register` route accepted the `role` parameter directly from the client request body:

```javascript
const { name, email, password, role } = req.body;
...
const user = new User({
    name,
    email,
    password: hashedPassword,
    role // <-- Arbitrary role assignment from client
});
```

### Consequences:
1. **Critical Privilege Escalation (Security Vulnerability)**:
   Any user registering could pass `{"role": "admin"}` in the request payload and instantly obtain an administrative account. This grants unauthorized access to all protected food-menu mutating routes (`POST /api/foods`, `PUT /api/foods/:id`, `DELETE /api/foods/:id`).
2. **Missing Validation & Unhandled Crashes**:
   Submitting without required fields, or submitting an existing email, triggered unhandled MongoDB `E11000` duplicate key exceptions, crashing the Node server process.

---

## 🛠️ The Solution
1. **Strict Role Hardening**: Enforced `role: "user"` by default upon registration. Administrative roles can only be granted by existing administrators or initial seeding.
2. **Required Field & Email Regex Validation**: Checks for valid `name`, `email`, and `password`.
3. **Safe Duplicate Email Handling**: Pre-checks for existing accounts and returns a clean `409 Conflict` instead of crashing the database driver.
4. **Resilient Error Handling**: Wrapped all asynchronous calls in `try...catch` blocks.
