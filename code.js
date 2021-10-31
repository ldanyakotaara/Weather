const input = document.querySelector('input')
const city = document.querySelector('.city')
const deg = document.querySelector('.deg')
const clouds = document.querySelector('.clouds')
const abobka = document.querySelector('.aboba')

input.addEventListener('keyup', (e)=>{
            if (e.key == 'Enter') {
                getWeather(input.value)
                input.value=''
            }
        })


async function getWeather(place){
    const url =`https://api.worldweatheronline.com/premium/v1/weather.ashx?key=bf9d673488df4611ad6162034212710&q=${place}&num_of_days=5&format=json`;
    const res = await fetch(url);
    const data = await res.json(); 
    render(data)
}


function render(data) {

    city.childNodes[1].innerHTML = data.data.request[0].query
    city.childNodes[3].innerHTML = transformDate(data.data.weather[0].date)
    deg.innerHTML = `${data.data.current_condition[0].temp_C}℃`
    clouds.childNodes[1].innerHTML = data.data.current_condition[0].weatherDesc[0].value
    clouds.childNodes[3].innerHTML = `${data.data.weather[0].mintempC}/${data.data.weather[0].maxtempC}℃`
    let a = 1;
    for (let i = 1; i < 6; i+=2) {
        abobka.childNodes[i].childNodes[1].src = `./pic/${selectPicture(data.data.weather[a].hourly[4])}.png`
        abobka.childNodes[i].childNodes[3].innerHTML = `${data.data.weather[a].mintempC}/${data.data.weather[0].maxtempC}℃`
        abobka.childNodes[i].childNodes[5].innerHTML = getDayOfWeek(data.data.weather[a++].date)

    }
    

}

function getDayOfWeek(time){
    let date = new Date(time)
    return(date.toLocaleDateString('en-UK', {weekday:'long'}));
}


function transformDate(time) {
    let date = new Date(time)
    return(date.toLocaleDateString('en-US', {weekday:'long', month:'long', day:'2-digit', year:'numeric' }));
}

function selectPicture(data) {
    if (data.chanceofrain > 55) {
        return('rain')
    } 
    if (data.cloudcover > 40) {
        return('cloud')
    }
    return('sun')
}

