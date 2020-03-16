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

// slider

let slides = document.querySelectorAll('.slide');
let currentSlide = 0;
let isEnabled = true;

function changeCurrentSlide(n) {
    currentSlide = (n + slides.length) % slides.length;
}

function hideSlide (direction) {
    isEnabled = false;
    slides[currentSlide].classList.add(direction);
    slides[currentSlide].addEventListener('animationend', function(){
        this.classList.remove('active', direction);
    })
}

function showSlide (direction) {
    slides[currentSlide].classList.add('next', direction);
    slides[currentSlide].addEventListener('animationend', function(){
        this.classList.remove('next', direction);
        this.classList.add('active'); 
        isEnabled = true;
    })
}

function previousSlide(n) {
    hideSlide('to-right');
    changeCurrentSlide(currentSlide - 1);
    showSlide('from-left');
}

function nextSlide(n) {
    hideSlide('to-left');
    changeCurrentSlide(currentSlide + 1);
    showSlide('from-right');
}

document.querySelector('.control.left').addEventListener('click', function(){
    if(isEnabled){
        previousSlide(currentSlide); 
    } 
})

document.querySelector('.control.right').addEventListener('click', function(){
    if(isEnabled){
        nextSlide(currentSlide);
    } 
})

// iPhone pisplay animation



document.querySelector('.slide__container').addEventListener('click', function(event) {

    let clickedElement = event.target;

    if(clickedElement.getAttribute('class') == 'iPhone__button'){
        let phoneDisplay = clickedElement.parentElement.querySelector('.iPhone__display');
        if(phoneDisplay.classList.contains('off')){
            phoneDisplay.classList.remove('off');
        }else{
            phoneDisplay.classList.add('off');
        }
    }
})

// modal window

function validInput(inputElement, regex, hintElement, hintMessage){

    let inputText = inputElement.value;

    if(inputElement.hasAttribute('required') && inputText === ''){
        hintElement.innerText = 'Заполните поле';
        hintElement.classList.add('active');
        return false;
    }

    if(!regex.test(inputText)){
        hintElement.innerText = hintMessage;
        hintElement.classList.add('active');
        return false;
    }

    hintElement.classList.remove('active');
    return true;
}

function fillModal(subject, description){

    if(subject === ''){
        subject = 'Без темы';
    }
    
    if(description === ''){
        description = 'Без описания';
    }

    document.querySelector('#resalt_subject').innerText = subject;
    document.querySelector('#resalt_description').innerText = description;
}

function  cleanForm(form){
    form.querySelectorAll('input').forEach((item) => item.value = '');
    form.querySelectorAll('textarea').forEach((item) => item.value = '');
}

document.querySelector('#button_send').addEventListener('click', function(event){

    event.preventDefault();

    let nameInput = document.querySelector('#name');
    let nameHint = document.querySelector('#name-hint')
    let emailInput = document.querySelector('#email');
    let emailHint = document.querySelector('#email-hint');

    if( validInput(nameInput, new RegExp(`[A-Za-z ]+`), nameHint, 'Поле должно содержать только буквы и пробелы') && 
        validInput(emailInput, new RegExp(`^(\\w+([\\.-]?\\w+)*@\\w+\\.[A-Za-z]+)$`), emailHint, 'Поле должно иметь формат template@gmail.com')){

        let subject = document.querySelector('#subject').value.toString();
        let description = document.querySelector('#description').value.toString();


        fillModal(subject, description);
        cleanForm(document.querySelector('#quote-form'));
        
        document.querySelector('.modal').classList.add('active');
    }
})

document.querySelector('#modal__button').addEventListener('click', function(){
    document.querySelector('.modal').classList.remove('active');
})
