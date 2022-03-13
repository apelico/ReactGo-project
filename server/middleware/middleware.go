package middleware

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"server/server/models"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Collection

func init() {
	ConnectDB()
}

func goDotEnvVariable(key string) string {

	// load .env file
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	return os.Getenv(key)
}

func ConnectDB() {
	connectionString := goDotEnvVariable("DB_URI")
	dbName := goDotEnvVariable("DB_NAME")
	collName := goDotEnvVariable("DB_COLLECTION_NAME")

	clientOptions := options.Client().ApplyURI(connectionString)
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connection to MongoDB")

	collection := client.Database(dbName).Collection(collName)

	DB = collection
}

func AddTodo(w http.ResponseWriter, r *http.Request) {

	body, err := io.ReadAll(r.Body)

	if err != nil {
		log.Fatalln(err)
	}

	var data map[string]interface{}

	json.Unmarshal([]byte(body), &data)

	DB.InsertOne(context.TODO(), data)
}

func GetTodoList(w http.ResponseWriter, r *http.Request) {
	data, err := DB.Find(context.TODO(), bson.M{})
	if err != nil {
		log.Fatal(err)
	}

	var todoList []bson.M
	if err = data.All(context.TODO(), &todoList); err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(w).Encode(todoList)
}

func UpdateTodo(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)

	if err != nil {
		log.Fatalln(err)
	}
	var data models.Todo

	json.Unmarshal([]byte(body), &data)

	DB.UpdateOne(context.TODO(), bson.M{"id": data.Id}, bson.D{{"$set", data}})
}
