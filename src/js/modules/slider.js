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

export default slider;