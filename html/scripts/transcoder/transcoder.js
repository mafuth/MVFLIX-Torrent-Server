var worker;
var sampleVideoData;
var running = false;
var isWorkerLoaded = false;
var log = document.querySelector("#log");
var video = document.querySelector("#video");

var isSupported = (function() {
  return document.querySelector && window.URL && window.Worker;
})();

function isReady() {
  return !running && isWorkerLoaded && sampleVideoData;
}

function startRunning() {
  running = true;
}
function stopRunning() {
  running = false;
}

function retrieveSampleVideo() {
  var url_string = window.location.href;
  var url = new URL(url_string);
  var vid = url.searchParams.get("stream");
  console.log("loading from stream: " + vid);
  if(vid.endsWith(".mp4")){
    log.innerHTML = "video is playable";
    video.src = vid;
    video.autoplay = true;
  }else{
    log.innerHTML = "<br>video is not playable so getting video file data for transcoding";
    var oReq = new XMLHttpRequest();
    oReq.open("GET", vid, true);
    oReq.responseType = "arraybuffer";
    oReq.onload = function (oEvent) {
      var arrayBuffer = oReq.response;
      if (arrayBuffer) {
        sampleVideoData = new Uint8Array(arrayBuffer);
      }
    };
    oReq.addEventListener("progress", updateProgress);
    oReq.addEventListener("error", transferFailed);
    oReq.send(null);
  }
}
function updateProgress (oEvent) {
  if (oEvent.lengthComputable) {
    var percentComplete = oEvent.loaded / oEvent.total * 100;
    log.innerHTML = percentComplete.toFixed(2) + "% of video loaded";
    if(percentComplete == 100){
      log.innerHTML = percentComplete.toFixed(2) + "% of video loaded";
    }
  }
  
}
function transferFailed(evt) {
  log.innerHTML = "Failed to load video";
}
function parseArguments(text) {
  text = text.replace(/\s+/g, ' ');
  var args = [];
  text.split('"').forEach(function(t, i) {
    t = t.trim();
    if ((i % 2) === 1) {
      args.push(t);
    } else {
      args = args.concat(t.split(" "));
    }
  });
  return args;
}


function runCommand(text) {
  if (isReady()) {
    startRunning();
    var args = parseArguments(text);
    console.log(args);
    worker.postMessage({
      type: "command",
      arguments: args,
      files: [
        {
          "name": "test.webm",
          "data": sampleVideoData
        }
      ]
    });
  }
}

function getDownloadLink(fileData, fileName) {
    var blob = new Blob([fileData]);
    console.log(blob);
    var src = window.URL.createObjectURL(blob);
    return src;
}

function initWorker() {
  log.innerHTML = "<br> Loading worker...this will take a while";
  worker = new Worker("/scripts/transcoder/worker.js");
  worker.onmessage = function (event) {
    var message = event.data;
    if (message.type == "ready") {
      isWorkerLoaded = true;
      log.innerHTML = " <br> Worker is loaded"; 
    } else if (message.type == "stdout") {
      log.innerHTML = "<br>" + message.data + "<br>";
    } else if (message.type == "start") {
        log.innerHTML = "Worker has received command<br>";
    } else if (message.type == "done") {
      stopRunning();
      var buffers = message.data;
      if (buffers.length) {
        log.className = "closed";
      }
      buffers.forEach(function(file) {
        console.log(file);
        if(file.name.endsWith('mp4')){
            video.src = getDownloadLink(file.data, file.name);
            video.autoplay = true;
        }
      });
    }
  };
}

document.addEventListener("DOMContentLoaded", function() {
  initWorker();
  retrieveSampleVideo();

  const interval = setInterval(function() {
    if(isReady()){
      console.log('Ready and starting!!');
      runCommand("-i test.webm -vf showinfo -strict -2 output.mp4"); 
      clearInterval(interval);
    }else{
      console.log('check failed: Not ready!!');
    }
  }, 2000);

});