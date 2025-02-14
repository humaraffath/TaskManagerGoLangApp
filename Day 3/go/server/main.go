package main

import (
    "net/http"
    "strconv"

    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
)

// Task struct
type Task struct {
    ID     int    `json:"id"`
    Title  string `json:"title"`
    Status string `json:"status"`
}

// In-memory storage
var tasks = []Task{}
var nextID = 1

func main() {
    r := gin.Default()

    // Enable CORS
    r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:5173"},
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
    }))

    // Routes
    r.GET("/tasks", getTasks)      // Get all tasks
    r.POST("/tasks", createTask)   // Create a task
    r.GET("/tasks/:id", getTaskByID) // Get task by ID
    r.PUT("/tasks/:id", updateTask) // Update task by ID
    r.DELETE("/tasks/:id", deleteTask) // Delete task by ID

    // Start the server
    r.Run(":8080")
}

// Get all tasks
func getTasks(c *gin.Context) {
    c.JSON(http.StatusOK, tasks)
}

// Create a new task
func createTask(c *gin.Context) {
    var newTask Task
    if err := c.ShouldBindJSON(&newTask); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid task data"})
        return
    }
    if newTask.Title == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Task title cannot be empty"})
        return
    }
    newTask.ID = nextID
    nextID++
    tasks = append(tasks, newTask)
    c.JSON(http.StatusCreated, newTask)
}

// Get a task by ID
func getTaskByID(c *gin.Context) {
    id, err := strconv.Atoi(c.Param("id")) // Convert ID from URL param
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid task ID"})
        return
    }

    for _, task := range tasks {
        if task.ID == id {
            c.JSON(http.StatusOK, task)
            return
        }
    }
    c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
}

// Update a task by ID
func updateTask(c *gin.Context) {
    id, err := strconv.Atoi(c.Param("id")) // Convert ID from URL param
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid task ID"})
        return
    }

    var updatedTask Task
    if err := c.ShouldBindJSON(&updatedTask); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid task data"})
        return
    }

    for i, t := range tasks {
        if t.ID == id {
            tasks[i].Title = updatedTask.Title
            tasks[i].Status = updatedTask.Status
            c.JSON(http.StatusOK, tasks[i])
            return
        }
    }
    c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
}

// Delete a task by ID
func deleteTask(c *gin.Context) {
    id, err := strconv.Atoi(c.Param("id")) // Convert ID from URL param
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid task ID"})
        return
    }

    for i, t := range tasks {
        if t.ID == id {
            tasks = append(tasks[:i], tasks[i+1:]...) // Remove task from slice
            c.JSON(http.StatusOK, gin.H{"message": "Task deleted"})
            return
        }
    }
    c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
}
