const input = document.getElementById('input');
const carousel = document.querySelector('.carousel');
const carouselDot = document.getElementById('carousel-dot');
const leftBtn = document.querySelectorAll('.fa-angle-left');
const rightBtn = document.querySelectorAll('.fa-angle-right');
const imageAmount = document.getElementById('total');


input.addEventListener('change', () => {

        
        const files = [...document.getElementById('input').files];

        files.forEach(function(file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            const view = document.createElement('img');
            carousel.appendChild(view);
            view.setAttribute('draggable', 'false');
            
            reader.addEventListener("load", () => {
            // convert image file to base64 string
            console.log(reader)
            view.src = reader.result;         
            }, false);
        
            const newli = document.createElement('li');
            carouselDot.appendChild(newli);
            newli.classList.add('dot');
        })

        
      
        

        settingId();
        showImgByDot();

})



//setting img id
settingId();
function settingId() {
    let totalimg = document.querySelectorAll('img');
    let totaldot = document.querySelectorAll('.dot');
    let image = 0;
        for(let x = 0; x < totalimg.length; x++) {
            totalimg[x].setAttribute('data-id',x);        
            totaldot[x].textContent = image = x + 1;
        }
    imageAmount.textContent = image;
}

function btnshowImg(){
    leftBtn[0].style.display = 'none';
    rightBtn[0].style.display = 'none';
        if(carousel.scrollLeft > 0){
            leftBtn[0].style.display = "block";
        }
        if(Math.floor(carousel.scrollWidth - carousel.clientWidth) > carousel.scrollLeft) {
            rightBtn[0].style.display = "block";
        }
}
function moveRight() {
    carousel.scrollLeft += carousel.clientWidth; 
}
function moveLeft() {
    carousel.scrollLeft -= carousel.clientWidth;
}

leftBtn[0].addEventListener('click', moveLeft);
rightBtn[0].addEventListener('click', moveRight);
setInterval(btnshowImg, 300);

let draggable, prevPageX, prevScrollLeft, differPageX, slide;

function slideAuto() {
    if(carousel.scrollLeft < carousel.scrollWidth - carousel.clientWidth) {
        differPageX = Math.abs(differPageX);
        let imgWidth = Math.floor(document.querySelector('img').clientWidth);
        let positionDefer = imgWidth - differPageX;

        if(carousel.scrollLeft > prevScrollLeft) {
            carousel.scrollLeft += differPageX > imgWidth / 3 ? positionDefer : -differPageX;
        }else{
            carousel.scrollLeft -= differPageX > imgWidth / 3 ? positionDefer : -differPageX;
        }
    
    }

    
}

function dragStart(e) {
    draggable = true;
    
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
    carousel.classList.add('drag');
}

function dragMove(e) {
    if(draggable) {
        slide = true;
        e.preventDefault();
        differPageX = (e.pageX || e.touches[0].pageX) - prevPageX;
        carousel.scrollLeft = prevScrollLeft - differPageX;
        
    }
}

function dragEnd(e) {
    draggable = false;
    
    carousel.classList.remove('drag');if(!slide)return;
        slideAuto();
        slide =false;
}
//Destop
carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('mousemove', dragMove);
carousel.addEventListener('mouseup', dragEnd);
carousel.addEventListener('mouseleave', dragEnd);

//mobile

carousel.addEventListener('touchstart', dragStart);
carousel.addEventListener('touchmove', dragMove);
carousel.addEventListener('touchend', dragEnd);

//dot functions 


function showImgByDot() {
    let imgWidth = document.querySelector('img');
    let alldots = document.querySelectorAll('.dot');
    for(let x = 0; x < alldots.length; x++) {
        alldots[x].addEventListener('click', () => {
            carousel.scrollLeft = imgWidth.clientWidth * x;
        })
    }
}

//dot button show
function dotBtnShow() {
    leftBtn[1].style.display = 'none';
    rightBtn[1].style.display = "none";
    if(carouselDot.scrollLeft > 0) {
        leftBtn[1].style.display = 'block';
    }
    
    if((carouselDot.scrollWidth - carouselDot.clientWidth) > carouselDot.scrollLeft) {
        rightBtn[1].style.display = 'block';
    }

}

setInterval(dotBtnShow, 300);
function goLeft(){
    carouselDot.scrollLeft -= carouselDot.clientWidth;
}
function goRight(){
    carouselDot.scrollLeft += carouselDot.clientWidth;
}


leftBtn[1].addEventListener('click', goLeft);
rightBtn[1].addEventListener('click', goRight);
