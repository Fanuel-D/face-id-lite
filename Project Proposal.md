- [1. Introduction](#1-introduction)
  - [1.1 Overview of the Project](#11-overview-of-the-project)
  - [1.2 Importance of the Proposal](#12-importance-of-the-proposal)
- [2. Principles: Why the Problem is Important](#2-principles-why-the-problem-is-important)
  - [2.1 Definition of the Problem](#21-definition-of-the-problem)
  - [2.2 Significance of Solving the Problem](#22-significance-of-solving-the-problem)
  - [2.3 Confidence in Solvability](#23-confidence-in-solvability)
- [3. Design Choices and Trade-offs](#3-design-choices-and-trade-offs)
  - [3.1 Design Overview](#31-design-overview)
  - [3.2 Design Choices](#32-design-choices)
  - [3.3 Trade-offs](#33-trade-offs)
- [4. Implementation: Realizing the Design](#4-implementation-realizing-the-design)
  - [4.1 Implementation Strategy](#41-implementation-strategy)
  - [4.2 Technologies Used](#42-technologies-used)
  - [4.3 Challenges and Solutions](#43-challenges-and-solutions)
- [5. Evaluation: Assessing the System](#5-evaluation-assessing-the-system)
  - [5.1 Evaluation Metrics](#51-evaluation-metrics)
  - [5.2 Testing and Validation](#52-testing-and-validation)
- [6. References](#6-references)
  - [6.1 Cited Works](#61-cited-works)
  - [6.2 Additional Resources](#62-additional-resources)


### 1. Introduction

#### 1.1 **Overview of the Project**

This proposal outlines the development of an innovative face recognition tool designed to set new standards in security technology. Leveraging advanced algorithms, this tool not only identifies and matches faces with a pre-trained database but also uniquely differentiates between real human faces and 2D images. This tool is not only robust in functionality but also optimized for efficiency—it is fast, lightweight, and has minimal overhead, making it ideal for integration into devices with limited processing capabilities. The use of savvy filtering techniques makes our implementation one of a kind. 

To demonstrate the capabilities of our efficient face recognition algorithms, we have developed a simple user interface that allows system login through face ID verification. Once authenticated, users can access a unique piece of art rendered using advanced shader techniques(keeping up with our efficient algorithms trend), rather than traditional p5.js implementations. This approach not only highlights the system's ease of use but also showcases its integration with cutting-edge graphics technology.

#### 1.2 Importance of the Proposal

In the digital age, ensuring the authenticity of identity has become a paramount concern across various sectors, including personal electronics, finance, and national security.  The efficient nature of our algorithm ensures that it can be deployed in a wide range of applications without compromising system performance, responding to the increasing demand for more secure, sophisticated, and resource-efficient authentication methods that keep pace with both technological advancements and evolving security threats. The successful development of a proof of concept further underscores the viability and potential of this tool.

### 2. Principles: Why the Problem is Important

#### 2.1 Definition of the Problem

The central challenge addressed by this project stems from the implications of Moore's Law, which predicts that the number of transistors on a microchip doubles about every two years, though the cost of computers is halved. However, we are approaching the physical limits of miniaturization at the atomic levels. This barrier suggests that we cannot solely rely on hardware advancements to improve computational performance indefinitely.

This limitation impacts a wide range of stakeholders including technology developers, industries relying on high computing power, and ultimately, consumers who demand faster, more efficient, and more secure digital solutions.

#### 2.2 Significance of Solving the Problem

- **Impacts on Technology, Society, or Specific Industries:** Overcoming the limitations imposed by hardware constraints through software and algorithmic solutions can lead to significant breakthroughs in computing efficiency and security technologies. This shift is crucial for industries that require high levels of data processing and security measures, such as financial services, healthcare, and personal electronics.

- **Benefits of Addressing this Issue**: By developing more sophisticated algorithms, like the one used in our face recognition tool, we can continue to enhance computational tasks and security measures in an era beyond the peak hardware advancements. This approach not only sustains technological growth but also fosters innovation in a post-Moore's Law world.

#### **2.3 Confidence in Solvability**

- **Preliminary Research or Case Studies that Suggest Feasibility:** There are research studies that have explored the use of convolutional neural networks (CNNs) and edge detection techniques for differentiating between real faces and 2D pictures in the context of face liveness detection. One such study optimized deep CNN architectures for face liveness detection by enhancing the edges and surface texture of the image through nonlinear diffusion techniques. The diffused image was then processed by the CNN to identify and classify the features as real or fake, achieving high accuracy on the NUAA Photograph Impostor dataset​. 

- Existing advancements in algorithmic research demonstrate that significant performance and efficiency improvements can be achieved through software innovations. Our tool utilizes face recognition algorithms that are designed to be exceptionally lightweight and efficient. These algorithms are capable of performing high-accuracy tasks with minimal computational resources, thereby proving that software solutions can effectively complement and extend the capabilities of existing hardware.

### 3. Design Choices and Trade-offs

#### 3.1 Design Overview

The core of our system is built on `face-api.js`, a JavaScript module based on TensorFlow.js, which utilizes several Convolutional Neural Networks (CNNs) optimized for web and mobile device performance. This module enables efficient face detection, face recognition, and face landmark detection. Key components of our architecture include various face detectors like SSD (Single Shot Multibox Detector) and the optimized Tiny Face Detector, as well as a network that processes face images to generate face descriptors (or embeddings).

#### 3.2 Design Choices

- **Choice of Detectors**: For our face detection capabilities, we have utilized `face-api.js`, a powerful JavaScript module built on TensorFlow.js. This framework provides multiple convolutional neural network (CNN) models, each optimized for high performance on web and mobile platforms. Among these, the SSD (Single Shot Multibox Detector) stands out as the most accurate option. The SSD is a CNN that leverages the MobileNet V1 architecture, enhanced with additional layers for box prediction, making it highly effective for precise and fast face detection tasks.
    
- **Choice of SSD over Viola-Jones Algorithm**: In selecting the appropriate face detection technology for our tool, we considered both the SSD and the Viola-Jones algorithm. The Viola-Jones algorithm, while efficient and requiring fewer computational resources, offers lower accuracy and is less robust under varied imaging conditions compared to more modern methods. Given the need for higher accuracy and the ability to operate effectively in diverse environments, we opted for SSD. SSD not only provides greater accuracy but also faster processing times, which are crucial for real-time applications. The SSD's ability to directly compute the bounding box coordinates and class probabilities in a single forward pass through the network significantly enhances the system's efficiency.
    
- **Face Landmarks and Recognition Network**: We utilize a simple CNN for extracting and aligning 68 point face landmarks from each detected face. These aligned images are then processed to generate 128-value face descriptors through another CNN. This approach helps in mapping facial characteristics precisely, crucial for reliable face recognition.
    
- **Authenticity Check Using Edge Detection**: To differentiate real faces from 2D images, we employ edge detection and blurring filters. This method, while computationally efficient, effectively uses lighting conditions and edge information to classify faces as real or fake based on the quantized color data of detected faces.
    
#### 3.3 Trade-offs

- **Accuracy vs. Speed in Face Detection**: Choosing between SSD MobileNet and the Tiny Face Detector involves a trade-off between accuracy and speed. While SSD provides high accuracy, the Tiny Face Detector offers greater speed at a slight cost to detection precision, which is vital for applications requiring rapid processing on limited-resource devices.
    
- **Complexity and Bug Management**: In our testing phase, we identified a potential issue where small 2D images close to the webcam could deceive the system. A proposed fix involved adjusting the webcam's face recognition window size to prevent such occurrences. However, due to the complexity and extensive code modifications required, we decided to accept this limitation in the current development cycle. This decision reflects a strategic trade-off between product stability and the developmental effort required for what was deemed a manageable risk.

Based on your project description and requirements, here are detailed notes that can be expanded into a formal document section covering implementation aspects of using p5.js for recreating Face ID with machine learning models.

### 4. Implementation: Realizing the Design

#### 4.1 Implementation Strategy

**Overview of the Development Methodology**
- **Agile Development Approach**: The project was be executed using iterative development and frequent reassessment of plans.We continuously integrated feedback from testing phases to refine and improve the application. We divided our project into manageable segments known as sprints and this segmentation allowed us to focus on developing specific features or components in stages. Our planning sessions at the beginning of each sprint allowed us to incorporate newly learned concepts(e.g otsu thresholding) and techniques from our coursework.

**Key Phases or Milestones in the Project Timeline**
1. **Initial Setup and Configuration**:
   - We setup the development environment and necessary libraries specifically p5.js for graphical interfaces and face-api.js for facial recognition capabilities, ensuring they were properly integrated into our project framework.. Additionally, we tested face-api.js to verify its compatibility with our setup and to ensure that the basic functionality, like loading and running pre-trained models was flawless.
2. **Development of Face Detection Features**:
   -  We integrated facial detection models, particularly the SSD (Single Shot Multibox Detector), Facial Landmarks, and Tiny Face Detector, into our application because of their speed and accuracy in detecting faces in various conditions
   - We then implemented the face detection feature and carried out rigorous testing to validate the accuracy of the models under different scenarios, adjusting parameters like lighting as necessary to optimize detection rates.
3. **Incorporation of Face Recognition and Landmark Detection**:
   - We then expanded our application's capabilities to include face recognition and facial landmark detection by training the loaded models to identify individual faces and detect key facial landmarks
4. **Implementation of Anti-Spoofing Measures**:
   - We implemented the Otsu thresholding technique to effectively differentiate between real faces and photographs or masks after which we tested it       rigorously under different lighting scenarios to get a good approximate threshold for accuracy.
5. **Final Integration and Testing**:
   - We combined all previously developed features into a cohesive and fully functional application, ensuring seamless interaction between the different components.

#### 4.2 Technologies Used

**Languages, Frameworks, and Tools Used**
- **JavaScript/HTML/CSS** for front-end development.
- **p5.js** for creating graphical elements and interfacing with the HTML5 canvas.
- **face-api.js** based on TensorFlow.js for implementing face detection, recognition, and landmark detection.
- **TensorFlow.js**:A powerful library that allows for machine learning models to be run in the client's browser, leveraging WebGL for hardware-accelerated computations.

**Justification for Technology Choices**
- **p5.js**: Chosen for its simplicity and extensive community support, making it ideal for rapid prototyping of visual applications.
- **face-api.js**: We chose this library due to its seamless integration with TensorFlow.js and its ability to utilize pre-trained neural network models for face detection, recognition, and landmark detection. These models are optimized for real-time processing on web platforms, which significantly reduces the need for high-end server-side hardware and accelerates development time.
- **TensorFlow.js**: This library was selected to ensure all data processing could be handled locally, directly in the user’s browser. This not only enhances the responsiveness of the application but also greatly improves user privacy by not requiring any personal data to be sent over the internet. Moreover, TensorFlow.js's ability to utilize the client's GPU makes it exceptionally suitable for intensive computational tasks typically required in machine learning.

The integration of these technologies allowed us to create a sophisticated facial recognition system that operates entirely within the web browser, minimizing latency and preserving privacy. The HTML/CSS framework laid out the visual and functional structure, p5.js added interactive and dynamic graphics, and face-api.js along with TensorFlow.js worked to process and analyze facial data in real-time.

#### 4.3 Challenges and Solutions

**Potential Obstacles in the Implementation Phase**
- **Real-time Processing Performance**: One of the critical requirements of our application is the ability to perform facial detection and recognition in real-time. This demands high computational efficiency to ensure smooth operation across a variety of devices, including those with limited processing power.
- **Accuracy in Differentiating Real vs. Fake Faces**: Developing a reliable method to distinguish between genuine human faces and photographs or digital replicas.

**Strategies to Overcome These Challenges**
- **Performance Optimization**: We used lightweight models like the Tiny Face Detector for its balance between performance and accuracy. This model is specifically optimized for scenarios requiring real-time processing, making it ideal for use in web applications.
- **Advanced Anti-Spoofing Techniques**: The initial step in our anti-spoofing process involved applying Sobel operators to the input images obtained from the user. We used sobel for edge detection because they effectively highlight the edges within an image by calculating the gradient of the image intensity at each pixel. 
- Following edge detection, we applied Otsu's thresholding technique, which is a global thresholding method that determines an optimal threshold value used for converting a grayscale image into a binary image. This method assumes that the image contains two classes of pixels (foreground and background) and calculates the optimum threshold separating those classes so that their combined spread (intra-class variance) is minimal.
Otsu’s method allowed us to analyze the pixel intensity distributions effectively. This analysis helped us detect anomalies typical of non-living representations, such as the uniform, untextured surfaces of photographs and masks, which contrast with the varied textural characteristics of a real human face.


### 5. Evaluation: Assessing the System

Evaluating the effectiveness and robustness of our facial recognition system is crucial to ensure it meets both technical and user-centric goals. Here’s a detailed look at how we plan to assess our system throughout the development cycle:

#### 5.1 Evaluation Metrics
To measure the success of our facial recognition project effectively, we used a combination of quantitative and qualitative metrics:

- **Accuracy**: The primary metric for our system is the accuracy of face detection and recognition. This is measured by the percentage of correctly identified instances versus the total cases tested under varied conditions.
- **Speed and Latency**: Critical for real-time applications, the response time from when the face is presented to when it is recognized was measured. Our target is to keep this latency under 5-6 seconds to ensure a fluid user experience.
- **False Acceptance and Rejection Rates (FAR and FRR)**: These metrics are standard for testing the security aspects of authentication systems. FAR measures the likelihood that the system incorrectly grants access to an unauthorized user, while FRR measures the rate at which authorized users are wrongly denied access.

#### 5.2 Testing and Validation
To ensure our system is robust and reliable, we employed the following testing methodologies:

- **Controlled Lab Testing**: Initial phases using a predefined set of images and live interactions in a lab setting. This helped fine-tune the system under controlled conditions with varying lighting, face angles, and emotional expressions and get a better threshold.
- **Field Testing**: To validate the system's performance in real-world scenarios, we conducted field testing where the system was be used by individuals from different demographic backgrounds in varied environmental settings. This was crucial to understand how different skin tones, facial features, and external conditions affect the system’s accuracy.

### 6. References

The development and assessment of our facial recognition system rely on a solid foundation of academic research, professional guidelines, and proven methodologies. Here’s a structured list of references and additional resources that have influenced and supported our project:

#### 6.1 Cited Works


#### 6.2 Additional Resources
Supplementary materials or readings that provide broader context or deepen understanding related to our project:

1. **[Pattern Recognition and Machine Learning" by Christopher M. Bishop](https://www.microsoft.com/en-us/research/uploads/prod/2006/01/Bishop-Pattern-Recognition-and-Machine-Learning-2006.pdf)** 
2. **T[he viola-jones algorithm](https://www.baeldung.com/cs/viola-jones-algorithm)** 





