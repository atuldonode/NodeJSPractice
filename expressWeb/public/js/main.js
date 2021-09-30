const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');

const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');

// timeand date 
const displayDateTime = document.getElementById('displayDateTime');


const getInfo = async(event) =>{
    event.preventDefault();

let cityVal = cityName.value;
if(cityVal === "" ){
city_name.innerText = `plz write city name`;
}else{ 
    try{
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=05585cb0856dcc4872f6356e346cd819`
        const response = await fetch(url);
        const data = await response.json();
        const arrData = [data];

        city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
        temp_real_val.innerText = arrData[0].main.temp;
        temp_status.innerText = arrData[0].weather[0].main;

        displayDateTime.innerText = (displayDateTime);


    }catch{
        city_name.innerText = `plz correct city name`;
    }
    
}
}

submitBtn.addEventListener('click', getInfo);

