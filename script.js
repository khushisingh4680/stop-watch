let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let running = false;

function updateTime() {
  elapsedTime = performance.now() - startTime;

  const totalMilliseconds = elapsedTime;
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const ms = Math.floor(totalMilliseconds % 1000);

  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  const formattedTime =
    (hours < 10 ? "0" + hours : hours) + ":" +
    (minutes < 10 ? "0" + minutes : minutes) + ":" +
    (seconds < 10 ? "0" + seconds : seconds) + "." +
    (ms < 100 ? (ms < 10 ? "00" + ms : "0" + ms) : ms);

  document.getElementById("time").textContent = formattedTime;

  timerInterval = requestAnimationFrame(updateTime);
}

function start() {
  if (!running) {
    running = true;
    startTime = performance.now() - elapsedTime;
    timerInterval = requestAnimationFrame(updateTime);
  }
}

function stop() {
  if (running) {
    running = false;
    cancelAnimationFrame(timerInterval);
  }
}

function reset() {
  stop();
  elapsedTime = 0;
  document.getElementById("time").textContent = "00:00:00.000";
  document.getElementById("laps").innerHTML = "";
}

function lap() {
  if (!running) return;

  const lapList = document.getElementById("laps");
  const lapTime = document.getElementById("time").textContent;
  const lapItem = document.createElement("li");
  lapItem.textContent = lapTime;
  lapList.appendChild(lapItem);
}