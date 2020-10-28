$(document).ready(function () {
  $("#find-city").on("click", function (event) {
    event.preventDefault();
    let city = $("#city-search").val();
    $("#city-search").val("");
    findWeather(city);
  });

  function findWeather(city) {
    var currentWeatherURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=bf07b2cbcf62e6d7ae2b1536e215c869";
    var forecastURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=bf07b2cbcf62e6d7ae2b1536e215c869";

    $.ajax({
      url: currentWeatherURL,
      method: "GET",
      success: function (response) {
        if (searchHistory.indexOf(city) === -1) {
          searchHistory.push(city);
          window.localStorage.setItem(
            "search-history",
            JSON.stringify(searchHistory)
          );
          previousSearch(searchHistory);
        }

        console.log(response.name);
        console.log(response);
        let tempConversation = (response.main.temp - 273.15) * 1.8 + 32;
        var card = $("<div>").addClass("card");
        var cardBody = $("<div>").addClass("card-body");
        let cityName = $("<p>").addClass("card-text").text(response.name);
        let cityTemp = $("<p>")
          .addClass("card-text")
          .text("Temperature: " + tempConversation.toFixed(2) + " ℉");
        let cityHumid = $("<p>")
          .addClass("card-text")
          .text("Humidity: " + response.main.humidity + " %");
        let cityWind = $("<p>")
          .addClass("card-text")
          .text("Wind: " + response.wind.speed + " MPH");
        //let cityUv =

        cardBody.append(cityName);
        cardBody.append(cityTemp);
        cardBody.append(cityHumid);
        cardBody.append(cityWind); //Repeat for each weather variable within para
        card.append(cardBody);
        $("#today").append(card);

        //$(".city").text(cityName);
        //$(".temp").text("Temperature: " + parseInt(cityTemp) + " ℉");
        //$(".humidity").text("Humidity: " + cityHumid + " %");
        //$(".wind").text("Wind Speed: " + cityWind + " MPH");
        //$(".uvIndex").text(cityUv);
      },
    });
    $.ajax({
      url: forecastURL,
      method: "GET",
      success: function (forecast) {
        console.log(forecast);
      },
    });
  }

  //   $.ajax({
  //     // UVindex
  //     url: forecastURL,
  //     method: "GET",
  //     success: function (UVindex) {},
  //   });

  function previousSearch(name) {
    var cityList = $("<li>").text(name);
    $(".recentSearch").append(cityList);
  }
  var searchHistory =
    JSON.parse(window.localStorage.getItem("search-history")) || [];
  if (searchHistory.length > 0) {
    findWeather(searchHistory[searchHistory.length - 1]); // Displaying most recent search
  }

  for (let i = 0; i < searchHistory.length; i++) {
    previousSearch(searchHistory[i]);
  }
});
