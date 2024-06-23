const lenis = new Lenis({
    duration: .7,
    easing: (x) => (1 - Math.pow(1 - x, 3)),
    // syncTouch: true,
    // easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
})
// lenis.on('scroll', (e) => {
//     console.log(e)
// })
function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)
gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)


// let intentObserver = ScrollTrigger.observe({
//     onUp: (self) => headerup(),
//     onDown: (self) => headerdown(),
//     wheelSpeed: -1,
//     tolerance: 10,
//     preventDefault: false,
// });

function headerup() {
    $(".stickyEye").css('top', '-20%');
}
function headerdown() {
    $(".stickyEye").css('top', '10px');

}
document.getElementById("year").innerHTML = new Date().getFullYear();

// Image Transition
document.addEventListener("DOMContentLoaded", function () {
    const imageContainers = document.querySelectorAll(".imageTransitionContainers");

    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top < (window.innerHeight || document.documentElement.clientHeight) * .8 &&
            rect.bottom > 0
        );
    }

    function revealImages() {
        imageContainers.forEach((imageContainer) => {
            const imgs = imageContainer.querySelectorAll(".imageTransition"); // Get all image elements within the container
            if (isInViewport(imageContainer)) { // Check if the container is in the viewport
                imgs.forEach((img) => { // Iterate over each image
                    if (!img.classList.contains('revealed')) { // Check if the image has already been revealed
                        gsap.fromTo(img,
                            {
                                // scale: "1.1"
                            },
                            {
                                // scale: "1",
                                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                                duration: 1.5,
                                ease: "power1.out"
                            });
                        img.classList.add('revealed'); // Mark the image as revealed
                    }
                });
            }
        });
    }


    window.addEventListener('scroll', revealImages);
    revealImages(); // Initial check
});




/* Text Marquee */


function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this,
            args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

document.addEventListener("DOMContentLoaded", () => {
    const marquee = document.querySelector(".c-textMarquee");
    let tween;

    if (marquee) {
        gsap.set(marquee.children, { autoAlpha: 0 });

        let duration = window.innerWidth > 400 ? 10 : 5;


        const playMarquee = () => {
            let progress = tween ? tween.progress() : 0;
            const text = marquee.querySelectorAll(".c-textMarquee__text");
            const translateWidth = text[0].getBoundingClientRect().width;

            duration = Math.max(0.5, duration);
            if (tween) {
                tween.kill(); // Kill the existing tween if it exists
            }

            tween = gsap.fromTo(
                marquee.children,
                { x: 0, autoAlpha: 1 },
                {
                    x: -translateWidth,
                    duration: duration,
                    ease: "none",
                    repeat: -1,
                    paused: false,
                }
            );
            tween.progress(progress);
        };

        const debouncedPlayMarquee = debounce(playMarquee, 500);
        playMarquee(); // Initial play

        window.addEventListener("orientationchange", () => {
            if (window.matchMedia("(orientation: landscape)").matches && window.innerHeight > 1024);
            playMarquee(); // Update the duration when orientation changes
        });

        window.addEventListener("resize", debouncedPlayMarquee);
    }
});

