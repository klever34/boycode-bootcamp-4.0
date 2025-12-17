# Fitness Exercise Tracker API

An Express.js REST API for tracking exercises and workout sessions. This project uses modular architecture, custom middleware, and **in-memory data storage** (no database required).

    ```
The API is now live at `http://localhost:3000/api`.

---

## 📂 Key Project Structure

The architecture is built on **Modular Routing** and **Controllers** 

```text
fitness-api/
├── controllers/    # Business logic (CRUD, Filtering, Sorting)
├── middleware/     # Logger, Validation, Error Handler
├── routes/         # Modular endpoints
├── data/           # In-memory storage (arrays)
├── app.js          # Express setup, middleware, and route mounting
└── server.js
