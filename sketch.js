// let webcam;
// let modelsReady = false;
// let faceCanvas;
// let displaySize


// async function preload(){
//   await Promise.all([
//     faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
//     faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//     faceapi.nets.faceLandmark68Net.loadFromUri('/models')
//   ]);
//   modelsReady = true;
// }

// function setup() {
//   createCanvas(640, 480);
//   webcam = createCapture(VIDEO);
//   webcam.size(width, height);
//   webcam.hide();
// }

// async function getLabeledFaceDescriptions() {
//   const labels = ["Maxwell", "Messi", "Fanuel"];
//   const labeledDescriptors = [];

//   for (const label of labels) {
//     let descriptions = [];
//     for (let i = 1; i <= 2; i++) {
//       const img = await faceapi.fetchImage(`./labels/${label}/${i}.png`);
//       const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
//       if (detection) {
//         descriptions.push(detection.descriptor);
//       } else {
//         console.error('No face detected in image', label, i);
//       }
//     }
//     labeledDescriptors.push(new faceapi.LabeledFaceDescriptors(label, descriptions));
//   }
//   return labeledDescriptors;
// }



// function draw(){
//   if (modelsReady){
//     image(webcam,0,0,width,height);
//     detectAndDrawFaces();
//   }

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

async function draw() {
    image(video, 0, 0, width, height);

    detections = await faceapi.detectAllFaces(video.elt, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();

    if (detections && detections.length > 0) {
        detections.forEach(det => {
            if (det && det.detection && det.detection.box) {
                const { x, y, width, height } = det.detection.box;
                stroke(255, 0, 0);
                strokeWeight(2);
                noFill();
                rect(x, y, width, height);
            }
        });
    }
}


