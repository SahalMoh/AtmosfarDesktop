let weather = {
    "apiKey": "20a1f64cdfbf4af3b6f121849222508",
    fetchWeather: function(city) {
        fetch(
            "https://api.weatherapi.com/v1/current.json?key=" 
            + this.apiKey 
            + "&q="
            + city
            + "&aqi=yes"
        )
        .then((response) => {
            if (!response.ok) {
                alert("City Not Found. You May Have Typed In An Invalid Name Or Left The Search Bar Blank.");
                throw new Error("City Not Found. You May Have Typed In An Invalid Name Or Left The Search Bar Blank.");
            }
            return response.json();
        })
        .then((data) => {
            this.displayWeather(data);
            fetch(
                "https://api.weatherapi.com/v1/astronomy.json?key=" 
                + this.apiKey 
                + "&q="
                + city
            )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch astronomy data.");
                }
                return response.json();
            })
            .then((astronomyData) => {
                this.displayAstronomy(astronomyData);
            })
            .catch(error => {
                console.log(error);
            });
        })
        .catch(error => {
            console.log(error);
            if (!navigator.onLine) {
                alert('You Are Disconnected From The Internet, Please Connect To The Internet & Refresh (CTRL + R Or Right Click) For The App To Work');
            }
        });
    },
    displayWeather: function(data) {
        const { name, localtime, country } = data.location;
        const { icon, text, code } = data.current.condition;
        const { temp_c, temp_f, humidity, wind_kph, wind_mph, wind_degree, wind_dir, cloud, is_day, feelslike_c, feelslike_f, vis_km, vis_miles, uv, pressure_mb, pressure_in } = data.current;
        const { co, o3, no2, so2, pm2_5, pm10 } = data.current.air_quality;
        const usepaindex = data.current.air_quality['us-epa-index'];
        const ukdefraindex = data.current.air_quality['gb-defra-index'];
        const logStyles = `
            background: #282c34;
            color: #ffffff;
            padding: 10px;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-size: 14px;
            line-height: 1.6;
        `;
        console.log(`%cName: ${name}`, logStyles);
        console.log(`%cCountry: ${country}`, logStyles);
        console.log(`%cTemperature In Celsius: ${temp_c} Degrees C`, logStyles);
        console.log(`%cTemperature In Fahrenheit: ${temp_f} Degrees F`, logStyles);
        console.log(`%cHumidity: ${humidity}%`, logStyles);
        console.log(`%cWind Speed In KM/H: ${wind_kph} KM/h`, logStyles);
        console.log(`%cWind Speed In Miles: ${wind_mph} MP/h`, logStyles);
        console.log(`%cCurrent Date And Time: ${localtime}`, logStyles);
        console.log(`%cCloud Percentile: ${cloud}`, logStyles);
        console.log(`%cWind Direction In Degrees: ${wind_degree} Degrees`, logStyles);
        console.log(`%cWind Direction: ${wind_dir}`, logStyles);
        console.log(`%cFeels Like In C: ${feelslike_c} C`, logStyles);
        console.log(`%cFeels Like In F: ${feelslike_f} F`, logStyles);
        console.log(`%cVisibility In KM: ${vis_km}`, logStyles);
        console.log(`%cVisibility In Miles: ${vis_miles}`, logStyles);
        console.log(`%cUV Index: ${uv}`, logStyles);
        console.log(`%cPressure In Millibars: ${pressure_mb}`, logStyles);
        console.log(`%cPressure In Inches: ${pressure_in}`, logStyles);
        console.log(`%cCarbon Monoxide: ${co} μg/m3`, logStyles);
        console.log(`%cO3: ${o3} μg/m3`, logStyles);
        console.log(`%cNO2: ${no2} μg/m3`, logStyles);
        console.log(`%cSO2: ${so2} μg/m3`, logStyles);
        console.log(`%cPM2.5: ${pm2_5} μg/m3`, logStyles);
        console.log(`%cPM10: ${pm10} μg/m3`, logStyles);
        console.log(`%cAir Index (US And UK Accordingly): US:${usepaindex} / UK:${ukdefraindex}`, logStyles);
        document.querySelector(".name").innerHTML = name;
        document.querySelector(".country").innerHTML = country;
        document.querySelector(".icon").src = "https:" + icon;
        document.querySelector(".datetime").innerHTML = localtime;
        document.querySelector(".condition").innerHTML = text;
        document.querySelector(".temp").innerHTML = temp_c + "&#176;" + "C" + "&nbsp;" + "/" + "&nbsp;" + temp_f + "&#176;" + "F";
        document.querySelector(".cloud").innerHTML = cloud + "%";
        document.querySelector(".humidity").innerHTML = humidity + "%";
        document.querySelector(".wind").innerHTML = wind_kph + "&nbsp;" + "KMph" + "&nbsp;" + "/" + "&nbsp;" + wind_mph + "&nbsp;" + "Mph";
        document.querySelector(".winddeg").innerHTML = wind_degree + "&#176;";
        document.querySelector(".winddir").innerHTML = wind_dir;
        document.querySelector(".feelslike").innerHTML = feelslike_c + "&#176;" + "C" + "&nbsp;" + "/" + "&nbsp;" + feelslike_f + "&#176" + "F";
        document.querySelector(".visib").innerHTML = vis_km + "&nbsp;" + "KM" + "&nbsp;" + "/" + "&nbsp;" + vis_miles + "&nbsp;" + "Miles" ;
        document.querySelector(".uvindex").innerHTML = uv;
        document.querySelector(".pressure").innerHTML = pressure_mb + "&nbsp;" + "MB" + "&nbsp;" + "/" + "&nbsp;" + pressure_in + "&nbsp;" + "IN";
        document.querySelector(".carbmonx").innerHTML = Math.trunc(co) + "&nbsp;" + "μg/m3";
        document.querySelector(".ozone").innerHTML = Math.trunc(o3) + "&nbsp;" + "μg/m3";
        document.querySelector(".nitrodiox").innerHTML = Math.trunc(no2) + "&nbsp;" + "μg/m3";
        document.querySelector(".sulphdiox").innerHTML = Math.trunc(so2) + "&nbsp;" + "μg/m3";
        document.querySelector(".pm25").innerHTML = Math.trunc(pm2_5) + "&nbsp;" + "μg/m3";
        document.querySelector(".pm10").innerHTML = Math.trunc(pm10) + "&nbsp;" + "μg/m3";
        document.querySelector(".usepaindex").innerHTML = usepaindex;
        document.querySelector(".ukdefraindex").innerHTML = ukdefraindex;
        if (code == 1000) {
            document.body.style.backgroundImage = `url(./assets/images/day/clearday.webp)`;
            document.body.style.backgroundPosition = "center"
            document.body.style.backgroundSize = "cover"
            document.body.style.backgroundRepeat = "no-repeat"
            document.querySelector(".submit").style.background = "#e5ba92";
            document.body.style.transition = "2s ease";
            if (is_day == "0") {
                document.body.style.backgroundImage = `url(./assets/images/night/clearnight.webp)`;
                document.body.style.backgroundPosition = "center"
                document.body.style.backgroundSize = "cover"
                document.body.style.backgroundRepeat = "no-repeat"
                document.querySelector(".submit").style.background = "#181e27";
                document.body.style.transition = "2s ease";
            }
        } else if (
            code == 1003 ||
            code == 1006 ||
            code == 1009 ||
            code == 1030 ||
            code == 1069 ||
            code == 1087 ||
            code == 1135 ||
            code == 1273 ||
            code == 1276 ||
            code == 1279 ||
            code == 1282
        ) {
            document.body.style.backgroundImage = `url(./assets/images/day/cloudyday.webp)`;
            document.body.style.backgroundPosition = "center"
            document.body.style.backgroundSize = "cover"
            document.body.style.backgroundRepeat = "no-repeat"
            document.querySelector(".submit").style.background = "#fa6d1b";
            document.body.style.transition = "2s ease";
            if (is_day == "0") {
                document.body.style.backgroundImage = `url(./assets/images/night/cloudynight.webp)`;
                document.body.style.backgroundPosition = "center"
                document.body.style.backgroundSize = "cover"
                document.body.style.backgroundRepeat = "no-repeat"
                document.querySelector(".submit").style.background = "#181e27";
                document.body.style.transition = "2s ease";
            }
        } else if (
            code == 1063 ||
            code == 1069 ||
            code == 1072 ||
            code == 1150 ||
            code == 1153 ||
            code == 1180 ||
            code == 1183 ||
            code == 1186 ||
            code == 1189 ||
            code == 1192 ||
            code == 1195 ||
            code == 1204 ||
            code == 1207 ||
            code == 1240 ||
            code == 1243 ||
            code == 1246 ||
            code == 1249 ||
            code == 1252
        ) {
            document.body.style.backgroundImage = `url(./assets/images/day/rainyday.webp)`;
            document.body.style.backgroundPosition = "center"
            document.body.style.backgroundSize = "cover"
            document.body.style.backgroundRepeat = "no-repeat"
            document.querySelector(".submit").style.background = "#647d75";
            document.body.style.transition = "2s ease";
            if (is_day == "0") {
                document.body.style.backgroundImage = `url(./assets/images/night/rainynight.webp)`;
                document.body.style.backgroundPosition = "center"
                document.body.style.backgroundSize = "cover"
                document.body.style.backgroundRepeat = "no-repeat"
                document.querySelector(".submit").style.background = "#325c80";
                document.body.style.transition = "2s ease";
            }
        } else {
            document.body.style.backgroundImage = `url(./assets/images/day/snowyday.webp)`;
            document.body.style.backgroundPosition = "center"
            document.body.style.backgroundSize = "cover"
            document.body.style.backgroundRepeat = "no-repeat"
            document.querySelector(".submit").style.background = "#1b1b1b";
            document.body.style.transition = "2s ease";
            if (is_day == "0") {
                document.body.style.backgroundImage = `url(./assets/images/night/snowynight.webp)`;
                document.body.style.backgroundPosition = "center"
                document.body.style.backgroundSize = "cover"
                document.body.style.backgroundRepeat = "no-repeat"
                document.querySelector(".submit").style.background = "#1b1b1b";
                document.body.style.transition = "2s ease";
            }
        }
    },
    displayAstronomy: function(data) {
        const { sunrise, sunset, moonrise, moonset, moon_phase, moon_illumination } = data.astronomy.astro;
        const logStyles2 = `
            background: #282c34;
            color: #ffffff;
            padding: 10px;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-size: 14px;
            line-height: 1.6;
        `;
        console.log(`%c Sunrise: %c ${sunrise}`, logStyles2);
        console.log(`%c Sunset: %c ${sunset}`, logStyles2);
        console.log(`%c Moonrise: %c ${moonrise}`, logStyles2);
        console.log(`%c Moonset: %c ${moonset}`, logStyles2);
        console.log(`%c Moon Phase: %c ${moon_phase}`, logStyles2);
        console.log(`%c Moon Illumination: %c ${moon_illumination}`, logStyles2);
        document.querySelector(".sunrise").innerHTML = sunrise;
        document.querySelector(".sunset").innerHTML = sunset;
        document.querySelector(".moonrise").innerHTML = moonrise;
        document.querySelector(".moonset").innerHTML = moonset;
        document.querySelector(".moonphase").innerHTML = moon_phase;
        document.querySelector(".moonillum").innerHTML = moon_illumination;
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search").value);
    }
};

