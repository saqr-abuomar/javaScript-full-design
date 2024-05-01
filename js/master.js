//toggle settings box
let settingBoxButton = document.querySelector('.fa-gear');

settingBoxButton.onclick = function () {
    
    this.classList.toggle('fa-spin');
    
    document.querySelector('.setting-box').classList.toggle('active-setting-box');
};    
/* #################################--function-section--################################## */
//handle the active class on the links
function handleActiveClass(ev){

    ev.target.parentElement.querySelectorAll('.active').forEach( (ele) => {
        ele.classList.remove('active');
    });
    ev.target.classList.add('active');      
    
    
}

/* #################################--function-section--################################## */



/* #################################--Local-storage-section--################################## */
// localStorage.clear();

//check if there is a local storage color option
if(localStorage.getItem('color-option')){
    
    document.documentElement.style.setProperty('--main-color', localStorage.getItem('color-option'));
    
    document.querySelectorAll('.colors-list-item').forEach( (li) => {
        
        li.classList.remove('active');
        
        if(li.dataset.color === localStorage.getItem('color-option')){
            li.classList.add('active');
        }

    });
}

//backgroundOption for change background image
let backgroundOption = true;

let backgroundInterval ;

//check if there is a local storage background option
let backgroundLocalItem = localStorage.getItem('background-option');

if(backgroundLocalItem){
    //back
    document.querySelectorAll('.random-backgrounds .general-buttons').forEach( (span) => {
        
        span.classList.remove('active');
        
    });

    if(backgroundLocalItem === 'true'){

        document.querySelector("[data-background='yes']").classList.add('active');
        backgroundOption = true;


    }else{
        document.querySelector("[data-background='no']").classList.add('active');
        backgroundOption = false;

    }


    
}


//check if there is a local storage bullets option

if(localStorage.getItem('bullets-option')){
        
        document.querySelectorAll('.bullets-option .general-buttons').forEach( (span) => {
            span.classList.remove('active');  
        });
    
        if(localStorage.getItem('bullets-option') === 'block'){
            document.querySelector("[data-bullets='show']").classList.add('active');
        }
        else {
            document.querySelector("[data-bullets='hide']").classList.add('active');
        }
        document.querySelector('.nav-bullets').style.display = localStorage.getItem('bullets-option');
}


/* #################################--Local-storage-section--################################## */
//switch colors box 
let colorsLi = document.querySelectorAll(".colors-list-item");

colorsLi.forEach( (li) => {
    li.addEventListener('click', (e) => {
        // colorsLi.forEach( (li) => {
            
        //     li.classList.remove('active');
        
        // });
        // e.currentTarget.classList.add('active');
        handleActiveClass(e);
        /* another way to remove active

        li.target.parentElement.querySelectorAll('.colors-list-item').forEach( (li) => {
            li.classList.remove('active');
        });
        
        */
        
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        
        localStorage.setItem('color-option', e.target.dataset.color);
    });
});

//switch background option
let optionSpan = document.querySelectorAll(".random-backgrounds .general-buttons");

optionSpan.forEach( (span) => {
    span.addEventListener('click', (e) => {
        // optionSpan.forEach( (span) => {

        //     span.classList.remove('active');

        // });
        // e.currentTarget.classList.add('active');
        handleActiveClass(e);

        /* another way to remove active

        span.target.parentElement.querySelectorAll('.colors-list-item').forEach( (li) => {
            span.classList.remove('colors-list-item-active');
        });
        
        */

        //another way if(e.currentTarget.classList.contains('no')){
        if(e.currentTarget.dataset.background === 'no'){
            
            backgroundOption = false;
            
            clearInterval(backgroundInterval);

            localStorage.setItem('background-option', false);
            
        }else{
            
            backgroundOption = true;
            
            setBackgroundInterval();

            localStorage.setItem('background-option', true);
        }

        //another way
        // if(e.currentTarget.innerrHtml === "No"){
        // clearInterval(backgroundInterval);
        // console.log('No');
        // }else{
        //     // backgroundInterval = setBackgroundInterval(5000);
        // }
    });
});

//start change background image
//get the landing page
let landingPage = document.querySelector('.landing-page');

