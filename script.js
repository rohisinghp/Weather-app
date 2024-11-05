document.addEventListener('DOMContentLoaded',()=>{
    const cityDataInput = document.getElementsByClassName('inputData')[0];
    const getWeatherButton = document.getElementById('btn');
    const displayData = document.getElementById('div3')

    const API_KEY="c31436afe36fe8fa76f577fcf90f5aed";

    getWeatherButton.addEventListener('click',async()=>{

        const city=cityDataInput.value.trim();
        if(!city) return;

        try{

           const location =await fetchlocation(city);

           if(!location.ok){
            throw new Error(`location Data status : ${location.status}`);
           } 

           const response = await location.json();
          const lat=response[0].lat
           const lon=response[0].lon

           const citydata=await fetchdata(city,lat,lon);
        //    console.log(citydata);

           if(!citydata.ok)
              throw new Error(`weather data status : ' ${citydata.status}`)

           const responseWeatherData = await citydata.json();
           console.log(responseWeatherData)

           display(responseWeatherData.main.temp-273.15,responseWeatherData.weather[0].description)

        }
        catch(error){
            console.error(error.message);
        }
    })

    async function fetchlocation(city){
        url=`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`
        return fetch(url);

    }
    async function fetchdata(city,lat,lon){
        url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        return fetch(url);

    }
    function display(temp,des){
        displayData.innerHTML = `<p>Temprature : ${temp.toFixed(2)} deg Cel</p>
        <p>Description : ${des}`

    }
})