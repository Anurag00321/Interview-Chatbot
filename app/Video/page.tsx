"use client"
// pages/FaceRecognition.tsx
import { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

const FaceRecognition: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const setupCamera = async (): Promise<HTMLVideoElement | null> => {
      if (videoRef.current) {
        const video = videoRef.current;

        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        video.srcObject = stream;

        return new Promise((resolve) => {
          video.onloadedmetadata = () => {
            resolve(video);
          };
        });
      }
      return null;
    };

    const loadFaceAPI = async () => {
      const modelsPath = '/models';
      await faceapi.nets.tinyFaceDetector.loadFromUri(`${modelsPath}/tiny_face_detector_model-weights_manifest.json`);
      await faceapi.nets.faceLandmark68Net.loadFromUri(`${modelsPath}/face_landmark_68_model-weights_manifest.json`);
      await faceapi.nets.faceExpressionNet.loadFromUri(`${modelsPath}/face_expression_model-weights_manifest.json`);
    };

    const detectExpressions = async (video: HTMLVideoElement) => {
      const canvas = faceapi.createCanvasFromMedia(video);
      document.body.appendChild(canvas);

      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);

      setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();

        if (detections.length > 0) {
          const expressions = detections[0].expressions;
          console.log(expressions);  // Log expressions to console

          // You can perform further processing or store the expressions as needed
        }
      }, 1000); // Adjust the interval as needed
    };

    const main = async () => {
      const video = await setupCamera();
      if (video) {
        await loadFaceAPI();
        video.play();
        detectExpressions(video);
      }
    };

    main();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <video ref={videoRef} className="rounded-lg shadow-lg" />
    </div>
  );
};

export default FaceRecognition;
