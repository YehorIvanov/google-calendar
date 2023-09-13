import { setItem } from "../common/storage.js";
import { updateCalendar } from "../index.js";


const setingsBtnElem = document.querySelector('.setings');
const  setingsContentOkBtn = document.querySelector('.setings__content-ok-btn');

    const onColorChenge = (event) => {
        event.stopPropagation();
        const radioElemValue = event.target.value;
        // console.log(radioElemValue);
        switch (radioElemValue) {
            case 'blue':
                console.log('blue');
                setItem('akcentColor', radioElemValue);
                break;
            case 'red':
                setItem('akcentColor', radioElemValue);
                break;
            case 'green':
                setItem('akcentColor', radioElemValue);
                break;
            default:
                break;
        }
    };

export const closeSetingsModal = () => {
    setingsBtnElem.classList.toggle('hidden');
    updateCalendar();
    setingsContentOkBtn.removeEventListener('click', closeSetingsModal);

};

export const openSetingsModal = () => {
    console.log('settings clicked');
    setingsBtnElem.classList.toggle('hidden');
    setingsContentOkBtn.addEventListener('click', closeSetingsModal);
    const setingsColorContentElem = document.querySelector('.setings-color__content');
    setingsColorContentElem.addEventListener('click', onColorChenge);
    
}

