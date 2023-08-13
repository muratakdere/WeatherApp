const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const locationNotFound = document.querySelector('.location-not-found')
const weatherBody = document.querySelector('.weather-body');

async function showWeather(city){

    const apiKey = "cb63082bee51e7d5a15a1df6e1254ee3";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=tr&appid=${apiKey}`;
    

    const weatherData = await fetch(`${url}`).then(response => response.json()).catch(err=> console.warn(err))

    if(weatherData.cod === `404`){
        locationNotFound.style.display = "flex";
        weatherBody.style.display = "none";
        console.log("error");
        return;
    }

    locationNotFound.style.display = "none";
    weatherBody.style.display = "flex";
    temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
    description.innerHTML = `${weatherData.weather[0].description}`
    console.log(weatherData);
    
    switch(weatherData.weather[0].main){
        case 'Clouds':
            weatherImg.src = "images/cloud.png";
            break;
        case 'Clear':
            weatherImg.src = "images/clear.png";
            break;
        case 'Rain':
            weatherImg.src = "images/rain.png";
            break;
        case 'Mist':
            weatherImg.src = "images/mist.png";
            break;
        case 'Snow':
            weatherImg.src = "images/snow.png"
            break;
                        
    }
}

searchBtn.addEventListener('click',()=>{
    showWeather(inputBox.value);
});