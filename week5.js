window.addEventListener('DOMContentLoaded', async function() {
    // Get a reference to the "get weather" button
    let getWeatherButton = document.querySelector(`.get-weather`)
  
    // When the "get weather" button is clicked:
    getWeatherButton.addEventListener(`click`, async function(event) {
      // - Ignore the default behavior of the button
      event.preventDefault()
  
      // - Get a reference to the element containing the user-entered location
      let locationInput = document.querySelector(`#location`)
  
      // - Get the user-entered location from the element's value
      let location = locationInput.value
      // - Get a reference to the element containing the user-entered days
      let daysInput = document.querySelector(`#days`)

      // - store days value in memory  
      let Days = daysInput.value
  
      // - Check to see if the user entered anything in both; if so:
      if (location.length > 0) {
        // - Construct a URL to call the WeatherAPI.com API
        let url = `https://api.weatherapi.com/v1/forecast.json?key=53a0155e46494151b76200952212604&q=${location}&days=${Days}`
  
        // - Fetch the url, wait for a response, store the response in memory
        let response = await fetch(url)
  
        // - Ask for the json-formatted data from the response, wait for the data, store it in memory
        let json = await response.json()
  
        // - Write the json-formatted data to the JavaScript console
        console.log(json)
  
        // - Store the returned location, current weather conditions, the forecast as three separate variables
        let interpretedLocation = json.location
        let currentWeather = json.current
        let dailyForecast = json.forecast
  
        // Store a reference to the "current" element
        let currentElement = document.querySelector(`.current`)
  
        // Fill the current element with the location and current weather conditions
        currentElement.innerHTML = `
          <div class="text-center space-y-2">
            <div class="font-bold text-3xl">Current Weather for ${interpretedLocation.name}, ${interpretedLocation.region}</div>
            <div class="font-bold">
              <img src="https://cdn.weatherapi.com/weather/64x64/day/116.png" class="inline-block">
              <span class="temperature">${currentWeather.temp_f}</span>° 
              and
              <span class="conditions">${currentWeather.condition.text}</span>
            </div>
          </div>
        `
        // - check to see if user entered anything in location and days
        if (Days > 0 || location.length>0) {

        //clear past values 
        document.querySelector(`.forecast`).innerHTML=``

        //check to see if information is entered in both location and days
        if (location.length > 0 && Days > 0) {

        //add title for number of days forecasted
            let forecastElement = document.querySelector(`.forecast`)
            forecastElement.insertAdjacentHTML(`beforeend`,`
            <div class="text-center space-y-8">
            <div class="font-bold text-3xl">${Days} Day Forecast</div>
            <div>`)
      
        // Fill the current element with the location and current weather conditions
        //loop through number of days forecasted
        for(let i=0; i < dailyForecast.forecastday.length;i++){
        //create object for number of day in the forecast
            let forecastday=dailyForecast.forecastday[i]
            console.log(forecastday)
            forecastElement.insertAdjacentHTML(`beforeend`,`
            <div class="text-center">
                <img src="https://cdn.weatherapi.com/weather/64x64/day/116.png" class="mx-auto">
                <h1 class="text-2xl text-bold text-gray-500">${forecastday.date}</h1>
                <h2 class="text-xl">High ${forecastday.day.maxtemp_f}° – Low ${forecastday.day.mintemp_f}°</h2>
                <p class="text-gray-500">${forecastday.day.condition.text}</h1>
            </div>
            </div>
      </div>
        `)
        }
        }
        }
      }
    })
  })

