let webcam;
let modelsReady = false;
let faceCanvas;
let displaySize;
let readyToDetect;


// async function preload(){
//   await Promise.all([
//     faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
//     faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//     faceapi.nets.faceLandmark68Net.loadFromUri('/models')
//   ]);
//   modelsReady = true;
// }



let video;
let detections = [];

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();

    // Load models with full path to model directory
    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models')
    ]).then(initDetect); // Ensure all models are loaded before starting detection
}

function initDetect() {
    console.log("Models loaded successfully!");
}
async function loadLabeledImages() {
  const labels = ['Fanuel']; // Replace these with real names
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
let faceMatcher;
async function initFaceMatcher() {
    const labeledFaceDescriptors = await loadLabeledImages();
    faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
    console.log("Ready to recognize faces!");
    readyToDetect = true;  // Set a flag indicating that faceMatcher is ready
}

async function draw() {
  image(video, 0, 0, width, height);

  if (readyToDetect){
    const detections = await faceapi.detectAllFaces(video.elt, new faceapi.TinyFaceDetectorOptions())
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



// function draw(){
//     image(webcam,0,0,width,height);
//     detectAndDrawFaces();
// }


// async function detectAndDrawFaces() {
//   try {
//     const labeledFaceDescriptors = await getLabeledFaceDescriptions();
//     const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);
//     faceCanvas = faceapi.createCanvasFromMedia(webcam.elt);
//     displaySize = { width: width, height: height };
//     faceapi.matchDimensions(faceCanvas, displaySize);


//     setInterval(async () => {
//       const detections = await faceapi
//         .detectAllFaces(webcam.elt)
//         .withFaceLandmarks()
//         .withFaceDescriptors();
  
//       const resizedDetections = faceapi.resizeResults(detections, displaySize);
  
//       faceCanvas.getContext("2d").clearRect(0, 0, faceCanvas.width, faceCanvas.height);
  
//       const results = resizedDetections.map((d) => {
//         return faceMatcher.findBestMatch(d.descriptor);
//       });
//       results.forEach((result, i) => {
//         const box = resizedDetections[i].detection.box;
//         const drawBox = new faceapi.draw.DrawBox(box, {
//           label: result,
//         });
//         drawBox.draw(canvas);
//       });
//     }, 100);

//     image(faceCanvas, 0, 0);
//   } catch (error) {
//     console.error('Failed to detect and draw faces:', error);
//   }
// }




// let video;
// let detections = [];

// function setup() {
//     createCanvas(640, 480);
//     video = createCapture(VIDEO);
//     video.size(width, height);
//     video.hide();

//     // Load models with full path to model directory
//     Promise.all([
//         faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
//         faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//         faceapi.nets.faceRecognitionNet.loadFromUri('/models')
//     ]).then(initDetect); // Ensure all models are loaded before starting detection
// }

// function initDetect() {
//     console.log("Models loaded successfully!");
// }

// async function draw() {
//     image(video, 0, 0, width, height);

//     detections = await faceapi.detectAllFaces(video.elt, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();

//     if (detections && detections.length > 0) {
//         detections.forEach(det => {
//             if (det && det.detection && det.detection.box) {
//                 const { x, y, width, height } = det.detection.box;
//                 stroke(255, 0, 0);
//                 strokeWeight(2);
//                 noFill();
//                 rect(x, y, width, height);
//             }
//         });
//     }
// }


