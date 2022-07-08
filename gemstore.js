"use strict";

document.getElementById("slide").style.display = "none";

let currentTime = document.getElementById("today-time"),
  currentDate = document.getElementById("today-date"),
  current__city = document.getElementById("usercity"),
  current__country = document.getElementById("usercountry"),
  current__temp = document.getElementById("usertemp"),
  localTime = new Date();

setInterval(() => {
  localTime = new Date();
  let curHr = localTime.getHours();
  let curMin = localTime.getMinutes()
  let minused = curHr - 12
  if (localTime.getHours() < 10) {
    curHr = "0" + curHr
  }
  if (localTime.getMinutes() < 10) {
    curHr = "0" + curMin
  } 
  currentTime.innerText = curHr + ":" + curMin;
  if (curHr > 12) {
    currentTime.innerText =
      minused + ":" + curMin + " PM";
    if (minused < 10) {
      currentTime.innerText =
        "0" + minused + ":" + curMin + " PM";
    }
  } else if (curHr < 12) {
    curHr + ":" + curMin + " AM";
  }




  currentDate.innerText = `${
    dayArr[localTime.getDay()]
  }, ${localTime.getDate()} ${monArr[localTime.getMonth()]}`;
}, 1000);

document.addEventListener("DOMContentLoaded", (e) => {
  // loadupWeather("ikeja")
  // getUserLocation();
  // function getUserLocation(){
  //   if(navigator.geolocation){
  //     navigator.geolocation.getCurrentPosition(userLocation)
  //   }else{
  //     alert("Please enable your Location service")
  //   }
  // }
  // function userLocation(position){
  //   let Loc = `${position.coords.longitude},${position.coords.longitude}`
  //   loadupWeather(Loc)
  // }
});

document.getElementById("userloc").addEventListener("click", (e) => {
  getUserLocation();

  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(userLocation);
    } else {
      alert("Please enable your Location service");
    }
  }

  function userLocation(position) {
    let Loc = `${position.coords.longitude},${position.coords.longitude}`;
    loadupWeather(Loc);

    const apiiUrl = "https://api.weatherapi.com/v1/forecast.json?q=";
    const apiiKey = "3b8b8609054e425bbdc33941220106";
    let newReq = new XMLHttpRequest();
    newReq.open("GET", `${apiiUrl}${Loc}&key=${apiiKey}`, false);
    newReq.onload = function () {
      if (newReq.status === 200) {
        let extRes = JSON.parse(this.responseText);
        current__temp.innerHTML = extRes.current.temp_c;
        current__city.innerHTML = extRes.location.name;
        current__country.innerHTML = extRes.location.country;
      }
    };
    newReq.send();
  }
});

function citiesTimeCollector(city, ID, indicator) {
  const apiUrll = "https://api.weatherapi.com/v1/forecast.json?q=";
  const apiKeyy = "3b8b8609054e425bbdc33941220106";
  let timereq = new XMLHttpRequest();
  timereq.open("GET", `${apiUrll}${city}&key=${apiKeyy}`, false);

  timereq.onload = function () {
    if (timereq.status === 200) {
      let timeCollect = JSON.parse(this.responseText);
      let cityTIme = timeCollect.location.localtime;
      let curDate = new Date(`${cityTIme.replace(/-/g, '/')}`)
      let cityHr = curDate.getHours();
      let cityMin = curDate.getMinutes();
      let isInDay = timeCollect.current.is_day;

      if (cityHr < 10) {
        cityHr = "0" + cityHr;
      }
      if (cityMin < 10) {
        cityMin = "0" + cityMin;
      }

      document.getElementById(ID).innerHTML = cityHr + ":" + cityMin;

      if (isInDay === 1) {
        document.getElementById(indicator).src = `./IMAGES/day2.png`;
      } else if (isInDay == 0) {
        document.getElementById(indicator).src = `./IMAGES/night2.png`;
      }
    }
  };
  timereq.send();
  setInterval(() => {
    timereq.send();
  }, 300000);
}

citiesTimeCollector("Amsterdam", "amsterdam", "a-indicator");
citiesTimeCollector("London", "london", "l-indicator");
citiesTimeCollector("Budapest", "budapest", "b-indicator");
citiesTimeCollector("Paris", "paris", "p-indicator");
citiesTimeCollector("Chicago", "chicago", "c-indicator");

let dayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let dayArr2 = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let monArr = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let w_desc = document.getElementById(""),
  t_temp = document.getElementById("today-temp"),
  f_like = document.getElementById("feels-like"),
  w_hum = document.getElementById("humidity"),
  d_point = document.getElementById("dew-point"),
  w_pressure = document.getElementById("pressure"),
  s_rise = document.getElementById("sunrise"),
  s_set = document.getElementById("sunset"),
  w_wind = document.getElementById("wind"),
  w_wdegree = document.getElementById("wind-degree"),
  w_wdirection = document.getElementById("wind-direction"),
  w_visibility = document.getElementById("visibility"),
  w_visi_miles = document.getElementById("v-miles"),
  w_uv = document.getElementById("uv"),
  w_city = document.getElementById("city"),
  w_country = document.getElementById("country"),
  w_time = document.getElementById("local-time"),
  w_rain = document.getElementById("rainfall"),
  w_date = document.getElementById("date"),
  c_meridian = document.getElementById("meridian"),
  w_snow = document.getElementById("snow"),
  w_esnow = document.getElementById("snow-expected"),
  w_moonrise = document.getElementById("moonrise"),
  w_moonset = document.getElementById("moonset"),
  w_gust = document.getElementById("gust"),
  w_gustinmiles = document.getElementById("gim"),
  w_precipitation = document.getElementById("precipitation"),
  w_hour_temp = document.querySelectorAll("#hour-temp"),
  w_desc2 = document.getElementById("tit"),
  w_t2 = document.getElementById("ft"),
  other_time = document.querySelectorAll("otime"),
  sun = document.querySelectorAll("sun"),
  w_max_temp = document.querySelectorAll("#max-temp");

let loader = document.getElementById("loader");
loader.innerText = "Loading data..";
loader.style.opacity = "0";
loader.style.backgroundColor = "#18214b";
loader.style.display = "none";

//LOCAL TIMING
if (localTime.getHours() < 12) {
  c_meridian.innerText = "AM";
} else {
  c_meridian.innerText = "PM";
}

document.getElementById("GO").addEventListener("click", (e) => {
  let cityInput = document.getElementById("load").value;
  loadupWeather(cityInput);
});

