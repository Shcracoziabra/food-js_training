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

export default calculator;