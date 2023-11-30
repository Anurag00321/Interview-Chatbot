import * as faceapi from 'face-api.js';
import '@tensorflow/tfjs-node';

// implements nodejs wrappers for HTMLCanvasElement, HTMLImageElement, ImageData
import * as canvas from 'canvas';
const { Canvas, Image, ImageData } = canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })
// Wait for the DOM to be ready

document.addEventListener('DOMContentLoaded', async () => {
    // Load face-api.js models
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    await faceapi.nets.faceExpressionNet.loadFromUri('/models');

    // Get the video element (you may need to adjust this depending on your setup)
    const video = document.getElementById('video');

    // Get access to the user's camera
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    video.srcObject = stream;

    // Detect emotions when a face is detected
    video.addEventListener('play', () => {
        const canvas = faceapi.createCanvasFromMedia(video);
        document.body.append(canvas);
        const displaySize = { width: video.width, height: video.height };
        faceapi.matchDimensions(canvas, displaySize);

        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors().withFaceExpressions();
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

            // Access the detected expressions (e.g., happy, sad)
            if (detections.length > 0) {
                const expressions = detections[0].expressions;
                console.log(expressions);
                // Handle the detected expressions as needed in your app
            }
        }, 100);
    });
});
