
// Initial timer data
var timeIdle = 0;
var timeIdleBegin = 5;
var timeIdleEnd = 120;
var intervalID;
var captionTimeID;

// Pre-populated caption data
var newCaption = [
     "%Insert YOUR caption here.%",
     "Come on, add something funny, YOU CAN DO IT!",
     "HEY! Keep it PG-13!",
     "All the cool kids are writing their own captions.",
     "Hey, YOU, get in the game! Enter your own caption!",
     "Seriously, I know how creative you are. Enter a caption, please."];

// Add more preset strings to the array for ABOUT page
if (document.querySelector("title").textContent.includes("About")) {
     newCaption.push(
          "If it's going to be that kind of party, I'll stick my thumb in the mashed potatoes!",
          "Jelly beans in the dryer... again!",
          "Happy St. Paddy's Day!",
          "That tea was HOT!");
} else if (document.querySelector("title").textContent.includes("Welcome")) {
     // Add more preset strings to the array for HOME page
     newCaption.push(
          "Oh, look, dinner!",
          "I'll give you my plastic bags when you pry (or take) it from my cold, dead hands!",
          "A tree grows in Brooklyn... (really)");
} else if (document.querySelector("title").textContent.includes("Sandbox")) {
     // Add more preset strings to the array for SANDBOX page
     newCaption.push(
          "Introducing... the next Albert Einstein!",
          "Hey, who turned out the lights?",
          "Come out, come out wherever you are!");
}

// Var for checking if random is immediate duplicate
var prevRandIndex = newCaption.length + 1;
var curRandIndex;


function init() {
     
     // Click Enter text area, capture caption
     document.getElementById("change-caption").addEventListener("keypress", captureNewCaption);

     // Events that detect user input and reset idle timer
     document.addEventListener("DOMContentLoaded", incrementTimer);
     document.addEventListener("click", resetTimer);
     document.addEventListener("scroll", resetTimer);
     document.addEventListener("keydown", resetTimer);
     document.addEventListener("touchmove", resetTimer);
     // document.addEventListener("mousemove", resetTimer);
     // document.addEventListener("pointermove", resetTimer);
     document.getElementById("change-caption").addEventListener("focus", pauseTimer);

     // delay with loading first caption to see fade in
     window.setTimeout(loadCaption, 200);

}


// Increment timer each second
function incrementTimer() {
     intervalID = window.setInterval(function() {
          timeIdle++;
          // console.log(timeIdle);

          // Change caption after some idle time, expire after too much idle time
          if (timeIdle >= timeIdleBegin && timeIdle < timeIdleEnd) {
               changeCaptionOnTimer(timeIdle);
          } else if (timeIdle === timeIdleEnd) {
               captionFadeIn();
          }
     }, 1000);
}


function pauseTimer() {
     captionFadeIn();
     window.clearInterval(intervalID);
     console.log("paused");
     document.getElementById("change-caption").addEventListener("blur", incrementTimer);
}


// Reset timer
function resetTimer () {
     timeIdle = 0;
     window.clearTimeout(captionTimeID);
}


// First add fade in, then on timer fade out
function captionFadeIn() {
     window.clearTimeout(captionTimeID);
     document.getElementById("change-caption").className += " fade";
}

function captionFadeOut() {
     captionTimeID = window.setTimeout(function() {
          document.getElementById("change-caption").classList.remove("fade");
     }, 4000);
}


// Random number generator
var randomNum = function(max, min, prev) {
     // console.log("Inside function, previous is: " + prev);
     do {
          let cur = parseInt(Math.random() * (max - min) + min);
          // console.log("returning from function, the current: " + cur);
          return cur;
     }
     // Check to make sure new random number isn't same as old one
     while (prev === cur);
}


// Select and display random caption
var randomCaption = function() {
     // console.log("To start, Previous random is: " + prevRandIndex);

     curRandIndex = randomNum(newCaption.length, 0, prevRandIndex);
     prevRandIndex = curRandIndex;
     // console.log("Should print: Current random: " + curRandIndex);
     // console.log("Now, the previous random is: " + prevRandIndex);

     // Add, then remove fade caption style
     captionFadeIn();
     document.getElementById("change-caption").value = newCaption[curRandIndex];
     captionFadeOut();
     
     return newCaption[curRandIndex];
}

// Upon first page load, show default caption
function loadCaption() {
     captionFadeIn();
     document.getElementById("change-caption").value = newCaption[0];
     captionFadeOut();
}


// Change caption when idle every 5 seconds until certain time
function changeCaptionOnTimer(t) {
     if ((t % 5) == 0) {
          // Show random caption, including those added by user
          randomCaption();
     }
}


// User clicks enter from caption field, saves the entered caption to array
function captureNewCaption () {
    if (event.keyCode == 13) {
        newCaption.push(document.getElementById("change-caption").value);
        document.getElementById("change-caption").value = newCaption[newCaption.length-1];
        document.getElementById("change-caption").blur();

        // Show rehash button after user presses Enter
        if (document.getElementById("rehash") == undefined) {
             let timeoutIDBtn = window.setTimeout(showBtnRehash, 1000);
             // TODO Make this transition
        } else {
             // Click on rehash button to show new caption from array
             btnRehash();
        }
   }
}


// Show "Rehash" button
function showBtnRehash() {
     // Resize form for rehash button
     document.getElementById("change-caption").className += " after-caption-change";
     
     // Show rehash button
     document.getElementById("change-caption").insertAdjacentHTML("afterend", "<button type='button' id='rehash' class='fadein'>Rehash</button>");

     document.getElementById("rehash").className = "fadein";

     // Calls event listener for clicking on rehash button and changing caption
     btnRehash();
}

function btnRehash() {
     window.clearTimeout(captionTimeID);
     document.getElementById("rehash").addEventListener("click", randomCaption);
     timeIdle = -4;
}



init();




// TODO
// Caption fades momentarily at timeIdleEnd
// Is check for previous random working?

function test () {
     console.log("test");
}
