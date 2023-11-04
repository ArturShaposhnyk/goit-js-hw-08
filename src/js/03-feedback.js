import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const LS_KEY = 'feedback-form-state';
let formData = {};

form.addEventListener('input', throttle(handlerFormInput, 500));
form.addEventListener('submit', handlerFormSubmit);

const onload = () => {
  try {
    const data = localStorage.getItem(LS_KEY);
    if (!data) return;
    formData = JSON.parse(data);
    Object.entries(formData).forEach(([key, value]) => {
      form.elements[key].value = value;
    });
    console.log(formData);
  } catch (error) {
    console.log(error.message);
  }
};

onload();

function handlerFormInput(evt) {
  formData[evt.target.name] = evt.target.value.trim();
  localStorage.setItem(LS_KEY, JSON.stringify(formData));
}

function handlerFormSubmit(evt) {
  evt.preventDefault();
  localStorage.removeItem(LS_KEY);
  console.log(formData);
  formData = {};
  evt.target.reset();
}