const loadupWeather = (city_selected) => {
  let loader = document.getElementById("loader");
  let boddy = document.getElementsByTagName("body");
  try {
    boddy.style.animation = "fadeout 4s ease-out";
    boddy.style.transition = "all 4s ease-out";
  } catch (error) {
    console.log(error.message);
  }

  let city = city_selected || event.target.value;

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function timeoutHandler() {
    await sleep(1);
    const apiUrl = "https://api.weatherapi.com/v1/forecast.json?q=";
    const apiKey = "3b8b8609054e425bbdc33941220106";

    let req = new XMLHttpRequest();
    req.open("GET", `${apiUrl}${city}&key=${apiKey}`, false);

    req.onload = function () {
      let loader = document.getElementById("loader");
      loader.style.display = "flex";
      loader.style.opacity = "1";
      loader.style.backgroundColor = "#18214b";
      if (req.status == 404) {
        loader.style.display = "flex";
        loader.style.backgroundColor = "#18214b";
        loader.innerText =
          "Sorry, we cannot locate such city. Please check your input.";
      }

      if (req.status === 200) {
        loader.style.display = "flex";
        loader.innerText = "Complete";
        loader.style.backgroundColor = "#4b9a4b";
        setTimeout(() => {
          loader.style.opacity = "0";
          loader.style.transition = "1s ease-out";
        }, 1);
      }

      if (req.status === 200) {
        try {
          boddy.style.animation = "fadein 4s ease-in";
          boddy.style.transition = "all 4s ease-in";
        } catch (error) {
          console.log(error.message);
        }
        // document.getElementById("wff").scrollIntoView(true);
        let result = JSON.parse(this.responseText);
        let current_temp = result.current.temp_c,
          feels_like = result.current.feelslike_c,
          atm_pressure = result.current.pressure_mb,
          humidity = result.current.humidity,
          visibility = result.current.vis_km,
          visibility_m = result.current.vis_miles,
          wind_speed = result.current.wind_mph,
          wind_degree = result.current.wind_degree,
          wind_direction = result.current.wind_dir,
          local_time = result.location.localtime,
          sun_rise = result.forecast.forecastday[0].astro.sunrise,
          sun_set = result.forecast.forecastday[0].astro.sunset,
          moon_rise = result.forecast.forecastday[0].astro.moonrise,
          moon_set = result.forecast.forecastday[0].astro.moonset,
          // cloud = result.weather[0].main,
          city_name = result.location.name,
          country_name = result.location.country,
          desc_cloud = result.current.condition.text,
          rainfall = result.forecast.forecastday[0].day.daily_chance_of_rain,
          snow = result.forecast.forecastday[0].day.daily_chance_of_snow,
          snow_exp = result.forecast.forecastday[0].day.daily_chance_of_snow,
          gust = result.current.gust_kph,
          gustinmiles = result.current.gust_mph,
          precipitation = result.current.precip_mm,
          uv = result.current.uv,
          current_date = new Date(`${result.location.localtime.replace(/-/g, '/')}`),
          meridian = current_date.getHours(),
          isDay = result.current.is_day,
          otherTime = result.current.localtime_epoch;

        if (isDay === 0) {
          change(
            "#060813",
            "#18214b",
            "#ffffffc0",
            "#5d77c7",
            "#17bcb4ba",
            "#17bcb4",
            "#53d1cb",
            "1.5px solid",
            "#17bcb415"
          );
        }

        if (isDay === 1) {
          change("", "", "", "", "", "", "", "", "");
        }

        if (meridian < 12) {
          c_meridian.innerText = "AM";
        } else {
          c_meridian.innerText = "PM";
        }

        w_t2.innerText = Math.round(current_temp);
        w_desc2.innerText = desc_cloud;
        const weatherCondition = [
          "Moderate rain",
          "Sunny",
          "Partly cloudy",
          "Clear sky",
          "Clear",
          "Few clouds",
          "Light rain",
          "Heavy rain",
          "Scattered clouds",
          "Thurnderstorm with rain",
          "Thurnderstorm with heavy rain",
          "Broken clouds",
          "Light rain shower",
          "Patchy rain with thunder",
          "Patchy rain possible",
          "Scattered thunder",
          "Cloudy",
          "Overcast",
          "Light drizzle",
          "Moderate rain at times",
        ];

        const weatherConditionIcons = [
          "./IMAGES/moderate-rain.png",
          "./IMAGES/sunny.png",
          "./IMAGES/partly-cloudy.png",
          "./IMAGES/clear-sky.png",
          "./IMAGES/clear-sky.png",
          "./IMAGES/few-clouds.png",
          "./IMAGES/light-rain.png",
          "./IMAGES/heavy-rain.png",
          "./IMAGES/scattered-clouds.png",
          "./IMAGES/thunderstorm-with-rain.png",
          "./IMAGES/thunderstorm-with-heavy-rain.png",
          "./IMAGES/broken-clouds.png",
          "./IMAGES/light-rain-shower.png",
          "./IMAGES/patchy-rain-with-thunder.png",
          "./IMAGES/light-rain.png",
          "./IMAGES/scattered-thunder.png",
          "./IMAGES/cloudy.png",
          "./IMAGES/overcast-clouds.png",
          "./IMAGES/light-drizzle.png",
          "./IMAGES/moderate-rain.png",
        ];

        try {
          for (let k = 0; k <= 23; k++) {
            let hourlyWeatherCondition = document.querySelectorAll(
              "#hourly-weather-condition"
            );
            let outputer = result.forecast.forecastday[0].hour[k].temp_c;
            w_hour_temp[k].innerText = outputer;
            for (let ikd = 0; ikd <= weatherCondition.length; ikd++) {
              console.log(
                result.forecast.forecastday[0].hour[k].condition.text
              );
              if (
                result.forecast.forecastday[0].hour[k].condition.text !=
                weatherCondition[ikd]
              ) {
                hourlyWeatherCondition[k].src = "./IMAGES/cloudd.png";
              }
            }

            if (
              result.forecast.forecastday[0].hour[k].condition.text ==
              weatherCondition[0]
            ) {
              hourlyWeatherCondition[k].src = weatherConditionIcons[0];
            }
            if (
              result.forecast.forecastday[0].hour[k].condition.text ==
              weatherCondition[1]
            ) {
              hourlyWeatherCondition[k].src = weatherConditionIcons[1];
            }
            if (
              result.forecast.forecastday[0].hour[k].condition.text ==
              weatherCondition[2]
            ) {
              hourlyWeatherCondition[k].src = weatherConditionIcons[2];
            }
            if (
              result.forecast.forecastday[0].hour[k].condition.text ==
              weatherCondition[3]
            ) {
              hourlyWeatherCondition[k].src = weatherConditionIcons[3];
            }
            if (
              result.forecast.forecastday[0].hour[k].condition.text ==
              weatherCondition[4]
            ) {
              hourlyWeatherCondition[k].src = weatherConditionIcons[4];
            }
            if (
              result.forecast.forecastday[0].hour[k].condition.text ==
              weatherCondition[5]
            ) {
              hourlyWeatherCondition[k].src = weatherConditionIcons[5];
            }
            if (
              result.forecast.forecastday[0].hour[k].condition.text ==
              weatherCondition[6]
            ) {
              hourlyWeatherCondition[k].src = weatherConditionIcons[6];
            }
            if (
              result.forecast.forecastday[0].hour[k].condition.text ==
              weatherCondition[7]
            ) {
              hourlyWeatherCondition[k].src = weatherConditionIcons[7];
            }
            if (
              result.forecast.forecastday[0].hour[k].condition.text ==
              weatherCondition[8]
            ) {
              hourlyWeatherCondition[k].src = weatherConditionIcons[8];
            }
            if (
              result.forecast.forecastday[0].hour[k].condition.text ==
              weatherCondition[9]
            ) {
              hourlyWeatherCondition[k].src = weatherConditionIcons[9];
            }
            if (
              result.forecast.forecastday[0].hour[k].condition.text ==
              weatherCondition[10]
            ) {
              hourlyWeatherCondition[k].src = weatherConditionIcons[10];
            }
            if (
              result.forecast.forecastday[0].hour[k].condition.text ==
              weatherCondition[11]
            ) {
              hourlyWeatherCondition[k].src = weatherConditionIcons[11];
            }
            if (
              result.forecast.forecastday[0].hour[k].condition.text ==
              weatherCondition[12]
            ) {
              hourlyWeatherCondition[k].src = weatherConditionIcons[12];
            }
            if (
              result.forecast.forecastday[0].hour[k].condition.text ==
              weatherCondition[13]
            ) {
              hourlyWeatherCondition[k].src = weatherConditionIcons[13];
            }
            if (
              result.forecast.forecastday[0].hour[k].condition.text ==
              weatherCondition[14]
            ) {
              hourlyWeatherCondition[k].src = weatherConditionIcons[14];
            }
            if (
              result.forecast.forecastday[0].hour[k].condition.text ==
              weatherCondition[15]
            ) {
              hourlyWeatherCondition[k].src = weatherConditionIcons[15];
            }
            if (
              result.forecast.forecastday[0].hour[k].condition.text ==
              weatherCondition[16]
            ) {
              hourlyWeatherCondition[k].src = weatherConditionIcons[16];
            }
            if (
              result.forecast.forecastday[0].hour[k].condition.text ==
              weatherCondition[17]
            ) {
              hourlyWeatherCondition[k].src = weatherConditionIcons[17];
            }
            if (
              result.forecast.forecastday[0].hour[k].condition.text ==
              weatherCondition[18]
            ) {
              hourlyWeatherCondition[k].src = weatherConditionIcons[18];
            }
            if (
              result.forecast.forecastday[0].hour[k].condition.text ==
              weatherCondition[19]
            ) {
              hourlyWeatherCondition[k].src = weatherConditionIcons[19];
            }
          }
        } catch (error) {
          console.log(error.message);
        }

        // let hourlyWeatherConditionData = result.forecast.forecastday[0].hour[2].condition.text;

        let weatherIcon = document.getElementById("weather-icon");

        if (desc_cloud == weatherCondition[0]) {
          weatherIcon.src = weatherConditionIcons[0];
        }
        if (desc_cloud == weatherCondition[1]) {
          weatherIcon.src = weatherConditionIcons[1];
        }
        if (desc_cloud == weatherCondition[2]) {
          weatherIcon.src = weatherConditionIcons[2];
        }
        if (desc_cloud == weatherCondition[3]) {
          weatherIcon.src = weatherConditionIcons[3];
        }
        if (desc_cloud == weatherCondition[4]) {
          weatherIcon.src = weatherConditionIcons[4];
        }
        if (desc_cloud == weatherCondition[5]) {
          weatherIcon.src = weatherConditionIcons[5];
        }
        if (desc_cloud == weatherCondition[6]) {
          weatherIcon.src = weatherConditionIcons[6];
        }
        if (desc_cloud == weatherCondition[7]) {
          weatherIcon.src = weatherConditionIcons[7];
        }
        if (desc_cloud == weatherCondition[8]) {
          weatherIcon.src = weatherConditionIcons[8];
        }
        if (desc_cloud == weatherCondition[9]) {
          weatherIcon.src = weatherConditionIcons[9];
        }
        if (desc_cloud == weatherCondition[10]) {
          weatherIcon.src = weatherConditionIcons[10];
        }
        if (desc_cloud == weatherCondition[11]) {
          weatherIcon.src = weatherConditionIcons[11];
        }
        if (desc_cloud == weatherCondition[12]) {
          weatherIcon.src = weatherConditionIcons[12];
        }
        if (desc_cloud == weatherCondition[13]) {
          weatherIcon.src = weatherConditionIcons[13];
        }

        if (desc_cloud == weatherCondition[14]) {
          weatherIcon.src = weatherConditionIcons[14];
        }

        // w_desc.innerText = desc_cloud;
        t_temp.innerText = Math.round(current_temp);
        f_like.innerText = Math.round(feels_like);
        w_hum.innerText = humidity;
        d_point.innerText = humidity - 10;
        w_pressure.innerText = atm_pressure;
        s_rise.innerText = sun_rise.trim().slice(1, 5);
        s_set.innerText = sun_set.trim().slice(1, 5);
        w_snow.innerText = snow;
        w_esnow.innerText = snow_exp;
        w_moonrise.innerText = moon_rise.trim().slice(1, 5);
        w_moonset.innerText = moon_set.trim().slice(1, 5);
        w_gust.innerText = gust;
        w_gustinmiles.innerText = gustinmiles;
        w_precipitation.innerText = precipitation;
        w_wind.innerText = wind_speed;
        w_wdegree.innerText = wind_degree;
        w_wdirection.innerHTML = wind_direction;
        w_visibility.innerText = visibility;
        w_visi_miles.innerText = visibility_m;
        w_city.innerText = city_name;
        w_country.innerText = country_name;

        let currentHr = current_date.getHours();
        let currentMin = current_date.getMinutes();
        if (currentHr < 10) {
          currentHr = "0" + currentHr
        }

        if (currentMin < 10) {
          currentMin = "0" + currentMin
        }
        w_time.innerText = currentHr + ":" + currentMin;
        w_rain.innerText = rainfall;
        w_uv.innerText = uv;
        w_date.innerText =
          dayArr[current_date.getDay()] +
          ", " +
          current_date.getDate() +
          " " +
          monArr[current_date.getMonth()];

        document.getElementById("pointer").scrollIntoView();
        document.getElementById("result-box").style.opacity = "0";
        document.getElementById("preloader").style.display = "none";
        document.getElementById("slide").style.display = "flex";
        setTimeout(() => {
          document.getElementById("result-box").style.display = "none";
        }, 1000);
      }
    };

    req.onerror = function () {
      let loader = document.getElementById("loader");
      if (req.status == 400) {
        loader.style.display = "flex";
        loader.style.opacity = "1";
        loader.style.backgroundColor = "#18214b";
        loader.innerText = "Error occourred, please try again";
      }
    };

    req.send();

    const dayForcast = (city_selected) => {
      const api_Url = "https://api.weatherbit.io/v2.0/forecast/daily?city=";
      const api_Key = "ff7071bcc34042a8a377e3147c070804";
      const xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        `${api_Url}${city}&key=${api_Key}&units=M&days=16`,
        false
      );
      xhr.onload = function () {
        if (xhr.status === 200) {
          let dayOutput = JSON.parse(this.responseText);

          let holdingBox = document.getElementById("day_carrier");
          let wholeOutputBox = " ";
          for (let ck = 0; ck <= 6; ck++) {
            const weatherCondition = [
              "Moderate rain",
              "Sunny",
              "Partly cloudy",
              "Clear Sky",
              "Few clouds",
              "Light rain",
              "Heavy rain",
              "Scattered clouds",
              "Thunderstorm with rain",
              "Thunderstorm with heavy rain",
              "Broken clouds",
              "Light shower rain",
              "Patchy rain with thunder",
              "Scattered thunder",
              "Cloudy",
              "Overcast clouds",
              "Light drizzle",
            ];

            const weatherConditionIcons = [
              "./IMAGES/moderate-rain.png",
              "./IMAGES/sunny.png",
              "./IMAGES/partly-cloudy.png",
              "./IMAGES/clear-sky.png",
              "./IMAGES/few-clouds.png",
              "./IMAGES/light-rain.png",
              "./IMAGES/heavy-rain.png",
              "./IMAGES/scattered-clouds.png",
              "./IMAGES/thunderstorm-with-rain.png",
              "./IMAGES/thunderstorm-with-heavy-rain.png",
              "./IMAGES/broken-clouds.png",
              "./IMAGES/light-rain-shower.png",
              "./IMAGES/patchy-rain-with-thunder.png",
              "./IMAGES/scattered-thunder.png",
              "./IMAGES/cloudy.png",
              "./IMAGES/overcast-clouds.png",
              "./IMAGES/light-drizzle.png",
            ];

            function Icons() {
              if (
                dayOutput.data[ck].weather.description == weatherCondition[0]
              ) {
                return weatherConditionIcons[0];
              }
              if (
                dayOutput.data[ck].weather.description == weatherCondition[1]
              ) {
                return weatherConditionIcons[1];
              }
              if (
                dayOutput.data[ck].weather.description == weatherCondition[2]
              ) {
                return weatherConditionIcons[2];
              }
              if (
                dayOutput.data[ck].weather.description == weatherCondition[3]
              ) {
                return weatherConditionIcons[3];
              }
              if (
                dayOutput.data[ck].weather.description == weatherCondition[4]
              ) {
                return weatherConditionIcons[4];
              }
              if (
                dayOutput.data[ck].weather.description == weatherCondition[5]
              ) {
                return weatherConditionIcons[5];
              }
              if (
                dayOutput.data[ck].weather.description == weatherCondition[6]
              ) {
                return weatherConditionIcons[6];
              }
              if (
                dayOutput.data[ck].weather.description == weatherCondition[7]
              ) {
                return weatherConditionIcons[7];
              }
              if (
                dayOutput.data[ck].weather.description == weatherCondition[8]
              ) {
                return weatherConditionIcons[8];
              }
              if (
                dayOutput.data[ck].weather.description == weatherCondition[9]
              ) {
                return weatherConditionIcons[9];
              }
              if (
                dayOutput.data[ck].weather.description == weatherCondition[10]
              ) {
                return weatherConditionIcons[10];
              }
              if (
                dayOutput.data[ck].weather.description == weatherCondition[11]
              ) {
                return weatherConditionIcons[11];
              }
              if (
                dayOutput.data[ck].weather.description == weatherCondition[12]
              ) {
                return weatherConditionIcons[12];
              }
              if (
                dayOutput.data[ck].weather.description == weatherCondition[13]
              ) {
                return weatherConditionIcons[13];
              }

              if (
                dayOutput.data[ck].weather.description == weatherCondition[14]
              ) {
                return weatherConditionIcons[14];
              }

              if (
                dayOutput.data[ck].weather.description == weatherCondition[15]
              ) {
                return weatherConditionIcons[15];
              }
            }

            wholeOutputBox +=
              ` <div class='df h-forecast' id='day-box'>
          <div class='card-topp'>
          <span id='sm-date' class="chai">${
            dayArr2[new Date(dayOutput.data[ck].valid_date).getDay()]
          }</span>
          <span class='see-all-2' id='see-all-2'><img class="arrow" src="./IMAGES/arrow-down-sign-to-navigate.png" /></span>
          <div class='card-top'>
              <img id='weather-icon2'src =` +
              Icons() +
              ` width='50px'
                  height='50px'>
              <p id='d_weather_desc'>${
                dayOutput.data[ck].weather.description
              }</p>
          </div>
          <p class='day' id='day'><span id='day-2'>${
            new Date(dayOutput.data[ck].valid_date).getDate() +
            " " +
            monArr[new Date(dayOutput.data[ck].valid_date).getMonth()] +
            ", " +
            new Date(dayOutput.data[ck].valid_date).getFullYear()
          }</span></p>
          </div>
          <div class='holder2'>
              <div class='day-info' id='ss'>
                  <div class='range' id='range' >
                      <h1 class='day-name chai' >Sunrise</h1>
                      <img src='./IMAGES/icons8-sunrise-100.png'>
                      <h1 class='rating'><span id='sunrise-2' class="chai">${
                        new Date(dayOutput.data[ck].sunrise_ts).getHours() +
                        ":" +
                        new Date(dayOutput.data[ck].sunrise_ts).getMinutes()
                      }</span><span id='unit2' class="chai"> AM</span></h1>
                  </div>
                  <div class='range' id='range'>
                      <h1 class='day-name chai'>Sunset</h1>
                      <img src='./IMAGES/icons8-sunrise-100.png'>
                      <h1 class='rating'><span id='sunset-2' class="chai">${
                        new Date(dayOutput.data[ck].sunset_ts).getHours() +
                        ":" +
                        new Date(dayOutput.data[ck].sunset_ts).getMinutes()
                      }</span><span id='unit2' class="chai"> PM</span></h1>
                  </div>
                  <div class='range' id='range'>
                      <h1 class='day-name chai' >Moonrise</h1>
                      <img src='./IMAGES/icons8-moonrise-80.png'>
                      <h1 class='rating'><span id='moonrise-2' class="chai">${
                        new Date(dayOutput.data[ck].moonrise_ts).getHours() +
                        ":" +
                        new Date(dayOutput.data[ck].moonrise_ts).getMinutes()
                      }</span><span id='unit2' class="chai"> PM</span></h1>
                  </div>
                  <div class='range' id='range'>
                      <h1 class='day-name chai'>Moonset</h1>
                      <img src='./IMAGES/icons8-moonrise-80.png'>
                      <h1 class='rating'><span id='moonset-2' class="chai">${
                        new Date(dayOutput.data[ck].moonset_ts).getHours() +
                        ":" +
                        new Date(dayOutput.data[ck].moonset_ts).getMinutes()
                      }</span><span id='unit2' class="chai"> AM</span></h1>
                  </div>
                  <div class='range' id='range'>
                      <h1 class='day-name chai'>Temperature</h1>
                      <img src='./IMAGES/icons8-sunrise-100.png' id="rimg">
                      <h1 class='rating'><span id='min-temp-2' class="chai">${
                        dayOutput.data[ck].min_temp
                      }</span> - <span
                              id='max-temp-2' class="chai">${
                                dayOutput.data[ck].max_temp
                              }</span><sup class="chai"> o</sup><span id='unit2' class="chai">C</span></h1>
                  </div>
                  <div class='range' id='range'>
                      <h1 class='day-name chai'>Wind</h1>
                      <img src='./IMAGES/icons8-wind-98.png' id="rimg">
                      <h1 class='rating'><span id='wind-2' class="chai">${
                        dayOutput.data[ck].wind_cdir
                      }</span><sup> o</sup><span
                              id='unit2' class="chai">${
                                dayOutput.data[ck].wind_dir
                              }</span></h1>
                  </div>
                  <div class='range' id='range'>
                      <h1 class='day-name chai'>Wind Gust</h1>
                      <img src='./IMAGES/icons8-wind-60(1).png' id="rimg">
                      <h1 class='rating'><span id='wind-2' class="chai">${
                        dayOutput.data[ck].wind_gust_spd
                      }</span><span id='unit2' class="chai"> mph</span></h1>
                  </div>
                  <div class='range' id='range'>
                      <h1 class='day-name chai'>Humidity</h1>
                      <img src='./IMAGES/icons8-humidity-96.png' id="rimg">
                      <h1 class='rating'><span id='humidity-2' class="chai">${
                        dayOutput.data[ck].rh
                      }</span><span id='unit2' class="chai"> %</span></h1>
                  </div>
                  <div class='range' id='range'>
                      <h1 class='day-name chai'>Precipitation</h1>
                      <img src='./IMAGES/icons8-rain-gauge-100.png' id="rimg">
                      <h1 class='rating'><span id='precipitation-2' class="chai">${Math.ceil(
                        dayOutput.data[ck].precip
                      )} </span><span id='unit2' class="chai"> mm</span>
                      </h1>
                  </div>

                  <div class='range' id='range'>
                      <h1 class='day-name chai'>Rainfall</h1>
                      <img src='./IMAGES/icons8-rain-80.png' id="rimg">
                      <h1 class='rating'><span id='rainfall-2' class="chai">${
                        dayOutput.data[ck].pop
                      }</span><span id='unit2' class="chai"> %</span></h1>
                  </div>
                  <div class='range' id='range'>
                      <h1 class='day-name chai'>Pressure</h1>
                      <img src='./IMAGES/icons8-atmospheric-pressure-100.png' id="rimg">
                      <h1 class='rating'><span id='pressure-2' class="chai">${
                        dayOutput.data[ck].pres
                      }</span><span id='unit2' class="chai"> hPa</span>
                      </h1>
                  </div>
                  <div class='range' id='range'>
                      <h1 class='day-name chai'>Visibility</h1>
                      <img src='./IMAGES/icons8-eye-99.png' id="rimg">
                      <h1 class='rating'><span id='visibility-2' class="chai">${Math.round(
                        dayOutput.data[ck].vis
                      )}</span><span id='unit2' class="chai"> km</span>
                      </h1>
                  </div>
                  <div class='range' id='range'>
                      <h1 class='day-name chai'>Snow Depth</h1>
                      <img src='./IMAGES/icons8-snow-80.png' id="rimg">
                      <h1 class='rating'><span id='show-depth-2' class="chai">${
                        dayOutput.data[ck].snow_depth
                      }</span><span id='unit2' class="chai"> cm</span>
                      </h1>
                  </div>
                  <div class='range' id='range'>
                      <h1 class='day-name chai'>Snow Chances</h1>
                      <img src='./IMAGES/icons8-snow-80.png' id="rimg">
                      <h1 class='rating'><span id='show-chances-2' class="chai">${
                        dayOutput.data[ck].snow
                      }</span><span id='unit2' class="chai"> %</span>
                      </h1>
                  </div>
                  <div class='range' id='range'>
                      <h1 class='day-name chai'>UV</h1>
                      <img src='./IMAGES/icons8-uv-index-64.png' id="rimg">
                      <h1 class='rating'><span id='uv-2' class="chai">${
                        dayOutput.data[ck].uv
                      }</span><span id='unit2' class="chai"> mW/cm2</span></h1>
                  </div>
                  <div class='range' id='range'>
                      <h1 class='day-name chai'>Dew Point</h1>
                      <img src='./IMAGES/icons8-sunrise-100.png' id="rimg">
                      <h1 class='rating'><span id='dew-point-2' class="chai">${
                        dayOutput.data[ck].dewpt
                      }</span><span id='unit2' class="chai"> o</span></h1>
                  </div>
                  <div class='range' id='range'>
                      <h1 class='day-name inv chai'>r</h1>

                  </div>
              </div>
          </div>
      </div>`;
          }
          try {
            switcher();
          } catch (error) {
            console.log(error.message);
          }

          function switcher() {
            const apiUrl = "https://api.weatherapi.com/v1/forecast.json?q=";
            const apiKey = "3b8b8609054e425bbdc33941220106";

            let reqq = new XMLHttpRequest();
            reqq.open("GET", `${apiUrl}${city}&key=${apiKey}`, false);

            reqq.onload = function () {
              if (reqq.status === 200) {
                let resultt = JSON.parse(this.responseText);
                let isDay = resultt.current.is_day;

                holdingBox.innerHTML = wholeOutputBox;
                if (isDay === 1) {
                  let toWhite = document.querySelectorAll(".chai");
                  let ww_desc = document.querySelectorAll("#d_weather_desc");
                  let day__2 = document.querySelectorAll("#day-2");
                  let smday2 = document.querySelectorAll("#sm-date");
                  try {
                    for (let toW = 0; toW <= toWhite.length; toW++) {
                      toWhite[toW].className += " chaiii2";
                    }
                  } catch (error) {
                    console.log(error.message);
                  }
                  try {
                    for (let kkl = 0; kkl <= ww_desc.length; kkl++) {
                      ww_desc[kkl].style.color = "";
                    }
                  } catch (error) {
                    console.log(error.message);
                  }

                  try {
                    for (let kkkl = 0; kkkl <= day__2.length; kkkl++) {
                      ww_desc[kkkl].style.color = "";
                    }
                  } catch (error) {
                    console.log(error.message);
                  }

                  try {
                    for (let kklkl = 0; kklkl <= smday2.length; kklkl++) {
                      smday2[kklkl].style.backgroundColor = "";
                    }
                  } catch (error) {
                    console.log(error.message);
                  }
                }

                if (isDay === 0) {
                  let toWhite = document.querySelectorAll(".chai");
                  let ww_desc = document.querySelectorAll("#d_weather_desc");
                  let day__2 = document.querySelectorAll("#day-2");
                  let smday2 = document.querySelectorAll("#sm-date");
                  try {
                    for (let toW = 0; toW <= toWhite.length; toW++) {
                      toWhite[toW].className += " chaii";
                    }
                  } catch (error) {
                    console.log(error.message);
                  }
                  try {
                    for (let kkl = 0; kkl <= ww_desc.length; kkl++) {
                      ww_desc[kkl].style.color = "#5d77c7";
                    }
                  } catch (error) {
                    console.log(error.message);
                  }

                  try {
                    for (let kkkl = 0; kkkl <= day__2.length; kkkl++) {
                      day__2[kkkl].style.color = "#53d1cb";
                    }
                  } catch (error) {
                    console.log(error.message);
                  }

                  try {
                    for (let kklkl = 0; kklkl <= smday2.length; kklkl++) {
                      smday2[kklkl].style.color = "#ffffffc0";
                    }
                  } catch (error) {
                    console.log(error.message);
                  }
                }
              }
            };

            reqq.send();
          }
        }
      };
      xhr.send();
    };

    dayForcast();
  }

  setTimeout(timeoutHandler, 1);
};

