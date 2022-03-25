const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// toggle button
function toggleButton() {
  button.disabled = !button.disabled;
}

// pass joke to rss api
function tellJoke(joke) {
  VoiceRSS.speech({
    key: "f54e70f506a94b02bcb9678b02de9cab",
    src: joke,
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// get jokes from API
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }

    tellJoke(joke);
    toggleButton();

  } catch (err) {
    console.log(err);
  }
}

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
