const notefication = document.querySelector('.notefication');
const noteficationSpan = document.querySelector('.notefication span');



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
            } 
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect();
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
        const scrollTop = window.pageYOffset || document.documentElement.scrollHeight;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft}
    } 

    animOnScroll();

}

// // Slide 


const slideItems = document.querySelectorAll('.slide');
const indexSlides = document.querySelectorAll('.index__slide span');
const arrowLeft = document.querySelectorAll('.slide__arrow__left');
const arrowRight = document.querySelectorAll('.slide__arrow__right');
let indexActiveSlide = 0;
function hideItems() {
    slideItems.forEach(item => {
        item.style.display = "none";
    })
}
function showActivItem(index) {
    slideItems[index].style.display = "block";
    indexSlides[index].innerHTML = `${indexActiveSlide + 1}/${indexSlides.length}`
}

hideItems();
showActivItem(indexActiveSlide);

arrowRight.forEach(item => {
    item.addEventListener('click', () => {
            indexActiveSlide++;
            if(indexActiveSlide > slideItems.length - 1){
                indexActiveSlide = slideItems.length - 1
                return
            }
            hideItems();
            showActivItem(indexActiveSlide);
    })
})
arrowLeft.forEach(item => {
    item.addEventListener('click', () => {
        indexActiveSlide--;
        if(indexActiveSlide < 0) {
            indexActiveSlide = 0
            return
        }
        hideItems();
        showActivItem(indexActiveSlide);
    })
})


function openModall(window, variebels) {
    window.style.display = "block";
    document.body.style.overflow = "hidden"
    document.body.style.marginRight = "15px"
    clearTimeout(variebels);
}


function closeModall(window) {
    window.style.display = "none";
    document.body.style.overflow = ""
    document.body.style.marginRight = "0px"
}



function onModall(trigerSelector, modallSelector, closeSellector, avtomatics, keyCode) {
    const triger = document.querySelector(trigerSelector),
          modallWindow = document.querySelector(modallSelector),
          close = document.querySelector(closeSellector);

    let avtomatic = avtomatics;

    triger.addEventListener('click', () => {
        openModall(modallWindow, TimeOpen);
    })

    close.addEventListener('click', () => {
        closeModall(modallWindow);
    })

    window.addEventListener('click', (event) => {
        const target = event.target;
        const targetSlect = target;
        if(targetSlect.classList.contains('fill')) {
            closeModall(modallWindow);
        }

    })
    document.addEventListener('keydown', (event) => {
        if(event.code == "Escape") {
            closeModall(modallWindow);
        } if(event.code == keyCode) {
            openModall(modallWindow, TimeOpen);
        }
    })        
    const TimeOpen = setTimeout(() => {
        if(avtomatic) {
            openModall(modallWindow, TimeOpen);
         }
        }, 60000);
}


onModall('.nav__btn', '.modall__consultation', '.modall__consultation .close', true, "KeyM");
onModall('.nav__btn--resp', '.modall__consultation', '.modall__consultation .close', true, "KeyM");
onModall('.modall__one--triger', '.modall__projekts--one', '.modall__projekts--one .close', false, "KeyO");
onModall('.modall__two--triger', '.modall__projekts--two', '.modall__projekts--two .close', false, "KeyT");
onModall('.modall__three--triger', '.modall__projekts--three', '.modall__projekts--three .close', false, "KeyH");


// // search location

const locations = [];
const dataList = document.querySelectorAll('#location option');



const searchErr = {
    clear: "The field cannot be empty",
    err: "There are no such locations",
}

dataList.forEach(item => {
    locations.push(item.value);
});

function productDefultState() {
    productItem.forEach(item => {
        item.style.cssText = "filter: grayscale(0%);";
        productSection.style.cssText = `height:700px;`
    })
}


const inputLocations = document.querySelector('.locations input');
const formLocations = document.querySelector('.location_form');
const productSection = document.querySelector('.product');
const productItem = document.querySelectorAll('.priduct__item');
const maxHegiht = productSection.offsetHeight;


formLocations.addEventListener('submit', async (e) => {
    e.preventDefault();
    productDefultState();
    let value = [];
    if(inputLocations.value !== "") {
        value = await locations.filter(item => {
            return item.indexOf(inputLocations.value) > -1
        })
    } else{
        notefication.style.cssText = "top: 150px";
        noteficationSpan.textContent = searchErr.clear
        setTimeout(() => {
            notefication.style.cssText = "top: -200px";
        }, 3000);
        return
    }
    if(value.length < 1) {
        notefication.style.cssText = "top: 150px";
        noteficationSpan.textContent = searchErr.err;
        setTimeout(() => {
            notefication.style.cssText = "top: -200px";
        }, 3000);
        return
    }
    let pos = [];
    function sortProduct() {
        for (let index = 0; index < productItem.length; index++) {
            if(!productItem[index].classList.contains(value[0])){
                productItem[index].style.cssText = "filter: grayscale(100%);";
                // productItem[index].style.display = "none";
            } else {
                pos.push(productItem[index]);
            }
        }
        
    }
    sortProduct();
    window.scrollBy(0, pos[0].offsetTop - 300);
    productSection.style.cssText = `transition: 0.5s  height:${maxHegiht}px;`

}) 


