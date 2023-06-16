const seats = document.querySelectorAll('.row .seat:not(.occupied');
const container = document.querySelector('.container');
const selectedMovie = document.getElementById('movie');
const count = document.querySelector('.count');
const total = document.querySelector('.total');

let ticketPrice = selectedMovie.value;

container.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied'))
        e.target.classList.toggle('selected');
    updateTotal();
});

//reflecting movie change on total section
selectedMovie.addEventListener('change', (e) => {
    ticketPrice = e.target.value;
    updateTotal();
});

//modifying total section
const updateTotal = () => {
    const selectedSeats = (document.querySelectorAll('.row .seat.selected'));
    count.innerText = selectedSeats.length;
    total.innerText = selectedSeats.length * ticketPrice;

    const seatIndex = [...selectedSeats].map((e) => [...seats].indexOf(e));
    saveForLater('selected_seats', seatIndex); 
    saveForLater('selected_movie', selectedMovie.value); 
};

//saving seats and total to local storage
const saveForLater = (key, value) => {
    if(typeof(value) !== String)
        localStorage.setItem(key, JSON.stringify(value));
    localStorage.setItem(key, value);
};