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
let unknownCount = 0; //Counter for consecutive unknowns
let knownCount = 0; //Counter for confirmations after a known face is detected
let faceConfirmed = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
    
    //Loads the required faceapi models from the specified path
    //Once all models are loaded successfully, calls the initDetect function to start the detection process
    Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models')
    ]).then(initDetect).catch(error => {
        console.error("Model loading failed:", error);
    });// Ensure all models are loaded before starting detection
}


/**
 * Initializes the face detection system by logging a success message
 * and calling a function to set up the face matcher.
 */
function initDetect() {
    console.log("Models loaded successfully!");
    initFaceMatcher(); //Initializes the face matcher after confirming model load
}

/**
 * Asynchronously loads and processes labeled face images to create descriptors
 * for each labeled individual. These descriptors are used to recognize faces.
 *
 * @returns {Promise<Array>} A promise that resolves with an array of labeled face descriptors.
 */
async function loadLabeledImages() {
  const labels = ["Fanuel","Maxwell","messi"]; 
  return Promise.all(
      labels.map(async label => {
          const descriptions = [];//stores the face descriptors for each image
          for (let i = 1; i <= 2; i++) {
              const img = await faceapi.fetchImage(`/labels/${label}/${i}.png`);//Fetches an image from the local server
              const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
              descriptions.push(detections.descriptor);//Stores the descriptor in an array
          }
          return new faceapi.LabeledFaceDescriptors(label, descriptions);
      })
  );
}

async function initFaceMatcher() {
    //Loads labeled images and compute face descriptors
    //This awaits the completion of the loadLabeledImages function which loads and processes images
    //to create descriptors for known faces
    const labeledFaceDescriptors = await loadLabeledImages();
    //Creates a new FaceMatcher object with the labeled face descriptors and a match threshold of 0.6
    //The FaceMatcher is used to identify which labeled descriptor best matches a new face descriptor
    //A threshold of 0.6 means the face descriptors need to be at least 60% similar to be considered a match
    
    faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
    console.log("Ready to recognize faces!");
    readyToDetect = true;  // Set a flag indicating that faceMatcher is ready
}


//finds vertical edges in the image
function verticalsobel(img){
  let ypos;
  let xpos;
  let brightCount = 0;
  let darkCount = 0;
  
  img.loadPixels();

  let kernel = [
    [-1, -2, -1],
    [0, 0, 0],
    [1, 2, 1]
  ]

  for (let x = 1; x < img.width; x++){ //loop through the image
    for (let y = 1; y < img.height; y++){
      let sum = 0;

      for (let kx = -1; kx <= 1; kx++){ //loop through the kernel
        for (let ky = -1; ky <=1; ky++){ 
           xpos = x + kx; //offset
           ypos = y + ky;

          let val = img.pixels[(ypos*width+xpos)*4];

          sum += kernel[(kx)+1][(ky)+1]*val;

        }
      }
      img.pixels[(ypos*width+xpos)*4] = img.pixels[(ypos*width+xpos)*4 +1] = img.pixels[(ypos*width+xpos)*4 + 2] = abs(sum);
      if (abs(sum) >= threshold) {
        // Set to bright (white)
        brightCount++;
      } else {
              // Set to dark (black)
        darkCount++;
      }

    }
  }
  img.updatePixels();

  return {brightCount, darkCount};
}


  
  
  

async function draw() {
  // background(0);
    matches = 0;
    
    // let counts = blur(sobelV,temp,3);

    let x = (width - video.width) / 2; //Centers the video on the canvas horizontally
    let y = (height - video.height) / 2; //Centers the video on the canvas vertically

    image(video, x, y, video.width, video.height);
    


    if (!readyToDetect) {
        console.log("Models not ready");
        return;//Skips the rest of the function if models are not ready
    }


    if (readyToDetect){
        //Performs face detection on the video element, configuring it with SSD Mobilenet v1 options
      const detections = await faceapi.detectAllFaces(video.elt, new faceapi.SsdMobilenetv1Options())
          .withFaceLandmarks().withFaceDescriptors();
          
        if (detections) {
          const resizedDetections = faceapi.resizeResults(detections, {width, height});
          resizedDetections.forEach(det => {
              const match = faceMatcher.findBestMatch(det.descriptor); //Finds the best match for each detected face descriptor
                temp = video.get(det.detection.box.x, det.detection.box.y, det.detection.box.width, det.detection.box.height);
                let counts = verticalsobel(temp);//Applies sobel to the image
                //Checks if the processed image meets certain criteria for dark and bright counts
                if(counts.darkCount >= 210000 && counts.brightCount >= 80000 && matches <= 1){
                  matches += 1;
                  if (match.label === 'unknown') {
                    unknownCount++;//Increments the count for unknown faces
                        //If an unknown face is detected consecutively five times, take an action
                      if (unknownCount >= 5) {
                        alert("A photo has been taken for additional security.");
                        unknownCount = 0;
                      }

                  } else {
                      unknownCount = 0; //Reset on valid detection
                      knownCount++;//If a known face is confirmed more than twice
                            //Redirects to an animation page with the recognized person's name
                      if (knownCount > 2) { // After 3 confirmations, proceed
                          window.location.href = 'animation.html?name=' + encodeURIComponent(match.label);
                      }
                  }

                }
                else{
                  alert("Imposter! Go Away")
                }
          });
      }
    

    }
    
  
}


