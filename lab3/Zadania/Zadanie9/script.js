const slides = document.querySelectorAll(".slides");
const left_slide = document.querySelector(".left_slide");
const right_slide = document.querySelector(".right_slide");
const rng_slide = document.querySelector("#rng");

let slideIndex = 1;

showSlide(slideIndex);

function showSlide(n){
    let i;

    for( i = 0; i < slides.length; i++ ){
        slides[i].style.display = "none";
    }

    slides[slideIndex-1].style.display = "flex";
}

left_slide.addEventListener("click", e =>{
    slideIndex-=1;

    if( slideIndex < 1 ){
        slideIndex = slides.length;
    }

    slides[slideIndex-1].style.animationName = "slideRight"
    showSlide(slideIndex);
});


right_slide.addEventListener("click", e =>{
    slideIndex+=1;

    if( slides.length < slideIndex ){
        slideIndex = 1
    }

    slides[slideIndex-1].style.animationName = "slideLeft"
    showSlide(slideIndex)
});

rng_slide.addEventListener("click", e =>{
    slideIndex = Math.floor(Math.random() * slides.length)+1;

    showSlide(slideIndex);
})