// // product 


const btnMore = document.querySelector('.show_more');
const productItems = document.querySelectorAll('.priduct__item');
let maxIndex = 6;

function ShowItems(index) {
    console.log(index)
     productItems.forEach((item, id) => {
        if(id < index) {
            productItems[id].style.display = "block";
        } else {
            productItems[id].style.display = "none";
        }
     })
}




btnMore.addEventListener('click', async (e) => {
    e.preventDefault();
    maxIndex += maxIndex;
    ShowItems(maxIndex);
})


ShowItems(maxIndex);





// // forms
const form = document.querySelector('.form'),
    inputs = document.querySelectorAll('.form input'),
    textarea = document.querySelector('#masenge');

const formMasenge = {
    sucsess: "The form has been sent successfully",
    loadiing: "Loading...",
    err: "An error occurred",
    isEmpty: "All fields must be filled",
    isPhone: "Please enter a valid phone number",

}



function clearInputs(inputs, textarea) {
    inputs.forEach(item => {
        item.value = "";
    })
    textarea.value = "";
}
    

 function validation(e) {
        inputs.forEach(item => {
            item.addEventListener('input', (e) => {
                if(e.target.name == "phone") {
                    item.value = item.value.replace(/\D/, '');
                    notefication.style.cssText = "top: 150px";
                    noteficationSpan.textContent = formMasenge.isPhone;
                    setTimeout(() => {
                        notefication.style.cssText = "top: -200px";
                    }, 3000)
                }
            })
        })


        
    inputs.forEach(item => {
        if(item.value == "" && textarea.value == "") {
            notefication.style.cssText = "top: 150px";
            noteficationSpan.textContent = formMasenge.isEmpty;
            setTimeout(() => {
                notefication.style.cssText = "top: -200px";
            }, 3000)
       
        }
    })
}

const sendFrom = async (url, data) => {
 const res = await fetch(url, {
        method: "POST",
        body: data
    })

 return res.text();
}


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    validation();
    notefication.style.cssText = "top: 150px";
    noteficationSpan.textContent = formMasenge.loadiing;
    setTimeout(() => {
        notefication.style.cssText = "top: -200px";
    }, 3000)
    const formData = await new FormData(form);
    console.log(formData)
    await sendFrom('./Api/form.php', formData)
    .then(res => {
        notefication.style.cssText = `top: 150px`;
        noteficationSpan.textContent = formMasenge.sucsess
    })
    .catch(err => {
        notefication.style.cssText = "top: 150px";
        noteficationSpan.textContent = formMasenge.err;
        
    })
    .finally(setTimeout(() => {
        notefication.style.cssText = "top: -200px";
        clearInputs(inputs, textarea);
    }, 3000))

})




// //consultation Form 
const formConsultation = document.querySelector('.modall__consultation form');
const inputConsultation = document.querySelectorAll('.modall__consultation form input');

console.log(formConsultation);
formConsultation.addEventListener('submit', async (e) => {
    e.preventDefault();
 

    const formData = await new FormData(formConsultation);
    await sendFrom('Api/form.php', formData)
    .then(res => {
        notefication.style.cssText = `top: 150px`;
        noteficationSpan.textContent = formMasenge.sucsess
    })
    .catch(err => {
        notefication.style.cssText = "top: 150px";
        noteficationSpan.textContent = formMasenge.err;
    })
    .finally(setTimeout(() => {
        notefication.style.cssText = "top: -200px";
        clearInputs(inputs, textarea);
    }, 3000))
})


// responsive menu

const burgerMenu = document.querySelector('.burger__span');
const menuResponsive = document.querySelector('.responsive__menu');
const fillMenu = document.querySelector('.fillter');
const menuLink = document.querySelectorAll('.menu__link');

burgerMenu.addEventListener('click', () => {
    menuResponsive.style.cssText = `left: 0px`;
    fillMenu.style.display = "block";
});

fillMenu.addEventListener('click', () => {
    menuResponsive.style.cssText = `left: -200%`;
    fillMenu.style.display = "none";
});


menuLink.forEach(item => {
    item.addEventListener('click', () => {
        menuResponsive.style.cssText = `left: -200%`;
        fillMenu.style.display = "none";
    })
})


window.document.addEventListener('keydown', (e) => {
    const code = e.code;

    if(code == "Escape") {
        menuResponsive.style.cssText = `left: -200%`;
        fillMenu.style.display = "none";
    }
})





