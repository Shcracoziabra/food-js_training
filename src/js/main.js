"use strict";

import calculator from './modules/calculator';
import cards from './modules/cards';
import form from './modules/form';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {showModal} from './modules/modal';
import {endPagePopUp} from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(()=> {showModal('.modal', modalTimerId, addEndPagePopUp);}, 20000);
    function addEndPagePopUp() {
        endPagePopUp('.modal', modalTimerId, addEndPagePopUp);
    }
    calculator();
    cards();
    form('form', '.modal', modalTimerId, addEndPagePopUp);
    modal('[data-modal]', '.modal', modalTimerId, addEndPagePopUp);
    window.addEventListener('resize', () => {
        slider({
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
    slider({
        parentSelector: '.offer__slider',
        wrapperSelector: '.offer__slider-wrapper',
        innerSelector: '.offer__slider-inner',
        slideSelector: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        totalCounter: '#total',
        currentCounter: '#current' 
    });
    tabs('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
    timer('.timer','2022-08-12');
});


