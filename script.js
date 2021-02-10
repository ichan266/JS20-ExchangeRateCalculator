// function calculate() {
//   fetch('items.json')
//     .then(res => res.json())
//     .then(data => document.body.innerHTML = data[2].text);
// }
// //*if just GET request, just use fetch('items.json')
// //* Fetch runs asynchrously at the background and it returns a promise. We catch the promist with .then()
// calculate();


const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      const rate = data.rates[currency_two];

      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);  //* toFixed takes number as an argument and it sets the decimal points. 
    });
}

// Event Listeners
currencyEl_one.addEventListener('change', calculate); //* currencyEl_one is a select list. So the event listener is 'change.'
amountEl_one.addEventListener('input', calculate); //* the event is called input in js. Using the arrow or just typing in a number will fire off input
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
})

calculate();