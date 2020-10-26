$(document).ready(function(){

 var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=input.formcontrol&appid=956c1c0d82794f489f9f91ee32d9b51f"

 $.ajax({
    url: queryURL,
    method: "GET"
  })

  
  $("#city-search")
  
  .then(function(response) {
    console.log(queryURL)
    console.log(response)

  })

















})
