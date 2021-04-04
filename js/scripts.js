$(document).ready(function () {
    getLocation();
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "b7953aa5c048acff876e1678457a3773";
    //api call
    let url1 = "https://api.openweathermap.org/data/2.5/onecall?";
    let laturl = "lat=" + lat;
    let lonurl = "&lon=" + lon;
    let restUrl = "&units=metric&lang=el&exclude=minutely,alerts&"
    let apikeyUrl = "appid=" + apiKey;
    let url = url1 + laturl + lonurl + restUrl + apikeyUrl;
    console.log(url);
    $.ajax({
        url:url,
        method: "GET",
        dataType: "JSON",
        success: function (response) {
            console.log(response);
            getData(response);
        },
        error: function(response) {
            var message = response.responseText;
            message = message.replace("{","");
            message = message.replace("}","");
            message = message.replace(/"/g, "");
            alert(message);
        }
    });
}

function getData(data) {
    let country = data.timezone;
    country = country.toUpperCase();
    let desc = data.current.weather[0].description;
    desc = desc.toUpperCase();
    let temp = Math.round(data.current.temp);
    let pressure = data.current.pressure;
    let humidity = data.current.humidity;

    //weather hourly data
    let HourNow = Math.round(data.hourly[0].temp);
    let hour1 = Math.round(data.hourly[1].temp);
    let hour2 = Math.round(data.hourly[2].temp);
    let hour3 = Math.round(data.hourly[3].temp);
    let hour4 = Math.round(data.hourly[4].temp);
    let hour5 = Math.round(data.hourly[5].temp);

    //daily data
    let tommorowTemp = Math.round(data.daily[0].temp.day);
    let nextday1Temp = Math.round(data.daily[1].temp.day);

    //time
    let timeNow = new Date().getHours();
    var times = [];
    for (let i = 0; i <= 4; i++) {
        timeNow++;
        timeNow = ("0" + timeNow).slice(-2);
        if (timeNow != 24) {
            times.push(timeNow);
        } else {
            timeNow = "00";
            times.push("00");
        }
    }

    //icons
    let iconBaseURl = "https://openweathermap.org/img/wn/";
    let iconformat = ".png";
    let todayIcon = data.current.weather[0].icon;
    let tommorowIcon = data.daily[0].weather[0].icon;
    let tdaIcon = data.daily[1].weather[0].icon;
    let time1Icon = data.hourly[1].weather[0].icon;
    let time2Icon = data.hourly[2].weather[0].icon;
    let time3Icon = data.hourly[3].weather[0].icon;
    let time4Icon = data.hourly[4].weather[0].icon;
    let time5Icon = data.hourly[5].weather[0].icon;
    let FulIconToday = iconBaseURl + todayIcon + iconformat;
    let FulIconTommoerow = iconBaseURl + tommorowIcon + iconformat;
    let FulIconTda = iconBaseURl + tdaIcon + iconformat;
    let FullTime1Icon = iconBaseURl + time1Icon + iconformat;
    let FullTime2Icon = iconBaseURl + time2Icon + iconformat;
    let FullTime3Icon = iconBaseURl + time3Icon + iconformat;
    let FullTime4Icon = iconBaseURl + time4Icon + iconformat;
    let FullTime5Icon = iconBaseURl + time5Icon + iconformat;

    //print data
    //Weather main data
    document.getElementById("wrapper-name").innerHTML = country;
    document.getElementById("wrapper-desc").innerHTML = desc;
    document.getElementById("wrapper-temp").innerHTML = temp + " °C";
    document.getElementById("wrapper-pressure").innerHTML = pressure;
    document.getElementById("wrapper-humidity").innerHTML = humidity + " %";

    //weather hourly data
    document.getElementById("wrapper-icon-hour-now").src = FulIconToday;
    document.getElementById("wrapper-hour-now").innerHTML = HourNow + " °C";
    document.getElementById("wrapper-time1").innerHTML = times[0];
    document.getElementById("wrapper-hour1").innerHTML = hour1 + " °C";
    document.getElementById("wrapper-icon-hour1").src = FullTime1Icon;
    document.getElementById("wrapper-time2").innerHTML = times[1];
    document.getElementById("wrapper-icon-hour2").src = FullTime2Icon;
    document.getElementById("wrapper-hour2").innerHTML = hour2 + " °C";
    document.getElementById("wrapper-time3").innerHTML = times[2];
    document.getElementById("wrapper-icon-hour3").src = FullTime3Icon;
    document.getElementById("wrapper-hour3").innerHTML = hour3 + " °C";
    document.getElementById("wrapper-time4").innerHTML = times[3];
    document.getElementById("wrapper-icon-hour4").src = FullTime4Icon;
    document.getElementById("wrapper-hour4").innerHTML = hour4 + " °C";
    document.getElementById("wrapper-time5").innerHTML = times[4];
    document.getElementById("wrapper-icon-hour5").src = FullTime5Icon;
    document.getElementById("wrapper-hour5").innerHTML = hour5 + " °C";

    //daily data
    document.getElementById("wrapper-forecast-temp-today").innerHTML = temp + " °C";
    document.getElementById("wrapper-icon-today").src = FulIconToday;
    document.getElementById("wrapper-forecast-temp-tommorow").innerHTML = tommorowTemp + " °C";
    document.getElementById("wrapper-icon-tommorow").src = FulIconTommoerow;
    document.getElementById("wrapper-forecast-temp-dat").innerHTML = nextday1Temp + " °C";
    document.getElementById("wrapper-icon-dat").src = FulIconTda;
}