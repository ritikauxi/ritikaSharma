gsap.registerPlugin(ScrollTrigger);
// Get the root element
var root = document.documentElement;
var style = getComputedStyle(root);
const primeTextColor = style.getPropertyValue('--prime-text-color');
const secondaryTextColor = style.getPropertyValue('--secondary-text-color');

var eyeCircle = $('.eyeCircle');
// console.log(eyeCircle.width());
var eyeLocationX = $('.eyeButton').offset().left - $(window).scrollLeft() + $('.stickyEyeButton').width() / 2;
var eyeLocationY = $('.eyeButton').offset().top - $(window).scrollTop() + $('.stickyEyeButton').height() / 2;

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



if (window.DetectIt.deviceType === 'mouseOnly' | 'hybrid') {
    // console.log("cursor");
    window.addEventListener("mousemove", e => {
        // console.log("clientX", e.clientX, 'clientY', e.clientY);


        if ((event.pageX - eyeLocationX) > 0) {
            xTo(gsap.utils.mapRange(0, eyeLocationX, -40, 0, e.clientX));
        }
        else {
            xTo(gsap.utils.mapRange(eyeLocationX, window.innerWidth, 0, 40, e.clientX));
        }

        if ((event.pageY - eyeLocationY) < 0) {
            yTo(gsap.utils.mapRange(0, eyeLocationY, -40, 0, e.clientY));
        }
        else {
            // console.log("yExtrene", eyeLocationY, "\n", event.pageY - eyeLocationY);
            yTo(gsap.utils.mapRange(eyeLocationY, window.innerHeight, 0, 40, e.clientY));
        }
        // yTo(gsap.utils.mapRange(0, window.innerHeight, -40, 40, e.clientY));

        xEyeTo(gsap.utils.mapRange(0, window.innerWidth, -20, 20, e.clientX));
        yEyeTo(gsap.utils.mapRange(0, window.innerHeight, 0, 30, e.clientY));

    });
}
else {
    $(document).ready(function () {

        // Create a GSAP timeline
        var tl = gsap.timeline({ repeat: -1, repeatDelay: .2 });


        
        tl.to(eyeCircle, { duration: .8, y: 0, x: 10, delay: 1, ease: "power1.inOut" });
        tl.to(eyeCircle, { duration: .8, y: 0, x: -10, delay: 0, ease: "power1.inOut" });
        tl.to(eyeCircle, { duration: .4, y: 0, x: 0, delay: 0, ease: "power1.in" });
    });
}


const headingText = $('[data-heading=transition]');
const text = new SplitType(headingText, { types: 'words, chars', tagName: 'span' });

// Initially set characters' position
gsap.set(text.chars, { y: "0" });

// Animate characters into view with a stagger effect
gsap.to(text.chars, {
    y: "-100%",
    duration: .8,
    stagger: { amount: .8 },
    scrollTrigger: {
        trigger: '.headingContainer',
        start: "top top", // Adjust as needed
        end: "bottom top", // Adjust as needed
        scrub: true,
        // markers: true
    }
});


// text color change on scroll basic about


var colorchandingtext = $('[data-colorchandingtext="text"]');
const splitCharType = new SplitType(colorchandingtext, { types: 'words, chars', tagName: 'span' });
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#basicAboutSection",
        start: "top 50%",
        end: "bottom 0%",
        // pin: true,%
        scrub: 1,
        // markers:true
    }
})
    .set(splitCharType.chars, {
        color: secondaryTextColor,
        stagger: 0.1,
        // ease: "power4.inOut"
    }, 0.5);

// My Process
$(document).ready(function () {
    const horizontalAccordions = $(".accordion.width");
    const cardHeader = $('.card-header');

    function setAccordionStyles() {
        const isSmallScreen = window.innerWidth < 640;
        horizontalAccordions.each((index, element) => {
            const accordion = $(element);
            const collapse = accordion.find(".collapse");
            const bodies = collapse.find("> *");

            if (isSmallScreen) {
                collapse.removeClass("width").addClass("height");
            } else {
                collapse.removeClass("height").addClass("width");
                accordion.height(accordion.height());
                bodies.width(bodies.eq(0).width());
            }

            collapse.not(".show").each((index, element) => {
                $(element).parent().find("[data-toggle='collapse']").addClass("collapsed");
            });
        });
    }

    setAccordionStyles();
    $(window).resize(setAccordionStyles);
});