//Loads up weather when the Enter key is pressed
document.getElementById("load").addEventListener("keydown", (e) => {
  if (event.key === "Enter") {
    let loader2 = document.getElementById("loader");
    loader2.style.display = "flex";
    loader2.innerText = "Loading data..";
    loader2.style.opacity = "1";
    loader2.style.backgroundColor = "#18214b";
    loadupWeather();
  }
});

//SEE ALL - SEE LESS BUTTON
let moreee = document.getElementById("more");
let line = document.querySelectorAll("#hr");
for (let i = 0; i <= line.length; i++) {
  line[1].style.display = "flex";
}
moreee.style.display = "flex";
document.getElementById("holder").style.overflow = "hidden";
document.getElementById("arrow").style.transform = "rotate(180deg)";
document.getElementById("see-all").addEventListener("click", (e) => {
  let arrow = document.getElementById("arrow");
  let holder = document.getElementById("holder");
  if (holder.style.overflow == "hidden") {
    holder.style.overflow = "scroll";
  } else {
    holder.style.overflow = "hidden";
  }
  holder.style.height = "10%";
  holder.style.opacity = ".4";
  holder.style.transition = ".2s ease-out";
  setTimeout(() => {
    holder.style.height = "100%";
    holder.style.opacity = "1";
    holder.style.transition = ".2s ease-out";
  }, 300);

  if (moreee.style.display == "none") {
    for (let i in line) {
      line[1].style.display = "block";
      document.getElementById("more").style.display = "flex";
      e.target.innerText = "See less";
      arrow.style.transform = "rotate(180deg)";
    }
  } else {
    moreee.style.display = "none";
    line[1].style.display = "none";
    e.target.innerText = "See all";
    arrow.style.transform = "rotate(-360deg)";
  }
});

