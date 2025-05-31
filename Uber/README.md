# User Registration & Login API Documentation

## User Registration

### Endpoint

`POST /users/register`

---

### Description

Registers a new user in the system.  
Validates the input, hashes the password, and returns the created user along with an authentication token.

---

### Request Body

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

#### Example

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

### Responses

#### Success

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

#### Validation Error

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

#### Missing Fields/Error

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

## User Login

### Endpoint

`POST /users/login`

---

### Description

Authenticates a user with email and password.  
Returns the user data and a JWT token if credentials are valid.

---

### Request Body

Send a JSON object with the following structure:

```json
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

#### Example

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

---

### Responses

#### Success

- **Status Code:** `200 OK`
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

#### Validation Error

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

#### Invalid Credentials

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

#### Example Invalid Credentials Response

```json
{
  "message": "Invalid email or password"
}
```

---

## Get User Profile

### Endpoint

`GET /users/profile`

---

### Description

Returns the authenticated user's profile information.  
Requires a valid JWT token in the request (usually via cookie or Authorization header).

---

### Authentication

- **Required:** Yes (JWT token)

---

### Success Response

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "_id": "6651e8c2f1a2b3c4d5e6f789",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
      // ...other user fields
    }
    ```

#### Example Success Response

```json
{
  "_id": "6651e8c2f1a2b3c4d5e6f789",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

---

### Unauthorized Response

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "Authentication required"
    }
    ```

---

## User Logout

### Endpoint

`GET /users/logout`

---

### Description

Logs out the authenticated user by clearing the authentication token cookie and blacklisting the token.

---

### Authentication

- **Required:** Yes (JWT token)

---

### Success Response

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "message": "Logout successful"
    }
    ```

#### Example Success Response

```json
{
  "message": "Logout successful"
}
```

---

### Unauthorized Response

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "Authentication required"
    }
    ```

---

## Captain Registration API Documentation

## Captain Registration

### Endpoint

`POST /captains/register`

---

### Description

Registers a new captain (driver) in the system.  
Validates the input, hashes the password, and returns the created captain along with an authentication token.

---

### Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, optional)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)",
  "vehicle": {
    "color": "string (min 3 chars, required)",
    "plate": "string (min 3 chars, required)",
    "capacity": "number (min 1, required)",
    "vehicleType": "string (car | motorcycle | auto, required)"
  }
}
```

#### Example

```json
{
  "fullname": {
    "firstname": "Alex",
    "lastname": "Smith"
  },
  "email": "alex.smith@captain.com",
  "password": "captainPass123",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

---

### Responses

#### Success

- **Status Code:** `201 Created`
- **Body:**
    ```json
    {
      "captain": {
        "_id": "6651e8c2f1a2b3c4d5e6f999",
        "fullname": {
          "firstname": "Alex",
          "lastname": "Smith"
        },
        "email": "alex.smith@captain.com",
        "vehicle": {
          "color": "Red",
          "plate": "XYZ1234",
          "capacity": 4,
          "vehicleType": "car"
        }
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

#### Example Success Response

```json
{
  "captain": {
    "_id": "6651e8c2f1a2b3c4d5e6f999",
    "fullname": {
      "firstname": "Alex",
      "lastname": "Smith"
    },
    "email": "alex.smith@captain.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Validation Error

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

#### Missing Fields/Error

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

### Notes

- All vehicle fields are required and validated.
- `vehicleType` must be one of: `car`, `motorcycle`, or `auto`.
- On success, a JWT token is returned for authentication.
- Use the returned token for authenticated requests to protected captain endpoints.

---