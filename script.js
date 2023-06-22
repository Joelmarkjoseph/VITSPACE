// Add 'mobile' class to elements when screen width is less than or equal to 600px
function addMobileClass() {
    var screenWidth = window.innerWidth || document.documentElement.clientWidth;
    if (screenWidth <= 600) {
      document.querySelector(".elements").classList.add("mobile");
    } else {
      document.querySelector(".elements").classList.remove("mobile");
    }
  }
  
  // Toggle navigation menu on mobile devices when the bars icon is clicked
  function toggleMenu() {
    document.querySelector(".elements").classList.toggle("active");
  }
  
  // Add event listener to the bars icon for toggling the menu
  document.querySelector(".icon i.fa-bars").addEventListener("click", toggleMenu);
  
  // Execute the 'addMobileClass' function on page
  