const cityImg = () => {
  let cityArr = [
    "./IMAGES/amsterdam.jpg",
    "./IMAGES/london.jpg",
    "./IMAGES/budapest.jpg",
    "./IMAGES/paris.jpg",
    "./IMAGES/chicago.jpg",
  ];
  let city_images = document.querySelectorAll(".imgs");
  try {
    for (let j = 0; j <= 4; j++) {
      city_images[j].style.backgroundImage = `url(${cityArr[j]})`;
    }
  } catch (error) {
    console.log(error.message);
  }
};
cityImg();

document.getElementById("result-box").style.opacity = "0";
document.getElementById("load").addEventListener("focusout", (e) => {
  let ress_node = document.getElementById("result-box");

  setTimeout(() => {
    ress_node.style.opacity = "0";
  }, 1);
  setTimeout(() => {
    ress_node.style.display = "none";
  }, 100);
});

document.getElementById("load").addEventListener("input", (e) => {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function timeoutHandler() {
    await sleep(1);
    let eValue = e.target.value;
    let cityApiUrl = `http://api.geonames.org/searchJSON?q=${eValue}&maxRows=15&username=jb1104`;
    let searchRequest = new XMLHttpRequest();
    searchRequest.open("GET", cityApiUrl, false);
    searchRequest.onload = function () {
      if (searchRequest.status === 200) {
        let result = JSON.parse(this.responseText);
        let ress_node2 = document.getElementById("resul");
        let resultB = document.getElementById("result-box");
        let sr = document.querySelectorAll("#search-result");

        let cityOutput = " ";

        for (let me = 0; me <= 4; me++) {
          document.getElementById("result-box").style.display = "block";
          document.getElementById("result-box").style.opacity = "1";
          try {
            cityOutput += `<li id='search-result'>
                    <h1 id='cityy'>${result.geonames[me].name}</h1>
                    <p id='state-and-country'>${result.geonames[me].adminName1}, ${result.geonames[me].countryCode}</p>
                </li>`;
          } catch (error) {
            console.log(error.message);
          }
        }
        ress_node2.innerHTML = cityOutput;
        document.getElementById("resul").addEventListener("click", (event) => {
          event.target.matches("#search-result");
          if (
            event.target.matches("#state-and-country") ||
            event.target.matches("#cityy")
          ) {
            let ll = document.getElementById("loader");
            ll.style.display = "flex";
            ll.innerText = "Loading data..";
            ll.style.opacity = "1";
            ll.style.backgroundColor = "#18214b";
            loadupWeather(event.target.innerText);
          }
        });
      }
    };
    searchRequest.send();
  }

  setTimeout(timeoutHandler, 1000);
});

