const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Looping through images */
for(let i = 1; i < 6; i++){
    let path = 'pic'+i+".jpg";
    const newImage = document.createElement('img');
    newImage.setAttribute('src', 'images/'+path);
    thumbBar.appendChild(newImage);
    newImage.onclick = function(){
        displayedImage.src = newImage.src;
    };
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', function (){
    let state = btn.getAttribute('class');
    if(state == 'dark'){
        btn.setAttribute('class', 'light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    } else{
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = "rgba(0,0,0,0)";
    }
});