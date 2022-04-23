$(document).ready(function() {

    navigator.geolocation.getCurrentPosition(success, error);

    function success(pos) {
        var lat = pos.coords.latitude;
        var lon = pos.coords.longitude;
        console.log(pos)
        console.log(lat);
        console.log(lon);
        weather(lat, lon);
    }

    function error() {
        console.log('There was an error');

    }


    function weather(lat, lon) {
        var URL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=1818fe66ba3256dbda3b3348647e5d03`;
        var newsurl = "https://gnews.io/api/v4/search?q=pollution&token=1a26d2a849deb76622f314089b6e922d";
        var cityurl = `https://us1.locationiq.com/v1/reverse.php?key=pk.aaf42fee4f92f0d971fa8f98c4ca97bc&lat=${lat}&lon=${lon}&format=json`;

        $.getJSON(cityurl, function(Citydata) {
            var City = Citydata;
            var address = City.address.city
            console.log(address)
            $("#coty").html("City: " + address);
        })

        $.getJSON(URL, function(data) {
            var polldata = data;
            var list = polldata.list;
            var components = list[0].components
            var aqiData = list[0].main.aqi;
            var codata = list[0].components.co;
            var nodata = list[0].components.no;
            var no2data = list[0].components.no2;
            var o3data = list[0].components.o3;
            var so2data = list[0].components.so2;
            var pm25data = list[0].components.pm2_5;
            var pm10data = list[0].components.pm10;
            var nh3data = list[0].components.nh3;

            console.log(components)
            console.log(aqiData)

            $("#aqi").html("Air Quality Index: " + aqiData + "μg/m3");
            $("#co").html("Carbon Monoxide: " + codata + "μg/m3");
            $("#no").html("Nitric Oxide: " + nodata + "μg/m3");
            $("#no2").html("Nitrogen Dioxide: " + no2data + "μg/m3");
            $("#o3").html("Ozone: " + o3data + "μg/m3");
            $("#so2").html("Sulphur Dioxide: " + so2data + "μg/m3");
            $("#pm25").html("Particulate Matter (d<2.5): " + pm25data + "μg/m3");
            $("#pm10").html("Particulate Matter (d<10): " + pm10data + "μg/m3");
            $("#nh3").html("Ammonia : " + nh3data + "μg/m3");



            if (aqiData == 3) {
                alert("you are now in a moderate zone with a acceptable amount of pollution around you!!")

                Push.create("you are now in a moderate zone with a acceptable amount of pollution around you!!")
                console.log(aqiData)


            } else if (aqiData == 2) {
                alert("HOLA! you are now in a safe zone with less pollution around...Have a nice day ahead😊😃 ")
                Push.create("HOLA! you are now in a safe zone with less pollution around...Have a nice day ahead😊😃 ")

                console.log(aqiData)
            } else if (aqiData == 1) {
                alert("HOLA! you are now in a safe zone with less pollution around...Have a nice day ahead😊😃 ")
                Push.create("HOLA! you are now in a safe zone with less pollution around...Have a nice day ahead😊😃 ")


                console.log(aqiData)
            } else if (aqiData == 4) {
                alert("Look out captain!!..You are now in a contaminated zone with more pollution around....😟😟Try not to go out!!")
                Push.create("Look out captain!!..You are now in a contaminated zone with more pollution around....😟😟Try not to go out")


                console.log(aqiData)
            } else if (aqiData == 5) {
                alert("Hold on Cap!..This is the most contaminated zone with large extent of pollution around you.Try to stay indoors as much as possible😟😟..Always try to wear a mask when you are out.")
                Push.create("Hold on Cap!..This is the most contaminated zone with large extent of pollution around you.Try to stay indoors as much as possible..Always try to wear a mask when you are out.")

                console.log(aqiData)
            }


        });
        let newsAccordion = document.getElementById('newsAccordion');
        $.getJSON(newsurl, function(DATA) {
            var globalData = DATA;
            var articles = globalData.articles;

            console.log(articles);
            let newsHtml = "";

            articles.forEach(element => {

                let news = `
               
                    <a href="${element["url"]}" style = " text-decoration: none" class="news-card">
                        <img src="${element["image"]}" id="imageurl">
                        <br>
                        <h3 id="newstitle">
                        ${element["title"]}
        
                        </h3>
                        <br>
                        <p id="newsdescription" class="card-text">
                       ${ element["description"]}
                        </p>
        
                    </a>
                `;
                newsHtml += news;
            });
            newsAccordion.innerHTML = newsHtml;
        })




    }




})

document.addEventListener("DOMContentLoaded", function() {
    navbar_height = document.querySelector('.navbar').offsetHeight;
    document.body.style.paddingTop = navbar_height + 'px';
});