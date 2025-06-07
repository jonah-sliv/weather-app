const apiKey = API_KEY;

const inputBox = document.getElementById("input-box");
const appContainer = document.getElementById("app-container")

function findCity() {
    const city = inputBox.value.trim()

    fetch(`http://api.weatherapi.com/v1/current.json?q=${city}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const oldCity = document.getElementById("city-info");
            const newCity = document.createElement("div");

            newCity.id = "city-info";
            newCity.innerHTML = `
                <hr/>
                <h2>${data.location.name}</h2>
                <h3>${data.location.region}, ${data.location.country}</h3>

                <div id="weather-info">
                    <div id="left-box">
                        <img src="https:${data.current.condition.icon}" alt="weather-icon" id="icon"> 
                        <h3 id="descriptor">${data.current.condition.text}</h3>
                    </div>
                    <div id="right-box">
                        <h2 id="temp">${Math.floor(data.current.temp_f)} F</h2>
                        <h2 id="temp">${Math.floor(data.current.temp_c)} C</h2>
                    </div>
                </div>
            `;

            oldCity.replaceWith(newCity);
            inputBox.value="";
        })
        .catch(error => {
            alert(`Error detected: ${error}. Please enter a valid city.`)
            inputBox.value="";
            return;
        });
}
