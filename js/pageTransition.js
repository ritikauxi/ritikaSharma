var dwidth = window.innerWidth;

window.addEventListener("resize", function (e) {
    var wwidth = window.innerWidth;
    if (dwidth !== wwidth) {
        dwidth = window.innerWidth;
        if (window.RT) clearTimeout(window.RT);
        window.RT = setTimeout(function () {
            location.reload(false); // false to get the page from cache
        }, 1000);
    }
});

function pageRefresh(scrollToTop, hardRefresh = false) {
    if (window.RT) clearTimeout(window.RT);
    window.RT = setTimeout(function () {
        if (scrollToTop) {
            window.scrollTo(0, 0); // Scroll to top
            if (hardRefresh) {
                location.reload(true); // Hard refresh
            } else {
                location.reload(false); // Reload page from cache
            }
            ScrollTrigger.refresh();
        } else {
            // Store the current scroll position
            const scrollPos = window.scrollY;
            sessionStorage.setItem('scrollPos', scrollPos);
            ScrollTrigger.refresh();

            if (hardRefresh) {
                location.reload(true); // Hard refresh
            } else {
                location.reload(false); // Reload page from cache
            }
        }
    }, 1000);
}

var body = document.body;
var professionalDesign = document.querySelector('.professionalDesign');
var funkyDesign = document.querySelector('.funkyDesign');
rootCSS = document.getElementById('root-css');
var funkyEyesContainer = document.querySelectorAll('[data-eye="funky"]');
var professionalEyesContainer = document.querySelectorAll('[data-eye="professional"]');

// if (sessionStorage.getItem('page') === null) {
//     rootCSS.href = './css/professionalRoot.css';
//     sessionStorage.setItem('page', 'professional');
//     body.setAttribute('data-page', 'professional');
//     professionalDesign.classList.remove('hide');
//     funkyDesign.classList.add('hide');

//     // professionalEyesContainer.classList.remove('hide');
//     professionalEyesContainer.forEach(function (element) {
//         element.classList.remove('hide')
//     })
//     funkyEyesContainer.forEach(function (element) {
//         element.classList.add('hide');
//     });

//     var professionalDesign = document.querySelector('.professionalDesign');
//     var funkyDesign = document.querySelector('.funkyDesign');
//     var parent = professionalDesign.parentNode;

//     // Remove funkyDesign
//     funkyDesign.parentNode.removeChild(funkyDesign);

//     // Insert funkyDesign after professionalDesign
//     parent.insertBefore(funkyDesign, professionalDesign.nextSibling);
// } else {
//     if (sessionStorage.getItem('page') === 'professional') {
//         rootCSS.href = './css/professionalRoot.css';
//         body.setAttribute('data-page', 'professional');
//         professionalDesign.classList.remove('hide');
//         funkyDesign.classList.add('hide');

//         // professionalEyesContainer.classList.remove('hide');
//         // funkyEyesContainer.classList.add('hide');

//         professionalEyesContainer.forEach(function (element) {
//             element.classList.remove('hide')
//         })
//         funkyEyesContainer.forEach(function (element) {
//             element.classList.add('hide');
//         });

//         // var professionalDesign = document.querySelector('.professionalDesign');
//         // var funkyDesign = document.querySelector('.funkyDesign');

//         professionalEyesContainer.forEach(function (element) {
//             element.classList.remove('hide')
//         })
//         funkyEyesContainer.forEach(function (element) {
//             element.classList.add('hide');
//         });
//         var parent = professionalDesign.parentNode;

//         // Remove funkyDesign
//         funkyDesign.parentNode.removeChild(funkyDesign);

//         // Insert funkyDesign after professionalDesign
//         parent.insertBefore(funkyDesign, professionalDesign.nextSibling);
//     } else {
//         rootCSS.href = './css/funkyRoot.css';
//         body.setAttribute('data-page', 'funkyDesign');
//         professionalDesign.classList.add('hide');
//         funkyDesign.classList.remove('hide');

