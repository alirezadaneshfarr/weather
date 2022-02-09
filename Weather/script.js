//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// 4dd14eb532252c2f5d2c1face4e0928f
// https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`

const form = document.querySelector("section form");
const input = document.querySelector(".txt");
const msg = document.querySelector(".msg");
const list = document.querySelector(".list");
const btn = document.querySelector(".btn");

const apiKey = "4dd14eb532252c2f5d2c1face4e0928f";

form.addEventListener("submit", submit);

function submit(event) {
    event.preventDefault();
    let inputValue = input.value;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${inputValue}&limit=1&appid=${apiKey}&units=metric`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const { main, sys, name, weather } = data;
            let icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
            const li = document.createElement("li");
            li.classList.add("city");
            const markup = `
            <h2 class='city-name' data-name=${name},${sys.country}">
            <span>${name}</span>
            <span class='country'>${sys.country}</span>
            </h2>
            <div class='city-temp'>${Math.round(main.temp)}</div>
            <figure>
                <img class='city-icon' src='${icon}'>
            </figure>
            <p>
            ${weather[0]["description"]}
            </p>
            `;
            li.innerHTML = markup;
            list.appendChild(li);
            msg.innerText = ""
        })
        .catch(() => {
            msg.innerText = "Search for a valid city"
        })
    input.value = ""
}