"use strict";


const Text = 'створюємо унікальні та ефективні сайти для вашого бізнесу!';
const sectionText = document.querySelector('#str');



function typeLine() {
    let index = 0;
    let out = '';


    function autoPlay() {
        out += Text[index];
        sectionText.textContent = out;
        index++;

        if(index == Text.length){
            clearInterval(interval);

            const clerText = setInterval(() => {
                let a = out.slice(0, index);

                sectionText.textContent = a;
                index--;

                

                if(index < 0) {
                    clearInterval(clerText);
                    out = '';
                    index = 0;
                    interval = setInterval(autoPlay, 200);
                }
            }, 100);



      
        }

    }

    let interval = setInterval(autoPlay, 100);
}


typeLine();




window.document.addEventListener('scroll', () => {
    const navItem = document.querySelectorAll('.menu_link');
    const scrollItem = document.querySelectorAll('[data-scroll]');

    let index  = window.scrollY;

    for (let i = 0; i < scrollItem.length; i++) {
        if(index >= (scrollItem[i].offsetTop - scrollItem[i].clientHeight)) {
            navItem.forEach(item => item.classList.remove('focus'))
            navItem[i].classList.add('focus')
        }
        
    }
})


// slide 
const trigerLeft = document.querySelector('.left'),
      trigerRight = document.querySelector('.right'),
      slideItem = document.querySelectorAll('.serivices_nav-item'),
      wrap = document.querySelector('.services__wrapper');


const slideWidth = slideItem[0].clientWidth;
let slideIndex = 0;



trigerRight.addEventListener('click', () => {
    slideIndex++; 
    if(slideIndex >= slideItem.length ) {
        slideIndex = 0;
    }

    
    wrap.style.cssText =`transition: 0.5s ease; transform:translateX(-${slideWidth * slideIndex}px)`;
    showActiveItem(slideIndex);

})

trigerLeft.addEventListener('click', () => {
    slideIndex--; 
    if(slideIndex < 0) {
        slideIndex = slideItem.length - 1;
    }
    wrap.style.cssText =`transition: 0.5s ease; transform:translateX(-${slideWidth * slideIndex}px)`;
    showActiveItem(slideIndex);
})




const tabsItem = document.querySelectorAll('.serveices_item');
const tabsTrigers = document.querySelectorAll('.serivices_nav-item');



function hideItems() {
    tabsItem.forEach(item => item.style.display = 'none'); 
    tabsTrigers.forEach(item => item.classList.remove('focus_item'))
}

function showActiveItem(i = 0) {
    hideItems();
    tabsItem[i].style.display = 'block';
    tabsTrigers[i].classList.add('focus_item')

}

showActiveItem();

tabsTrigers.forEach((item, i) => {
    item.addEventListener('click', () => {
        showActiveItem(i);
        slideIndex = i;
        wrap.style.cssText =`transition: 0.5s ease; transform:translateX(-${slideWidth * slideIndex}px)`;
    })
})





//form



const form = document.querySelector('form');
const inputName = document.querySelector('#name');
const inputPhone = document.querySelector('#phone');
const inputText = document.querySelector('#text');



const masenge = {
    clear: 'Це поле має бути заповнене',
    err: 'ой щось пішло не так...'
}


function focusInput(inputSelector) {
    inputSelector.addEventListener('click' , () => {
        inputName.placeholder = '';
        inputName.style.border = `1px solid #000`; 
    })
}

focusInput(inputName); 
focusInput(inputPhone); 
focusInput(inputText); 




const sendFrom = async (url, data) => {
    
    const res = await fetch(url, {
        method: "POST",
        body: data
    })
}




form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if(inputName.value.length == 0) {
         inputName.placeholder = masenge.clear;
         inputName.style.border = `1px solid red`;
        return
    } else if (inputPhone.value.length <= 4) {
        inputPhone.placeholder = masenge.clear;
        inputPhone.style.border = `1px solid red`;
        return
    } else if(inputText.value.length == 0) {
        inputText.placeholder = masenge.clear;
        inputText.style.border = `1px solid red`;
        return
    }

    const formData = await new FormData(form);
    await sendFrom('Api/Telegram.php', formData);

    window.location.href = './thanks.html';
})


let setCursorPostion = (pos, elem) => {
    elem.focus();


    if(elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos)
    } else if (elem.createTextRange) {
        let renge = elem.createTextRange();

        renge.collapse(true);
        renge.moveEnd('character', pos);
        renge.moveStart('character', pos);
        renge.select();
    }
};

function mask(event) {
    let matrix = '+380 (__) ___-__-__'; 
    let i = 0;
    let dev = matrix.replace(/\D/g, '');
    let values = this.value.replace(/\D/g, '');

    if(dev.length >= values.length) {
        values = dev;
    }
       
    this.value = matrix.replace(/./g, function(a) {
        return /[_\d]/.test(a) && i < values.length ? values.charAt(i++) : i >= values.length ? '' : a
    });
    
    if(event.type === 'blur') {
        if(this.value.length == 3) {
            this.value = '';
        }
    } else {
        setCursorPostion(this.value.length, this);
    }


   
}




inputPhone.addEventListener('input', mask);
inputPhone.addEventListener('focus', mask);
inputPhone.addEventListener('blur', mask);



const trigerBurger = document.querySelector('.triger_burger span');
const menu = document.querySelector('.responsive_menu');
const closeTriger = document.querySelector('.close');
const menuItem = document.querySelectorAll('.resp_menu li');

function showMenu() {
     menu.classList.add('active_menu');
}
function closeMenu() {
    menu.classList.remove('active_menu');
}


trigerBurger.addEventListener('click', () => showMenu());
closeTriger.addEventListener('click', () => closeMenu());
menuItem.forEach(item => item.addEventListener('click', () => closeMenu()))