const menu = document.querySelector('header')
const menuOpen = document.getElementById('icon-open');
const menuClose = document.getElementById('icon-close');
const links = document.querySelectorAll('nav a');

menuOpen.addEventListener('click',OpenMenu);
menuClose.addEventListener('click',CloseMenu);


function OpenMenu(){
    menu.className = 'nav-open';
}

function CloseMenu(){
    if(menu.className === 'nav-open')
    {
        menu.className = 'wrapper';
    }    
}