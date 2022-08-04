/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calculator.js":
/*!**************************************!*\
  !*** ./src/js/modules/calculator.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator(){
    // Calculator----------------------------------

    const resultCalories = document.querySelector('.calculating__result'),
          genderParent = document.querySelector('#gender'),
          parameters = document.querySelectorAll('.calculating__choose_medium input'),
          ratioParent = document.querySelector('.calculating__choose_big');
          
    let data = {};

    if (localStorage.getItem('ratio')) {
        data.ratio = localStorage.getItem('ratio');
    } else {
        data.ratio = 1.375;
    }

    if (localStorage.getItem('gender')) {
        data.gender = localStorage.getItem('gender');
    } else {
        data.gender = 'female';
    }

    const initialGender = ratioParent.querySelector(`[data-ratio = '${data.ratio}']`);
    const initialRatio = genderParent.querySelector(`#${data.gender}`);

    makeActive(ratioParent, initialGender, 'calculating__choose-item_active');
    makeActive(genderParent, initialRatio, 'calculating__choose-item_active');
    


    calculateCalories();

    function getDynamicInfo(parent) {
        parent.forEach(input => {
            input.addEventListener('input' , (e) => {
                if (input.value.match(/\D/g)) {
                    input.style.border = '1px solid red';
                } else {
                    input.style.border = 'none';
                }
                e.target.value = e.target.value.replace(/\D/g, '');
                const parameter = e.target.getAttribute('id');
                data[`${parameter}`] = +e.target.value;
                calculateCalories();
            });
        });
    }

    function makeActive(parent, element, activeClass) {
        parent.querySelectorAll('div').forEach(item => {
            item.classList.remove(activeClass);
        });
        element.classList.add(activeClass);
    }
    
    const getStaticInfo = (parent) => {
        parent.querySelectorAll('div').forEach(el => {
            el.addEventListener('click', (event)=> {
                const element = event.target;

                makeActive(parent, element, 'calculating__choose-item_active');
                
                if (element.getAttribute('data-ratio')) {
                    data.ratio = +element.getAttribute('data-ratio');
                    localStorage.setItem('ratio', data.ratio);
                } else {
                    data.gender = element.getAttribute('id');
                    localStorage.setItem('gender', data.gender);
                }

                calculateCalories();
            });
        });
    };
    
    getStaticInfo(genderParent);
    getStaticInfo(ratioParent);
    getDynamicInfo(parameters);

    function calculateCalories() {
        
        const coeffs = {
            male: {
                base: 88.36,
                weight: 13.4,
                height: 4.8,
                age: 5.7
            },
            female: {
                base: 447.6,
                weight: 9.2,
                height: 3.1,
                age: 4.3
            }
        };

        if (!data.gender || !data.height || !data.weight || !data.age || !data.ratio) {
            resultCalories.textContent = 'недостаточно данных';
            return;
        } else {
            const result = data.ratio * (coeffs[`${data.gender}`].base + 
                         (coeffs[`${data.gender}`].weight * data.weight) + 
                         (coeffs[`${data.gender}`].height * data.height) -
                         (coeffs[`${data.gender}`].age * data.age));

            resultCalories.innerHTML = `<span>${Math.round(result)}</span> ккал`;
        }
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {
    // Dynamic menu cards----------------------------------------------

    const menuContainer = document.querySelector('.menu__field .container');
    // clear menuContainer
    menuContainer.innerHTML = '';

    // Get data to make menu cards
    const getRequest = async (url) => {
        const result = await fetch(url);
        return await result.json();
    };

    // card mold
    class MenuCard {
        constructor(parent, imgSrc, alt, subtitle, descr, price, usd, ...classes) {
            this.parent = parent;
            this.imgSrc = imgSrc;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price * usd;
            this.classes = classes;

        }
        appendWithCard(){
            const cardContent = document.createElement('div');
            if (this.classes.length == 0) {
                this.className = 'menu__item';
                cardContent.classList.add(this.className);
            } else {
                this.classes.forEach(className => cardContent.classList.add(className));
            }
            cardContent.innerHTML = `
                <img src="${this.imgSrc}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
                `;
            this.parent.appendChild(cardContent);
        }
    }

    const makeCard = (parent, imgSrc, alt, subtitle, descr, price, usd, ...classes) => {
        new MenuCard(parent, imgSrc, alt, subtitle, descr, price, usd, ...classes).appendWithCard();
    };

    getRequest('http://localhost:3000/menu')
    .then ( data => 
        data.forEach(({img, altimg, title, descr, price}) => 
        makeCard(menuContainer, img, altimg, title, descr, price, 32)));
    
    
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./src/js/modules/form.js":
/*!********************************!*\
  !*** ./src/js/modules/form.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");



function form(formSelector, modalSelector, modalTimerId, listenerToRemove) {
    // Forms-----------------------------------------------------

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так'
    };
    forms.forEach(item => {
        postDataToForm(item);
    });

    function postDataToForm(form){
        form.addEventListener('submit', (e)=> {
            e.preventDefault();
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto`;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            
            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
            .then(() => {
                showThanksModal(message.success, modalSelector, modalTimerId, listenerToRemove);
            })
            .catch(() => {
                showThanksModal(message.failure, modalSelector, modalTimerId, listenerToRemove);
            })
            .finally(() => {
                statusMessage.remove();
                form.reset();
            });
            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');
            
            //for formData request.setRequestHeader() is not needed!
            // request.setRequestHeader('content-type', 'application/json');

            // for sending JSON data
            
            // request.send(json);
            //request.send(formData);

            // request.addEventListener('load', ()=> {
            //     if (request.status == 200) {
            //         showThanksModal(message.success);
            //         form.reset();
            //     } else {
            //         showThanksModal(message.success);
            //     }
            //     setTimeout(()=>{statusMessage.remove();}, 2000);
            // });
            


        });
    }

    function showThanksModal(status, modalSelector, modalTimerId, listenerToRemove){
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)(modalSelector, modalTimerId, listenerToRemove );
        const thanksModalDialog = document.createElement('div');
        thanksModalDialog.classList.add('modal__dialog');
        thanksModalDialog.innerHTML = `
            <div class='modal__content'>
                <div data-close class='modal__close'>&times;</div>
                <div class='modal__title'>${status}</div>
            </div>`;
        document.querySelector(modalSelector).append(thanksModalDialog);
        setTimeout(() => {
            thanksModalDialog.remove();
            prevModalDialog.classList.remove('hide');
            prevModalDialog.classList.add('show');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(modalSelector);
        }, 3000);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "endPagePopUp": () => (/* binding */ endPagePopUp),
