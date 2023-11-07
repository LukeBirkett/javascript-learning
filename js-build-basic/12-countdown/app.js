const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway')
const deadline = document.querySelector('.deadline')
const items = document.querySelectorAll('.deadline-format h4')

// date setups
let futureDate = new Date(2023, 10, 10, 17, 30, 0);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getUTCMinutes();
const month = months[futureDate.getMonth()]
const day = weekdays[futureDate.getDay()]
const date = futureDate.getDate()

giveaway.textContent = `giveaway ends on ${day} ${date} ${month} ${year} @ ${hours}:${minutes}PM`;

// future time in ms
const futureTime = futureDate.getTime();

function getRemainingTime () {
  const currentDate = new Date().getTime();
  const t = futureTime - currentDate;
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMin = 60 * 1000;

  let days = Math.floor(t/oneDay);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMin);
  let seconds = Math.floor((t % oneMin) / 1000);

  // format values less than 10, i.e. 5 --> 05
  function format (item) {
    if(item < 10){
      return item = `0${item}`
    }
    return item
  };
  
  // set values array
  const values = [days, hours, minutes, seconds]
  
  items.forEach(function (item, index) {
    item.innerHTML = format(values[index]);
    if (t<0){
      clearInterval(countdown)
      deadline.innerHTML = `<h4 class="expured"> giveaway closed </h4>`
    }
  });

};

// countdown
let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();