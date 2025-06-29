document.addEventListener("DOMContentLoaded", function () {

    //закрытие и открытие поля с добавленными артефактами
    const field = document.querySelector(".field")
    const fieldToggle = document.getElementById("field_open_close_but")
    const count = document.getElementById("count")

    fieldToggle.style.backgroundImage = "url('./img/open_field_but.svg')"

    fieldToggle.addEventListener("click", () => {
        if (fieldToggle.style.backgroundImage.includes('open_field_but.svg')) {
            fieldToggle.style.backgroundImage = "url('./img/close_field_but.svg')"
        } else {
            fieldToggle.style.backgroundImage = "url('./img/open_field_but.svg')"
        };
        field.classList.toggle("hidden")
    })

    //возвращение к выбору артефактов
    document.addEventListener("click", (e) => {
        if (e.target && e.target.id === "back_to_artifacts") {
            field.classList.toggle("hidden");
        }
    });

    //адаптация выравнивание под количество объектов
    function adjustAlignment() {
        const fieldArtifacts = artifactsField.querySelectorAll(".artifact");
        let totalWidth = 0;
        fieldArtifacts.forEach(div => {
            totalWidth += div.offsetWidth + parseInt(getComputedStyle(div).marginRight) + parseInt(getComputedStyle(div).marginLeft);
        });

        const windowWidth = window.innerWidth;

        if (totalWidth > windowWidth) {
            artifactsField.style.justifyContent = "flex-start";
        } else {
            artifactsField.style.justifyContent = "center";
        }
    }

    count.addEventListener("click", () => {
        if (fieldToggle.style.backgroundImage.includes('open_field_but.svg')) {
            fieldToggle.style.backgroundImage = "url('./img/close_field_but.svg')"
        } else {
            fieldToggle.style.backgroundImage = "url('./img/open_field_but.svg')"
        };
        field.classList.toggle("hidden")
    })

    const artifactsField = document.getElementById('selected_artifacts');
    const artifactsCount = document.getElementById('artifacts_number');
    const totalPrice = document.getElementById('total_price');
    const fieldButs = document.getElementById('field_buts');

    function updateUI() {
        const selectedArtifacts = artifactsField.querySelectorAll(".artifact");
        artifactsCount.textContent = selectedArtifacts.length;

        let total = 0;
        selectedArtifacts.forEach(artifact => {
            const price = parseInt(artifact.dataset.price, 10 || 0);
            total += price;
        })

        totalPrice.textContent = total;

        fieldButs.innerHTML = '<button id="pay_but">Оплатить</button>';

        if (selectedArtifacts.length === 0) {
            artifactsField.innerHTML = '<p id="placeholder_text">Поле пока не заполнено</p>';
            fieldButs.innerHTML = '<button id="back_to_artifacts">Вернуться к выбору</button>';
        } else {
            const placeholder = document.getElementById('placeholder_text');
            if (placeholder) {
                placeholder.remove();
            }
        }

        adjustAlignment();
    }

    document.getElementById('artifacts').addEventListener('click', function (e) {
        if (e.target.classList.contains('add_artifact_but')) {
            const originalArtifact = e.target.closest('.artifact');
            const clonedArtifact = originalArtifact.cloneNode(true);

            const button = clonedArtifact.querySelector('.add_artifact_but');
            button.textContent = 'удалить из поля';
            button.addEventListener('click', () => {
                clonedArtifact.remove();
                updateUI();
            });

            if (artifactsField.textContent.includes('Поле пока не заполнено')) {
                artifactsField.textContent = '';
            }

            artifactsField.appendChild(clonedArtifact);
            updateUI();
        }
    });

    window.onload = adjustAlignment;
    window.onresize = adjustAlignment;


    function initDragAndDropArtifacts() {
        document.querySelectorAll('.artifact img').forEach(img => {
            img.addEventListener('mousedown', handleStart);
            img.addEventListener('touchstart', handleStart, { passive: false });
        });

        function handleStart(e) {
            e.preventDefault();

            const isTouch = e.type === 'touchstart';
            const startX = isTouch ? e.touches[0].pageX : e.pageX;
            const startY = isTouch ? e.touches[0].pageY : e.pageY;

            const originalImg = e.target;
            const artifact = originalImg.closest('.artifact');

            const dragImg = originalImg.cloneNode(true);
            dragImg.style.position = 'fixed';
            dragImg.style.pointerEvents = 'none';
            dragImg.style.width = '150px';
            dragImg.style.zIndex = '5';
            dragImg.style.opacity = '0.9';
            dragImg.classList.add('drag-clone');

            document.body.appendChild(dragImg);

            moveAt(startX, startY);
            const field = document.querySelector('.field');

            function moveAt(x, y) {
                dragImg.style.left = x - 75 + 'px';
                dragImg.style.top = y - 75 + 'px';
            }

            const fieldRect = field.getBoundingClientRect();

            function handleMove(ev) {
                const pageX = isTouch ? ev.touches[0].pageX : ev.pageX;
                const pageY = isTouch ? ev.touches[0].pageY : ev.pageY;
                moveAt(pageX, pageY);
            }

            function handleEnd(ev) {
                document.removeEventListener('mousemove', handleMove);
                document.removeEventListener('mouseup', handleEnd);
                document.removeEventListener('touchmove', handleMove);
                document.removeEventListener('touchend', handleEnd);
                dragImg.remove();

                const endX = isTouch ? ev.changedTouches[0].clientX : ev.clientX;
                const endY = isTouch ? ev.changedTouches[0].clientY : ev.clientY;
                const field = document.querySelector('.field');
                const fieldRect = field.getBoundingClientRect();

                if (
                    endX >= fieldRect.left &&
                    endX <= fieldRect.right &&
                    endY >= fieldRect.top &&
                    endY <= fieldRect.bottom
                ) {
                    const clonedArtifact = artifact.cloneNode(true);
                    const button = clonedArtifact.querySelector('.add_artifact_but');
                    button.textContent = 'удалить из поля';
                    button.addEventListener('click', () => {
                        clonedArtifact.remove();
                        updateUI();
                    });

                    if (artifactsField.textContent.includes('Поле пока не заполнено')) {
                        artifactsField.textContent = '';
                    }
                    document.getElementById('selected_artifacts').appendChild(clonedArtifact);
                    updateUI();
                }
            }

            document.addEventListener('mousemove', handleMove);
            document.addEventListener('mouseup', handleEnd);
            document.addEventListener('touchmove', handleMove);
            document.addEventListener('touchend', handleEnd);
        }
    }

    window.addEventListener('DOMContentLoaded', initDragAndDropArtifacts);

});
