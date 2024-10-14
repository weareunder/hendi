function addSlider() {
    const TEMPLATE = `
    <div class="box-l view row product" id="body-content">
        <div class="slider view">
            <div class="slides view">
                <a href="#" class="slide view"
                    style="background-image: url('./images/slide1.png');"
                    data-title="casual" data-subtitle="browse, scroll, and click without, well, clicking. it's computing, but make it comfy."></a>
                <a href="#" class="slide view"
                    style="background-image: url('./images/slide2.png');"
                    data-title="music" data-subtitle="conduct your digital orchestra. mix, loop, and create with a wave of your hand."></a>
                <a href="#" class="slide view"
                    style="background-image: url('./images/slide3.png');"
                    data-title="design" data-subtitle="sculpt your ideas in thin air. your creativity, now unbound by clunky interfaces."></a>
            </div>
            <div class="sliderbuttons padding-xl">
                <button class="arrow prev"><img src="https://weareunder.design/images/arrow_left.svg" /></button>
                <button class="arrow next"><img src="https://weareunder.design/images/arrow_right.svg" /></button>
            </div>
            <div class="slidertext box-xs white padding-xl column gap-xs">
                <p></p>
                <div class="text-m"></div>
            </div>
        </div>
    </div>
    `;

    class UnderSlider extends HTMLElement {
        constructor() {
            super();
            this.innerHTML = TEMPLATE;
            this.addStyles();
        }

        addStyles() {
            const style = document.createElement('style');
            style.textContent = `
                .slider {
                    position: relative;
                    overflow: hidden;
                    width: 100%;
                    height: 100vh;
                }
                .slides {
                    display: flex;
                    transition: transform 0.5s ease;
                    will-change: transform;
                }
                .slide {
                    flex: 0 0 100%;
                    height: 100vh;
                    background-size: cover;
                    background-position: center;
                }
                .slidertext {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    background: linear-gradient(to bottom, rgba(90, 45, 20, 0.4) 0%, rgba(90, 45, 20, 0.1) 100%);
                }
                .sliderbuttons {
                    position: absolute;
                    bottom: 20px;
                    right: 20px;
                    z-index: 99;
                }
            `;
            this.appendChild(style);
        }
    }
    customElements.define("handy-slider", UnderSlider);

    const slider = document.querySelector('.slider');
    const slides = document.querySelector('.slides');
    const slide = document.querySelectorAll('.slide');
    const slideTextTitle = document.querySelector('.slidertext p');
    const slideTextSubtitle = document.querySelector('.slidertext div.text-m');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    let currentPosition = 0;

    function updateSlider() {
        slides.style.transform = `translateX(${-currentPosition}%)`;

        const currentSlideIndex = Math.round(currentPosition / 100) % slide.length;
        const currentSlide = slide[currentSlideIndex];
        slideTextTitle.textContent = currentSlide.dataset.title;
        slideTextSubtitle.textContent = currentSlide.dataset.subtitle;
    }

    function moveToSlide(index) {
        currentPosition = index * 100;
        updateSlider();
    }

    updateSlider();

    prevButton.addEventListener('click', () => {
        let index = Math.round(currentPosition / 100);
        index = (index - 1 + slide.length) % slide.length;
        moveToSlide(index);
    });

    nextButton.addEventListener('click', () => {
        let index = Math.round(currentPosition / 100);
        index = (index + 1) % slide.length;
        moveToSlide(index);
    });
}

addSlider();