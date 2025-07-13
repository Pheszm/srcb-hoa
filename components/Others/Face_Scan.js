import { useState, useRef, useEffect, useCallback } from 'react';
import * as faceapi from 'face-api.js';
import Swal from 'sweetalert2';

export default function FaceScanning({ Authorized }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isMatch, setIsMatch] = useState(false);
  const [similarityScore, setSimilarityScore] = useState(0);
  const [referenceDescriptors, setReferenceDescriptors] = useState([]);
  const animationFrameRef = useRef(null);

  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  const loadReferenceDescriptors = useCallback(async () => {
    try {
      const imagePaths = [
        '/persons/Gallardo_Straight.jpg',
        '/persons/Gallardo_Left.jpg',
        '/persons/Gallardo_Right.jpg'
      ];

      const descriptors = [];
      for (const path of imagePaths) {
        const img = await faceapi.fetchImage(path);
        const detections = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (detections) {
          descriptors.push(detections.descriptor);
        }
      }

      setReferenceDescriptors(descriptors);
    } catch (err) {
      console.error('Failed to load reference images', err);
    }
  }, []);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models')
        ]);
        setModelsLoaded(true);
        await loadReferenceDescriptors();
      } catch (err) {
        console.error('Model loading error:', err);
      }
    };

    loadModels();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [loadReferenceDescriptors]);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setDevices(videoDevices);
      if (videoDevices[0]) setSelectedDeviceId(videoDevices[0].deviceId);
    });
  }, []);

  const startCamera = async () => {
    try {
      const constraints = {
        video: { deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined }
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err) {
      console.error('Camera error:', err);
    }
  };

  useEffect(() => {
    if (selectedDeviceId) startCamera();
  }, [selectedDeviceId]);

  const handleCameraChange = (e) => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    setSelectedDeviceId(e.target.value);
  };

  const scan = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || !modelsLoaded || referenceDescriptors.length === 0) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors();

    const displaySize = { width: video.videoWidth, height: video.videoHeight };
    faceapi.matchDimensions(canvas, displaySize);

    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    resizedDetections.forEach(detection => {
      const { descriptor, detection: box } = detection;

      const distances = referenceDescriptors.map(ref => faceapi.euclideanDistance(ref, descriptor));
      const bestDistance = Math.min(...distances);
      const similarity = (1 - bestDistance) * 100;
      const match = similarity > 65;

      const drawBox = new faceapi.draw.DrawBox(box.box, {
        label: match ? `Gallardo (${similarity.toFixed(1)}%)` : `Unknown (${similarity.toFixed(1)}%)`,
        boxColor: match ? '#10B981' : '#EF4444',
      });
      drawBox.draw(canvas);

      setIsMatch(match);
      if (match) {
        Swal.fire({
          title: 'Match Found!',
          text: `Successfully recognized as Gallardo`,
          icon: 'success',
          confirmButtonText: 'Okay',
        }).then(() => {
          // Stop scanning loop
          cancelAnimationFrame(animationFrameRef.current);
      
          // Stop the video stream
          if (videoRef.current?.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
          }
      
          // Clear canvas
          const ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, canvas.width, canvas.height);
      
          // Reset state
          setIsMatch(false);
          setSimilarityScore(0);
      
          // Call callback
          Authorized(match);
        });
      }
      

      setSimilarityScore(similarity);
    });
  }, [modelsLoaded, referenceDescriptors]);

  useEffect(() => {
    const loop = () => {
      scan();
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    if (modelsLoaded && referenceDescriptors.length) {
      loop();
    }

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [modelsLoaded, scan, referenceDescriptors]);

  return (
    <div className="bg-white relative w-full max-w-md mx-auto p-5 border border-gray-200 rounded-lg">
      <video ref={videoRef} autoPlay muted playsInline className="w-full object-cover" />
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />
      <div className="bg-white text-center">
        <h2 className="text-lg font-semibold mb-2 mt-4">Face Recognition</h2>

        {/* Camera Selector */}
        <div className="mb-4">
          <label htmlFor="cameraSelect" className="block text-sm font-medium text-gray-700 mb-1">Select Camera:</label>
          <select
            id="cameraSelect"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleCameraChange}
            value={selectedDeviceId || ''}
          >
            {devices.map((device, index) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Camera ${index + 1}`}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-700">Confidence:</span>
          <div className="w-32 bg-gray-200 rounded-full h-2.5">
            <div
              className="h-2.5 rounded-full"
              style={{
                width: `${Math.min(100, similarityScore)}%`,
                backgroundColor: isMatch ? '#10B981' : '#EF4444'
              }}
            ></div>
          </div>
          <span className="text-sm font-medium ml-2">{similarityScore.toFixed(1)}%</span>
        </div>
        <p className={`py-1 px-3 rounded text-sm mb-2 ${isMatch ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {isMatch ? '✅ Match found!' : '❌ No match detected'}
        </p>
      </div>
    </div>
  );
}
