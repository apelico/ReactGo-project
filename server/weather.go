package weather

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func goDotEnvVariable(key string) string {

	// load .env file
	err := godotenv.Load(".env")

	if err != nil {
		log.Println("Error loading .env file")
	}

	return os.Getenv(key)
}

var weatherData []byte

func GetCurrentWeatherData(w http.ResponseWriter, r *http.Request) {
	if weatherData == nil {

		resp, err := http.Get("https://api.openweathermap.org/data/2.5/onecall?lat=33.405628&lon=-86.96174&exclude=&appid=6b61b7a36f320b958412ef52e734c773")
		if err != nil {
			log.Fatalln(err)
		}

		//We Read the response body on the line below.
		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			log.Fatalln(err)
		}

		weatherData = body
		fmt.Println("Called API")
	}

	json.NewEncoder(w).Encode(string(weatherData))

}
