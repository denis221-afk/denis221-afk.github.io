"use strict";



// contact in promo


const btnContact = document.querySelector('.contact__icon');
const modallSection = document.querySelector('.modall__contact');



btnContact.addEventListener('click' , () => {
    if(modallSection.classList.contains('modall__contact--open') ) {
        modallSection.classList.remove('modall__contact--open');
    } else{
        modallSection.classList.add('modall__contact--open'); 
    }

    setTimeout(() => {
        modallSection.classList.remove('modall__contact--open');
    }, 4000);
})



// revives 


const items = document.querySelectorAll('.item');
const btnNextItem = document.querySelector('.arrow')
let index = 0

function hide() {
    items.forEach(item => {
        item.classList.remove('item__active')
    })
    
}

function showItem(index) {
    items[index].classList.add('item__active')
}
showItem(index); 
btnNextItem.addEventListener('click', () => { 
    if(index == items.length - 2) {
        btnNextItem.style.display = "none"
    }
    hide();
    index++
    showItem(index);
    
})



// portfolio


const cardsWrappers = document.querySelectorAll('.cards__wrapper');
const moreBtn = document.querySelector('.more');
let indexWrap = 0
function showWrapper(index) {
    cardsWrappers[index].classList.add('cards__wrapper--active')
}


moreBtn.addEventListener('click', () => {
    indexWrap++;
    showWrapper(indexWrap)

})

showWrapper(indexWrap)