/**
* Magnetic Buttons
*/
initMagneticButtons()
function initMagneticButtons() {

    // Magnetic Buttons
    // Found via: https://codepen.io/tdesero/pen/RmoxQg
    var magnets = document.querySelectorAll('.magnetic');
    var strength = 100;

    // START : If screen is bigger as 640 px do magnetic
    if (window.DetectIt.deviceType === 'mouseOnly' | 'hybrid') {
        // Mouse Reset
        magnets.forEach((magnet) => {
            magnet.addEventListener('mousemove', moveMagnet);
            $(this.parentNode).removeClass('not-active');
            magnet.addEventListener('mouseleave', function (event) {
                gsap.to(event.currentTarget, 1.5, {
                    x: 0,
                    y: 0,
                    ease: Elastic.easeOut
                });
                gsap.to($(this).find(".btn-text"), 1.5, {
                    x: 0,
                    y: 0,
                    ease: Elastic.easeOut
                });
            });
        });

        // Mouse move
        function moveMagnet(event) {
            var magnetButton = event.currentTarget;
            var bounding = magnetButton.getBoundingClientRect();
            var magnetsStrength = magnetButton.getAttribute("data-strength");
            var magnetsStrengthText = magnetButton.getAttribute("data-strength-text");

            gsap.to(magnetButton, 1.5, {
                x: (((event.clientX - bounding.left) / magnetButton.offsetWidth) - 0.5) * magnetsStrength,
                y: (((event.clientY - bounding.top) / magnetButton.offsetHeight) - 0.5) * magnetsStrength,
                rotate: "0.001deg",
                ease: Power4.easeOut
            });
            gsap.to($(this).find(".btn-text"), 1.5, {
                x: (((event.clientX - bounding.left) / magnetButton.offsetWidth) - 0.5) * magnetsStrengthText,
                y: (((event.clientY - bounding.top) / magnetButton.offsetHeight) - 0.5) * magnetsStrengthText,
                rotate: "0.001deg",
                ease: Power4.easeOut
            });
        }

    }; // END : If screen is bigger as 540 px do magnetic

    // Mouse Enter
    $('.btn-click.magnetic').on('mouseenter', function () {
        if ($(this).find(".btn-fill").length) {
            gsap.to($(this).find(".btn-fill"), .6, {
                startAt: { y: "76%" },
                y: "0%",
                ease: Power2.easeInOut
            });
        }
        if ($(this).find(".btn-text-inner.change").length) {
            gsap.to($(this).find(".btn-text-inner.change"), .3, {
                startAt: { color: "#1C1D20" },
                color: "#FFFFFF",
                ease: Power3.easeIn,
            });
        }
        $(this.parentNode).removeClass('not-active');
    });

    // Mouse Leave
    $('.btn-click.magnetic').on('mouseleave', function () {
        if ($(this).find(".btn-fill").length) {
            gsap.to($(this).find(".btn-fill"), .6, {
                y: "-76%",
                ease: Power2.easeInOut
            });
        }
        if ($(this).find(".btn-text-inner.change").length) {
            gsap.to($(this).find(".btn-text-inner.change"), .3, {
                color: "#1C1D20",
                ease: Power3.easeOut,
                delay: .3
            });
        }
        $(this.parentNode).removeClass('not-active');
    });
}




// Footer

var windowHeight = window.innerHeight,
    footerHeight = $(".footerContainer").innerHeight(),
    sectionheight = $(".footerParallex").innerHeight() + footerHeight;

$("#scroll-animate, #footerAnimationMain").css({
    height: sectionheight + "px",
});
// console.log(sectionheight - windowHeight, sectionheight);

scrollFooter(window.scrollY, footerHeight);


// when scrolling
window.onscroll = function () {
    var scroll = window.scrollY;

    $("#footerAnimationMain").css({
        top: "-" + scroll + "px",
    });

    scrollFooter(scroll, footerHeight);
};

// Footer


// stacking
function scrollFooter(scrollY, heightFooter) {
    // console.log(scrollFooter);
    const body = document.body;
    const html = document.documentElement;
    const bdheight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
    );
    const n = bdheight - heightFooter - $(window).height();

    if (scrollY >= n) {

        if (scrollY - n >= $(window).height()) {
            $(".footerContainer").css({
                "z-index": "1",
            });
        } else {
            $(".footerContainer").css({
                "z-index": "0",
            });
        }
        $(".footerContainer").css({
            bottom: "0px",
        });
        // const footerMotion = gsap.utils.mapRange(n, n + heightFooter, -heightFooter / 3, 0, scrollY);
        // document.querySelector(".footerContainer").style.bottom = `${footerMotion}px`;
        $(".background").css({
            position: "absolute",
        });
    } else {
        $(".footerContainer").css({
            bottom: "-" + heightFooter + "px",
        });
        $(".background").css({
            position: "fixed",
        });
    }
}