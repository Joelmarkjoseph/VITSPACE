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
var keypresses=0;
    // Ensure that the user is logged in and has a valid userUID
    if (!userUID) {
      window.location.href = '/loginpg.html'; // Modify this as per your actual login URL
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
console.log(keypresses);
count=count+Math.round(keypresses*0.065)
            output.textContent = String(count) + " WPM";
            const user = firebase.auth().currentUser;
            if (user) {
              saveTypingSpeed(count);
            } else {
              console.log('User is not authenticated');
            }
          } else {
            output.textContent = "MORE MISTAKESSSS!";
          }
        }
      }, 1000); // Update every second (1000 milliseconds)
    };

    inputField.addEventListener('keydown', function (event) {
      if (event.key === ' ') {
        enteredtext = inputField.value.trim();
        if (selectedwords[index] === enteredtext) {
          count += 1;
        }
        index += 1;
        inputField.value = ""; // Clear the input field
        if (index % batchSize === 0) {
          updateTextPreview();
        } else {
          updateTextPreview();
        }
      }
    });

    inputField.addEventListener('keypress', function (event) {
      keypresses+=1
      if (firsttime === 0) {
        firsttime = 1;
        startTimer();
      }
    });

    function updateTextPreview() {
      let start = Math.floor(index / batchSize) * batchSize;
      let end = start + batchSize;
      if (end > selectedwords.length) end = selectedwords.length;
      let htmlContent = '';
      selectedwords.slice(start, end).forEach((word, idx) => {
        if (start + idx === index) {
          htmlContent += `<span style="color: red;">${word}</span> `;
        } else {
          htmlContent += `${word} `;
        }
      });
      textpre.innerHTML = htmlContent;
    }

    function saveTypingSpeed(wpm) {
      const user = firebase.auth().currentUser;
      if (user) {
        const username = user.displayName || user.email;
        const userPhoto = user.photoURL || '';
        const userUID = user.uid;
        const leaderboardRef = database.ref('leaderboard');
        leaderboardRef.orderByChild('userUID').equalTo(userUID).once('value', snapshot => {
          const existingEntries = snapshot.val();
          if (existingEntries) {
            let entryUpdated = false;
            for (const entryID in existingEntries) {
              const userEntry = existingEntries[entryID];
              if (userEntry.speed < wpm) {
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
        leaderboardList.innerHTML = '';
        const sortedLeaderboard = [];
        for (const entryID in leaderboard) {
          sortedLeaderboard.push(leaderboard[entryID]);
        }
        sortedLeaderboard.sort((a, b) => b.speed - a.speed);
        sortedLeaderboard.forEach((userEntry, index) => {
          const listItem = document.createElement('li');
          listItem.classList.add('leaderboard-entry');
          const rankColumn = document.createElement('div');
          rankColumn.classList.add('leaderboard-column', 'rank');
          rankColumn.textContent = `${index + 1}`;
          const profilePicColumn = document.createElement('div');
          profilePicColumn.classList.add('leaderboard-column', 'profile-pic');
          const profilePic = document.createElement('img');
          profilePic.src = userEntry.photoURL || 'default-profile-pic.png';
          profilePic.classList.add('profile-pic-img');
          profilePicColumn.appendChild(profilePic);
          const usernameColumn = document.createElement('div');
          usernameColumn.classList.add('leaderboard-column', 'username');
          usernameColumn.textContent = userEntry.username;
          const wpmColumn = document.createElement('div');
          wpmColumn.classList.add('leaderboard-column', 'wpm');
          wpmColumn.textContent = `${userEntry.speed} WPM`;
          listItem.appendChild(rankColumn);
          listItem.appendChild(profilePicColumn);
          listItem.appendChild(usernameColumn);
          listItem.appendChild(wpmColumn);
          leaderboardList.appendChild(listItem);
        });
      });
    }
    displayLeaderboard();