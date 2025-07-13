"use client";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

export default function Eye_Tracking({ WarningCounts, StartTracking }) {
  const videoRef = useRef(null);
  const [isTracking, setIsTracking] = useState(false);
  const [calibrated, setCalibrated] = useState(false);
  const [gazeAwayCounter, setGazeAwayCounter] = useState(0);

  // Load webcam on mount
  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access error:", err);
      }
    }

    setupCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Handle calibration first
  const handleCalibration = async () => {
    await Swal.fire({
      title: "Calibration",
      html: `
        <p>Look directly at the center of the screen and press "Start".</p>
        <p>We will monitor your gaze from now on.</p>
      `,
      confirmButtonText: "Start",
    });

    setCalibrated(true);
    setIsTracking(true);
    StartTracking(true);
  };

  // Simulated gaze tracking logic
  useEffect(() => {
    if (!isTracking || !videoRef.current) return;

    const interval = setInterval(() => {
      const lookingAway = Math.random() < 0.15; // Simulated gaze check (15% chance of looking away)

      if (lookingAway) {
        setGazeAwayCounter((prev) => {
          const newCount = prev + 1;
          if (newCount >= 3) {
            WarningCounts((w) => w + 1);
            Swal.fire({
              icon: "warning",
              title: "Look at the screen!",
              text: "Eye tracking detected you're not looking at the screen.",
              timer: 2000,
              showConfirmButton: false,
            });
            return 0;
          }
          return newCount;
        });
      } else {
        setGazeAwayCounter(0); // reset counter if looking at screen
      }
    }, 3000); // check every 3 seconds

    return () => clearInterval(interval);
  }, [isTracking]);

  return (
    <div className="w-full flex flex-col items-center mb-4">
      {!isTracking ? (
        <>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-64 h-48 object-cover border-2 border-blue-500 rounded mb-2"
      />
      {!calibrated ? (
        <button
          onClick={handleCalibration}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Start Eye Tracking
        </button>
      ) : (
        <p className="text-green-600 font-semibold">Tracking Eyes 👁️</p>
      )}
      </>
    ):null}
    </div>
  );
}
