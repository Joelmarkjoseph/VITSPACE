const cursor = document.querySelector(".cursor");
var timeout;

//follow cursor on mousemove
document.addEventListener("mousemove", (e) => {
  let x = e.pageX;
  let y = e.pageY;

  cursor.style.top = y + "px";
  cursor.style.left = x + "px";
  cursor.style.display = "block";

  //cursor effects when mouse stopped
  function mouseStopped(){
    cursor.style.display = "none";
  }
  clearTimeout(timeout);
  timeout = setTimeout(mouseStopped, 1000);
});

//cursor effects when mouseout
document.addEventListener("mouseout", () => {
  cursor.style.display = "none";
});

window.onload=()=>{
  if ("Notification" in window) {
    // Check if the browser supports notifications
    if (Notification.permission === "granted") {
        // If permission is already granted, show a notification
        new Notification("You are already subscribed to notifications!");
    } else if (Notification.permission !== "denied") {
        // If permission is not denied, ask for permission
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification("Thank you for enabling notifications!");
            } else {
                console.log("Notifications have been disabled.");
            }
        });
    }
} else {
    console.log("This browser does not support notifications.");
}

}