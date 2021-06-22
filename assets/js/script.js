const button = document.querySelector('.searchButton');
const inputValue = document.querySelector('.searchbar');
const clearEl = document.getElementById("clear-history");
const dunk = document.querySelector('.dunk');

const desc = document.querySelector('.description');
const desc1El = document.querySelector('.description1');
const desc2El = document.querySelector('.description2');
const desc3El = document.querySelector('.description3');
const desc4El = document.querySelector('.description4');
const desc5El = document.querySelector('.description5');

const temp = document.querySelector('.temp');
const temp1El = document.querySelector('.temp1');
const temp2El = document.querySelector('.temp2');
const temp3El = document.querySelector('.temp3');
const temp4El = document.querySelector('.temp4');
const temp5El = document.querySelector('.temp5');

const icon = document.querySelector('.icon');
const icon1EL = document.querySelector('.icon1');
const icon2EL = document.querySelector('.icon2');
const icon3EL = document.querySelector('.icon3');
const icon4EL = document.querySelector('.icon4');
const icon5EL = document.querySelector('.icon5');

const wind = document.querySelector('.wind');
const uv = document.querySelector('.uv');

const humid = document.querySelector('.humidity');
const humid1El = document.querySelector('.humidity1');
const humid2EL = document.querySelector('.humidity2');
const humid3EL = document.querySelector('.humidity3');
const humid4EL = document.querySelector('.humidity4');
const humid5EL = document.querySelector('.humidity5');

const date = document.querySelector('.date');
const date1El = document.querySelector('.date1');
const date2El = document.querySelector('.date2');
const date3El = document.querySelector('.date3');
const date4El = document.querySelector('.date4');
const date5El = document.querySelector('.date5');

const apiKey = "8ca47ad2ae4bb4d10f14e0851479ed5d";
const dateTime = moment().format("MMMM Do YYYY");
const historyEl = document.getElementById("history");
const searchhistoryEl = document.getElementById("hist");
let searchHistory = [];
searchHistory = JSON.parse(localStorage.getItem("search")) || [];




button.addEventListener("click", function () {
  const searchTerm = inputValue.value;
  getWeather(searchTerm);
  searchHistory.push(searchTerm);
  localStorage.setItem("search", JSON.stringify(searchHistory));
  renderSearchHistory()

})


function dateValue() {
  date.innerHTML = dateTime
}

dateValue();

function getWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const nameValue = data['name'];
      const tempValue = data['main']['temp'];
      const descValue = data['weather'][0]['description'];
      const windValue = data['wind']['speed'];
      const humidValue = data['main']['humidity'];
      const latValue = data['coord']['lat'];
      const lonValue = data['coord']['lon'];
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      const uvUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latValue}&lon=${lonValue}&exclude={current}}&appid=${apiKey}`
      const uvGet = fetch(uvUrl)
        .then(response => response.json())
        .then(uvData => {
          displayUvIndex(uvData)
        });
      //display UvIndex
      const displayUvIndex = function (index) {
        let indexValue = index['current']['uvi'];
        uvGet;

        uv.textContent = `UV Index:${indexValue}`;
        if (indexValue <= 2.9) {
          uv.classList.add("good");
        } else if (indexValue >= 3 && indexValue <= 7.9) {
          uv.classList.add("moderate");
        } else if (indexValue >= 8) {
          uv.classList.add("bad");
        }

      }
      dunk.innerHTML = `Weather in ${nameValue}`;
      temp.innerHTML = `${Math.floor(tempValue)}°F`;
      icon.setAttribute("src", iconUrl);
      desc.innerHTML = descValue;
      humid.innerHTML = `Humidity:${humidValue}%`;
      wind.innerHTML = `Wind:${Math.floor(windValue)}mph`;

      const forecastGet = fetch(uvUrl)
        .then(response => response.json())
        .then(uvData => {
          renderForecast(uvData)
        });
      const renderForecast = async function (dayData) {
        forecastGet;
        const temp1 = ((dayData.daily[1].temp["day"] - 273.15) * 1.8 + 32);
        const temp2 = ((dayData.daily[2].temp["day"] - 273.15) * 1.8 + 32);
        const temp3 = ((dayData.daily[3].temp["day"] - 273.15) * 1.8 + 32);
        const temp4 = ((dayData.daily[4].temp["day"] - 273.15) * 1.8 + 32);
        const temp5 = ((dayData.daily[5].temp["day"] - 273.15) * 1.8 + 32);

        const icon1 = dayData.daily[1].weather[0].icon;
        const icon2 = dayData.daily[2].weather[0].icon;
        const icon3 = dayData.daily[3].weather[0].icon;
        const icon4 = dayData.daily[4].weather[0].icon;
        const icon5 = dayData.daily[5].weather[0].icon;
        const iconUrl1 = `https://openweathermap.org/img/wn/${icon1}@2x.png`;
        const iconUrl2 = `https://openweathermap.org/img/wn/${icon2}@2x.png`;
        const iconUrl3 = `https://openweathermap.org/img/wn/${icon3}@2x.png`;
        const iconUrl4 = `https://openweathermap.org/img/wn/${icon4}@2x.png`;
        const iconUrl5 = `https://openweathermap.org/img/wn/${icon5}@2x.png`;

        const descValue1 = dayData.daily[1].weather[0].description;
        const descValue2 = dayData.daily[2].weather[0].description;
        const descValue3 = dayData.daily[3].weather[0].description;
        const descValue4 = dayData.daily[4].weather[0].description;
        const descValue5 = dayData.daily[5].weather[0].description;

        const humidValue1 = dayData.daily[1].humidity;
        const humidValue2 = dayData.daily[2].humidity;
        const humidValue3 = dayData.daily[3].humidity;
        const humidValue4 = dayData.daily[4].humidity;
        const humidValue5 = dayData.daily[5].humidity;

        // Update Dates
        const dt1 = moment().add(1, "days").format("MMMM Do YYYY");
        const dt2 = moment().add(2, "days").format("MMMM Do YYYY");
        const dt3 = moment().add(3, "days").format("MMMM Do YYYY");
        const dt4 = moment().add(4, "days").format("MMMM Do YYYY");
        const dt5 = moment().add(5, "days").format("MMMM Do YYYY");

        date1El.innerHTML = dt1;
        date2El.innerHTML = dt2;
        date3El.innerHTML = dt3;
        date4El.innerHTML = dt4;
        date5El.innerHTML = dt5;

        icon1EL.setAttribute("src", iconUrl1);
        icon2EL.setAttribute("src", iconUrl2);
        icon3EL.setAttribute("src", iconUrl3);
        icon4EL.setAttribute("src", iconUrl4);
        icon5EL.setAttribute("src", iconUrl5);

        temp1El.innerHTML = `${Math.floor(temp1)}°F`;
        temp2El.innerHTML = `${Math.floor(temp2)}°F`;
        temp3El.innerHTML = `${Math.floor(temp3)}°F`;
        temp4El.innerHTML = `${Math.floor(temp4)}°F`;
        temp5El.innerHTML = `${Math.floor(temp5)}°F`;

        desc1El.innerHTML = descValue1;
        desc2El.innerHTML = descValue2;
        desc3El.innerHTML = descValue3;
        desc4El.innerHTML = descValue4;
        desc5El.innerHTML = descValue5;
        
        humid1El.innerHTML = `Humidity:${humidValue1}%`;
        humid2EL.innerHTML = `Humidity:${humidValue2}%`;
        humid3EL.innerHTML = `Humidity:${humidValue3}%`;
        humid4EL.innerHTML = `Humidity:${humidValue4}%`;
        humid5EL.innerHTML = `Humidity:${humidValue5}%`;

      }
    })
};

function renderSearchHistory() {
  historyEl.innerHTML = "";
  for (let i = 0; i < searchHistory.length; i++) {
    const historyItem = document.createElement("input");
    historyItem.setAttribute("type", "button");
    historyItem.setAttribute("readonly", true);
    historyItem.setAttribute("class", "hist");
    historyItem.setAttribute("id", "histButton");
    historyItem.setAttribute("value", searchHistory[i]);
    historyItem.addEventListener("click",function() {
      getWeather(historyItem.value);
    })
    historyEl.append(historyItem);
  }
};

clearEl.addEventListener("click", function () {
  localStorage.clear();
  window.location.reload();
})


renderSearchHistory();
