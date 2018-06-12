var menu = document.querySelector('.menu span');
var navLinks = document.querySelector('.nav-links ul');

var mobileSize = true;
menu.addEventListener('click', function(){
  mobileSize = !mobileSize;
  mobileSize === true ? navLinks.style.display = "none" : navLinks.style.display = "flex";
  
}); 