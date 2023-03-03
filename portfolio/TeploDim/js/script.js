"use strict";


// string

const Text = 'Робимо теплішим не тільки дім, а і сімейні стосунки'
const sectionTxet = document.querySelector('.denamic_title');




function typeLine() {
    let indexText = 0
    let out = '';
    
    function autoPlay() {
        out += Text[indexText]
        sectionTxet.textContent = out;
        indexText++;


        if(indexText == Text.length) {
            clearInterval(interval);

            const clearText = setInterval(() => {
                let a = out.slice(0, indexText);
                
                sectionTxet.textContent = a;
                indexText--;


                if(indexText < 0) {
                    clearInterval(clearText);
                     out = '';
                     indexText = 0
                     interval = setInterval(autoPlay , 200);

                } 
            }, 100);

   
        }
    }

    let interval = setInterval(autoPlay , 200);

}

typeLine();



// tabs


const tabsContent = document.querySelectorAll('.content_window');
const tabsControle = document.querySelectorAll('.content_tab');
function hideTabs() {
    tabsControle.forEach((item, index) => {
        item.classList.remove('active_tab')
    })
    tabsContent.forEach(item => item.style.display = 'none');

    
}

function showActiveTab(index = 0) {
    tabsControle[index].classList.add('active_tab')
    tabsContent[index].style.display = "flex";

}

hideTabs();
showActiveTab();


tabsControle.forEach((item, index) => {
    item.addEventListener('click', () => {       
        hideTabs();
        showActiveTab(index);
    })
})



//validation 

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


let input = document.querySelector('#phone');

input.addEventListener('input', mask);
input.addEventListener('focus', mask);
input.addEventListener('blur', mask);

let inputNumber = document.querySelector('#phoneNumber');

inputNumber.addEventListener('input', mask);
inputNumber.addEventListener('focus', mask);
inputNumber.addEventListener('blur', mask);


const inputs = document.querySelectorAll('input');
const form = document.querySelector('form');
const masenge = {
    sucsess: 'Дякую! Дані успішно відправлені.',
    ladding: 'Загрузка...',
    err: 'Щось пішло не так',
    empty: 'Всі поля мають бути заповнині'
}



function changeBlock(boolen) {
    const froms = document.querySelector('.form');
    const sucsess = document.querySelector('.popap_thanks');


    if(boolen) {
        froms.style.display = 'none';
        sucsess.style.display = 'flex';
        console.log(boolen)
    } else {
        froms.style.display = 'flex';
        sucsess.style.display = 'none';
    }

    
}


function sendMasenge(masenge, colorMasenge) {
    const spans = document.querySelectorAll('.masenge');
    spans.forEach(item => {
        item.textContent = masenge;
        item.style.cssText = `color: ${colorMasenge}`;
    })
}


const sendFrom = async (url, data) => {
    
    const res = await fetch(url, {
        method: "POST",
        body: data
    })
}


function clear() {
    changeBlock(false);
    const inputs = document.querySelectorAll('input');
    inputs.forEach(item => {
        item.value = ''
    })
}


form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if(inputs[0].value.length == 0) {
        return sendMasenge(masenge.empty, 'red');
    }
    if(inputs[1].value.length <= 4) {
        return sendMasenge(masenge.empty, 'red');
    }
    const formData = await new FormData(form);
    await sendFrom('Api/Telegram.php', formData)
        .then(res =>  changeBlock(true))
        .catch(() => {
            sendMasenge(masenge.err, 'red')
            changeBlock(false)
        })
        .finally(setTimeout(() => {
            clear();
        }, 7000))
})



// animate 
const animItems = document.querySelectorAll('.anim-items');
if(animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll)
    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if(animItemHeight > window.innerHeight) {
                 animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }
            

            if((window.pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active')
            } else {
                animItem.classList.remove('_active')
            }
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect();
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
        const scrollTop = window.pageYOffset || document.documentElement.scrollHeight;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft}
    } 

    setTimeout(() => {
        animOnScroll();
    }, 300)

}

// modall 


const selectorModall = document.querySelector('.popap_caontact');
const trigerSelector = document.querySelectorAll('.popap_triger');
const dialgSelector = document.querySelector('.popap_dialog');



function showModall () {
    selectorModall.style.display = 'flex';
    dialgSelector.classList.add('active_dialog');
    document.body.style.overflow= 'hidden';
}

function hideModall () {
    selectorModall.style.display = 'none';
    dialgSelector.classList.remove('active_dialog');
    document.body.style.overflow= '';
}
trigerSelector.forEach(item => item.addEventListener('click', () => showModall()))




window.document.addEventListener('click',  (e) => {
        const target = e.target;
        if(target.className == 'popap_caontact') {
            hideModall();
        }
})

window.document.addEventListener('keydown',  (e) => {
    const target = e.code;
    if(target == 'Escape') {
        hideModall();
    }
})




function createGalary(data) {
    const wrapper = document.querySelector('.Portfolio_wrapper'); 
    let index = 0;
    data.map(item => {
        if(index <= 8) {
            index++
            const link = document.createElement('a');
            const img = document.createElement('img');
            img.src = item.media_url;

            link.appendChild(img);
            wrapper.appendChild(link);
        }
    })
}


async function getInstagram() {
     const res = await fetch('https://graph.instagram.com/me/media?fields=id,caption,media_url&access_token=IGQVJWWEVpVVRfd3k3SklFY05WejVZATDNEUm9WZA2pObDVNZA29zckhNTGItdFp2ajM5TGlMQ3hZAWE1lVmw0MlN3dTE4cUNlRWRCcjZArM2h5c2hMalJldEpTS0ZA1VUhHLXQwTkh5RVRmTW9CTWNDazgwRAZDZD',{
        method: 'GET'
    })
    const response = await res.json();
    console.log(response);
    createGalary(response.data) 
}

getInstagram();


