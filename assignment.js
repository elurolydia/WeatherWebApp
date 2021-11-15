window.onload = callResult();

document.querySelector('#butRefresh').onclick = callResult;       //For the Refresh button


//Below is the function that handles the result of user's current location
function callResult(){
navigator.geolocation.getCurrentPosition((position) => {
    getResults(position);
});


function getResults(position){
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=b3d3a3b1db6ff4ad7c44606ac7d5f5a1`)
  .then((weather) => {
      return weather.json();
  }).then(
    displayResult
  );

}


function displayResult(weather){
  let place = document.getElementById('location')
  place.innerHTML = weather.timezone;

  let now = new Date();
  document.getElementById('date').innerHTML = `${dateBuilder(now)}`;

  document.getElementById('time').textContent = convertTime(weather.current.dt);

  let temp = document.getElementById('temp')
  temp.innerHTML = weather.current.temp + '°c'

  let disc = document.getElementById('description')
  disc.innerHTML = weather.current.weather[0].main

  let bigIcon = document.getElementById('bigIcon')
  x = weather.current.weather[0].icon;
  let url = `http://openweathermap.org/img/wn/${x}@2x.png`
  bigIcon.src= url;

  dailyForcast(weather, 'wk1Icon', 1, 'wk1', 'wk1Date' );
  dailyForcast(weather, 'wk2Icon', 2, 'wk2', 'wk2Date' );
  dailyForcast(weather, 'wk3Icon', 3, 'wk3', 'wk3Date' );
  dailyForcast(weather, 'wk4Icon', 4, 'wk4', 'wk4Date' );
  dailyForcast(weather, 'wk5Icon', 5, 'wk5', 'wk5Date' );
  dailyForcast(weather, 'wk6Icon', 6, 'wk6', 'wk6Date' );
  dailyForcast(weather, 'wk7Icon', 7, 'wk7', 'wk7Date' );
}

}

//Below are outer functions kept for general use:
function dailyForcast(weather,b,d,f,g){
  a = document.getElementById(b)
  c = weather.daily[d].weather[0].icon
  a.src = `http://openweathermap.org/img/wn/${c}@2x.png`
  e = document.getElementById(f)
  e.innerHTML = weather.daily[d].weather[0].main
  document.getElementById(g).textContent = convertDate(weather.daily[d].dt)
}


function convertTime(T){
  timeObj =new Date(T * 1000);
  currentTime = timeObj.toLocaleTimeString()
  return currentTime;
}


function convertDate(D){
  dateObj =new Date(D * 1000);
  currentDate = dateObj.toDateString();
  return currentDate;
}


function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;

}
   



//The below function is not used at all cos I feel it the lat and lon value are approximated and wont be precise, just kept for testing
          function getCityResult(address){
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${address}&units=metric&APPID=b3d3a3b1db6ff4ad7c44606ac7d5f5a1`)
                .then(weather => {
                    return weather.json();
                }).then(getLatLon);
          }

          function getLatLon(weather){
          console.log(weather.coord.lat + ' ' + weather.coord.lon)
          }



          
document.querySelector('#srhBtn').onclick = setValue;
let inputValue = document.querySelector('#inputSearch').value

function setValue(){
  inputValue = document.querySelector('#inputSearch').value

  anotherWay(inputValue)
}

// key = 'yLrYvpmYEIstI90hWZ1IMlCfwvLtw7kL'
// key = 'http://open.mapquestapi.com/geocoding/v1/address?key=KEY&location=Washington,DC'

function anotherWay(add){
  fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=yLrYvpmYEIstI90hWZ1IMlCfwvLtw7kL&location=${add}`)
    .then(result => {
      return result.json();
    }).then(getIt);
}

function getIt(result){
  console.log(result.results[0].locations[0].latLng.lat + ' ' + result.results[0].locations[0].latLng.lng)

  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${result.results[0].locations[0].latLng.lat}&lon=${result.results[0].locations[0].latLng.lng}&units=metric&appid=b3d3a3b1db6ff4ad7c44606ac7d5f5a1`)
  .then((weather) => {
      return weather.json();
  }).then(
    displayResult
  );


  function displayResult(weather){
    let place = document.getElementById('location')
    place.innerHTML = inputValue;
  
    let now = new Date();
    document.getElementById('date').innerHTML = `${dateBuilder(now)}`;
  
    document.getElementById('time').textContent = convertTime(weather.current.dt);
  
    let temp = document.getElementById('temp')
    temp.innerHTML = weather.current.temp + '°c'
  
    let disc = document.getElementById('description')
    disc.innerHTML = weather.current.weather[0].main
  
    let bigIcon = document.getElementById('bigIcon')
    x = weather.current.weather[0].icon;
    let url = `http://openweathermap.org/img/wn/${x}@2x.png`
    bigIcon.src= url;
  
    dailyForcast(weather, 'wk1Icon', 1, 'wk1', 'wk1Date' );
    dailyForcast(weather, 'wk2Icon', 2, 'wk2', 'wk2Date' );
    dailyForcast(weather, 'wk3Icon', 3, 'wk3', 'wk3Date' );
    dailyForcast(weather, 'wk4Icon', 4, 'wk4', 'wk4Date' );
    dailyForcast(weather, 'wk5Icon', 5, 'wk5', 'wk5Date' );
    dailyForcast(weather, 'wk6Icon', 6, 'wk6', 'wk6Date' );
    dailyForcast(weather, 'wk7Icon', 7, 'wk7', 'wk7Date' );

}
  

}



/*
//1 start
// CODELAB: Add code to get weather forecast from the caches object.
function getForecastFromCache(coords) {
  // CODELAB: Add code to get weather forecast from the caches object.
  if (!('caches' in window)) {
  return null;
}
const url = `${window.location.origin}/forecast/${coords}`;
return caches.match(url)
    .then((response) => {
      if (response) {
        return response.json();
      }
      return null;
    })
    .catch((err) => {
      console.error('Error getting data from cache', err);
      return null;
    });

}
//1 end


//2 start
// CODELAB: Add code to call getForecastFromCache.
function updateData() {
  Object.keys(weatherApp.selectedLocations).forEach((key) => {
    const location = weatherApp.selectedLocations[key];
    const card = getForecastCard(location);
    // CODELAB: Add code to call getForecastFromCache
    getForecastFromCache(location.geo)
    .then((forecast) => {
      renderForecast(card, forecast);
    });

    // Get the forecast data from the network.
    getForecastFromNetwork(location.geo)
        .then((forecast) => {
          renderForecast(card, forecast);
        });
  });
}
//2 end


//3 start
// If the data on the element is newer, skip the update.
if (lastUpdated >= data.currently.time) {
  return;
}
//3 end

*/