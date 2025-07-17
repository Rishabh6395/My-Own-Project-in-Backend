# Uber Backend API Documentation

## User Registration

### Endpoint

`POST /users/register`

---

### Description

Registers a new user in the system.  
Validates the input, hashes the password, and returns the created user along with an authentication token.

---

### Request Body

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

#### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
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

#### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
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

---

## User Profile

### Endpoint

`GET /users/profile`

---

### Description

Returns the authenticated user's profile information.  
Requires a valid JWT token in the request (via cookie or Authorization header).

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
    }
    ```

#### Unauthorized Response

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

### Success Response

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "message": "Logout successful"
    }
    ```

#### Unauthorized Response

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "Authentication required"
    }
    ```

---

# Captain Registration & Login API Documentation

## Captain Registration

### Endpoint

`POST /captains/register`

---

### Description

Registers a new captain (driver) in the system.  
Validates the input, hashes the password, and returns the created captain along with an authentication token.

---

### Request Body

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
    "vehicleType": "string (car | auto | moto, required)"
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

#### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
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

---

## Captain Login

### Endpoint

`POST /captains/login`

---

### Description

Authenticates a captain with email and password.  
Returns the captain data and a JWT token if credentials are valid.

---

### Request Body

```json
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

#### Example

```json
{
  "email": "alex.smith@captain.com",
  "password": "captainPass123"
}
```

---

### Responses

#### Success

- **Status Code:** `200 OK`
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

#### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
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

---

## Captain Profile

### Endpoint

`GET /captains/profile`

---

### Description

Returns the authenticated captain's profile information.  
Requires a valid JWT token in the request (via cookie or Authorization header).

---

### Success Response

- **Status Code:** `200 OK`
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
      }
    }
    ```

#### Unauthorized Response

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "Authentication required"
    }
    ```

---

## Captain Logout

### Endpoint

`GET /captains/logout`

---

### Description

Logs out the authenticated captain by clearing the authentication token cookie and blacklisting the token.

---

### Success Response

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "message": "Logout successful"
    }
    ```

#### Unauthorized Response

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "Authentication required"
    }
    ```

---

## Get Fare Estimate

### Endpoint

`GET /rides/get-rides`

---

### Description

Returns fare estimates for a ride based on pickup, destination, and vehicle type.  
Requires authentication (JWT token in the `Authorization` header).

---

### Query Parameters

| Name         | Type   | Required | Description                |
|--------------|--------|----------|----------------------------|
| pickup       | string | Yes      | Pickup address             |
| destination  | string | Yes      | Destination address        |
| vehicleType  | string | Yes      | Vehicle type (`auto`, `car`, `moto`) |

#### Example

```
/rides/get-rides?pickup=MG%20Road&destination=Airport&vehicleType=car
```

---

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "auto": 120.5,
      "car": 200.75,
      "moto": 80.25
    }
    ```
    *Each key is a vehicle type with its estimated fare.*

#### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Invalid pickup address",
          "param": "pickup",
          "location": "query"
        }
      ]
    }
    ```

#### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "Unauthorized"
    }
    ```

---

## Notes

- All endpoints requiring authentication expect a JWT token in the `Authorization` header as `Bearer <token>`.
- On successful login or registration, store the token in localStorage and use it for protected routes.
- Vehicle types allowed: `car`, `auto`, `moto`.
- All error responses are in JSON format.

---