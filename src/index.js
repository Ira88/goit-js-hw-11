import axios from "axios";
import Notiflix from 'notiflix';

const refs = {
    form: document.querySelector('.search-form'),
    input: document.querySelector('.input'),
    gallery: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.load-more'),
};
let page = 1;
refs.btnLoadMore.style.display = 'none';
refs.form.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', onBtnLoadMore);

function onSearch(evt) {
    evt.preventDefault();
    page = 1;
    refs.gallery.innerHTML = '';
    const name = refs.input.value.trim();
    if (name !== ''){
        pixabay(name);
    } else {
        refs.btnLoadMore.style.display = 'none';
        return Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
        );
    }
}
function onBtnLoadMore(){
    const name = refs.input.value.trim();
    page += 1;
    pixabay(name, page);
}
