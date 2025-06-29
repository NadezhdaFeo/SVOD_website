document.addEventListener("DOMContentLoaded", function () {
    // ––– Переключение аудиозаписей и отображение точек, где они были сделаны –––
    const navLine = document.getElementById("abrises_nav_line");
    const triangle = document.getElementById("abrises_nav_triangle");
    const placeP = document.getElementById("place");
    const timeP = document.getElementById("time");
    const coordsP = document.getElementById("coordinates");
    const soundButton = document.getElementById("sound_player_but");
    const pointsContainer = document.getElementById("abrises_points");

    let currentAudio = null;

    const abrisData = {
        abris_1: {
            place: "Ханты-Мансийский автономный округ, заболоченный лес",
            time: "28 августа 14:10 – 17:00",
            coordinates: "62°00’ с.ш., 73°25’ в.д.; 62°01’ с.ш., 73°27’ в.д.",
            audio: "./sounds/abris_1_khanty-mansiysk.mp3",
            position: { top: "17%", left: "69%" }
        },
        abris_2: {
            place: "Межселенные территории сургутского муниципального района",
            time: "12 апреля 15:43 – 16:50",
            coordinates: "61°56’ с.ш., 73°19’ в.д.; 61°57’ с.ш., 73°21’ в.д.; 61°56’ с.ш., 73°22’ в.д.; 61°55’ с.ш., 73°20’ в.д.; 61°57’ с.ш., 73°18’ в.д.;   ",
            audio: "./sounds/abris_2_surgut.mp3",
            position: { top: "16%", left: "70%" }
        },
        abris_3: {
            place: "Вторичный тропический лес бассейна реки Конго",
            time: "30 сентября 18:20 – 19:40",
            coordinates: "0°29’ ю.ш., 11°51’ в.д.; 0°26’ ю.ш., 11°56’ в.д.; 0°31’ ю.ш., 11°46’ в.д.;",
            audio: "./sounds/abris_3_congo.mp3",
            position: { top: "56.3%", left: "53.7%" }
        },
        abris_4: {
            place: "Леса префектуры Аомори",
            time: "29 августа 08:30 – 11:00",
            coordinates: "62°02’ с.ш., 73°28’ в.д.; 62°03’ с.ш., 73°30’ в.д.",
            audio: "./sounds/abris_4_japan.mp3",
            position: { top: "29%", left: "89%" }
        },
        abris_5: {
            place: "Сельва, влажные экваториальные леса, в бассейне реки Амазонки",
            time: "29 августа 15:20 – 18:10",
            coordinates: "2°35’ ю.ш., 51°12’ з.д.; 2. 2°32’ ю.ш., 51°12’ з.д.; 3. 2°39’ ю.ш., 51°12’ з.д.; 4. 2°35’ ю.ш., 51°10’ з.д.",
            audio: "./sounds/abris_5_brasil.mp3",
            position: { top: "60%", left: "37%" }
        }
    };

    const abrisNumbers = document.querySelectorAll(".abris_number");

    abrisNumbers.forEach(abris => {
        abris.addEventListener("click", () => {
            const id = abris.dataset.id;
            const data = abrisData[id];
            if (!data) return;

            const triangleCenter = triangle.getBoundingClientRect().left + triangle.offsetWidth / 2;
            const abrisCenter = abris.getBoundingClientRect().left + abris.offsetWidth / 2;
            const navLineCurrentTransform = parseFloat(navLine.style.transform?.match(/-?\d+\.?\d*/)?.[0] || 0);
            const shift = triangleCenter - abrisCenter;

            navLine.style.transform = `translateX(${navLineCurrentTransform + shift}px)`;

            placeP.textContent = data.place;
            timeP.textContent = data.time;
            coordsP.textContent = data.coordinates;

            if (currentAudio) currentAudio.pause();
            currentAudio = new Audio(data.audio);
            currentAudio.play();
            soundButton.innerHTML = "&#x23F8";

            createPulsingPoint(data.position.top, data.position.left);
        });
    });

    soundButton.addEventListener("click", () => {
        if (!currentAudio) return;
        if (currentAudio.paused) {
            currentAudio.play();
            soundButton.innerHTML = "&#x23F8";
        } else {
            currentAudio.pause();
            soundButton.innerHTML = "&#x23F5";
        }
    });

    let currentPulsePoints = [];
    let pulseTimeouts = [];

    function createPulsingPoint(top, left, count = 5, delay = 350) {

        currentPulsePoints.forEach(point => point.remove());
        currentPulsePoints = [];

        pulseTimeouts.forEach(point => clearTimeout(point));
        pulseTimeouts = [];

        for (let i = 0; i < count; i++) {
            const timeoutId = setTimeout(() => {
                const pulse = document.createElement("div");
                pulse.className = "pulse-point";
                pulse.style.top = top;
                pulse.style.left = left;

                pointsContainer.appendChild(pulse);
                currentPulsePoints.push(pulse);
            }, i * delay);

            pulseTimeouts.push(timeoutId);
        }
    }

    // ––– Слайдер с разворотами печатного издания –––
    const slider = new Splide('#slider', {
        pagination: false
    });
    slider.mount()

    // ––– Рисование на абрисе местности, реализованное с подключением Fabric.js –––
    const canvas = new fabric.Canvas('canvas', { width: 1400, height: 560, });

    var pencilSVG = `<svg width="45" height="46" viewBox="0 0 45 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_1125_2" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="45" height="46">
    <rect width="44.9126" height="45.0312" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_1125_2)">
    <rect x="29.3276" y="1.53262" width="19.8733" height="28.4225" transform="rotate(45 29.3276 1.53262)" fill="#0C9648" stroke="black" stroke-width="2"/>
    <path d="M7.37538 24.6237L20.2891 37.5374L2.34346 42.57L7.37538 24.6237Z" fill="#D9D9D9" stroke="black" stroke-width="2"/>
    <path d="M4.43901 35.0947L9.81758 40.4733L2.34324 42.5698L4.43901 35.0947Z" fill="#050505" stroke="black" stroke-width="2"/>
    <path d="M33.9336 5.93872L13.8239 26.0485" stroke="black" stroke-width="2"/>
    <path d="M38.1934 11.76L18.0836 31.8697" stroke="black" stroke-width="2"/>
    </g>
    </svg>`;

    var encodedSVG = window.btoa(pencilSVG);

    var pencilURL = "data:image/svg+xml;base64," + encodedSVG;

    canvas.freeDrawingCursor = `url(${pencilURL}) 2 45, auto`;

    const imageUrl = '../img/forest_abris.jpg';
    fabric.Image.fromURL(imageUrl, function (img) {
        img.set({
            left: 450,
            top: 50,
            selectable: false
        });
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    });

    const drawingMode = true;
    canvas.isDrawingMode = drawingMode;

    canvas.freeDrawingBrush.color = '#0C9648';
    canvas.freeDrawingBrush.width = 3;

    canvas.on('path:created', function (event) {
        console.log('Path created:', event.path);
    });

});