//Side menu animations
let sideBar = document.getElementById("side-bar");
let dash_board = document.getElementById("dashboard");
let menu_details = document.querySelectorAll("#menu-info");
let current_time = document.getElementById("current");
let big_logo = document.getElementById("big-logo");
let small_logo = document.getElementById("short-logo");
let menu = document.getElementById("menn");
let menu2 = document.getElementById("sidebar");

if (window.innerWidth <= 1199 && window.innerWidth > 960) {
  document.getElementById("side-bar").style.width = "6%";
  document.getElementById("dashboard").style.width = "94%";
  menu.style.display = "flex";
  menu.style.left = "6%";
  sideBar.style.boxShadow = "0px 0px 0px 0px rgba(3, 5, 19, 0.317)";
}

if (window.innerWidth <= 960 && window.innerWidth > 631) {
  document.getElementById("side-bar").style.width = "0%";
  document.getElementById("dashboard").style.width = "100%";
  big_logo.style.display = "none";
  small_logo.style.display = "none";
  menu2.style.display = "none";
}

if (window.innerWidth > 475 && window.innerWidth <= 631) {
  document.getElementById("side-bar").style.width = "30%";
  document.getElementById("dashboard").style.width = "100%";
  big_logo.style.display = "none";
  small_logo.style.display = "none";
  menu2.style.display = "none";
  sideBar.style.width = "0%";
  menu.style.left = "0%";
  sideBar.style.boxShadow = "0px 0px 0px 0px rgba(3, 5, 19, 0.317)";
}

