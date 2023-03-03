"use strict";


// responsive menu


const hamburger = document.querySelector('.hamburger');
const Menu = document.querySelector('.modall__responsive--menu');
const FillterResponsive = document.querySelector('.fillter__responsive');
const closeBtn = document.querySelector('.colose')
const linkResponsive = document.querySelectorAll('.menu__link-responsive');


hamburger.addEventListener('click', () => {
    if(!Menu.classList.contains('menu__active')) {
        window.document.body.style.overflow = "hidden"
        Menu.classList.add('menu__active');
        FillterResponsive.classList.add('fillter__active')  
    } else{
        Menu.classList.remove('menu__active');
        FillterResponsive.classList.remove('fillter__active');
        window.document.body.style.overflow = ""  
    }
})


function closeResponsive(terget) {
     terget.addEventListener('click', () => {
        Menu.classList.remove('menu__active');
        FillterResponsive.classList.remove('fillter__active')  
        window.document.body.style.overflow = ""
     })   
}
linkResponsive.forEach(item => {
    closeResponsive(item)
})


closeResponsive(FillterResponsive);
closeResponsive(closeBtn);


document.addEventListener('keydown', (event) => {
    if( Menu.classList.contains('menu__active') && event.code == "Escape") {
        Menu.classList.remove('menu__active');
        FillterResponsive.classList.remove('fillter__active')  
        window.document.body.style.overflow = ""  
    }
})


// Intro
const widthBackgraund = document.querySelectorAll('.intro__backgraund');
const WrapBackgraund = document.querySelector('.wrapper__backgraund');
let indexWrap = 0
const interval = setInterval(() => {
    indexWrap += widthBackgraund[0].clientWidth;
    if(indexWrap > 3200) {
        indexWrap = 0
    }
    WrapBackgraund.style.cssText = `transform: translateX(-${indexWrap}px);`
}, 6000);



// catalogs


const catalogsCards = document.querySelector('.catalogs__cards');



async function createCard(url,folder) {
    const res = await fetch(url);
    const indexJson = await res.json();
    const index = indexJson.index;

    for (let i = 0; i < index; i++) {
        const cardItem = document.createElement('div');
        cardItem.classList.add("card__item", "animate__cards");
        cardItem.style.cssText = `animation-duration: ${i + 1}s;`
        const imgTag = document.createElement('img');
        imgTag.src = `img/CatalogsCard/${folder}/${i + 1}.jpg`;
        catalogsCards.appendChild(cardItem); 
        cardItem.appendChild(imgTag)
    }

   
}

function remuveItems() {
    const cardsItem = document.querySelectorAll('.card__item');
    cardsItem.forEach(item => {
        item.remove();
    })
}


createCard("../img/CatalogsCard/All/Setings.json", "All");


const catalogsLinks = document.querySelectorAll('.catalogs__link');


catalogsLinks.forEach((item, i) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        remuveItems();
        if(i == 0) {
            createCard("../img/CatalogsCard/All/Setings.json", "All");
        } else if(i == 1) {
            createCard("../img/CatalogsCard/Kitchen/Setings.json", "Kitchen");
        } else if(i == 2) {
            createCard("../img/CatalogsCard/beds/Setings.json", "beds"); 
        } else if(i == 3) {
            createCard("../img/CatalogsCard/BedsideTables/Setings.json", "BedsideTables"); 
        } else if(i == 4) {
            createCard("../img/CatalogsCard/Cabinets/Setings.json", "Cabinets"); 
        } else if(i == 5) {
            createCard("../img/CatalogsCard/Stairs/Setings.json", "Stairs"); 
        } else if(i == 6) {
            createCard("../img/CatalogsCard/Tabels/Setings.json", "Tabels"); 
        }        
    })
})



// forms send


const inputs = document.querySelectorAll('input');
const textarea = document.querySelector('textarea');
const form = document.querySelector('form');
const inputNumber = document.querySelector('#phone');
const masengeDiv = document.querySelector('.masenge__validation');
const masengeSpan = document.querySelector('.masenge__validation');

const masenge = {
    loadding: "Іде загрузка...",
    err: "Сталася помилка спробуйте пізніше",
    sucsses: "Форма успішно відправлена скоро з вами зв'яжуться"
}





function clearInputs() {
    inputs.forEach(item => {
        item.value = "";
    })
    textarea.value = ""
}

function sendMasenge(masenge) {
    masengeDiv.classList.add('masenge__active')
    masengeSpan.innerHTML = masenge;


    setTimeout(() => {
        masengeDiv.classList.remove('masenge__active')
    }, 3000);
}


const sendForm = async (url, data) => {
    sendMasenge(masenge.loadding);
    const res = await fetch(url, {
        method: "POST",
        body: data
    })
}


form.addEventListener('submit', async (e) => {
    e.preventDefault();

   const fromData = await new FormData(form);
   await sendForm('api/telegram.php', fromData)
    .then(sendMasenge(masenge.sucsses))
    .finally(clearInputs());
})


