let webcam;
let readyToDetect;
let faceMatcher;
let video;
let temp;
let detections = [];
let threshold = 128;
let matches;
const sobelH = [[-1,0,1],[-2,0,2],[-1,0,1]]
const sobelV = [[-1,-2,-1],[0,0,0],[1,2,1]]

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
  const labels = ["Fanuel","Maxwell","messi"]; 
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



function convolution(x, y, matrix, matrixsize, img) {
    let rtotal = 0.0;
    let gtotal = 0.0;
    let btotal = 0.0;
    const offset = Math.floor(matrixsize / 2);
    for (let i = 0; i < matrixsize; i++) {
      for (let j = 0; j < matrixsize; j++) {
        // What pixel are we testing
        const xloc = x + i - offset;
        const yloc = y + j - offset;
        let loc = (xloc + img.width * yloc) * 4;
  
        // Make sure we haven't walked off our image, we could do better here
        loc = constrain(loc, 0, img.pixels.length - 1);
  
        // Calculate the convolution
        // retrieve RGB values
        rtotal += img.pixels[loc] * matrix[i][j];
        gtotal += img.pixels[loc + 1] * matrix[i][j];
        btotal += img.pixels[loc + 2] * matrix[i][j];
      }
    }
    // Make sure RGB is within range
    rtotal = constrain(Math.abs(rtotal), 0, 255);
    gtotal = constrain(Math.abs(gtotal), 0, 255);
    btotal = constrain(Math.abs(btotal), 0, 255);
  
    // Return the resulting color
    return color(rtotal, gtotal, btotal);
  }


function blur(matrix, edgeImg, matrixsize){
    let brightCount = 0;
    let darkCount = 0;
    edgeImg.loadPixels();
    for (let x = 1; x < edgeImg.width; x++) {
      for (let y = 1; y < edgeImg.height; y++) {
        let c = convolution(x, y, matrix, matrixsize, edgeImg);
        let intensity = (red(c) + green(c) + blue(c)) / 3;
  
        // retrieve the RGBA values from c and update pixels()
        let loc = (x + y * edgeImg.width) * 4;


        if (intensity >= threshold) {
                // Set to bright (white)
          edgeImg.pixels[loc] = 255;
          edgeImg.pixels[loc + 1] = 255;
          edgeImg.pixels[loc + 2] = 255;
          brightCount++;
        } else {
                // Set to dark (black)
          edgeImg.pixels[loc] = 0;
          edgeImg.pixels[loc + 1] = 0;
          edgeImg.pixels[loc + 2] = 0;
          darkCount++;
        }
        edgeImg.pixels[loc + 3] = 255; 
      }
    }

    edgeImg.updatePixels();
    return {brightCount, darkCount}
  }

  
  
  

async function draw() {
  // background(0);
    matches = 0;
    
    // let counts = blur(sobelV,temp,3);

    tempVid = video.get(width/2, height/2, 300, 300);


    if (!readyToDetect) {
        console.log("Models not ready");
        return;
    }


    if (readyToDetect){

      const detections = await faceapi.detectAllFaces(video.elt, new faceapi.SsdMobilenetv1Options())
          .withFaceLandmarks().withFaceDescriptors();
          
      if (detections) {
          const resizedDetections = faceapi.resizeResults(detections, {width, height});
          resizedDetections.forEach(det => {
              const match = faceMatcher.findBestMatch(det.descriptor);
              // console.log(`bright:${counts.brightCount} dark:${counts.darkCount}`);
              // if(counts.brightCount >= 270000 && counts.brightCount <= 290000 && counts.darkCount >= 25000){
                stroke(0, 255, 0);
                strokeWeight(2);
                noFill();
                temp = video.get(det.detection.box.x, det.detection.box.y, det.detection.box.width, det.detection.box.height);
                let counts = blur(sobelV, temp, 3);
                if(counts.darkCount >= 25000 && matches <= 1){
                rect(det.detection.box.x, det.detection.box.y, det.detection.box.width, det.detection.box.height);
                textSize(20);
                fill(255);
                text(match.toString(), det.detection.box.x, det.detection.box.y);
                // console.log(true);
                matches += 1;
                

                }
                else{
                  console.log("fanuel is a bitch")
                  // console.log(`bright:${counts.brightCount} dark:${counts.darkCount}`);
                }
              // }
          });
    }

    }
    
  
}


