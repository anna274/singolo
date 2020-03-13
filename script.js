const NAVIGATION = document.querySelector('.navigation');
const TAGS = document.querySelector('.portfolio__tags');
const PARTFOLIO_IMAGES = document.querySelector(".portfolio__images");
const PARTFOLIO_IMAGES_ALL = PARTFOLIO_IMAGES.querySelectorAll('.portfolio__images > img');
let prevScrollpos = window.pageYOffset;

//прокрутка страницы

window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.querySelector('.header').style.top = "0";
    } else {
        document.querySelector('.header').style.top = "-98px";
    }
    prevScrollpos = currentScrollPos;
}

//переключение ссылок навигации

NAVIGATION.addEventListener('click', (event) =>{
    let clickedElement = event.target;
    if(clickedElement.classList.contains('navigation__link')){
        NAVIGATION.querySelectorAll('.navigation__link').forEach(el => el.classList.remove('navigation__link_selected'));
        clickedElement.classList.add('navigation__link_selected');
    }
})

// переключение тегов

TAGS.addEventListener('click', (event) =>{
    TAGS.querySelectorAll('.tag').forEach(el => el.classList.remove('tag_selected'));
    event.target.classList.add('tag_selected');

    let imagesId = event.target.getAttribute("id");
    PARTFOLIO_IMAGES.querySelectorAll('img').forEach(el => el.classList.remove('image_selected'));
    if(imagesId == 'all'){
        PARTFOLIO_IMAGES.querySelectorAll('img').forEach(item => item.remove());
        PARTFOLIO_IMAGES.append(...PARTFOLIO_IMAGES_ALL);
    }else{
        PARTFOLIO_IMAGES.querySelectorAll(`#${imagesId}`).forEach(el =>{
            el.remove();
            PARTFOLIO_IMAGES.insertBefore(el, PARTFOLIO_IMAGES.childNodes[0]);
        });
    }
   
})

// выделение картинок в портфолио

PARTFOLIO_IMAGES.addEventListener('click', (event) =>{
    PARTFOLIO_IMAGES.querySelectorAll('img').forEach(el => el.classList.remove('image_selected'));
    if(event.target.tagName === 'IMG'){
        event.target.classList.add('image_selected');
    }  
})