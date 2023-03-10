let apiKey = "b5657f205b6b0f7351867ba9e56f2a2c"

const history = JSON.parse(localStorage.getItem('history')) || [];

// Function to perform ajax call with latitude and longitude 
function ajaxQuery(queryUrl){
    $.ajax({url : queryUrl}).then(function(weatherResponse){   

        const weatherList = weatherResponse.list
        const weatherToday = weatherList[0]

        let weatherTodayEL = $(` <h1> ${weatherResponse.city.name} (${moment(weatherToday.dt_txt, "YYYY-MM-DD HHHH").format("DD/MM/YYYY")}) <img src="${`http://openweathermap.org/img/w/${weatherToday.weather[0].icon}.png`}"  alt="Weather icon"></h1>
                                 <p> Temp: ${weatherToday.main.temp } &#8451</p>
                                 <p> Wind: ${weatherToday.wind.speed} KPH </p> 
                                 <p> Humidity: ${weatherToday.main.humidity}% </p> `)
        
        let todayEl = $("#today")
        todayEl.empty()
        todayEl.append(weatherTodayEL)

        let forecastEl = $("#forecast")
        forecastEl.empty()

        for(let i = 0; i < weatherList.length; i += 8){
            

            const weatherForecast = weatherList[i]

            let weatherForecastEL = $(` <div class="col-sm"><h1> ${moment(weatherForecast.dt_txt, "YYYY-MM-DD HHHH").format("DD/MM/YYYY")} </h1>
                                    <img src="${`https://openweathermap.org/img/w/${weatherForecast.weather[0].icon}.png`}"  alt="Weather icon">
                                    <p> Temp: ${weatherForecast.main.temp} &#8451</p>
                                    <p> Wind: ${weatherForecast.wind.speed} KPH </p> 
                                    <p> Humidity: ${weatherForecast.main.humidity}% </p></div> `)
            
            
            forecastEl.append(weatherForecastEL)
        }
        
    })
}

// Function to perform actions on history buttons
function historyFunction(){
    $("button").on("click", function(event){
        event.preventDefault()
        let historySearchInput = $(this).text()

        let countryQueryUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${historySearchInput}&limit=1&appid=${apiKey}`
        
        $.ajax({url : countryQueryUrl}).then(function(response){

            let lat = response[0].lat
            let lon = response[0].lon
            
            let queryUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`
    
            ajaxQuery(queryUrl)            
        })     
    })
}

// On search click in search form perform this action
$("#search-form").on("submit", function(event){
    event.preventDefault()

    let searchInput = $("#search-input").val()
    
    let countryQueryUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=${apiKey}`

    // Add the history to local storage
    history.push(searchInput);
    localStorage.setItem('history', JSON.stringify(history));

    let button = $("<button>").attr("class", "class='list-group-item'")
    button.text(searchInput)
    $("#history").prepend(button)

    $.ajax({url : countryQueryUrl}).then(function(response){
        let lat = response[0].lat
        let lon = response[0].lon
        
        let queryUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`


        ajaxQuery(queryUrl)
    })
    
   historyFunction()
})



// perform this to show history buttons
if(history.length > 0)(
history.forEach(function(element){
    let button = $("<button>").attr("class", "class='list-group-item'")
    button.text(element)
    $("#history").prepend(button)
    historyFunction()
})
)

historyFunction()