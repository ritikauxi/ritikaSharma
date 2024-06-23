gsap.registerPlugin(ScrollTrigger);
// Get the root element
var root = document.documentElement;
var style = getComputedStyle(root);
const primeTextColor = style.getPropertyValue('--prime-text-color');
const secondaryTextColor = style.getPropertyValue('--secondary-text-color');

var eyeCircle = $('.eyeCircle');

let xTo = gsap.quickTo(eyeCircle, "x", { duration: 0.6, ease: "power4" }),
    yTo = gsap.quickTo(eyeCircle, "y", { duration: 0.6, ease: "power4" }),
    xEyeTo = gsap.quickTo(".stickyEye", "x", { duration: 0.6, ease: "power3" }),
    yEyeTo = gsap.quickTo(".stickyEye", "y", { duration: 0.6, ease: "power3" }),
    eyeOutlineMask = $('.eyeOuterPath');


$(document).ready(function () {
    setInterval(function () {
        // Create a GSAP timeline
        var tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });

        // Add the eye closing animation
        tl.to(".eyeOuterPath", { duration: 0.05, scaleY: 0.1, transformOrigin: "center", ease: "ease" });

        // Add a delay for the closed state before reopening
        tl.to(".eyeOuterPath", { duration: 0.5, scaleY: 1, transformOrigin: "center", delay: 0, ease: "ease" });
        tl.to(".eyeOuterPath", { duration: 0.15, scaleY: 1.1, transformOrigin: "center", delay: 1, ease: "ease" });

    }, 2500);
});


window.addEventListener("mousemove", e => {
    // console.log("clientX", e.clientX, 'clientY', e.clientY);

    xTo(gsap.utils.mapRange(0, window.innerWidth, -40, 40, e.clientX));
    yTo(gsap.utils.mapRange(0, window.innerHeight, -40, 40, e.clientY));

    xEyeTo(gsap.utils.mapRange(0, window.innerWidth, -20, 20, e.clientX));
    yEyeTo(gsap.utils.mapRange(0, window.innerHeight, -20, 20, e.clientY));

});

let intentObserver = ScrollTrigger.observe({
    onUp: (self) => headerup(),
    onDown: (self) => headerdown(),
    wheelSpeed: -1,
    tolerance: 10,
    preventDefault: false,
});

function headerup() {
    $(".stickyEye").css('top', '-20%');
}
function headerdown() {
    $(".stickyEye").css('top', '10px');

}

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


// text color change on scroll basic about


var colorchandingtext = $('[data-colorchandingtext="text"]');
const splitCharType = new SplitType(colorchandingtext, { types: 'words, chars', tagName: 'span' });
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#basicAboutSection",
        start: "top 50%",
        end: "+=60%",
        // pin: true,
        scrub: 1,
    }
})
    .set(splitCharType.chars, {
        color: secondaryTextColor,
        stagger: 0.1,
    }, 0.1);



// accordanc

document.addEventListener("DOMContentLoaded", () => {
    const x = parseFloat($('.label').css('width'));
    const listItems = document.querySelectorAll('#list li');
    const totalItems = listItems.length;


    const maxOffsetValue = totalItems * x;


    document.documentElement.style.setProperty('--width-offset', `${maxOffsetValue}px`);
});

document.addEventListener("DOMContentLoaded", () => {
    const x = parseFloat($('.label').css('height')); // Set your multiplier value here

    var labelMaxHeight = parseFloat($('.label').eq(0).css('height'));
    var label = $('.label');
    for (let index = 0; index < label.length; index++) {
        if (parseFloat(label.eq(index).css('height')) > labelMaxHeight) {
            labelMaxHeight = parseFloat(label.eq(index).css('height'));
        }
    }
    // console.log('maximum', Math.max(labelHeightArray));

    // $('.label').css('height', `${labelMaxHeight}px`);
    // $('.accslide').css('height', `${labelMaxHeight}px`)
    // console.log(labelMaxHeight);


    const listItems = document.querySelectorAll('#list li');
    const totalItems = listItems.length;

    const maxOffsetValue = totalItems * x;

    document.documentElement.style.setProperty('--height-offset', `${maxOffsetValue}px`);

    const y = parseFloat($('.label').css('width'));
    document.documentElement.style.setProperty('--width-offset', `${totalItems * y}px`);

});


var tlAccordion = gsap.timeline({
    scrollTrigger: {
        trigger: ".myProcessSection",
        // markers: true,
        onUpdate: (self) => onScrollAccordion(self.progress),
        start: 'top top',
        end: '+=400%',
        pin: true,
    }
})
var inputRadio = $('.inputRadio')

function onScrollAccordion(progress) {

    var val = Math.trunc(gsap.utils.mapRange(0, 1, 0, inputRadio.length, progress));
    inputRadio.eq(val).prop('checked', 'true');
    for (let index = 0; index < inputRadio.length; index++) {
        if (index != val) {
            // console.log(index);
            // console.log(val);
            inputRadio.eq(val).prop('checked', 'false');
        }

    }

}

function isInteger(number) {
    console.log(Math.trunc(number));
    return number === Math.trunc(number);
}