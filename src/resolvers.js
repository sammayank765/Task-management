const pool = require("./db");
const resolvers = {
  Query: {
    tasks: async (_, { page, perPage }) => {
      try {
        const offset = (page - 1) * perPage;
        const query = `
          SELECT * FROM tasks
          ORDER BY created_at DESC
          LIMIT ? OFFSET ?;
        `;
        const queryResult = await executeQuery(query, [perPage, offset]);
        return queryResult;
      } catch (error) {
        throw new Error("Failed to fetch tasks.");
      }
    },
    taskMetrics: async () => {
      try {
        const metricsQuery = `
          SELECT
            SUM(CASE WHEN status = 'OPEN' THEN 1 ELSE 0 END) AS open_tasks,
            SUM(CASE WHEN status = 'IN_PROGRESS' THEN 1 ELSE 0 END) AS inprogress_tasks,
            SUM(CASE WHEN status = 'COMPLETED' THEN 1 ELSE 0 END) AS completed_tasks
          FROM tasks;
        `;
        const metricsResult = await executeQuery(metricsQuery);
        return metricsResult[0];
      } catch (error) {
        throw new Error("Failed to fetch task metrics.");
      }
    },
    monthlyTaskMetrics: async () => {
      try {
        const monthlyMetricsQuery = `
        SELECT
        DATE_FORMAT(created_at, '%M %Y') AS date,
        SUM(CASE WHEN status = 'OPEN' THEN 1 ELSE 0 END) AS open_tasks,
        SUM(CASE WHEN status = 'IN_PROGRESS' THEN 1 ELSE 0 END) AS inprogress_tasks,
        SUM(CASE WHEN status = 'COMPLETED' THEN 1 ELSE 0 END) AS completed_tasks
        FROM tasks
        GROUP BY DATE_FORMAT(created_at, '%M %Y');
      
        `;
        const monthlyMetricsResult = await executeQuery(monthlyMetricsQuery);
        return monthlyMetricsResult;
      } catch (error) {
        console.log(error.message);
        throw new Error("Failed to fetch monthly task metrics.");
      }
    },
  },

  Mutation: {
    createTask: async (_, { title, description, status }) => {
      try {
        const query = `
          INSERT INTO tasks (title, description, status, created_at, updated_at)
          VALUES (?, ?, ?, NOW(), NOW());
        `;
        const queryResult = await executeQuery(query, [
          title,
          description,
          status,
        ]);
        return { id: queryResult.insertId, title, description, status };
      } catch (error) {
        throw new Error("Failed to create a task.");
      }
    },
    updateTask: async (_, { id, title, description, status }) => {
      try {
        const setClauses = [];
        const values = [];

        if (title !== undefined) {
          setClauses.push("title = ?");
          values.push(title);
        }
        if (description !== undefined) {
          setClauses.push("description = ?");
          values.push(description);
        }
        if (status !== undefined) {
          setClauses.push("status = ?");
          values.push(status);
        }

        const setClause = setClauses.join(", ");
        const query = `
            UPDATE tasks
            SET ${setClause}, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?;
          `;

        values.push(id);
        await executeQuery(query, values);
        return { id, title, description, status };
      } catch (error) {
        throw new Error("Failed to update the task.");
      }
    },
  },
};

async function executeQuery(sql, values = []) {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = resolvers;
