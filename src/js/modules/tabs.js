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

export default tabs;