//         professionalEyesContainer.forEach(function (element) {
//             element.classList.add('hide')
//         })
//         funkyEyesContainer.forEach(function (element) {
//             element.classList.remove('hide');
//         });

//         // professionalEyesContainer.classList.add('hide');
//         // funkyEyesContainer.classList.remove('hide');

//         var professionalDesign = document.querySelector('.professionalDesign');
//         var funkyDesign = document.querySelector('.funkyDesign');
//         var parent = funkyDesign.parentNode;

//         parent.removeChild(professionalDesign);
//         parent.insertBefore(professionalDesign, funkyDesign.nextSibling);

//     }
// }

var eyeButton = document.querySelectorAll('.stickyEyeButton');

eyeButton.forEach(function (element) {
    element.addEventListener('click', function () {
        // pageTransition();
        pageRefresh(true, true);
        // pageRefresh(true, true);
    });
})
// eyeButton.addEventListener('click', function () {
//     pageTransition();
//     pageRefresh();
// });


function pageTransition() {

    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.style.display = 'flex';

    // Add a delay to simulate the transition
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 8000); // Adjust the timeout as needed
    if (body.getAttribute('data-page') === 'professional') {
        sessionStorage.setItem('page', 'funkyDesign');
        body.setAttribute('data-page', 'funkyDesign');
        professionalDesign.classList.toggle('hide');
        funkyDesign.classList.toggle('hide');

        console.log("Session Storage: ", sessionStorage.getItem('page'));
        // pageRefresh(e);
    } else {
        sessionStorage.setItem('page', 'professional');
        body.setAttribute('data-page', 'professional');
        professionalDesign.classList.toggle('hide');
        funkyDesign.classList.toggle('hide');
        console.log("Session Storage: ", sessionStorage.getItem('page'));
        // pageRefresh(e)
    }
}


// var dwidth = jQuery(window).width();
// jQuery(window).bind("resize", pageRefresh);
// function pageRefresh(e) {
//     var wwidth = jQuery(window).width();

//     if (dwidth !== wwidth) {
//         dwidth = jQuery(window).width();
//         if (window.RT) clearTimeout(window.RT);
//         window.RT = setTimeout(function () {
//             this.location.reload(false); /* false to get page from cache */
//         }, 1000);
//     }
// }
// if (sessionStorage.getItem('page') == null) {
//     sessionStorage.setItem('page', 'professional');
//     $('body').data('page', 'professional');
//     $('body').attr('data-page', 'professional');
//     $('.professionalDesign').removeClass('hide');
//     $('.funkyDesign').addClass('hide');
// }
// else {
//     if ((sessionStorage.getItem('page') == 'professional')) {
//         $('body').data('page', 'professional');
//         $('body').attr('data-page', 'professional');
//         $('.professionalDesign').removeClass('hide');
//         $('.funkyDesign').addClass('hide');
//     }
//     else {
//         $('body').data('page', 'funkyDesign');
//         $('body').attr('data-page', 'funkyDesign');
//         $('.professionalDesign').addClass('hide');
//         $('.funkyDesign').removeClass('hide');
//     }

// }


// var eyeButton = $('.stickyEyeButton');
// var body = $('body');

// eyeButton.click(pageTransition)

// function pageTransition() {

//     if (body.data('page') == 'professional') {
//         // console.log("professional");
//         sessionStorage.setItem('page', 'funkyDesign');
//         $('body').data('page', 'funkyDesign');
//         $('body').attr('data-page', 'funkyDesign');
//         $('.professionalDesign').toggleClass('hide');
//         $('.funkyDesign').toggleClass('hide');
//         console.log("Local Storage: ", sessionStorage.getItem('page'));

//     }
//     else {
//         // console.log("funkyDesign");
//         sessionStorage.setItem('page', 'professional');
//         $('body').data('page', 'professional');
//         $('body').attr('data-page', 'professional');
//         $('.professionalDesign').toggleClass('hide');
//         $('.funkyDesign').toggleClass('hide');
//         console.log("Local Storage: ", sessionStorage.getItem('page'));
//         // localStorage.setItem('page', 'funkyDesign');
//     }
// }
