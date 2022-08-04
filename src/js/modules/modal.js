
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

export default modal;
export {showModal};
export {closeModal};
export {endPagePopUp};


