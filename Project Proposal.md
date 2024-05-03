[#1. Introduction](#introduction)

- **1.1 Overview of the Project**
    - Brief description of the project
    - Key goals and objectives
- **1.2 Importance of the Proposal**
    - Justify the need for the proposal
    - Relevance to current technologies or trends

[[#2. Principles Why the Problem is Important]]

- **2.1 Definition of the Problem**
    - Detailed description of the problem
    - Who is affected by the problem?
- **2.2 Significance of Solving the Problem**
    - Impacts on technology, society, or specific industries
    - Benefits of addressing this issue
- **2.3 Confidence in Solvability**
    - Preliminary research or case studies that suggest feasibility
    - Technologies or methodologies that will aid in solving the problem

[[#3. Design Choices and Trade-offs]]

- **3.1 Design Overview**
    - General design approach or architecture
    - Key components of the system
- **3.2 Design Choices**
    - Description of critical decisions in the design process
    - Rationale behind selected approaches
- **3.3 Trade-offs**
    - Discussion of trade-offs for major design choices
    - How these trade-offs affect performance, usability, or scalability

**4. Implementation: Realizing the Design**

- **4.1 Implementation Strategy**
    - Overview of the development methodology 
    - Key phases or milestones in the project timeline
- **4.2 Technologies Used**
    - Languages, frameworks, and tools to be used
    - Justification for technology choices
- **4.3 Challenges and Solutions**
    - Potential obstacles in the implementation phase
    - Strategies to overcome these challenges

**5. Evaluation: Assessing the System**

- **5.1 Evaluation Metrics**
    - Criteria for measuring the success of the project
    - Performance benchmarks or targets
- **5.2 Testing and Validation**
    - Description of testing methodologies 
    - Plans for validation with real-world data or users
- **5.3 Feedback and Iteration**
    - How feedback will be gathered and incorporated
    - Plans for iterative improvement based on evaluation results

**7. References**

- **7.1 Cited Works**
    - List of all academic and professional references used in the proposal
- **7.2 Additional Resources**
    - Supplementary materials or readings relevant to the project


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




