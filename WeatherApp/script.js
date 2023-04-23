const apikey = `3265874a2c77ae4a04bb96236a642d2f`;

const search = document.getElementById("search");
const input = document.getElementById("inputText")
const container = document.querySelector("#container")
let already = false;
let defaults = "Philippines";
let wind = document.getElementById("wind")
let humid = document.getElementById("humidity")
let precipt = document.getElementById("precipitation")

async function getWeatherByLocation(city,apikey) {
    const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric` , { origin: "cors" });
    const respData = await resp.json()
    if(respData.cod === "404"){
        alert("Invalid Country")
        inputText.value = ""
    }
    
    showPage(respData)
  function showPage(respData){

    const icon = `<img src=https://openweathermap.org/img/wn/${respData.weather[0].icon}@2x.png>`
    const temp = respData.main.temp.toFixed()
    const humidityValue = respData.main.humidity
    const windValue = respData.wind.speed
    const weatherImg = respData.weather[0].description.toUpperCase()

    const main = document.querySelector(".main-container")
    let mainDiv = document.createElement("div")
    mainDiv.classList.add("divInside")
    mainDiv.innerHTML = 
    `<p>${icon}<br> <b> ${temp}&#8451 </b><br></p>${respData.name}`
    main.append(mainDiv)

    let windDiv = document.createElement("div")
    windDiv.classList.add("divInside")
    windDiv.innerHTML = `${windValue.toFixed()}<small>km</small>`
    wind.append(windDiv)

    let humidDiv = document.createElement("div")
    humidDiv.classList.add("divInside")
    humidDiv.innerHTML = `${humidityValue}<small>%</small>`
    humid.append(humidDiv)

    let PrecipDiv = document.createElement("div")
    PrecipDiv.classList.add("divInside")
    PrecipDiv.innerHTML = `<small>${weatherImg}</small>`
    precipt.append(PrecipDiv)
    inputText.value = ""
    already = true
    }
    }

search.addEventListener("click", (event) =>{
    event.preventDefault()
    const text = inputText.value

if(already){
    location.reload()
    already = false
}
if(text){
getWeatherByLocation(text, apikey)
}
})
