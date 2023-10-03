# Task Management System

## Overview

This is a Task Management System built with Node.js, MySQL, and GraphQL. It allows you to manage tasks, track task metrics, and retrieve monthly task metrics.

## Features

- Create, update, and delete tasks.
- Retrieve a list of tasks with pagination.
- Get overall task metrics (count of open, in-progress, and completed tasks).
- Get monthly task metrics (count of tasks per month).

## Technologies Used

- Node.js
- MySQL
- GraphQL
- Apollo Server Express
- Express.js


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sammayank765/Task-management.git


2. Navigate to the project directory:

    ```bash
    cd Task-management
    
3. Install dependencies:

    ```bash
    npm install

4. Create a .env file based on the .env_example template and provide your environment-specific values.

5. Start the server:

    ```bash
    npm start
The server will run on http://localhost:3000.


## Usage/Examples

### Create a Task
To create a new task, send a POST request to /graphql with the following GraphQL mutation:
```javascript
mutation {
  createTask(title: "Task Title", description: "Task Description", status: "Task Status") {
    id
    title
    description
    status
  }
}

```

### Update a Task
To update an existing task, send a POST request to /graphql with the following GraphQL mutation:
```javascript
mutation {
  updateTask(id: "task-id", title: "Updated Title", description: "Updated Description", status: "IN_PROGRESS") {
    id
    title
    description
    status
  }
}
```

### Delete a Task
To delete a task, send a POST request to /graphql with the following GraphQL mutation:
```javascript
mutation {
  deleteTask(id: "task-id")
}
```

### Get Task Metrics
To retrieve overall task metrics, send a GET request to /graphql with the following GraphQL query:
```javascript
query {
  taskMetrics {
    open_tasks
    inprogress_tasks
    completed_tasks
  }
}
```

### Get Monthly Task Metrics
To retrieve monthly task metrics, send a GET request to /graphql with the following GraphQL query:
```javascript
query {
  monthlyTaskMetrics {
    date
    open_tasks
    inprogress_tasks
    completed_tasks
  }
}
```





## Screenshots

[![Screenshot-2023-10-02-134802.png](https://i.postimg.cc/PrB4SN0T/Screenshot-2023-10-02-134802.png)](https://postimg.cc/4mQVd4JS)


[![Screenshot-2023-10-02-134825.png](https://i.postimg.cc/02pfH9vS/Screenshot-2023-10-02-134825.png)](https://postimg.cc/7fZ058fP)


[![Screenshot-2023-10-02-134846.png](https://i.postimg.cc/GhQDytrX/Screenshot-2023-10-02-134846.png)](https://postimg.cc/ppmyN2mj)

[![Screenshot-2023-10-02-141152.png](https://i.postimg.cc/N0y2SxXn/Screenshot-2023-10-02-141152.png)](https://postimg.cc/KK2YgBJ7)
