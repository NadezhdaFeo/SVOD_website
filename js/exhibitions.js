document.addEventListener("DOMContentLoaded", function () {
    // ––– Открытие информации о выставке –––
    const descripBlock = document.querySelector(".about_exhibition");
    const imageContainers = document.querySelectorAll(".exhib_img");

    const descriptions = {
        'exhib_1': {
            title: "выставка",
            time: "30.01 – 30.05.25",
            name: "Связывая отголоски <br> 1930-х годов",
            image: "./img/exhib_1_img_1.png",
            text: "Это уникальное аудиопространство, посвящённое трагическим страницам истории 1930-х годов: массовым репрессиям, строительству канала Москва–Волга, жизни и страданиям людей, сосланных в ГУЛАГ. Через звуковые инсталляции, основанные на архивных материалах, воспоминаниях, документальных записях и звуковых реконструкциях, посетители смогут погрузиться в атмосферу эпохи, где молчание говорит громче слов.  <br> <br> Концепция выставки строится на силе звука как медиума, способного пробуждать эмоциональную память и формировать сопричастность. Здесь нет экспонатов за стеклом — вместо этого звучат фрагменты судеб, шум лагерных бараков, железнодорожный гул, отрывки писем, дыхание исторического времени. «Память звука» не только возвращает голоса забытым, но и ставит важные вопросы о нашем сегодняшнем отношении к прошлому, ответственности и памяти. <br><br> Выставка создана в коллаборации с Музеем истории ГУЛАГа — учреждением, которое на протяжении многих лет занимается сохранением и осмыслением памяти о репрессиях советского времени. Совместная работа художников, звуковых режиссёров и исследователей музея позволила создать инсталляции, в которых историческая достоверность сочетается с художественной выразительностью. Пространство выставки задумано как маршрут — от документального звука к личной тишине, от коллективной травмы к внутреннему размышлению. <br><br> Авторы: <br> Сергей Астахов, Мария Воскресенская, Дарья Кривцова <br><br> Кураторы: <br> Андрей Ермаков, Евгения Толкачёва"
        },
        'exhib_2': {
            title: "выставка",
            time: "25.05 – 15.08.25",
            name: "Череда затмений: <br> история звукозаписи",
            image: "./img/exhib_2_img_1.svg",
            text: "Выставка «Череда затмений: история звукозаписи» – это исследование того, как каждый новый формат музыкальных носителей — от грампластинок до цифровых потоковых сервисов — открывал новую эпоху и менял способы взаимодействия со звуком и музыкой, погружая слушателя в звучание своего времени. <br><br>«Череда затмений» не только отражает прошлое, но и заставляет задуматься о будущем звукозаписи. Каковы будут следующие изменения в звуковых технологиях? Как новые инструменты и платформы повлияют на музыкальное творчество и слушание? Выставка углубляет понимание звукозаписи и ее культурного влияния, приглашая каждого участника стать частью динамично развивающейся истории звука. <br><br> Авторы: <br> Сергей Астахов, Мария Воскресенская, Дарья Кривцова <br><br> Кураторы: <br> Андрей Ермаков, Евгения Толкачёва"
        },
        'exhib_3': {
            title: "выставка",
            time: "28.08 – 22.10.25",
            name: "Звуковые этюды <br> Северной Осетии",
            image: "./img/exhib_3_img_2.png",
            text: "Звуковые этюды Северной Осетии — это выставка-путешествие, собранная из полевых звукозаписей и визуальных наблюдений, сделанных участниками совместной экспедиции сотрудников СВОДа и группы исследователей-энтузиастов. В течение нескольких недель они фиксировали звучание повседневной и обрядовой жизни, горных ландшафтов, уличной речи, традиционных песнопений и природных тишин, характерных для разных районов Северной Осетии. В результате родилась звуковая карта, передающая живую ткань региона не через рассказы, а через само звучание — тонкое, глубокое, непосредственное. <br> <br> В центре внимания выставки — звуковая среда как выразитель культурного кода. Этюды не столько документируют, сколько предлагают вслушаться: в ритмы сёл и ущелий, в голос живой традиции, в незаметные звуковые переходы между прошлым и настоящим. Выставка соединяет поле и город, аудио и визуальное, случайное и осмысленное — и приглашает посетителей не столько смотреть, сколько слышать. <br> <br> Этот проект стал возможен благодаря тесному взаимодействию исследовательской и творческой команд. Он продолжает практику Центра познания звука, направленную на изучение и художественное переосмысление звуковой среды как части культурного наследия. Это не только выставка, но и результат совместного опыта, внимания и открытости к звучащему миру. <br> <br>Кураторы <br> Белов Александр, Олеся Софронова, Дмитрий Панин <br> <br> Участники <br> Борис Рябов, Клавдия Демина, Евдокия Кулешова, Дана Крюкова, Даниил Владимиров, Ярослав Юдин, Аркадий Шестаков, Владимир Булгаков, Владислав Сороков"
        }
    };

    function showDescription(id) {
        const data = descriptions[id];
        if (!data) return;

        descripBlock.innerHTML = `
        <h1>${data.title}</h1>
        <h2>${data.time}</h2>
        <h3>${data.name}</h3>
        <img src="${data.image}" alt="${data.title}" />
        <p>${data.text}</p>`
            ;

        descripBlock.classList.remove("hidden");
        descripBlock.scrollTop = 0;
        descripBlock.scrollIntoView({ behavior: "smooth", block: "start" });

        currentVisibleId = id;
        suppressAutoHide = true;

        // Даю время, чтобы scroll завершился
        setTimeout(() => {
            suppressAutoHide = false;
        }, 800);
    }

    imageContainers.forEach((container) => {
        const id = container.dataset.id;

        container.addEventListener("click", () => {
            showDescription(id);
        });

        const button = container.parentElement.querySelector(".show_description_button");
        if (button) {
            button.addEventListener("click", (e) => {
                e.stopPropagation();
                showDescription(id);
            });
        }
    });

    // Проверка полной видимости блока
    function checkLineUpFullyVisible() {
        if (suppressAutoHide) return;

        const lineUp = document.getElementById("line_up");
        const rect = lineUp.getBoundingClientRect();

        const fullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

        if (fullyVisible) {
            descripBlock.classList.add("hidden");
            currentVisibleId = null;
        }
    }

    // Дебаунс scroll-проверки
    let scrollCheckTimeout = null;

    window.addEventListener("scroll", () => {
        clearTimeout(scrollCheckTimeout);
        scrollCheckTimeout = setTimeout(() => {
            checkLineUpFullyVisible();
        }, 100);
    });

    // ––– Анимация при загрузки страницы –––
    const loader = document.getElementById('loader');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    let animationInterval = null;

    function generateGrid() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // Задаём желаемое количество колонок
        const desiredCols = isTouchDevice ? 5 : 12;

        // Вычисляем размер клетки (целочисленный px)
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

    window.addEventListener('load', () => {
        const loaderAlreadyShown = sessionStorage.getItem('loaderShown');

        if (loaderAlreadyShown === 'true') {
            loader.style.display = 'none';
            sessionStorage.removeItem('loaderShown')
            return;
        }

        generateGrid();

        if (isTouchDevice) {
            startMobileAnimation();
        } else {
            window.addEventListener('mousemove', rotateToCursor);
        }

        loader.addEventListener('click', () => {
            sessionStorage.setItem('loaderShown', 'true');
            setTimeout(() => {
                setTimeout(() => {
                    loader.classList.add('loader_hidden')
                }, 400)
                loader.classList.add('loader_fade-out');
            }, 200);
        });

    });

});