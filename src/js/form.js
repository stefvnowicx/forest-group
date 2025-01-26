const nameInput = document.querySelector(".contact__form-input#name");
const mailInput = document.querySelector(".contact__form-input#email");
const msgInput = document.querySelector(".contact__form-input#msg");
const submitBtn = document.querySelector(".contact__form-btn");
const inputs = [nameInput, mailInput, msgInput];
const popup = document.querySelector(".popup");
const popupBtn = document.querySelector(".popup__btn");

const showError = (input, message) => {
   const formBox = input.parentElement;
   const error = formBox.querySelector(".contact__form-error");
   error.textContent = message;
   error.style.display = "block";
};

const clearError = (input) => {
   const formBox = input.parentElement;
   const error = formBox.querySelector(".contact__form-error");
   error.style.display = "none";
};

const checkEmpty = (input) => {
   if (input.value.trim() === "") {
      let message = input.parentElement.querySelector(".contact__form-label").textContent;
      message = message.toLowerCase().includes("twoja wiadomość") ? "wiadomość" : message.toLowerCase();
      showError(input, `Pole ${message} nie może pozostać puste!`);
      return false;
   }
   return true;
};

const checkLength = (input, min) => {
   if (input.value.length < min) {
      const fieldName = input.parentElement.querySelector(".contact__form-label").textContent;
      showError(input, `${fieldName} musi mieć minimum ${min} znaków`);
      return false;
   }
   return true;
};

const checkEmail = (input) => {
   const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@((\d{1,3}\.){3}\d{1,3}|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if (!re.test(input.value.trim())) {
      showError(input, "Nieprawidłowy format adresu e-mail");
      return false;
   }
   return true;
};

// funckja do popup

const handlePopup = () => {
   popup.classList.add("popup--active");
};

// Główna funkcja walidacyjna
const validateForm = (inputs) => {
   let isValid = true;

   inputs.forEach((input) => {
      clearError(input);

      const isNotEmpty = checkEmpty(input);
      let fieldValid = isNotEmpty;

      if (isNotEmpty) {
         switch (input.type ? input.type : input.tagName.toLowerCase()) {
            case "text":
               fieldValid = checkLength(input, 3);
               break;
            case "email":
               fieldValid = checkEmail(input);
               break;
            case "textarea":
               fieldValid = checkLength(input, 15);
               break;
         }
      }

      if (!fieldValid) isValid = false;
   });

   return isValid;
};

// Obsługa stanu aktywnych pól
const handleActiveState = (inputs) => {
   inputs.forEach((input) => {
      input.addEventListener("input", () => {
         const label = document.querySelector(`label[for="${input.id}"]`);
         if (input.value.trim()) {
            input.classList.add("contact__form-input--active");
            label?.classList.add("contact__form-label--active");
         } else {
            input.classList.remove("contact__form-input--active");
            label?.classList.remove("contact__form-label--active");
         }
      });
   });
};

// Inicjalizacja
document.addEventListener("DOMContentLoaded", () => {
   handleActiveState(inputs);

   submitBtn.addEventListener("click", (e) => {
      e.preventDefault();

      if (validateForm(inputs)) {
         handlePopup();
         popupBtn.addEventListener("click", (e) => {
            window.location.reload(); // Przeładuj stronę
         });
      }
   });
});
