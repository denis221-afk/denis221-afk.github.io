// header menu 


const btnShowMenu = document.querySelector('.header__menu--btn');
const windowMenu = document.querySelector('.header__menu--block');
const logoSite = document.querySelector('.header__navbar--logo');
const fillter = document.querySelector('.fillter')
const btnLink = document.querySelectorAll('.header__item--link');
function showWindowMenu(btn){
    btn.addEventListener('click', ()=> {
        windowMenu.classList.add('active__menu');
        fillter.style.display = "block";
		document.body.style.overflow = "hidden";
    })
}

function closeWindowMenu(btn){
    btn.addEventListener('click', ()=> {
        windowMenu.classList.remove('active__menu');
        fillter.style.display = "none";
		document.body.style.overflow = "";
    })
  
}




window.addEventListener('keydown', (event) => {
	if(event.key == "Escape") {
		windowMenu.classList.remove('active__menu');
        fillter.style.display = "none";
		document.body.style.overflow = "";
	}

})

showWindowMenu(btnShowMenu);
closeWindowMenu(logoSite);
closeWindowMenu(fillter);


btnLink.forEach((item) => {
	item.addEventListener('click', () => {
		windowMenu.classList.remove('active__menu');
        fillter.style.display = "none";
		document.body.style.overflow = "";
	})
})





const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        setTimeout(() => {
			const id = smoothLink.getAttribute('href');

        	document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
		}, 300);
    });
};




// projekts fillter 


const ItemProjekts = document.querySelectorAll('.projekts__item');
const fillterProjekts = document.querySelectorAll('.projekts__fillter');




ItemProjekts.forEach((item, index) => {
    item.addEventListener('mouseover', () => {
        fillterProjekts[index].style.opacity = "1";
    })

    item.addEventListener('mouseleave', () => {
        fillterProjekts[index].style.opacity = "0";
    })

})





// team card fillter 



const teamCards = document.querySelectorAll('.team__card');
const teamFillters = document.querySelectorAll('.team__fillter');


teamCards.forEach((item, index) => {
    item.addEventListener('mouseover', () => {
        teamFillters[index].style.opacity = "1";
    })

    item.addEventListener('mouseleave', () => {
        teamFillters[index].style.opacity = "0";
    })
})



// news fillter


const newsItem = document.querySelectorAll('.lastNews__item');
const newsFillter = document.querySelectorAll('.lastNews__fillter')


newsItem.forEach((item, index) => {
    item.addEventListener('mouseover', () => {
        newsFillter[index].style.opacity = "1";
    })

    item.addEventListener('mouseleave', () => {
        newsFillter[index].style.opacity = "0";
    })
})








// animation 


const animItems = document.querySelectorAll('.anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	setTimeout(() => {
		animOnScroll();
	}, 300);
}







// modall projekts 


const modallBtn = document.querySelectorAll('.projekts__fillter--btn');
const modallWindow = document.querySelectorAll('.moadll__window--projekts');
const modallInfo = document.querySelectorAll('.modall__info');
let indexModall = 0;




modallBtn.forEach((item, index) => {
	item.addEventListener('click',(event) => {
		event.preventDefault();
		indexModall = index;
		fillter.style.display = "block";
		modallWindow[indexModall].style.display = "flex";
		document.body.style.overflow = "hidden";

		setTimeout(() => {
			modallInfo[indexModall].style.opacity = "1";	
		}, 2000);

	});
});



fillter.addEventListener('click', ()=> {
	fillter.style.display = "none";
	modallWindow[indexModall].style.display = "none";
	document.body.style.overflow = "";
	modallInfo[indexModall].style.opacity = "0";
})





window.addEventListener('keydown', (event) => {
	if(event.key == "Escape") {
		fillter.style.display = "none";
		modallWindow[indexModall].style.display = "none";
		document.body.style.overflow = "";
		modallInfo[indexModall].style.opacity = "0";
	}

})




// form 

const form = document.querySelectorAll('form'),
inputs = document.querySelectorAll('input');


const message = {
loading: 'Загрузка...',
success: 'Спасибо! Скоро мы с вами свяжемся',
failure: 'Что-то пошло не так...'
};

const postData = async (url, data) => {
document.querySelector('.status').textContent = message.loading;
let res = await fetch(url, {
  method: "POST",
  body: data
});

return await res.text();
};

const clearInputs = () => {
inputs.forEach(item => {
  item.value = '';
});
};

form.forEach(item => {
item.addEventListener('submit', (e) => {
  e.preventDefault();

  let statusMessage = document.createElement('div');
  statusMessage.classList.add('status');
  item.appendChild(statusMessage);

  const formData = new FormData(item);

  postData('mailer/smart.php', formData)
	  .then(res => {
		  console.log(res);
		  statusMessage.textContent = message.success;
	  })
	  .catch(() => statusMessage.textContent = message.failure)
	  .finally(() => {
		  clearInputs();
		  setTimeout(() => {
			  statusMessage.remove();
		  }, 5000);
	  });
});
});



