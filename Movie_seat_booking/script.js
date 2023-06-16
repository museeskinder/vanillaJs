const seats = document.querySelectorAll('.row .seat:not(.occupied');
const container = document.querySelector('.container');
const selectedMovie = document.getElementById('movie');
const count = document.querySelector('.count');
const total = document.querySelector('.total');

let ticketPrice = selectedMovie.value;

//updating seats and total from saved data
const syncSaved = () => {
    let selectedSeats = JSON.parse(localStorage.getItem('selected_seats'));
    let selected_ticket = JSON.parse(localStorage.getItem('selected_ticket'));
    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((e, index)=> {
            if(selectedSeats.indexOf(index) > -1)
                e.classList.add('selected');
        });
    }

    //updating total
    if(selected_ticket !== null) {
        count.innerText = selectedSeats.length;
        total.innerText = selectedSeats.length * selected_ticket;
    }
};

syncSaved();

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
    localStorage.setItem('selected_seats', JSON.stringify(seatIndex));
    localStorage.setItem('selected_ticket', JSON.stringify(ticketPrice));
};