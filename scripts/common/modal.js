const modalElem = document.querySelector('.modal');
const modalContentElem = document.querySelector('.modal__content');

export const openModal = () => {
    // const modalElem = document.querySelector('.modal');
    modalElem.classList.remove('hidden');
    const createEventCloseBtnElem = document.querySelector('.create-event__close-btn');
    createEventCloseBtnElem.addEventListener('click', closeModal);
};
export const closeModal = () => {
    // const modalElem = document.querySelector('.modal');
    modalElem.classList.add('hidden');
};

// опишите ф-ции openModal и closeModal
// модальное окно работает похожим на попап образом
// отличие в том, что попап отображается в месте клика, а модальное окно - по центру экрана
