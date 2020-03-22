const NAVIGATION = document.querySelector('.navigation');
const TAGS = document.querySelector('.portfolio__tags');
const PARTFOLIO_IMAGES = document.querySelector(".portfolio__images");
const PARTFOLIO_IMAGES_ALL = PARTFOLIO_IMAGES.querySelectorAll('.portfolio__images > img');
const HEADER = document.querySelector('.header');

function removeCollectionClass(collection, className){
    collection.forEach((el) => el.classList.remove(className));
}

//прокрутка страницы

document.addEventListener('scroll', switchNavigation);

function switchNavigation(event) {
    const curPos = window.scrollY;
    const divs =  document.querySelectorAll('body>div');
    const links = document.querySelectorAll('.header__navigation .navigation__link');

    divs.forEach((el)=>{   
        if(el.offsetTop - HEADER.offsetHeight <= curPos && (el.offsetTop + el.offsetHeight) > curPos){
            links.forEach((a) => {
                a.classList.remove('navigation__link_selected');
                if(el.getAttribute('id') === a.getAttribute('href').substring(1)){
                    a.classList.add('navigation__link_selected');
                }
            })
        }
    })
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

    removeCollectionClass(TAGS.querySelectorAll('.tag'), 'tag_selected')
    event.target.classList.add('tag_selected');

    let imagesId = event.target.getAttribute("id");
    removeCollectionClass(PARTFOLIO_IMAGES.querySelectorAll('img'),'image_selected');
    if(imagesId == 'all'){
        PARTFOLIO_IMAGES.append(...PARTFOLIO_IMAGES_ALL);
    }else{
        PARTFOLIO_IMAGES.querySelectorAll(`#${imagesId}`).forEach(el =>{
            PARTFOLIO_IMAGES.prepend(el);
        });
    }
})

// выделение картинок в портфолио

PARTFOLIO_IMAGES.addEventListener('click', (event) =>{

    if(event.target.tagName === 'IMG'){
        PARTFOLIO_IMAGES.querySelectorAll('img').forEach(el => {
            if(el === event.target){
                console.log(el.classList.toggle('image_selected'));
            }else{
                el.classList.remove('image_selected');
            }
            
        });
    } 
})

// slider

let slides = document.querySelectorAll('.slide');
let slider = document.querySelector('.slider');
let currentSlide = 0;
let isEnabled = true;

function changeSliderBackground(n){
    let slide = slides[(n + slides.length) % slides.length];
    let newBackground = window.getComputedStyle(slide, null).getPropertyValue("background-color");
    console.log(newBackground);
    slider.style.background = newBackground;
}

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
    changeSliderBackground(currentSlide - 1);
    hideSlide('to-right');
    changeCurrentSlide(currentSlide - 1);
    showSlide('from-left');
}

function nextSlide(n) {
    changeSliderBackground(currentSlide + 1);
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
        clickedElement.parentElement.querySelector('.iPhone__display').classList.toggle('off');
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

function validTextarea(textarea, maxlength, hintElement){
    let textLength = textarea.value.toString().length;

    if(textLength > maxlength){
        hintElement.innerText = `Допустимо не более ${maxlength} символов`;
        hintElement.classList.add('active');
        return false;
    }

    hintElement.classList.remove('active');
    return true;
}

function fillModal(subject, description){

    if(subject === ''){
        subject = 'Without subject';
    }
    
    if(description === ''){
        description = 'Without description';
    }

    document.querySelector('#resalt_subject').innerText = subject;
    document.querySelector('#resalt_description').innerText = description;
}

function  cleanForm(form){
    form.reset();
}

document.querySelector('#button_send').addEventListener('click', function(event){

    event.preventDefault();

    let nameInput = document.querySelector('#name');
    let nameHint = document.querySelector('#name-hint')
    let emailInput = document.querySelector('#email');
    let emailHint = document.querySelector('#email-hint');
    let description = document.querySelector('#description');
    let descriptionHint = document.querySelector('#description-hint');

    if( validInput(nameInput, new RegExp(`[A-Za-z ]+`), nameHint, 'Поле должно содержать только буквы и пробелы') && 
        validInput(emailInput, new RegExp(`^(\\w+([\\.-]?\\w+)*@\\w+\\.[A-Za-z]+)$`), emailHint, 'Поле должно иметь формат template@gmail.com')&&
        validTextarea(description, 10000, descriptionHint)){

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
