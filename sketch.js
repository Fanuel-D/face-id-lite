let webcam;
let displaySize;
let readyToDetect;
let faceMatcher;



let video;
let detections = [];

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();

    Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models')
    ]).then(initDetect).catch(error => {
        console.error("Model loading failed:", error);
    });// Ensure all models are loaded before starting detection
}

function initDetect() {
    console.log("Models loaded successfully!");
    initFaceMatcher();
}
async function loadLabeledImages() {
  const labels = ["Fanuel", "Maxwell","messi"]; 
  return Promise.all(
      labels.map(async label => {
          const descriptions = [];
          for (let i = 1; i <= 2; i++) {
              const img = await faceapi.fetchImage(`/labels/${label}/${i}.png`);
              const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
              descriptions.push(detections.descriptor);
          }
          return new faceapi.LabeledFaceDescriptors(label, descriptions);
      })
  );
}
async function initFaceMatcher() {
    const labeledFaceDescriptors = await loadLabeledImages();
    faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
    console.log("Ready to recognize faces!");
    readyToDetect = true;  // Set a flag indicating that faceMatcher is ready
}

async function draw() {

    if (!readyToDetect) {
        console.log("Models not ready");
        return;
    }
  image(video, 0, 0, width, height);

  if (readyToDetect){

        const detections = await faceapi.detectAllFaces(video.elt, new faceapi.SsdMobilenetv1Options())
            .withFaceLandmarks().withFaceDescriptors();

    if (detections) {
        const resizedDetections = faceapi.resizeResults(detections, {width, height});
        resizedDetections.forEach(det => {
            const match = faceMatcher.findBestMatch(det.descriptor);
            stroke(0, 255, 0);
            strokeWeight(2);
            noFill();
            rect(det.detection.box.x, det.detection.box.y, det.detection.box.width, det.detection.box.height);
            textSize(20);
            fill(255);
            text(match.toString(), det.detection.box.x, det.detection.box.y);
        });
  }

  }
  
}