document.querySelector(".submit").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".search").addEventListener("keyup", function() {
    if (event.key == "Enter") {
        weather.search();
    }
});

const cityNames = [
    "Tokyo",
    "Delhi",
    "Shanghai",
    "Sao Paulo",
    "Mumbai",
    "Beijing",
    "Cairo",
    "Dhaka",
    "Mexico City",
    "Osaka",
    "Karachi",
    "Chongqing",
    "Istanbul",
    "Buenos Aires",
    "Kolkata",
    "Lagos",
    "Kinshasa",
    "Manila",
    "Rio de Janeiro",
    "Guangzhou",
    "Lahore",
    "Shenzhen",
    "Bangalore",
    "Moscow",
    "Tianjin",
    "Jakarta",
    "London",
    "Lima",
    "Bangkok",
    "New York City",
    "Bogota",
    "Ho Chi Minh City",
    "Hong Kong",
    "Baghdad",
    "Chennai",
    "Bangalore",
    "Hyderabad",
    "Wuhan",
    "Hangzhou",
    "Ahmedabad",
    "Kuala Lumpur",
    "Seoul",
    "Riyadh",
    "Shijiazhuang",
    "Santiago",
    "Madrid",
    "Colombo",
    "Alexandria",
    "Sydney",
    "Saint Petersburg",
    "Surat",
    "Johannesburg",
    "Chengdu",
    "Kanpur",
    "Giza",
    "Berlin",
    "Durban",
    "Algiers",
    "Hanoi",
    "Nanjing",
    "Casablanca",
    "Pyongyang",
    "Nairobi",
    "Kabul",
    "Addis Ababa",
    "Mogadishu",
    "Navi Mumbai",
    "Jeddah",
    "Lucknow",
    "Dar es Salaam",
    "Miami",
    "Athens",
    "Melbourne",
    "Curitiba",
    "Brasilia",
    "Jaipur",
    "Havana",
    "Sana'a",
    "Hamburg",
    "Cologne",
    "Frankfurt",
    "Stuttgart",
    "Abidjan",
    "Nuremberg",
    "Dusseldorf",
    "Marseille",
    "Muscat",
    "Oslo",
    "Brussels",
    "Helsinki",
    "Copenhagen",
    "Amsterdam",
    "Abu Dhabi",
    "Dubai"
]  

function cityRandomSelect(cityNames) {
    return cityNames[Math.floor(Math.random()*cityNames.length)];
}

weather.fetchWeather(cityRandomSelect(cityNames));

window.addEventListener("offline",function(){
    alert('You Are Disconnected From The Internet, Please Connect To An Internet & Refresh (CTRL + R Or Right Click) For The App To Work')
})