const track = document.querySelector('.carousel__track');
const slides =  Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right') ;
const prevButton = document.querySelector('.carousel__button--left') ;
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from (dotsNav.children);

const readmorecont = document.querySelector('.readmore')
const readmorecont2 = document.querySelector('.readmore2')

const slideWidth = slides [0].getBoundingClientRect().width;
// console.log(slideWidth);

const setSlidePosition = (slide, index)=>{
    slide.style.left=slideWidth*index + 'px';
};

slides.forEach (setSlidePosition);

const movetoSlide = ( track,currentSlide,targetSlide ) => {
    track.style.transform = 'translateX(-'+ targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot , targetDot , ) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

const hideShowArrows = (slides, prevButton ,nextButton, targetIndex) => {
    if(targetIndex === 0){
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length -1 ){
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else{
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }   
}

// when i click left moves slides to the left
    prevButton.addEventListener('click' , e => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        const currentDot = dotsNav.querySelector('.current-slide');
        const prevDot = currentDot.previousElementSibling;
        const prevIndex = slides.findIndex(slide  =>  slide === prevSlide);
        
        movetoSlide(track,currentSlide,prevSlide); 
        updateDots(currentDot,prevDot);  
        hideShowArrows(slides, prevButton ,nextButton, prevIndex );  
    });

// when i click right move slides to the right
nextButton.addEventListener('click',e =>{
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nexttDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide  =>  slide === nextSlide);

    movetoSlide(track,currentSlide,nextSlide);
    updateDots(currentDot,nexttDot);
    hideShowArrows(slides, prevButton ,nextButton, nextIndex );
});

// when i click the nav indicator move to new slide 
dotsNav.addEventListener('click' , e => {
    //what indicator was clicked on
    const targetDot = e.target.closest('button') ;

     if(!targetDot) return;

     const currentSlide = track.querySelector('.current-slide');
     const currentDot = dotsNav.querySelector('.current-slide');
     const targetIndex = dots.findIndex(dot => dot === targetDot );
     const targetSlide = slides[targetIndex];

     movetoSlide(track,currentSlide,targetSlide);
     updateDots(currentDot,targetDot);
     hideShowArrows(slides, prevButton ,nextButton, targetIndex);
})

readmorecont.addEventListener("click", event=>{
    const current = event.target;

    const isReadMoreBtn = current.className.includes('.readmore')

    if(isReadMoreBtn) return;

    const currentText = event.target.parentNode.querySelector('.readmore-text');

    currentText.classList.toggle('display-text')

    current.textContent = current.textContent.includes('Read Less') ? "Read More ..." : "Read Less";
})

readmorecont2.addEventListener("click", event=>{
    const current = event.target;

    const isReadMoreBtn = current.className.includes('.readmore')

    if(isReadMoreBtn) return;

    const currentText = event.target.parentNode.querySelector('.readmore-text');

    currentText.classList.toggle('display-text')

    current.textContent = current.textContent.includes('Read Less') ? "Read More ..." : "Read Less";
})