// const headingText = $('[data-heading=transition]');
// const text = new SplitType(headingText, { types: 'words, chars', tagName: 'span' });

// // Initially set characters' position
// gsap.set(text.chars, { y: "0" });

// // Animate characters into view with a stagger effect
// gsap.to(text.chars, {
//     y: "-100%",
//     duration: 0.6,
//     stagger: { amount: 0.4 },
//     scrollTrigger: {
//         trigger: '.headingContainer',
//         start: "top top", // Adjust as needed
//         end: "bottom top", // Adjust as needed
//         scrub: true,
//         // markers: true
//     }
// });

// function debounce(func, wait, immediate) {
//     let timeout;
//     return function executedFunction() {
//         const context = this,
//             args = arguments;
//         const later = function () {
//             timeout = null;
//             if (!immediate) func.apply(context, args);
//         };
//         const callNow = immediate && !timeout;
//         clearTimeout(timeout);
//         timeout = setTimeout(later, wait);
//         if (callNow) func.apply(context, args);
//     };
// }

// document.addEventListener("DOMContentLoaded", () => {
//     const marquee = document.querySelector(".c-textMarquee");
//     let tween;

//     if (marquee) {
//         gsap.set(marquee.children, { autoAlpha: 0 });

//         let duration = window.innerWidth > 400 ? 10 : 5;


//         const playMarquee = () => {
//             let progress = tween ? tween.progress() : 0;
//             const text = marquee.querySelectorAll(".c-textMarquee__text");
//             const translateWidth = text[0].getBoundingClientRect().width;

//             duration = Math.max(0.5, duration);
//             if (tween) {
//                 tween.kill(); // Kill the existing tween if it exists
//             }

//             tween = gsap.fromTo(
//                 marquee.children,
//                 { x: 0, autoAlpha: 1 },
//                 {
//                     x: -translateWidth,
//                     duration: duration,
//                     ease: "none",
//                     repeat: -1,
//                     paused: false,
//                 }
//             );
//             tween.progress(progress);
//         };

//         const debouncedPlayMarquee = debounce(playMarquee, 500);
//         playMarquee(); // Initial play

//         window.addEventListener("orientationchange", () => {
//             if (window.matchMedia("(orientation: landscape)").matches && window.innerHeight > 1024);
//             playMarquee(); // Update the duration when orientation changes
//         });

//         window.addEventListener("resize", debouncedPlayMarquee);
//     }
// });


// // text color change on scroll basic about


// var colorchandingtext = $('[data-colorchandingtext="text"]');
// const splitCharType = new SplitType(colorchandingtext, { types: 'words, chars', tagName: 'span' });
// const tl = gsap.timeline({
//     scrollTrigger: {
//         trigger: "#basicAboutSection",
//         start: "top 50%",
//         end: "bottom 0%",
//         // pin: true,%
//         scrub: 1,
//         // markers:true
//     }
// })
//     .set(splitCharType.chars, {
//         color: secondaryTextColor,
//         stagger: 0.1,
//     }, 0.1);

// // My Process
// $(document).ready(function () {
//     const horizontalAccordions = $(".accordion.width");
//     const cardHeader = $('.card-header');

//     function setAccordionStyles() {
//         const isSmallScreen = window.innerWidth < 640;
//         horizontalAccordions.each((index, element) => {
//             const accordion = $(element);
//             const collapse = accordion.find(".collapse");
//             const bodies = collapse.find("> *");

//             if (isSmallScreen) {
//                 collapse.removeClass("width").addClass("height");
//             } else {
//                 collapse.removeClass("height").addClass("width");
//                 accordion.height(accordion.height());
//                 bodies.width(bodies.eq(0).width());
//             }

//             collapse.not(".show").each((index, element) => {
//                 $(element).parent().find("[data-toggle='collapse']").addClass("collapsed");
//             });
//         });
//     }

//     setAccordionStyles();
//     $(window).resize(setAccordionStyles);
// });


