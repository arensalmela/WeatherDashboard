$(document).ready(function () {
  let cityInput = $("#city-search");
  const forecastDaysIndex = [3, 11, 19, 27, 35];
  $("#find-city").on("click", function (event) {
    event.preventDefault();
    let city = cityInput.val();
    cityInput.val("");
    findWeather(city);
    forecast(city);
  });

  function findWeather(city) {
    var currentWeatherURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
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
        document.getElementById("today").innerHTML = "";
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

        cardBody.append(cityName);
        cardBody.append(cityTemp);
        cardBody.append(cityHumid);
        cardBody.append(cityWind); //Repeat for each weather variable within para
        card.append(cardBody);
        $("#today").append(card);

        getUv(response);
      },
    });
  }

  function getUv(response) {
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var indexUrl =
      "http://api.openweathermap.org/data/2.5/uvi?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=bf07b2cbcf62e6d7ae2b1536e215c869";

    $.ajax({
      url: indexUrl,
      method: "GET",
    }).then(function (response) {
      console.log(response, "UV index");
      document.getElementById("uvIndex").innerHTML = "";
      let cityUvCard = $("<div>").addClass("card");
      var uVcardBody = $("<div>").addClass("card-body");
      let cityUv = $("<p>")
        .addClass("card-text")
        .text("UV Index : " + response.value);

      uVcardBody.append(cityUv);
      cityUvCard.append(uVcardBody);
      $("#uvIndex").append(cityUvCard);

      //$("#uvIndex").text("UV Index : " + response.value);
    });
  }

  function forecast(city) {
    var forecastURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=bf07b2cbcf62e6d7ae2b1536e215c869";

    $.ajax({
      url: forecastURL,
      method: "GET",
      success: function (forecast) {
        console.log(forecast, "FORECAST OBJECT");
        let list = forecast.list;
        document.getElementById("forecastBlocks").innerHTML = "";
        for (let i = 0; i < forecastDaysIndex.length; i++) {
          var index = forecastDaysIndex[i];
          console.log(index);
          var temp = ((list[index].main.temp - 273.15) * 1.8 + 32).toFixed(2);
          console.log(temp);
          var iconId = list[i].weather[0].icon;
          console.log(iconId);
          var humidity = list[i].main.humidity;
          console.log(humidity);
          //var date = list[i].dt_txt;

          //Commented these out as it was causing error
          //var day = date.getDate();
          //var month = date.getMonth();
          //var year = date.getFullYear();
          var day = "29";
          var month = "10";
          var year = "2020";
          var formatedDate = `${month}/${day}/${year}`;

          var col = $("<div>");
          col.addClass("col");
          var myCard = $("<div>");
          myCard.addClass("card");
          col.append(myCard);

          var pTag = $("<p>").text(formatedDate);
          console.log(formatedDate);
          var iconUrl =
            "https://openweathermap.org/img/wn/" + iconId + "@2x.png";
          var weatherPic = $("<img>");

          weatherPic.attr("src", iconUrl);

          var pTag2 = $("<p>").text("Temp: " + temp + "°F");
          var pTag3 = $("<p>").text("Humidity: " + humidity + "%");

          myCard.append(pTag);
          myCard.append(weatherPic);
          myCard.append(pTag2);
          myCard.append(pTag3);
          console.log(myCard);
          $("#forecastBlocks").prepend(col);
        }
      },
    });
  }

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
