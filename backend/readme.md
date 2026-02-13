# Users — `POST /users/register`

## Description
Creates a new user account, hashes the password, and returns a JSON Web Token plus the created user (password is not returned).

- Route: `POST /users/register`
- Purpose: Register a new user and return an authentication token

---

## Request
- Headers:
  - `Content-Type: application/json`

- Body (JSON):
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword"
}
```

### Required fields & validation
- `fullname.firstname` — required, string, min length 3
- `fullname.lastname` — optional, string (recommended min length 3)
- `email` — required, valid email format
- `password` — required, string, min length 6

Validation error messages are returned with status `400` (see Responses).

---

## Responses / Status codes
- 201 Created
  - Description: User created successfully. Returns `{ token, user }`.
  - Example:
```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "642...",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

- 400 Bad Request
  - Description: Request body failed validation. Response contains `errors` array from `express-validator`.
  - Example:
```json
{
  "errors": [
    { "msg": "Invalid Email", "param": "email", "location": "body" },
    { "msg": "Password must be at least 6 characters long", "param": "password", "location": "body" }
  ]
}
```

- 500 Internal Server Error
  - Description: Unexpected server/database error.
  - Example:
```json
{ "error": "Internal Server Error" }
```

---

## Notes / Implementation details
- Passwords are hashed server-side before being saved.
- The JWT token is created with `user.generateAuthToken()` — ensure `JWT_SECRET` is set in environment.
- The `password` field is not returned in responses (model uses `select: false`).

---

## Quick test (curl)
```bash
curl -X POST "http://localhost:PORT/users/register" \
  -H "Content-Type: application/json" \
  -d '{"fullname": {"firstname":"Jane","lastname":"Doe"}, "email":"jane@example.com", "password":"hunter2"}'
```

Replace `PORT` with your backend port (default from your app).