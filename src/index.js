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
            console.log(data);
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
                console.log(astronomyData);
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
        const { temp_c, temp_f, humidity, wind_kph, wind_mph, wind_degree, wind_dir, cloud, is_day, feelslike_c, feelslike_f, vis_km, vis_miles, uv, pressure_mb, pressure_in, gust_mph, gust_kph, precip_in, precip_mm } = data.current;
        const { co, o3, no2, so2, pm2_5, pm10 } = data.current.air_quality;
        const usepaindex = data.current.air_quality['us-epa-index'];
        const ukdefraindex = data.current.air_quality['gb-defra-index'];
        document.querySelector(".name").innerHTML = name;
        document.querySelector(".country").innerHTML = country;
        document.querySelector(".icon").src = "https:" + icon;
        document.querySelector(".datetime").innerHTML = localtime;
        document.querySelector(".condition").innerHTML = text;
        document.querySelector(".temp").innerHTML = temp_c + "&#176;" + "C" + "&nbsp;" + "/" + "&nbsp;" + temp_f + "&#176;" + "F";
        document.querySelector(".cloud").innerHTML = cloud + "%";
        document.querySelector(".humidity").innerHTML = humidity + "%";
        document.querySelector(".precip").innerHTML = precip_mm + "&nbsp;" + "MM" + "&nbsp;" + "/" + "&nbsp;" + precip_in + "&nbsp;" + "IN";
        document.querySelector(".wind").innerHTML = wind_kph + "&nbsp;" + "KMph" + "&nbsp;" + "/" + "&nbsp;" + wind_mph + "&nbsp;" + "Mph";
        document.querySelector(".gust").innerHTML = gust_kph + "&nbsp;" + "KMph" + "&nbsp;" + "/" + "&nbsp;" + gust_mph + "&nbsp;" + "Mph";
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
            document.body.style.backgroundImage = `url(./assets/day_bg/clearday.webp)`;
            document.body.style.backgroundPosition = "center"
            document.body.style.backgroundSize = "cover"
            document.body.style.backgroundRepeat = "no-repeat"
            document.querySelector(".submit").style.background = "#e5ba92";
            document.body.style.transition = "2s ease";
            if (is_day == "0") {
                document.body.style.backgroundImage = `url(./assets/night_bg/clearnight.webp)`;
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
            document.body.style.backgroundImage = `url(./assets/day_bg/cloudyday.webp)`;
            document.body.style.backgroundPosition = "center"
            document.body.style.backgroundSize = "cover"
            document.body.style.backgroundRepeat = "no-repeat"
            document.querySelector(".submit").style.background = "#fa6d1b";
            document.body.style.transition = "2s ease";
            if (is_day == "0") {
                document.body.style.backgroundImage = `url(./assets/night_bg/cloudynight.webp)`;
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
            document.body.style.backgroundImage = `url(./assets/day_bg/rainyday.webp)`;
            document.body.style.backgroundPosition = "center"
            document.body.style.backgroundSize = "cover"
            document.body.style.backgroundRepeat = "no-repeat"
            document.querySelector(".submit").style.background = "#647d75";
            document.body.style.transition = "2s ease";
            if (is_day == "0") {
                document.body.style.backgroundImage = `url(./assets/night_bg/rainynight.webp)`;
                document.body.style.backgroundPosition = "center"
                document.body.style.backgroundSize = "cover"
                document.body.style.backgroundRepeat = "no-repeat"
                document.querySelector(".submit").style.background = "#325c80";
                document.body.style.transition = "2s ease";
            }
        } else {
            document.body.style.backgroundImage = `url(./assets/day_bg/snowyday.webp)`;
            document.body.style.backgroundPosition = "center"
            document.body.style.backgroundSize = "cover"
            document.body.style.backgroundRepeat = "no-repeat"
            document.querySelector(".submit").style.background = "#1b1b1b";
            document.body.style.transition = "2s ease";
            if (is_day == "0") {
                document.body.style.backgroundImage = `url(./assets/night_bg/snowynight.webp)`;
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

async function cityRandomSelect() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const cities = data
            .filter(country => country.capital && country.capital.length > 0)
            .map(country_1 => country_1.capital[0]);

        if (cities.length === 0) {
            throw new Error('No valid cities found');
        }

        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        console.log('Random City:', randomCity);
        return randomCity;
    } catch (error) {
        console.error('Error fetching random city:', error);
    }
}

cityRandomSelect()
    .then(randomCity => {
        weather.fetchWeather(randomCity);
    })
    .catch(error => {
        console.error('Error fetching random city:', error);
    });


window.addEventListener("offline",function(){
    alert('You Are Disconnected From The Internet, Please Connect To An Internet & Refresh (CTRL + R Or Right Click) For The App To Work')
}),

console.log("Go Away! You're Not Supposed To Be Here! 😡")