//get the array of images
let imgsArray = ['test1.jpg', 'test2.jpg', 'test3.jpg', 'test4.jpg', 'test5.jpg','test6.jpg','test7.jpg'];

//function to change the background image
function setBackgroundInterval(){

    if(backgroundOption){
        
    backgroundInterval = setInterval (() => {
        //get random number
        let randomNumber = Math.floor(Math.random() * imgsArray.length);
        //change the background image url
        landingPage.style.backgroundImage = 'url("img/' + imgsArray[randomNumber] + '")';
    }, 60000);   

    }
}
setBackgroundInterval();

//end change background image


//start skills section
let ourSkills = document.querySelector('.our-skills');

window.onscroll = function () {
    //skills offset top
    let skillsOffsetTop = ourSkills.offsetTop;
    console.log(skillsOffsetTop);

    //skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight;
    console.log(skillsOuterHeight);

    //window height
    let windowHeight = this.innerHeight;
    console.log(windowHeight);
    
    //window scroll top
    let windowScrollTop = this.pageYOffset;
    console.log(windowScrollTop);


    if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){

        let allSkills = document.querySelectorAll('.skill-progress-bar');
        allSkills.forEach( (skill) => {
            skill.style.width = skill.dataset.progress;
        });
    }
}


//click on the gallery image
let ourGallery = document.querySelectorAll('.box-image-img');

ourGallery.forEach( (img) => {

    img.addEventListener('click', (e) => {
        let overlay = document.createElement('div');
        overlay.className = 'overlay-images';
        //append overlay to the body on each click om the image
        document.body.appendChild(overlay);

        //create the popup box
        let popupBox = document.createElement('div');
        popupBox.className = 'popup-box';

        //create header
        if(img.alt){
            let imgHeader = document.createElement('h3');
            imgHeader.className = 'img-header';
            imgHeader.innerHTML = img.alt;
            popupBox.append(imgHeader);
        }

        //clone the image
        let cloneImg = img.cloneNode(true);
        // cloneImg.classList.remove('box-image-img');
        cloneImg.classList.add('popup-img');

        //append the image to the popup box
        popupBox.appendChild(cloneImg);

        //create close button
        let closeButton = document.createElement('span');
        closeButton.className = 'close-button';
        closeButton.innerHTML = 'X';
        popupBox.appendChild(closeButton);

        //close on click on the close button
        closeButton.addEventListener('click', () => {
            overlay.remove();
            popupBox.remove();
        });
        
        document.body.appendChild(popupBox);



        //close on click on the overlay
        overlay.addEventListener('click', () => {
            overlay.remove();
            popupBox.remove();
        });

    });

});

//select all bullets 
let bullets = document.querySelectorAll('.bullets');
//select  all links
let links = document.querySelectorAll('.header-menu-list-item-link');
    

function scrollToSection(element){
    element.forEach( (ele) => {
        ele.addEventListener('click', (e) => {
            document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({
                // top: 0,
                behavior: 'smooth'
            });
        });
    });
}

scrollToSection(bullets);
scrollToSection(links);


//scroll to top button
function scrollToTop(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


//show or hide bullets
let bulletsOption = document.querySelectorAll('.bullets-option .general-buttons');

bulletsOption.forEach( (span) => {
    span.addEventListener('click', (e) => {
        // bulletsOption.forEach( (span) => {
        //     span.classList.remove('active');
        // });
        // e.target.classList.add('active');

        handleActiveClass(e);
        
        if(e.target.dataset.bullets === 'show'){
            document.querySelector('.nav-bullets').style.display = 'block';
            localStorage.setItem('bullets-option', 'block');
        } else{
            document.querySelector('.nav-bullets').style.display = 'none';
            localStorage.setItem('bullets-option', 'none');
        }

    });
});

//reset option button

let resetOption = document.querySelector('.reset-button');

resetOption.onclick = function () {
    localStorage.removeItem('color-option');
    localStorage.removeItem('background-option');
    localStorage.removeItem('bullets-option');
    window.location.reload();
}   

// toggle menu

let toggleMenu = document.querySelector('.toggle-menu');

toggleMenu.onclick = function () {
    // this.classList.toggle('menu-active');

    document.querySelector('.header-menu').classList.toggle('open');
}



