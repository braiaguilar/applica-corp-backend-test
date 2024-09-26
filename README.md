# Blog Posts RESTful API for Applica Corp. (Backend Test)

## Project Overview

This project implements a simple RESTful API that returns a paginated list of blog posts, including their respective authors and comments. The API fetches data from third-party endpoints and merges them into a unified response for the client.

The blog posts are retrieved from an external API, and each post includes:

-   **Author information**, based on the `userId` field of the post.
-   **Comments**, fetched from another endpoint using the `postId` of each blog entry.

The API handles errors appropriately and is designed to be efficient and scalable, leveraging caching mechanisms to store static data (users and potentially comments).

---

## Table of Contents

-   [Project Overview](#project-overview)
-   [Table of Contents](#table-of-contents)
-   [Features](#features)
-   [Technologies](#technologies)
-   [Installation](#installation)
-   [Project Structure](#project-structure)
-   [API Endpoints](#api-endpoints)
-   [Caching Strategy](#caching-strategy)
-   [Error Handling](#error-handling)
-   [Usage](#usage)
-   [Improvements](#improvements)

---

## Features

-   **Paginated Blog Posts**: Returns a paginated list of blog posts based on the `start` and `size` query parameters.
-   **Author Information**: Fetches author details for each post using the `userId` from the posts and appends this information to each blog entry.
-   **Comments**: Retrieves comments for each blog post using its `postId` and includes them in the response.
-   **Error Handling**: Comprehensive error management, covering invalid pagination requests, network issues, and server errors.
-   **Caching**: Implements caching for static data (users) and optionally for comments, to reduce redundant requests and improve performance.

---

## Technologies

-   **Node.js**
-   **Express**
-   **Axios** (for making external API requests)
-   **node-cache** (for caching users and optionally comments)
-   **ES6+ features** (async/await, spread operator, etc.)

---

## Installation

### Prerequisites

-   Node.js version 12.x or higher
-   npm (Node Package Manager)

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/braiaguilar/applica-corp-backend-test.git

    ```

2. Navigate to the project directory

3. Install dependencies:

    ```bash
    npm install

    ```

4. Run the server:
    ```bash
    npm start
    ```

---

## Project Structure

The project follows a modular structure for scalability and maintainability:

```bash
    applica-corp-backend-test/
    │
    ├── /src
    │   ├── /controllers    # Contains controller logic for handling API requests
    │   │   └── postController.js   # Handles fetching and sending blog post data with authors and comments
    │   │   └── userController.js
    │   │   └── commentController.js
    │   │
    │   ├── /services       # Logic for external API requests and business logic
    │   │   └── postService.js  # Fetches posts and integrates user and comment data
    │   │   └── userService.js   # Fetches user data
    │   │   └── commentService.js   # Fetches comment data
    │   │
    │   ├── /routes         # API route definitions
    │   │   └── postRoutes.js   # Routes for blog posts API
    │   │   └── userRoutes.js
    │   │
    │   ├── /models
    │   │   └── postModel.js
    │   │   └── userModel.js
    │   │
    │   ├── /utils          # Utility functions
    │   │   ├── errorHandler.js    # Custom error handling classes and functions
    │   │   └── cache.js           # Cache configuration using node-cache
    │   │
    │   └── app.js          # Main Express app setup
    │
    ├── /tests
    │   └── postController.test.js
    │
    ├── /config
    │   └── default.js
    │
    ├── /node_modules
    │
    ├── .env                # Environment variables
    │
    ├── .gitignore
    │
    ├── package.json
    │
    └── README.md           # Documentation
```

---

## API Endpoints
### GET /posts
Fetches paginated blog posts with authors and comments.

**Request**:
-   **URL Parameters**:
    -   `start` (integer, required): The starting index for pagination (0-indexed).
    -   `size` (integer, required): The number of posts to return.

Example:
```bash
GET /posts?start=10&size=10
```
**Response (200):**
```bash
[
  {
    "id": 1,
    "userId": 2,
    "title": "Blog entry 1 title",
    "body": "Blog entry 1 body",
    "user": {
      "id": 2,
      "name": "John Doe",
      ...
    },
    "comments": [
      {
        "postId": 1,
        "id": 1,
        "name": "Commenter Name",
        ...
      },
      ...
    ]
  },
  ...
]

```

**Possible Errors:**

**404:** Invalid pagination parameters.

**500:** Internal server error.

---

## Caching Strategy
-   **Users**: Since user data is static, it is cached indefinitely using `node-cache` without a TTL (Time-To-Live).
-   **Comments & Posts**: Comment data could change (not specified), so caching is optional. In this case, a TTL is used to allow for possible changes in content.

---

## Error Handling
All errors are centrally managed using a custom `errorHandler.js` middleware. This includes:

-   **Invalid Pagination**: Catches cases where `start` or `size` are out of bounds.
-   **External API Errors**: Handles issues with fetching data from third-party APIs.
-   **Not Found Errors**: Manages errors when no data is found.

---

## Usage
Once the server is running, you can query the `/posts` endpoint with pagination parameters:
```bash
curl http://localhost:3000/posts?start=20&size=5
```



## Improvements
With more time and depending on the potential complexity of the project, these are some of the possible improvements of the project:
-   **Enhanced Pagination**: Implement more advanced pagination techniques like cursor-based pagination for better scalability.
-   **Rate Limiting**: Add rate limiting to the API to prevent abuse and overload.
-   **Testing**: Implement unit and integration tests using Jest or Mocha/Chai to ensure the reliability of the API.
-   **Dynamic Caching**: Improve the caching strategy for posts and comments if content updates more frequently.