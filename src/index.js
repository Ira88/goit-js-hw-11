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
async function pixabay(name, page) {
    const API_URL = 'https://pixabay.com/api/';
    const options = {
        params: {
            key: '34615267-778b5b8fafbbabb997b2fc113',
            q: name,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true', 
            page: page,
            per_page: 40,
        },
    };
    try {
        const response = await axios.get(API_URL, options);
        notification(
            response.data.hits.length,
            response.data.total
        );
        createMarkup(response.data);
    } catch (error){
        console.log(error);
    }
}
