var menu = document.querySelector('.menu span');
var navLinks = document.querySelector('.nav-links ul');
var overlay = document.querySelector('.overlay');


var opaque = true;
menu.addEventListener('click', function(){
  opaque = !opaque;
  // console.log('hello!');
  opaque === true ? navLinks.style.display = "none" : navLinks.style.display = "flex";
  

  


  // overlay.classList.toggle("overlay-visible");

  // if (!opaque) {
    // overlay.style.display = "block;"
    // body.style.background = "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(" + 'coffee-shop-yourstruly.jpg' + ");";  
    // body.style.background = "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)";
  // } else {
    // overlay.style.display = "none";
    // body.style.background = "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)";
    // body.style.background = "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(" + 'coffee-shop-yourstruly.jpg' + ");";
  // }


}); 