/* harmony export */   "showModal": () => (/* binding */ showModal)
/* harmony export */ });

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function showModal(modalSelector, modalTimerId, listenerToRemove) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    document.removeEventListener('scroll', listenerToRemove);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    } 
}

function endPagePopUp(modalSelector, modalTimerId, listenerToRemove ){
    const clientHeight = document.documentElement.clientHeight,
        fullHeight = document.documentElement.scrollHeight,
        currentTop = window.scrollY;
    
    // add 100px to trigger endPagePopUp a little before the end of a page
    if ((currentTop + 100) >= (fullHeight - clientHeight)) {
        showModal(modalSelector, modalTimerId, listenerToRemove);
    }   
}

function modal(triggerSelector, modalSelector, modalTimerId, listenerToRemove) {

    
    document.addEventListener('scroll', listenerToRemove);
    // Modal window----------------------------------------------------
    const modal = document.querySelector(modalSelector),
          modalTrigger = document.querySelectorAll(triggerSelector);

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!modal.classList.contains('show')) {
                showModal(modalSelector, modalTimerId, listenerToRemove);
            }
        });
    });

    // close modal window wich click outside a modal dialog
    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        } 
    });

    // close modal window wich 'Escape' key 
    modal.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });  
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);







/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({parentSelector, wrapperSelector, innerSelector, slideSelector, prevArrow, nextArrow, totalCounter, currentCounter}){
    // Slider--------------------------------------------------

    const slider = document.querySelector(parentSelector),
          currentNum = slider.querySelector(currentCounter),
          totalNum = slider.querySelector(totalCounter),
          prev = slider.querySelector(prevArrow),
          next = slider.querySelector(nextArrow),
          slides = slider.querySelectorAll(slideSelector),
          wrapper = slider.querySelector(wrapperSelector),
          inner = slider.querySelector(innerSelector);

    // Carousel variant-------------------------------------------

    // with hidden overflow show only one image at a time
    wrapper.style.overflow = 'hidden';
    
    // get computed width, because elements are created dynamically
    const sliderWidth = window.getComputedStyle(wrapper).width;
    slides.forEach(slide => slide.style.width = sliderWidth);
    
    // put all carousel images in a row
    inner.style.cssText = `
        width: ${100 * slides.length}%;
        display: flex;
        transition: all 0.5s;
    `;

    // make dots under the slider
    const makeSliderDots = (parent, num) => {
        parent.style.position = 'relative';
        const dots = document.createElement('div');
        dots.classList.add('offer__slider-dots');

        for (let i = 0; i < num; i++) {
            const dot = document.createElement('div');
            dot.classList.add('offer__slider-dot');

            dot.style.cssText = `
            height: 10px;
            width: 10px;
            border-radius: 50%;
            background-color: #000;
            `;
            dots.append(dot);
        }

        dots.style.cssText = `
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: -20px;
            width: ${slides.length * 20}px;
            display: flex;
            justify-content: space-between;
        `;
        
        parent.insertAdjacentElement('beforeend', dots);
        
    };

    let slideIndex = 1;

    const showNumInHTML = (num, element) => {
        if (num < 10) {
            element.innerHTML = `0${num}`;
        } else {
            element.innerHTML = num;
        } 
    };
    
    const showSlide = (num) => {
        slideIndex = num;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        } else if (slideIndex < 1) {
            slideIndex = slides.length;
        }

        let offset = slideIndex - 1;
        inner.style.transform = `translateX(-${offset * +sliderWidth.slice(0, sliderWidth.length - 2)}px)`;

        
        sliderDots.forEach((dot) => dot.style.backgroundColor = '#000');
        sliderDots[slideIndex-1].style.backgroundColor = 'red';

        showNumInHTML(slideIndex, currentNum);
    };

    makeSliderDots(slider, slides.length);

    let sliderDots = document.querySelectorAll('.offer__slider-dot');

    showNumInHTML(slides.length, totalNum);
    showSlide(slideIndex);

    next.addEventListener('click', ()=> {
        showSlide(slideIndex+1);
    });
    prev.addEventListener('click', ()=> {
        showSlide(slideIndex-1);
    });

    // give function to slider dots

    slider.addEventListener('click', (event)=> {
        
        if (event.target && event.target.classList.contains('offer__slider-dot')) {
            sliderDots.forEach((dot, i) => {
                dot.style.backgroundColor = '#000';
                if (event.target == sliderDots[i]) {
                    event.target.style.backgroundColor = 'red';
                    showSlide(i+1);
                }
            });  
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsParentSelector, tabsSelector, tabsContentSelector, activeClass) {
    // Tabs

    const tabParent = document.querySelector(tabsParentSelector),
          tabs = tabParent.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector);

    const hideTabsContent = () => {
        tabs.forEach((tab) => {
            tab.classList.remove(activeClass);  
        });
        tabsContent.forEach(item => {
            item.classList.remove('show');
            item.classList.add('hide');
        });
    };

    const showTabsContent = (i = 0) => {
        tabs[i].classList.add(activeClass);
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show');
    };

    hideTabsContent();
    showTabsContent();

    tabParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((tab, i) => {
                if(target == tab) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
    // calculates time intervals from the time left to final date and returnes the object of time intervals

    function makeTimeIntervals(date) {
        let now = new Date();
        let diff = date.getTime() - now.getTime();
            
        let seconds =  Math.floor(diff / 1000) % 60;
        let minutes = Math.floor(diff / (1000 * 60)) %  60;
        let hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
        let days = Math.floor(diff / (1000 * 60 * 60 * 24));

        return {
            'diff': diff,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    // adds caption with the right ending below each timer part

    function makeCaptions(timerPart, interval, forOne, for_2_3_4, forOthers) {
        let caption = timerPart.parentElement.querySelector('div');
        let lastDigit = interval;

        if (interval < 10 || interval > 20) {
            lastDigit = interval % 10;
        } 
        switch (lastDigit) {
            case 1:
                caption.textContent = forOne;
                break;
            case 2:
            case 3:
            case 4:
                caption.textContent = for_2_3_4;
                break;
            default: 
                caption.textContent = forOthers;
                break;
            }
    }

    // adds zero before a single digit

    function addForwardZero(num) {
        if (num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    // assigns digits of a certain time interval to appropriate part of timer

    function makeDigits(timerPart, interval) {
        timerPart.textContent = addForwardZero(interval);
    }

    function setTime(id, deadline) {
        const parent = document.querySelector(id);
        const finalDate = new Date(deadline);
        const days = parent.querySelector('#days'),
              hours = parent.querySelector('#hours'),
              minutes = parent.querySelector('#minutes'),
              seconds = parent.querySelector('#seconds');
        
        // run a function first time to avoid delay due to setInterval function
        let timer;
        updateTime();

        timer = setInterval(updateTime, 1000);
        
        // runs all finctions for setting right time in timer block
        function updateTime() {
            let timeIntervals = makeTimeIntervals(finalDate);
            if (timeIntervals.diff <= 0) {

                days.innerHTML = '00';
                hours.innerHTML = '00';
                minutes.innerHTML = '00';
                seconds.innerHTML = '00';

                days.parentElement.querySelector('div').innerHTML = 'дней';
                hours.parentElement.querySelector('div').innerHTML = 'часов';
                minutes.parentElement.querySelector('div').innerHTML = 'минут';
                seconds.parentElement.querySelector('div').innerHTML = 'секунд';

                clearInterval(timer);

            } else {

                makeDigits(days, timeIntervals.days);
                makeDigits(hours, timeIntervals.hours);
                makeDigits(minutes, timeIntervals.minutes);
                makeDigits(seconds, timeIntervals.seconds);
    
                makeCaptions(days, timeIntervals.days, 'день', 'дня', 'дней');
                makeCaptions(hours, timeIntervals.hours, 'час', 'часа', 'часов');
                makeCaptions(minutes, timeIntervals.minutes, 'минута', 'минуты', 'минут');
                makeCaptions(seconds, timeIntervals.seconds, 'секунда', 'секунды', 'секунд');
            }
        }
    }
    // sets a timer in a certain parent element
    setTime(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);




/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRequest": () => (/* binding */ getRequest),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const result = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        body: data
    });
    if (!result.ok) {
        throw new Error (`Could not upload data on resourse ${url}, error: ${result.status}`);
    }
    return await result.json();
};

const getRequest = async (url) => {
    const result = await fetch(url);
    return await result.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calculator */ "./src/js/modules/calculator.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/form */ "./src/js/modules/form.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");












document.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(()=> {(0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.showModal)('.modal', modalTimerId, addEndPagePopUp);}, 20000);
    function addEndPagePopUp() {
        (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.endPagePopUp)('.modal', modalTimerId, addEndPagePopUp);
    }
    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_form__WEBPACK_IMPORTED_MODULE_2__["default"])('form', '.modal', modalTimerId, addEndPagePopUp);
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', modalTimerId, addEndPagePopUp);
    window.addEventListener('resize', () => {
        (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
            parentSelector: '.offer__slider',
            wrapperSelector: '.offer__slider-wrapper',
            innerSelector: '.offer__slider-inner',
            slideSelector: '.offer__slide',
            prevArrow: '.offer__slider-prev',
            nextArrow: '.offer__slider-next',
            totalCounter: '#total',
            currentCounter: '#current' 
        });
    });
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
        parentSelector: '.offer__slider',
        wrapperSelector: '.offer__slider-wrapper',
        innerSelector: '.offer__slider-inner',
        slideSelector: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        totalCounter: '#total',
        currentCounter: '#current' 
    });
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer','2022-08-12');
});



})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map