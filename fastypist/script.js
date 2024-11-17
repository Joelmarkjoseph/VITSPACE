const output = document.querySelector("#op");
const timertxt = document.querySelector("#timer");
const textpre = document.querySelector("#textpreview");
const inputField = document.querySelector("#inp");
var list = ["VITSPACE", "JOEL"];
var selectedwords = [];
var index = 0;
var enteredtext = "";
var count = 0;
var firsttime = 0;
var batchSize = 20; // Display 20 words at a time
let userUID = localStorage.getItem('userUID'); // Retrieve user UID globally

// Ensure that the user is logged in and has a valid userUID
if (!userUID) {
  window.location.href = '/login'; // Modify this as per your actual login URL
}

fetch('/fastypist/words.txt')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(data => {
    list = data.split(", ");
    console.log(list); // Logs the content of the file
    cae();
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

function cae() {
  var txt = "";
  for (var i = 0; i < 100; i++) {
    let randomItem = list[Math.floor(Math.random() * list.length)];
    selectedwords.push(randomItem);
    txt += randomItem + " ";
  }
  console.log(txt);
  console.log(selectedwords);
  updateTextPreview(); // Display the first batch of 20 words
}

document.getElementById('textpreview').addEventListener('copy', function (event) {
  event.preventDefault(); // Block the copy action
  alert('Copying is disabled for this text!');
});

document.getElementById('main').addEventListener('contextmenu', function (event) {
  event.preventDefault(); // Disable right-click
  alert('Right-click is disabled HERE!');
});

let seconds = 60; // Timer duration in seconds
let interval; // Declare interval variable globally

const startTimer = () => {
  interval = setInterval(() => {
    console.log(seconds); // Display seconds in the console or update the UI
    timertxt.textContent = seconds - 1;
    seconds--;
    if (seconds == 0) {
      clearInterval(interval);
      console.log('Timer ended!');
      inputField.readOnly = true;
      if ((index - count) <= 20) {
        output.textContent = String(count) + " WPM";
        const user = firebase.auth().currentUser;
        if (user) {
          // Proceed with saving data
          saveTypingSpeed(count);
        } else {
          // Handle unauthenticated user
          console.log('User is not authenticated');
        }

      } else {
        output.textContent = "MORE MISTAKESSSS!";
      }
    }
  }, 1000); // Update every second (1000 milliseconds)
};

inputField.addEventListener('keydown', function (event) {
  if (event.key === ' ') { // Check if space key was pressed
    enteredtext = inputField.value.trim();
    console.log(enteredtext);
    console.log(selectedwords[index]); // Log the input field value to the console

    if (selectedwords[index] === enteredtext) {
      count += 1;
    }
    index += 1;
    inputField.value = ""; // Clear the input field
    console.log(count);
    
    // Update text preview to show the next word batch when 20 words are typed
    if (index % batchSize === 0) {
      updateTextPreview();
    } else {
      updateTextPreview(); // Continuously update even if within the current batch
    }
  }
});

inputField.addEventListener('keypress', function (event) {
  if (firsttime === 0) {
    firsttime = 1; // First time keypress (start timer)
    startTimer(); // Start the timer only once
  } else {
    firsttime = 2; // For subsequent key presses
  }
});

function updateTextPreview() {
  // Calculate the start and end index for the current batch of 20 words
  let start = Math.floor(index / batchSize) * batchSize;
  let end = start + batchSize;

  // Ensure that the end index does not exceed the total words available
  if (end > selectedwords.length) end = selectedwords.length;

  let htmlContent = '';
  selectedwords.slice(start, end).forEach((word, idx) => {
    if (start + idx === index) {
      // Highlight the current word being typed in red
      htmlContent += `<span style="color: red;">${word}</span> `;
    } else {
      htmlContent += `${word} `;
    }
  });

  // Update the text preview with the current batch of words
  textpre.innerHTML = htmlContent;
}
function saveTypingSpeed(wpm) {
  const user = firebase.auth().currentUser;
  if (user) {
    const username = user.displayName || user.email; // Use displayName or email as username
    const userPhoto = user.photoURL || '';  // Fetch profile photo URL
    const userUID = user.uid; // Fetch the user's unique UID
    const leaderboardRef = database.ref('leaderboard');

    // Check if the user already has an entry in the leaderboard
    leaderboardRef.orderByChild('userUID').equalTo(userUID).once('value', snapshot => {
      const existingEntries = snapshot.val();
      
      if (existingEntries) {
        let entryUpdated = false;

        // Loop through each entry for the user to check if a score update is needed
        for (const entryID in existingEntries) {
          const userEntry = existingEntries[entryID];
          
          if (userEntry.speed < wpm) { // Only update if the new WPM score is higher
            leaderboardRef.child(entryID).update({
              speed: wpm,
              timestamp: new Date().toISOString(),
            });
            entryUpdated = true;
          }
        }

        if (!entryUpdated) {
          console.log('No update needed, WPM score is lower or same.');
        }
      } else {
        // If no entry exists, create a new entry in the leaderboard
        const newEntryRef = leaderboardRef.push();
        newEntryRef.set({
          username: username,
          userUID: userUID,
          speed: wpm,
          photoURL: userPhoto,
          timestamp: new Date().toISOString(),
        });
      }
    });
  }
}

function displayLeaderboard() {
  const leaderboardRef = database.ref('leaderboard');
  leaderboardRef.orderByChild('speed').limitToLast(10).on('value', snapshot => {
    const leaderboard = snapshot.val();
    const leaderboardList = document.getElementById('leaderboard');
    leaderboardList.innerHTML = ''; // Clear previous leaderboard

    // Sort the leaderboard entries by WPM in descending order
    const sortedLeaderboard = [];
    for (const entryID in leaderboard) {
      sortedLeaderboard.push(leaderboard[entryID]);
    }
    
    sortedLeaderboard.sort((a, b) => b.speed - a.speed); // Sort by WPM in descending order

    // Display leaderboard with ranks
    sortedLeaderboard.forEach((userEntry, index) => {
      // Create list item for each leaderboard entry
      const listItem = document.createElement('li');
      listItem.classList.add('leaderboard-entry');

      // Rank column
      const rankColumn = document.createElement('div');
      rankColumn.classList.add('leaderboard-column', 'rank');
      rankColumn.textContent = `${index + 1}`; // Rank number

      // Profile pic column
      const profilePicColumn = document.createElement('div');
      profilePicColumn.classList.add('leaderboard-column', 'profile-pic');

      const profilePic = document.createElement('img');
      profilePic.src = userEntry.photoURL || 'default-profile-pic.png'; // Fallback to a default image if no photo URL
      profilePic.classList.add('profile-pic-img');
      profilePicColumn.appendChild(profilePic);

      // Username column
      const usernameColumn = document.createElement('div');
      usernameColumn.classList.add('leaderboard-column', 'username');
      usernameColumn.textContent = userEntry.username;

      // WPM score column
      const wpmColumn = document.createElement('div');
      wpmColumn.classList.add('leaderboard-column', 'wpm');
      wpmColumn.textContent = `${userEntry.speed} WPM`;

      // Append all columns to the list item
      listItem.appendChild(rankColumn);
      listItem.appendChild(profilePicColumn);
      listItem.appendChild(usernameColumn);
      listItem.appendChild(wpmColumn);

      leaderboardList.appendChild(listItem);
    });
  });
}

// Call displayLeaderboard() to show leaderboard
displayLeaderboard();
