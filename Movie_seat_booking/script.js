const seats = document.querySelectorAll('.row .seat:not(.occupied');
const container = document.querySelector('.container');
const selectedMovie = document.getElementById('movie');
const count = document.querySelector('.count');
const total = document.querySelector('.total');

let ticketPrice = selectedMovie.value;

//reflecting movie change on total section
selectedMovie.addEventListener('change', (e) => {
    ticketPrice = e.target.value;
    updateTotal();
});

//modifying total section
const updateTotal = () => {
    count.innerText = (document.querySelectorAll('.row .seat.selected')).length;
    total.innerText = (document.querySelectorAll('.row .seat.selected')).length * ticketPrice;
};

//selecting seats
container.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied'))
        e.target.classList.toggle('selected');
    updateTotal();
});

