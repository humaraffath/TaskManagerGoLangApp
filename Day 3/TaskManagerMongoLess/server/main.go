package main

import (
	"net/http"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Task struct {
	ID int `json: "id"`
	Title string `json: "title"`
	Status string `json: "status"`
}

var tasks = []Task{}
var nextID = 1 

func main() {
	r := gin.Default() //initialize a router

	//Enabling CORS 
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowMethods: []string{"GET","POST","PUT","DELETE","OPTIONS"},
		AllowHeaders: []string{"Origin","Content-Type","Authorization"},
	}))

	//Routes
	r.GET("/tasks",getTasks)
	r.POST("/tasks",createTask)
	r.GET("/tasks/:id",getTaskByID)
	r.PUT("/tasks/:id",updateTask)
	r.DELETE("/tasks/:id",deleteTask)

	r.Run(":8080")
}

func getTasks(c *gin.Context) {
	c.JSON(http.StatusOK, tasks)
}

func createTask(c *gin.Context) {
	var newTask Task //store data
	if err := c.ShouldBindJSON(&newTask); err!=nil {
		c.JSON(http.StatusBadRequest, gin.H{"error":"invalid task data"})
		return
	}
	if newTask.Title == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error" : "Task title cannot be empty"})
		return
	}
	newTask.ID = nextID
	nextID++
	tasks = append(tasks,newTask)
	c.JSON(http.StatusCreated, newTask)
}

func getTaskByID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id")) 
	if err!= nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid task ID"})
		return
	}
	for _,task := range tasks {
		if task.ID == id {
			c.JSON(http.StatusOK, task)
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
}

func updateTask(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id")) 
	if err!= nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid task ID"})
		return
	}
	var updatedTask Task 
	if err := c.ShouldBindJSON(&updatedTask); err!=nil {
		c.JSON(http.StatusBadRequest, gin.H{"error":"invalid task data"})
		return
	}

	for i,task := range tasks {
		if task.ID == id {
			tasks[i].Title = updatedTask.Title
			tasks[i].Status = updatedTask.Status
			c.JSON(http.StatusOK, tasks[i])
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
}

func deleteTask(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id")) 
	if err!= nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid task ID"})
		return
	}
	for i,task := range tasks {
		if task.ID == id {
			tasks = append(tasks[:i], tasks[i+1:]...)

			c.JSON(http.StatusOK, gin.H{"message":"Task Deleted Successfully"})
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
}