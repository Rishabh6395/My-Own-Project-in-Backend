# User Registration API Documentation

## Endpoint

`POST /users/register`

---

## Description

Registers a new user in the system.  
Validates the input, hashes the password, and returns the created user along with an authentication token.

---

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, optional)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Example

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

---

## Responses

### Success

- **Status Code:** `201 Created`
- **Body:**
    ```json
    {
      "user": {
        "_id": "6651e8c2f1a2b3c4d5e6f789",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

#### Example Success Response

```json
{
  "user": {
    "_id": "6651e8c2f1a2b3c4d5e6f789",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Error message",
          "param": "field",
          "location": "body"
        }
      ]
    }
    ```

#### Example Validation Error Response

```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Missing Fields/Error

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "All fields are required"
        }
      ]
    }
    ```

#### Example Missing Fields Response

```json
{
  "errors": [
    {
      "msg": "All fields are required"
    }
  ]
}
```

---

## Notes

- `firstname` must be at least 3 characters.
- `lastname` is optional but, if provided, must be at least 3 characters.
- `email` must be a valid email address.
- `password` must be at least 6 characters.
- On success, a JWT token is returned for authentication.

---