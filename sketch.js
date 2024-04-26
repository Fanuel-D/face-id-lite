// const video = document.getElementById("video");
let webcam;
let modelsReady = false;
// let totalModels = 3;

function preload(){
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
  faceapi.nets.faceRecognitionNet.loadFromUri('/models');
  faceapi.nets.faceLandmark68Net.loadFromUri('/models');
  modelsReady = true;
}

// function modelLoaded() {
//   totalModels--;
//   if (totalModels==0) {
//     modelsReady = True;
//   }
// }
async function getLabeledFaceDescriptions() {
  const labels = ["Maxwell", "Messi"];
  const labeledDescriptors = [];

  for (const label of labels) {
    let descriptions = [];
    for (let i = 1; i <= 2; i++) {
      const img = await faceapi.fetchImage(`./labels/${label}/${i}.png`);
      const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
      if (detection) {
        descriptions.push(detection.descriptor);
      } else {
        console.error('No face detected in image', label, i);
      }
    }
    labeledDescriptors.push(new faceapi.LabeledFaceDescriptors(label, descriptions));
  }
  return labeledDescriptors;
}


function setup() {
  createCanvas(640, 480);
  webcam = createCapture(VIDEO);
  webcam.size(width, height);
  webcam.hide();
}



function draw(){
  if (modelsReady){
    image(webcam,0,0,width,height);
  }

}

// Function to load and process face descriptions for a single label
// function loadFaceDescriptions(label) {
//   let descriptions = [];
//   for (let i = 1; i <= 2; i++) {
//       let img = faceapi.fetchImage(`./labels/${label}/${i}.png`);
//       let detection = faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
//       if (detection) {
//           descriptions.push(detection.descriptor);
//       } else {
//           console.error('No face detected in image', label, i);
//       }
//   }
//   return new faceapi.LabeledFaceDescriptors(label, descriptions);
// }

// Main function to process all labels individually
// function getLabeledFaceDescriptions() {
//   let labels = ["Maxwell", "Messi"];
//   let descriptors = [];

//   for (let label of labels) {
//       let descriptor = loadFaceDescriptions(label);
//       descriptors.push(descriptor);
//   }

//   return descriptors;
// }




// video.addEventListener("play", async () => {
//   const labeledFaceDescriptors = await getLabeledFaceDescriptions();
//   const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

//   const canvas = faceapi.createCanvasFromMedia(video);
//   document.body.append(canvas);

//   const displaySize = { width: video.width, height: video.height };
//   faceapi.matchDimensions(canvas, displaySize);

//   setInterval(async () => {
//     const detections = await faceapi
//       .detectAllFaces(video)
//       .withFaceLandmarks()
//       .withFaceDescriptors();

//     const resizedDetections = faceapi.resizeResults(detections, displaySize);

//     canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

//     const results = resizedDetections.map((d) => {
//       return faceMatcher.findBestMatch(d.descriptor);
//     });
//     results.forEach((result, i) => {
//       const box = resizedDetections[i].detection.box;
//       const drawBox = new faceapi.draw.DrawBox(box, {
//         label: result,
//       });
//       drawBox.draw(canvas);
//     });
//   }, 100);
// });

//take pics and save them locally then use them as the  input for the mode

