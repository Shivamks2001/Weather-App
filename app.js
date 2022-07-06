let confirmation = confirm("Turn on your Location, already done then Ignore.");

let weatherObject = {
    temp : 0,
    description: "",
    placeName : "",
    country : "",
    icon : "",
    unit: "",
}

// check if browser supports geolocation
if(confirmation)
{
    if("geolocation" in navigator)
    {
        navigator.geolocation.getCurrentPosition(function(pos)
        {
            let coordinate = pos.coords;
            mainFunction(coordinate);
        });
    }
    else
    {
        alert("Browser doesn't Support Geolocation");
    }
}

else
{
    alert("Access Denied");
}

function mainFunction(coordinate)
{
    let url = "https://api.openweathermap.org/data/2.5/weather?lat="+coordinate.latitude+"&lon="+coordinate.longitude+"&appid=4f2a1fcdbc26ff97bec839e0dea67468&units=metric";

    // fetching data
    return fetch(url).then(function(res)
    {
        let data = res.json();
        return data;
    }).then(function(data)
    {
        weatherObject.temp = Math.round(data.main.temp);
        weatherObject.description = data.weather[0].description;
        weatherObject.icon = data.weather[0].icon;
        weatherObject.placeName = data.name;
        weatherObject.country = data.sys.country;
        weatherObject.unit = 'c';
        changeInnerHtml();
    });
}

function changeInnerHtml()
{
    $(".temp-text").html(weatherObject.temp + "°C");
    $(".description").html(weatherObject.description);
    $(".place").html(weatherObject.placeName+","+weatherObject.country);
    $(".my-img").attr("src","icons/" + weatherObject.icon + ".png");
}

$(".temp-text").click(function()
{
    let res;
    if(weatherObject.unit == 'c')
    {
        res = Math.round((weatherObject.temp * 9/5) + 32);
        $(".temp-text").html(res + "°F");
        weatherObject.unit = 'f';
    }
    else
    {
        res = Math.round((weatherObject.temp - 32) * 5/9);
        $(".temp-text").html(res + "°C");
        weatherObject.unit = 'c';
    }
    weatherObject.temp = res;
});
