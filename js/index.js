document.addEventListener("DOMContentLoaded", function () {
    // ––– Общая для всех старниц механика скролла –––
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const map = document.getElementById('place_info');
    const slider = document.getElementById('slider');

    let lastScrollTop = 0;
    let scrollTimeout = null;
    let footerVisible = false;
    let mapVisible = false;
    let sliderVisible = false;

    const SCROLL_THRESHOLD = 50; // минимальная высота скролла, чтобы сработало скрытие 
    const DELTA = 5; // порог чувствительности

    // Наблюдение за видимостью футера, карты и слайдера, чтобы когда они видны, header был невиден
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const target = entry.target;

            if (target === footer) {
                footerVisible = entry.isIntersecting;
            }

            if (target === map) {
                mapVisible = entry.isIntersecting;
            }

            if (target === slider) {
                sliderVisible = entry.isIntersecting;
            }

            // Если либо футер, либо карта видимы — скрываем header
            if (footerVisible || mapVisible || sliderVisible) {
                header.classList.add('header-hidden');
            }
        });
    }, {
        root: null,
        threshold: [1.0, 1.0, 1.0] // порог видимости: 20% для карты, 40% для футера 
    });

    if (footer) observer.observe(footer);
    if (map) observer.observe(map);
    if (slider) observer.observe(slider);

    // Скролл-логика
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Пропускаем, если футер виден — шапка должна быть спрятана
        if (footerVisible || mapVisible || sliderVisible) return;

        // Игнорируем маленькие подёргивания
        if (Math.abs(currentScroll - lastScrollTop) <= DELTA) return;

        // Скрыть, если был скролл вниз и пройден порог 
        if (currentScroll > lastScrollTop && currentScroll > SCROLL_THRESHOLD) {
            header.classList.add('header-hidden');
        }
        // показать, если скролл вверх
        else if (currentScroll < lastScrollTop) {
            header.classList.remove('header-hidden');
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

        // Отображение шапки после остановки скролла
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (!footerVisible && !mapVisible && !sliderVisible) {
                header.classList.remove('header-hidden');
            }
        }, 400);
    });


    // ––– Анимация при загрузке страницы –––
    const loader = document.getElementById('loader');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    let animationInterval = null;

    function generateGrid() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // Задаём желаемое количество колонок
        const desiredCols = isTouchDevice ? 5 : 12;

        // Вычисляем размер клетки
        const cellSize = Math.floor(screenWidth / desiredCols);

        // Высчитываем строки, чтобы покрыть по высоте
        const cols = desiredCols;
        const rows = Math.ceil(screenHeight / cellSize);

        loader.style.gridTemplateColumns = `repeat(${cols}, ${cellSize}px)`;
        loader.innerHTML = '';

        for (let i = 0; i < cols * rows; i++) {
            const cell = document.createElement('div');
            cell.classList.add('loader-logo-element');
            loader.appendChild(cell);
        }

        // Обновляем CSS переменную для размеров
        document.documentElement.style.setProperty('--cell-size', `${cellSize}px`);
    }

    function rotateToCursor(e) {
        const items = document.querySelectorAll('.loader-logo-element');
        const clientX = e.clientX;
        const clientY = e.clientY;

        items.forEach(item => {
            const rect = item.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top;

            const dx = clientX - centerX;
            const dy = clientY - centerY;
            const angle = Math.atan2(dx, -dy) * (180 / Math.PI);

            item.style.transform = `rotate(${angle}deg)`;
        });
    }

    function startMobileAnimation() {
        const items = document.querySelectorAll('.loader-logo-element');
        if (items.length === 0) return;

        animationInterval = setInterval(() => {
            // Случайный индекс "центра внимания"
            const targetIndex = Math.floor(Math.random() * items.length);
            const target = items[targetIndex];
            const targetRect = target.getBoundingClientRect();
            const targetX = targetRect.left + targetRect.width / 2;
            const targetY = targetRect.top;

            // Все элементы поворачиваются к target
            items.forEach(item => {
                const rect = item.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top;

                const dx = targetX - centerX;
                const dy = targetY - centerY;
                const angle = Math.atan2(dx, -dy) * (180 / Math.PI);

                item.style.transform = `rotate(${angle}deg)`;
            });
        }, 800);
    }

    window.addEventListener('resize', () => {
        generateGrid();
        if (isTouchDevice) {
            if (animationInterval) clearInterval(animationInterval);
            startMobileAnimation();
        }
    });

    // ––– Общая для всех старниц механика открытия меню на мобильной версии –––

    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.nav_menu');
    const menuLinks = document.querySelectorAll('.nav_menu a');

    burger.addEventListener('click', () => {
        menu.classList.toggle('open');
        burger.classList.toggle('rotate');
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
            burger.classList.remove('rotate');
        });
    });

});
