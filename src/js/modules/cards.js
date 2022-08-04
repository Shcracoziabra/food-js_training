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
export default cards;