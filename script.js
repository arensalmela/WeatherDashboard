$(document).ready(function(){

$("#find-city").on("click", function(event){
    event.preventDefault();
    let city = $("#city-search").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=956c1c0d82794f489f9f91ee32d9b51f"
   
    $.ajax({
       url: queryURL,
       method: "GET"
    })
   
     .then(function(response) {
        console.log(response)
        
     let cityName = response.name;
     let cityTemp = response.main.temp;
     let cityHumid = response.main.humidity
     let cityWind = response.wind.speed;
     //let cityUv = 
     cityTemp = (cityTemp -273.15) * 1.80 + 32



     $(".city").text(cityName);
     $(".temp").text("Temperature: " + parseInt(cityTemp)); 
     $(".humidity").text("Humidity: " + cityHumid + " %");  
     $(".wind").text("Wind Speed: " + cityWind + " MPH");
     $(".uvIndex").text(cityUv);
    }) 


})

 

  
 
    

  
  
 

















})
