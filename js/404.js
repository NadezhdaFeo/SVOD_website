document.addEventListener("DOMContentLoaded", function () {
    // ––– Анимация фона страницы –––
    const loader = document.getElementById('loader_404');
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
            cell.classList.add('loader-404-logo-element');
            loader.appendChild(cell);
        }

        // Обновляем CSS переменную для размеров
        document.documentElement.style.setProperty('--cell-size', `${cellSize}px`);
    }

    function rotateToCursor(e) {
        const items = document.querySelectorAll('.loader-404-logo-element');
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
        const items = document.querySelectorAll('.loader-404-logo-element');
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


    window.addEventListener('load', () => {

        generateGrid();

        if (isTouchDevice) {
            startMobileAnimation();
        } else {
            window.addEventListener('mousemove', rotateToCursor);
        }

    });

    function goBack() {
        if (document.referrer) {
            window.history.back()
        } else {
            window.location.href = "/"
        }
    }

    loader.addEventListener("click", () => (
        goBack()
    ));

});