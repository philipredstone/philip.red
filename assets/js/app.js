/******************/
/*     APP.JS     */
/******************/

// the GoogleUser variable stores the current user object
let GoogleUser;


// set firebase auth provider
let provider = new firebase.auth.GoogleAuthProvider();

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

const ProfileHandler = () => {

    // check if user is logged in
    if(!GoogleUser)
        // if user is not logged in -> login
        LoginHandler()
    else
        // if user is logged in -> profile
        ErrorHandler({message:"profile"})
}

const LoginHandler = () => {
    // start firebase authentication and set GoogleUser variable
    GoogleUser = 
    firebase.auth().signInWithPopup(provider).then((result) => {

        // minify variable name for easier use later on
        let user = result.user;

        // change userButton tooltip(title) and image source
        let userButton = document.getElementById('profile');
            userButton.src = user.photoURL
            userButton.title = "Profile"
        
        // add the logoutButton after the userButton
        document.getElementById('login').innerHTML += 
            `<li id="logout" class="navbar_list_item">
                <button type="button" onclick="LogoutHandler()" class="navbar_list_item_link">Logout</button>
            </li>`;

    }).catch((error) => {

        // pass error to the ErrorHandler
        ErrorHandler(error)
    });
}

const LogoutHandler = () => {

    //start firebase sign out process
    firebase.auth().signOut().then(() => {

        // reset User variable;
        GoogleUser = undefined;

        // change userButton tooltip(title) and image source
        let userButton = document.getElementById('profile');
            userButton.src = "./assets/images/google_login.png"
            userButton.title = "Login"

        // delete the logoutButton
        let logoutButton = document.getElementById('logout');
        logoutButton.parentNode.removeChild(logoutButton);
    }).catch((error) => {

        // pass error to the ErrorHandler
        ErrorHandler(error)
    });
}

const ErrorHandler = (error) => {

    // reset User variable;
    GoogleUser = undefined;

    // start error-popup animation
    document.getElementsByClassName("notification")[0].style.left = "50px";

    // set error-popup content/error message
    document.getElementsByClassName("notification-text")[0]. innerHTML = '<span class="mdi mdi-alert-circle"></span>&nbsp;&nbsp;'+error.message

    // set timeout for end of error-popup animation
    setTimeout( () => {

        // animate error-popup out of page
        document.getElementsByClassName("notification")[0].style.left = "-1000px";
    }, 10000);
}

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

// calculate the age in ms
let ageDifMs = Date.now() - new Date(2003,4,11).getTime();

// convert calculated ms to date
let ageDate = new Date(ageDifMs);

// insert date into text and setting innerHTML of the info element
document.querySelector('#info').innerHTML = `i'm philip. i am currently ${Math.abs(ageDate.getUTCFullYear() - 1970)} years old.`

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

    // check if currently scrolled to '#work'
    if ($(this).scrollTop() >= $('#work').position().top-50)
    
        // if so set 'element' to 'work'
        element = 'work'

    // check if currently scrolled to '#about'
    if ($(this).scrollTop() >= $('#about').position().top-50)
    
        // if so set 'element' to 'about'
        element = 'about'

    // check if currently scrolled to '#contact'
    if ($(this).scrollTop() >= $('#contact').position().top-50)
    
        // if so set 'element' to 'contact'
        element = 'contact'
    
    // remove all 'is-active' classes from every menu item
    menu.forEach(element => {element.classList.remove('is-active');});

    // adding 'is-active' class to current active menu item
    document.getElementById(element+"_nav").classList.add('is-active')
})


// scroll to page elemment if url has element id
location.href = "#" + (window.location.href.split('#')[1] ? window.location.href.split('#')[1] : 'home');