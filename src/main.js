import "./style.css";
const $ = document.querySelector.bind(document);
const audio = document.createElement("audio");

$("#play").onclick = (e) => {
  if (!audio.src) {
    $("#song-name").innerHTML = "No&nbsp;&nbsp;&nbsp;Music";
    return;
  }
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
};

audio.ontimeupdate = () => {
  $("#time").innerHTML = formatSeconds(Math.round(audio.currentTime));
};

document.body.addEventListener("dragover", (event) => {
  // Prevent the default behavior to allow dropping
  event.preventDefault();
});

document.body.addEventListener("drop", (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  setAudio(file);
});

audio.onpause = () => {
  $("#play span").innerHTML = $("#play span").innerHTML =
    "<i class='fa fa-play'>";
  $("#cd").classList.remove("playing");
};
audio.onplay = () => {
  $("#play span").innerHTML = "<i class='fa fa-pause'>";
  $("#cd").classList.add("playing");
};

$("#cd").onclick = () => {
  $("#file-inp").click();
};
$("#file-inp").onchange = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  setAudio(file);
};

function setAudio(file) {
  try {
    audio.pause();
    audio.onpause();
  } catch {}

  audio.src = URL.createObjectURL(file);

  audio.currentTime = 0;

  $("#song-name").innerHTML = file.name
    .split(" ")
    .join("&nbsp;&nbsp;&nbsp;&nbsp;");

  $("#time").innerHTML = "00:00:00";
}

function formatSeconds(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(remainingSeconds).padStart(2, "0")}`;
}
