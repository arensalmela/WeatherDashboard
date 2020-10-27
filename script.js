$(document).ready(function(){

    $("#find-city").on("click", function(event){
    event.preventDefault();
    let city = $("#city-search").val();
    $("#city-search").val("")
    findWeather(city)
    })

    function findWeather(city){
     

    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=956c1c0d82794f489f9f91ee32d9b51f"
   
    $.ajax({
       url: queryURL,
       method: "GET",
       success: function(response){
            if (searchHistory.indexOf(city)=== -1){
                searchHistory.push(city)
               window.localStorage.setItem("search-history", JSON.stringify(searchHistory))
               previousSearch(searchHistory) 
            }

        console.log(response.name)
        console.log(response.main.humidity)
     var card = $("<div>").addClass("card")
     var cardBody = $("<div>").addClass("card-body")   
     let cityName = response.name;
     let cityTemp = $("<p>").addClass("card-text").text("Temperature: " + response.main.temp + " ℉");
     let cityHumid = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity ) 
     let cityWind = response.wind.speed;
     //let cityUv = 
     cityTemp = (cityTemp -273.15) * 1.80 + 32
     cardBody.append(cityTemp) //Repeat for each weather variable within para
     card.append(cardBody)
     $("#today").append(card)


     $(".city").text(cityName);
     //$(".temp").text("Temperature: " + parseInt(cityTemp) + " ℉"); 
     $(".humidity").text("Humidity: " + cityHumid + " %");  
     $(".wind").text("Wind Speed: " + cityWind + " MPH");
     //$(".uvIndex").text(cityUv);
     
    }})}

    function previousSearch(name){
        var cityList = $("<li>").text(name)
        $(".recentSearch").append(cityList)
    }
    var searchHistory = JSON.parse(window.localStorage.getItem("search-history")) || [] // 
    if (searchHistory.length > 0){
        findWeather(searchHistory[searchHistory.length -1]) // Displaying most recent search
    }

    for (let i = 0; i < searchHistory.length; i++){
        previousSearch(searchHistory[i])
    }

})
