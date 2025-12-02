document.addEventListener('DOMContentLoaded', () => {
    const leftArrow = document.getElementById('leftArrow');
    const rightArrow = document.getElementById('rightArrow');
    const menu = document.getElementById('menu');
    const menuWrapper = document.getElementById('menu-wrapper');

    let menuWrapperSize, menuSize, itemSize, distanceInPixels, maxScroll, currentScroll = 0;

    const updateSizes = () => {
        menuWrapperSize = menuWrapper.offsetWidth;
        menuSize = menu.scrollWidth;
        itemSize = document.getElementsByClassName('item')[0].offsetWidth;
        const itemsSpaceBetween = 20;
        distanceInPixels = itemSize + itemsSpaceBetween;
        maxScroll = menuSize - menuWrapperSize + itemsSpaceBetween;
    };

    const setMenuPosition = (position) => {
        menu.style.transform = `translateX(${-position}px)`;
    };

    const scrollMenu = (distance) => {
        currentScroll = Math.max(0, Math.min(currentScroll + distance, maxScroll));
        setMenuPosition(currentScroll);
    };

    leftArrow.addEventListener('click', () => scrollMenu(-distanceInPixels));
    rightArrow.addEventListener('click', () => scrollMenu(distanceInPixels));

    window.addEventListener('resize', () => {
        updateSizes();
        currentScroll = 0;
        setMenuPosition(currentScroll);
    });

    updateSizes();
});
