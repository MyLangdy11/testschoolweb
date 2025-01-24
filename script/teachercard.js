 // Optional: Smooth horizontal scrolling for the cards
 const cardsWrapper = document.querySelector('.cards-wrapper');
 cardsWrapper.addEventListener('wheel', (event) => {
   if (event.deltaY !== 0) {
     event.preventDefault();
     cardsWrapper.scrollLeft += event.deltaY;
   }
 });