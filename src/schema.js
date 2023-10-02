const { gql } = require("apollo-server-express");

const typeDefs = gql`
  enum TaskStatus {
    OPEN
    IN_PROGRESS
    COMPLETED
  }

  type Task {
    id: ID!
    title: String!
    description: String
    status: TaskStatus!
    created_at: String!
    updated_at: String!
  }

  type TaskMetrics {
    open_tasks: Int!
    inprogress_tasks: Int!
    completed_tasks: Int!
  }

  type MonthlyTaskMetrics {
    date: String!
    open_tasks: Int!
    inprogress_tasks: Int!
    completed_tasks: Int!
  }

  type Query {
    tasks(page: Int, perPage: Int): [Task]
    taskMetrics: TaskMetrics
    monthlyTaskMetrics: [MonthlyTaskMetrics]
  }

  type Mutation {
    createTask(title: String!, description: String, status: TaskStatus!): Task
    updateTask(
      id: ID!
      title: String
      description: String
      status: TaskStatus
    ): Task
    deleteTask(id: ID!): Boolean
  }
`;

module.exports = typeDefs;
