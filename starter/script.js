apiKey = "e6a7e2d17f01690a1f7665bfa3295ba7"



let queryUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}`

$(".#search-form").on("submit", function(){
    let searchInput = $("#search-input").val()

    let countryQueryUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=10&appid=${apiKey}`

    $.ajax({url : countryQueryUrl}).then(function(response){
        console.log(response)
    })
})