if (window.innerWidth <= 475) {
  document.getElementById("side-bar").style.width = "0%";
  document.getElementById("dashboard").style.width = "100%";
  big_logo.style.display = "none";
  small_logo.style.display = "none";
  menu2.style.display = "none";
  sideBar.style.width = "0%";
  menu.style.left = "0%";
  sideBar.style.boxShadow = "0px 0px 0px 0px rgba(3, 5, 19, 0.317)";
}

window.addEventListener("resize", (e) => {
  if (window.innerWidth <= 1199 && window.innerWidth > 960) {
    document.getElementById("side-bar").style.width = "6%";
    document.getElementById("dashboard").style.width = "94%";
    big_logo.style.display = "none";
    small_logo.style.display = "block";
    menu2.style.display = "flex";
    menu.style.display = "flex";
    menu.style.left = "6%";
    sideBar.style.boxShadow = "0px 0px 0px 0px rgba(3, 5, 19, 0.317)";
  }

  if (window.innerWidth > 1199) {
    document.getElementById("side-bar").style.width = "15%";
    document.getElementById("dashboard").style.width = "85%";
    big_logo.style.display = "block";
    small_logo.style.display = "none";
    menu2.style.display = "flex";
    sideBar.style.boxShadow = "0px 0px 0px 0px rgba(3, 5, 19, 0.317)";
  }

  if (window.innerWidth <= 960) {
    document.getElementById("side-bar").style.width = "0%";
    document.getElementById("dashboard").style.width = "100%";
    big_logo.style.display = "none";
    small_logo.style.display = "none";
    menu2.style.display = "none";
    sideBar.style.boxShadow = "0px 0px 0px 0px rgba(3, 5, 19, 0.317)";
  }

  if (window.innerWidth > 475 && window.innerWidth <= 631) {
    document.getElementById("side-bar").style.width = "30%";
    document.getElementById("dashboard").style.width = "100%";
    big_logo.style.display = "none";
    small_logo.style.display = "none";
    menu2.style.display = "none";
    sideBar.style.width = "0%";
    menu.style.left = "0%";
    sideBar.style.boxShadow = "0px 0px 0px 0px rgba(3, 5, 19, 0.317)";
  }

  if (window.innerWidth <= 475) {
    document.getElementById("side-bar").style.width = "0%";
    document.getElementById("dashboard").style.width = "100%";
    big_logo.style.display = "none";
    small_logo.style.display = "none";
    menu2.style.display = "none";
    sideBar.style.boxShadow = "0px 0px 0px 0px rgba(3, 5, 19, 0.317)";
  }
});

