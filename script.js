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
        console.log(queryURL)
        console.log(response)
    
    }) 


})

 

  
 
    

  
  
 

















})
