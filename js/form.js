document.addEventListener("DOMContentLoaded", function () {
    // ––– Форма для отправки email –––
    const form = document.querySelector(".subscribe_form");
    const emailInput = document.querySelector(".email_input");
    const submitButton = form.querySelector('button');

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (emailInput.value.trim() !== "") {
            emailInput.value = "Спасибо за подписку!";
            emailInput.style.color = "gray";
            emailInput.disabled = true;

            submitButton.style.color = "gray";
            submitButton.disabled = true;

            setTimeout(() => {
                emailInput.value = "";
                emailInput.style.color = "";
                emailInput.disabled = false;

                submitButton.style.color = "";
                submitButton.disabled = false;
            }, 1500);
        }
    });
})