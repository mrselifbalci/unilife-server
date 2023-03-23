// document.querySelector('a[href="#all-cities"]').addEventListener('click', function(e) {
//     e.preventDefault();
//     document.querySelector('#all-cities').scrollIntoView({ behavior: 'smooth' });
//   });

// const allCitiesLink = document.querySelector('a[href="#all-cities"]');
// allCitiesLink.addEventListener('click', (event) => {
//     event.preventDefault();
//     const allCitiesDiv = document.querySelector('#all-cities');
//     window.scrollTo({
//         top: allCitiesDiv.offsetTop,
//         behavior: 'smooth'
//     });
//     allCitiesLink.style.marginTop="-100px"
// });

// const topBtn= document.querySelector("#top-btn")

// topBtn.addEventListener("click",()=>{
//     window.scroll.
// })

// Get the button
var myButton = document.getElementById("top-btn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 20) {
    myButton.style.display = "block";
  } else {
    myButton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