document.getElementById("menn").addEventListener("click", (e) => {
  if (
    sideBar.style.width === "6%" &&
    window.innerWidth <= 1199 &&
    window.innerWidth > 960
  ) {
    sideBar.style.width = "20%";
    sideBar.style.display = "block";
    dash_board.style.width = "94%";
    event.target.style.left = "20%";
    big_logo.style.display = "block";
    small_logo.style.display = "none";
    sideBar.style.boxShadow = "0px 0px 0px 1000px rgba(3, 5, 19, 0.317)";
    event.target.style.width = "30px";
    setTimeout(() => {
      current_time.style.display = "block";
    }, 100);

    sideBar.style.transition = ".2s ease-out";
    dash_board.style.transition = ".2s ease-out";
    event.target.style.transition = ".2s ease-out";
    try {
      for (let mn in menu_details) {
        menu_details[mn].style.display = "block";
      }
    } catch (error) {
      console.log(error.message);
    }
  } else if (
    sideBar.style.width === "20%" &&
    window.innerWidth <= 1199 &&
    window.innerWidth > 960
  ) {
    sideBar.style.width = "6%";
    sideBar.style.display = "block";
    dash_board.style.width = "94%";
    event.target.style.left = "6%";
    big_logo.style.display = "none";
    small_logo.style.display = "block";
    current_time.style.display = "none";
    sideBar.style.boxShadow = "0px 0px 0px 0px rgba(3, 5, 19, 0.317)";
    try {
      for (let mn in menu_details) {
        menu_details[mn].style.display = "none";
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  if (
    window.innerWidth > 631 &&
    window.innerWidth <= 960 &&
    sideBar.style.width === "0%"
  ) {
    sideBar.style.width = "30%";
    sideBar.style.boxShadow = "0px 0px 0px 1000px rgba(3, 5, 19, 0.317)";
    sideBar.style.display = "block";
    dash_board.style.width = "100%";
    event.target.style.left = "100%";
    big_logo.style.display = "block";
    small_logo.style.display = "none";
    menu2.style.display = "flex";
    setTimeout(() => {
      current_time.style.display = "block";
    }, 200);

    sideBar.style.transition = ".2s ease-out";
    dash_board.style.transition = ".2s ease-out";
    event.target.style.transition = ".2s ease-out";
    try {
      for (let mn in menu_details) {
        menu_details[mn].style.display = "block";
      }
    } catch (error) {
      console.log(error.message);
    }
  } else if (
    window.innerWidth > 631 &&
    window.innerWidth <= 960 &&
    sideBar.style.width === "30%"
  ) {
    sideBar.style.width = "0%";
    sideBar.style.display = "block";
    dash_board.style.width = "100%";
    event.target.style.left = "0%";
    big_logo.style.display = "none";
    sideBar.style.boxShadow = "0px 0px 0px 0px rgba(3, 5, 19, 0.317)";
    small_logo.style.display = "none";
    current_time.style.display = "none";
    menu2.style.display = "none";
    try {
      for (let mn in menu_details) {
        menu_details[mn].style.display = "none";
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  if (
    window.innerWidth > 475 &&
    window.innerWidth <= 631 &&
    sideBar.style.width === "0%"
  ) {
    sideBar.style.width = "40%";
    sideBar.style.boxShadow = "0px 0px 0px 1000px rgba(3, 5, 19, 0.317)";
    sideBar.style.display = "flex";
    dash_board.style.width = "100%";
    event.target.style.left = "40%";
    big_logo.style.display = "block";
    small_logo.style.display = "none";
    menu2.style.display = "flex";
    setTimeout(() => {
      current_time.style.display = "block";
    }, 200);

    sideBar.style.transition = ".2s ease-out";
    dash_board.style.transition = ".2s ease-out";
    event.target.style.transition = ".2s ease-out";
    try {
      for (let mn in menu_details) {
        menu_details[mn].style.display = "block";
      }
    } catch (error) {
      console.log(error.message);
    }
  } else if (
    window.innerWidth > 475 &&
    window.innerWidth <= 631 &&
    sideBar.style.width === "40%"
  ) {
    sideBar.style.width = "0%";
    sideBar.style.display = "block";
    dash_board.style.width = "100%";
    sideBar.style.boxShadow = "0px 0px 0px 0px rgba(3, 5, 19, 0.317)";
    event.target.style.left = "0%";
    big_logo.style.display = "none";
    small_logo.style.display = "none";
    current_time.style.display = "none";
    menu2.style.display = "none";
    try {
      for (let mn in menu_details) {
        menu_details[mn].style.display = "none";
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  if (window.innerWidth <= 475 && sideBar.style.width === "0%") {
    sideBar.style.width = "80%";
    sideBar.style.boxShadow = "0px 0px 0px 1000px rgba(3, 5, 19, 0.317)";
    sideBar.style.display = "flex";
    dash_board.style.width = "100%";
    event.target.style.left = "80%";
    big_logo.style.display = "block";
    small_logo.style.display = "none";
    menu2.style.display = "flex";
    setTimeout(() => {
      current_time.style.display = "block";
    }, 200);

    sideBar.style.transition = ".2s ease-out";
    dash_board.style.transition = ".2s ease-out";
    event.target.style.transition = ".2s ease-out";
    try {
      for (let mn in menu_details) {
        menu_details[mn].style.display = "block";
      }
    } catch (error) {
      console.log(error.message);
    }
  } else if (window.innerWidth <= 475 && sideBar.style.width === "80%") {
    sideBar.style.width = "0%";
    sideBar.style.boxShadow = "0px 0px 0px 0px rgba(3, 5, 19, 0.317)";
    sideBar.style.display = "block";
    dash_board.style.width = "100%";
    event.target.style.left = "0%";
    big_logo.style.display = "none";
    small_logo.style.display = "none";
    current_time.style.display = "none";
    menu2.style.display = "none";
    try {
      for (let mn in menu_details) {
        menu_details[mn].style.display = "none";
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  if (window.innerWidth > 1199 && sideBar.style.width === "6%") {
    sideBar.style.width = "20%";
    sideBar.style.boxShadow = "0px 0px 0px 1000px rgba(3, 5, 19, 0.317)";
    dash_board.style.width = "80%";
    big_logo.style.display = "block";
    small_logo.style.display = "none";
    event.target.style.left = "15%";
    sideBar.style.display = "block";
    try {
      for (let mn in menu_details) {
        menu_details[mn].style.display = "block";
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  window.addEventListener("resize", (e) => {
    if (window.innerWidth > 1199 && sideBar.style.width === "6%") {
      sideBar.style.width = "20%";
      sideBar.style.boxShadow = "0px 0px 0px 1000px rgba(3, 5, 19, 0.317)";
      sideBar.style.display = "block";
      dash_board.style.width = "80%";
      big_logo.style.display = "block";
      small_logo.style.display = "none";
      current_time.style.display = "flex";

      try {
        for (let mn in menu_details) {
          menu_details[mn].style.display = "block";
        }
      } catch (error) {
        console.log(error.message);
      }
    } else if (
      window.innerWidth > 960 &&
      window.innerWidth <= 1199 &&
      sideBar.style.width === "20%"
    ) {
      sideBar.style.width = "6%";
      sideBar.style.boxShadow = "0px 0px 0px 0px rgba(3, 5, 19, 0.317)";
      dash_board.style.width = "94%";
      big_logo.style.display = "none";
      small_logo.style.display = "block";
      current_time.style.display = "none";
      sideBar.style.display = "block";
      try {
        for (let mn in menu_details) {
          menu_details[mn].style.display = "none";
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    if (
      window.innerWidth > 631 &&
      window.innerWidth <= 960 &&
      sideBar.style.width === "0%"
    ) {
      sideBar.style.width = "0%";
      sideBar.style.boxShadow = "0px 0px 0px 0px rgba(3, 5, 19, 0.317)";
      sideBar.style.display = "block";
      dash_board.style.width = "100%";
      event.target.style.left = "100%";
      big_logo.style.display = "block";
      small_logo.style.display = "none";
      menu2.style.display = "flex";
      setTimeout(() => {
        current_time.style.display = "block";
      }, 200);

      sideBar.style.transition = ".2s ease-out";
      dash_board.style.transition = ".2s ease-out";
      event.target.style.transition = ".2s ease-out";
      try {
        for (let mn in menu_details) {
          menu_details[mn].style.display = "block";
        }
      } catch (error) {
        console.log(error.message);
      }
    } else if (
      window.innerWidth > 631 &&
      window.innerWidth <= 960 &&
      sideBar.style.width === "30%"
    ) {
      sideBar.style.width = "0%";
      sideBar.style.boxShadow = "0px 0px 0px 0px rgba(3, 5, 19, 0.317)";
      sideBar.style.display = "block";
      dash_board.style.width = "100%";
      event.target.style.left = "0%";
      big_logo.style.display = "none";
      small_logo.style.display = "none";
      current_time.style.display = "none";
      menu2.style.display = "none";
      try {
        for (let mn in menu_details) {
          menu_details[mn].style.display = "none";
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    if (window.innerWidth > 960 && window.innerWidth <= 1199) {
      sideBar.style.width = "6%";
      sideBar.style.boxShadow = "0px 0px 0px 0px rgba(3, 5, 19, 0.317)";
      dash_board.style.width = "94%";
      small_logo.style.display = "block";
      big_logo.style.display = "none";
      current_time.style.display = "none";
      menu2.style.display = "flex";
      try {
        for (let mn in menu_details) {
          menu_details[mn].style.display = "none";
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    if (
      window.innerWidth > 475 &&
      window.innerWidth <= 631 &&
      sideBar.style.width === "40%"
    ) {
      sideBar.style.width = "0%";
      sideBar.style.boxShadow = "0px 0px 0px 0px rgba(3, 5, 19, 0.317)";
      sideBar.style.display = "block";
      dash_board.style.width = "100%";
      event.target.style.left = "0%";
      big_logo.style.display = "none";
      small_logo.style.display = "none";
      current_time.style.display = "none";
      menu2.style.display = "none";
      try {
        for (let mn in menu_details) {
          menu_details[mn].style.display = "none";
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    if (window.innerWidth <= 475) {
      sideBar.style.width = "0%";
      sideBar.style.boxShadow = "0px 0px 0px 0px rgba(3, 5, 19, 0.317)";
      sideBar.style.display = "block";
      dash_board.style.width = "100%";
      document.getElementById("menn").style.left = "0%";
      big_logo.style.display = "none";
      small_logo.style.display = "none";
      current_time.style.display = "none";
      menu2.style.display = "none";
      try {
        for (let mn in menu_details) {
          menu_details[mn].style.display = "none";
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    if (window.innerWidth > 1199) {
      sideBar.style.width = "15%";
      sideBar.style.boxShadow = "0px 0px 0px 0px rgba(3, 5, 19, 0.317)";
      dash_board.style.width = "85%";
      small_logo.style.display = "none";
      big_logo.style.display = "block";
      setTimeout(() => {
        current_time.style.display = "flex";
      }, 100);
      try {
        for (let mn in menu_details) {
          menu_details[mn].style.display = "block";
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    if (sideBar.style.width === "0%") {
      small_logo.style.display = "none";
    }
  });
});

function change(
  body_bg,
  sddark,
  white,
  lightdblue,
  lightgreen,
  boldergreen,
  dlightblue,
  bordering,
  deepgreen
) {
  let body = document.getElementById("body");
  let weatherlk = document.querySelectorAll(".weather-look"),
    today_temp_ = document.querySelectorAll(".today-temp"),
    meridian_ = document.querySelectorAll(".meridian"),
    meridian3_ = document.querySelectorAll(".otime"),
    meridian2_ = document.querySelectorAll(".m2"),
    lci = document.getElementById("load"),
    lcpp = document.querySelector(".lcp"),
    top = document.querySelector(".topper"),
    unit_ = document.querySelectorAll("#unit"),
    unit2_ = document.querySelectorAll("#unit2"),
    card_top = document.querySelectorAll(".card-top p"),
    day_span = document.querySelectorAll(".day span"),
    h_forecast = document.querySelectorAll(".h-forecast h1"),
    time_icons = document.querySelectorAll(".time-and-icons"),
    range = document.querySelectorAll(".range h1"),
    f_city = document.querySelectorAll(".fcity"),
    userpro = document.querySelector(".right"),
    userpro2 = document.querySelector(".aright"),
    city__name = document.querySelectorAll(".city-name"),
    asteric = document.getElementsByTagName("*"),
    chai = document.querySelectorAll(".chai"),
    seeall = document.querySelector(".see-all"),
    GOO = document.getElementById("GO"),
    feels_like = document.querySelectorAll(".feels-like");
  body.style.backgroundColor = body_bg;
  body.style.animation = "fadein .4s ease-in";
  body.style.transition = "all .4s ease-in";

  lcpp.style.borderColor = lightgreen;
  lci.style.color = white;

  GOO.style.backgroundColor = sddark;
  GOO.style.color = boldergreen;
  lcpp.style.backgroundColor = boldergreen;
  top.style.backgroundColor = boldergreen;
  userpro.style.backgroundColor = boldergreen;
  userpro.style.border = bordering + lightgreen;
  userpro2.style.backgroundColor = lightgreen;
  userpro2.style.border = bordering + boldergreen;
  seeall.style.backgroundColor = lightgreen;
  document.getElementById("weather-scroll").style.backgroundColor = deepgreen;

  try {
    for (let jkk = 0; jkk <= 50; jkk++) {
      weatherlk[jkk].style.color = dlightblue;
    }
  } catch (error) {
    console.log(error.message);
  }

  try {
    for (let jlkk = 0; jlkk <= unit2_.length; jlkk++) {
      unit2_[jlkk].style.color = white;
    }
  } catch (error) {
    console.log(error.message);
  }

  try {
    for (let jkkd = 0; jkkd <= chai.length; jkkd++) {
      chai[jkkd].style.color = white;
    }
  } catch (error) {
    console.log(error.message);
  }

  // try {
  //   for(let lk = 0; lk <= asteric.length; lk++){
  //     asteric[lk].style.color = "#ffffffc0"
  //   }
  // } catch (error) {
  //     console.log(error.message);
  // }

  try {
    for (let jkp = 0; jkp <= 50; jkp++) {
      time_icons[jkp].style.backgroundColor = lightgreen;
    }
  } catch (error) {
    console.log(error.message);
  }
  try {
    for (let lko = 0; lko <= city__name.length; lko++) {
      city__name[lko].style.color = lightgreen;
    }
  } catch (error) {
    console.log(error.message);
  }

  try {
    for (let oop = 0; oop <= unit_.length; oop++) {
      unit_[oop].style.color = white;
      // asteric[lk].style.color = "#ffffffc0";
    }
  } catch (error) {
    console.log(error.message);
  }

  try {
    for (let op = 0; op <= meridian2_.length; op++) {
      meridian2_[op].style.color = white;
    }
  } catch (error) {
    console.log(error.message);
  }

  try {
    for (let opk = 0; opk <= meridian3_.length; opk++) {
      meridian3_[opk].style.color = white;
    }
  } catch (error) {
    console.log(error.message);
  }

  try {
    for (let mkk = 0; mkk <= 50; mkk++) {
      feels_like[mkk].style.color = lightdblue;
    }

    for (let mko = 0; mko <= meridian_.length; mko++) {
      meridian_[mko].style.color = white;
    }
  } catch (error) {
    console.log(error.message);
  }

  try {
    for (let jku = 0; jku < 10; jku++) {
      card_top[jku].style.color = dlightblue;
      day_span[jku].style.color = white;
    }
  } catch (error) {
    console.log(error.message);
  }
}