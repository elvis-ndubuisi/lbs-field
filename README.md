# Library Management System - Field
LBS contains two directories; server (a nodejs/expresjs api folder), web (a reactjs frontend folder). Both built using typescript with aim of usiing less package dependencies as possible.

### Notes on implementation
- Currently the authentication process is flawed as both refresh and access to kens are sent via request body and stored in localStorage making the api valnurable to CSRF, getting tokens when routes are intercepted and much more. A better approach would be having the access token in the request header and refresh token stored in the cookie with a shorter duration (user's don't need to stay signed in for long)

- Formdata and requests leaving the frontend are currently not validated which may lead to unexpected errors on both the server and web if not handled correctly.

- The database model is designed based on requirements and method in which the frontend is espected to consume the data ( currently not indexed properly). i.e, each `BorrowHistory` document includes a `borrowedBy` and `borrowedbook` fields which are `FK` pointing to user and book respectively. Why include an `array of history IDs` to both user and books, when history would likely be fetched alone more frequently? Also indexing both fields (especially userId - borrowedBy) would be more appropriate.

### Backend API validation process
Validations are performs using express middleware,

- `requestValidator` validates incoming request payload using a zod schema
-  `deserialiseUser` grabs and validates any incoming `Bearer` token; saves the verified user to a request-level variable or returns a null. The `deserialzedUser` is always used before `authValidator`.
- `authValidator` denies access to an endpoint if no user object is present in the request. i.e `res.locals?.user`.
- `roleValidator` Always comes after `deserializeUser` -> `authValidator` since it depends on the `res.local?.user` request-level variables. Middleware checks the `res.locals?.user?.role` against the given role.

### API Endpoints

### Authentication
| Endpoint | Method | Description | Request Body | Response Body | Error Codes |
|---|---|---|---|---|---|
| /api/auth/signup | POST | Registers a new user if unique username doesn't exist. A user role, access and refresh token is returned | {username, password, role} | objects: {user : {role}, token, refresh} | 401: Unauthorized, 500: Internal Server Error |
| /api/auth/signin | POST | Assigns a authentication tokens to user if provided credentials are correct | {username,password} | {user: {role}, token, refreshToken} | 404: Not Found, 500: Internal Server Error |
| /api/auth/refresh | POST | Assigns a new refresh token to user. tokens only last for about 3mins | N/A | { token, refreshToken} |  |
| /api/auth/logout | POST | Removes user token from header and cookie (currently no implemented) | N/A | N/A |  |

### Books
| Endpoint | Method | Description | Request Body | Response Body | Error Codes |
|---|---|---|---|---|---|
| /api/books | GET | Fetchs all books |  |  |  |
| /api/books | POST | Creates a new book (admin & liberian) |  |  |  |
| /api/boooks/genre | POST | Creates a new book genre | N/A |  |  |
| /api/boooks/genre | GET | Gets all book genre | N/A |  |  |
| /api/boooks/borrow | GET | Gets all borrowed books (member) | N/A |  |  |
| /api/boooks/borrow/:id | PSOT | Creates a new request to borrow a book (member) | N/A |  |  |
| /api/boooks/:id | PUT | updates a book (member) | N/A |  |  |
| /api/boooks/:id | DELETE | deletes a book (member) | N/A |  |  |

### Users
| Endpoint | Method | Description | Request Body | Response Body | Error Codes |
|---|---|---|---|---|---|
| /api/admin/users | GET | Fetchs all users |  |  |  |
| /api/admin/users/:id | DELETE | Deletes a user |  |  |  |
| /api/admin/users/:id | PATCH | Updates a user |  |  |  |
| /api/boooks/genre | POST | Creates a new book genre | N/A |  |  |
| /api/admin/users | POST | Adds new user | N/A |  |  |

## Tech & Libraries
- Frontend: React, SWR + axios (http calls and request caching)
- Backend:
 - Expressjs (http api),
 - zod (validating requests),
 - CORs (cross origin resource sharing)
 - Prisma (database ORM)
 - MongoDB document-based/No-SQL database
