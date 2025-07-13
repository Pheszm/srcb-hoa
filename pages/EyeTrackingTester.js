import { useState, useEffect, useRef } from 'react';

const EyeTrackingAntiCheat = () => {
  const [isWatching, setIsWatching] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [calibrationPoints, setCalibrationPoints] = useState([]);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationProgress, setCalibrationProgress] = useState(0);
  const [isWarningActive, setIsWarningActive] = useState(false);
  const videoRef = useRef(null);
  const calibrationRef = useRef(null);
  const warningTimeoutRef = useRef(null);

  useEffect(() => {
    // Load WebGazer.js from CDN
    const script = document.createElement('script');
    script.src = '/API_Functions/Webgazer.js';
    script.async = true;
    script.onload = () => {
      console.log('WebGazer.js loaded');
      setLoading(false);
      setupMobileCalibrationPoints();
    };
    setLoading(true);
    document.body.appendChild(script);

    return () => {
      if (window.webgazer) {
        window.webgazer.end();
      }
      document.body.removeChild(script);
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
    };
  }, []);

  const setupMobileCalibrationPoints = () => {
    // Create 5 calibration points for mobile
    const points = [
      { x: 20, y: 20 },    // Top-left
      { x: 80, y: 20 },    // Top-right
      { x: 50, y: 50 },    // Center
      { x: 20, y: 80 },    // Bottom-left
      { x: 80, y: 80 }     // Bottom-right
    ].map(p => ({
      ...p,
      x: `${p.x}%`,
      y: `${p.y}%`
    }));
    setCalibrationPoints(points);
  };

  const calibrateMobile = async (index = 0) => {
    if (index >= calibrationPoints.length) {
      setIsCalibrating(false);
      startMonitoring();
      return;
    }

    setIsCalibrating(true);
    setCalibrationProgress((index / calibrationPoints.length) * 100);

    const point = calibrationPoints[index];
    const element = document.createElement('div');
    element.style.position = 'absolute';
    element.style.left = point.x;
    element.style.top = point.y;
    element.style.width = '30px';
    element.style.height = '30px';
    element.style.backgroundColor = 'red';
    element.style.borderRadius = '50%';
    element.style.transform = 'translate(-50%, -50%)';
    element.style.zIndex = '1000';

    calibrationRef.current.appendChild(element);

    // Wait for user to tap the point
    const handleTap = () => {
      if (window.webgazer) {
        // Get actual coordinates
        const rect = calibrationRef.current.getBoundingClientRect();
        const x = (parseFloat(point.x) / 100) * rect.width;
        const y = (parseFloat(point.y) / 100) * rect.height;
        
        // Simulate mouse movement for calibration
        const event = new MouseEvent('mousemove', {
          clientX: x,
          clientY: y,
          bubbles: true,
          cancelable: true
        });
        document.dispatchEvent(event);
        
        // Click to register calibration point
        setTimeout(() => {
          const clickEvent = new MouseEvent('click', {
            clientX: x,
            clientY: y,
            bubbles: true,
            cancelable: true
          });
          document.dispatchEvent(clickEvent);
        }, 100);
      }
      
      calibrationRef.current.removeChild(element);
      setTimeout(() => calibrateMobile(index + 1), 500);
    };

    element.addEventListener('click', handleTap, { once: true });
    element.addEventListener('touchstart', handleTap, { once: true });
  };

  const startEyeTracking = async () => {
    if (!window.webgazer) {
      console.error('WebGazer not loaded');
      return;
    }

    setIsWatching(true);
    setWarningCount(0);
    setIsWarningActive(false);

    // Initialize WebGazer for mobile
    window.webgazer.setRegression('ridge');
    window.webgazer.setTracker('clmtrackr');
    window.webgazer.setGazeListener(function(data, elapsedTime) {
      // This will be replaced after calibration
    });
    
    await window.webgazer.begin();
    window.webgazer.showPredictionPoints(false);
    window.webgazer.showVideoPreview(false);

    // Start mobile calibration
    calibrateMobile();
  };

  const startMonitoring = () => {
    window.webgazer.setGazeListener(function(data, elapsedTime) {
      if (data == null || isWarningActive) return;

      // Check if user is looking away from screen
      const margin = 0.1 * window.innerWidth; // 10% margin
      if (data.x < -margin || data.x > window.innerWidth + margin || 
          data.y < -margin || data.y > window.innerHeight + margin) {
        setIsWarningActive(true);
        setWarningCount(prev => prev + 1);
        
        // Set 3-second cooldown before next warning
        warningTimeoutRef.current = setTimeout(() => {
          setIsWarningActive(false);
        }, 3000);
      }
    });
  };

  const stopEyeTracking = () => {
    if (window.webgazer) {
      window.webgazer.end();
    }
    setIsWatching(false);
    setIsCalibrating(false);
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
    }
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Exam Monitoring</h1>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Attention Monitoring</h2>
          <p className="text-gray-600 mb-4">
            This system monitors your attention during the exam. 
            Frequent warnings may indicate you're not focused on the screen.
          </p>
          
          <div className="flex space-x-4 mb-6">
            {loading ? (
              <button disabled className="px-4 py-2 bg-gray-400 text-white rounded">
                Loading...
              </button>
            ) : !isWatching ? (
              <button
                onClick={startEyeTracking}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                disabled={loading}
              >
                Start Monitoring
              </button>
            ) : (
              <button
                onClick={stopEyeTracking}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Stop Monitoring
              </button>
            )}
          </div>
        </div>

        {isCalibrating && (
          <div className="mb-6">
            <div className="h-2 bg-gray-200 rounded-full mb-2">
              <div 
                className="h-2 bg-blue-500 rounded-full" 
                style={{ width: `${calibrationProgress}%` }}
              ></div>
            </div>
            <p className="text-center text-gray-700">
              Tap the red dots to calibrate ({calibrationPoints.length} points)
            </p>
          </div>
        )}

        {warningCount > 0 && (
          <div className="mb-6 p-4 bg-yellow-100 text-yellow-800 rounded-md">
            <p className="font-semibold">Attention Warning ({warningCount})</p>
            <p>Please focus on the exam screen</p>
            {isWarningActive && (
              <p className="text-sm mt-1">Next warning available in 3 seconds</p>
            )}
          </div>
        )}

        <div 
          ref={calibrationRef}
          className="relative w-full h-64 bg-gray-200 rounded-md overflow-hidden"
        >
          {isWatching && (
            <video 
              id="webgazerVideoFeed"
              className="w-full h-full object-cover"
              autoPlay
              muted
            ></video>
          )}
        </div>
      </div>
    </div>
  );
};

export default EyeTrackingAntiCheat;