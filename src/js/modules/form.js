import {showModal, closeModal} from './modal';
import {postData} from '../services/services';

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

            
            postData('http://localhost:3000/requests', json)
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
        showModal(modalSelector, modalTimerId, listenerToRemove );
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
            closeModal(modalSelector);
        }, 3000);
    }
}
export default form;