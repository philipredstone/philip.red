/******************/
/*     APP.JS     */
/******************/

// define firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAs4fz9JEdRzStUwteLGGgR0fN_qwXPbnA",
    authDomain: "philip-red.firebaseapp.com",
    projectId: "philip-red",
    storageBucket: "philip-red.appspot.com",
    messagingSenderId: "558189598937",
    appId: "1:558189598937:web:102f943e71792eccc946c8",
    measurementId: "G-F7DSMG8XK2"
};

// initialize firebase with previously defined config
firebase.initializeApp(firebaseConfig);

// initialize firebase analytics
firebase.analytics();

// function to open links in a new tab
const openLink = (id) => {

    // open the window in a new tab
    let win = window.open(id, '_blank');

    // focus the newly opened window
    win.focus();
}

// function to open the mobile navigation bar
const openNav = () => {

    // check if the mobile navbar is already opened
    if(document.querySelector('.navbar').style.height == "40px")

        // close the navbar
        document.querySelector('.navbar').style.height = "unset"
    else

        // open the navbar
        document.querySelector('.navbar').style.height = "40px"
}

// get all menu items
let menu = document.querySelectorAll('.navbar_list_item');

// on scroll listener
$(document).on('scroll', function() {

    // setting the fallback element
    let element = "home";

    // check if currently scrolled to '#home'
    if ($(this).scrollTop() >= $('#home').position().top-50)

        // if so set 'element' to 'home'
        element = 'home'

    // check if currently scrolled to '#about'
    if ($(this).scrollTop() >= $('#about').position().top-50)
    
        // if so set 'element' to 'about'
        element = 'about'

    // check if currently scrolled to '#contact'
    if ($(this).scrollTop() >= $('#contact').position().top-50)
        
        // if so set 'element' to 'contact'
        element = 'contact'

    // check if currently scrolled to '#work'
    if ($(this).scrollTop() >= $('#work').position().top-50)
            
        // if so set 'element' to 'work'
        element = 'work'
    
    // remove all 'is-active' classes from every menu item
    menu.forEach(element => {element.classList.remove('is-active');});

    // adding 'is-active' class to current active menu item
    document.getElementById(element+"_nav").classList.add('is-active')
})


// scroll to page elemment if url has element id
location.href = "#" + (window.location.href.split('#')[1] ? window.location.href.split('#')[1] : 'home');