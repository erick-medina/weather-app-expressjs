console.log('I am JavaScript');

const weatherApp = document.querySelector('form');
const search = document.querySelector('input');

let messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

weatherApp.addEventListener('submit', (event) => {
    event.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`http://localhost:5000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error;
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    });
});
});