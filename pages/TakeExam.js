"use client";

import { useEffect, useState } from 'react';
import ExamRandomizer from "@/components/ExamForms/ExamRandomizer";
import Eye_Tracking from "@/components/Others/Eye_Tracking";
import Facial_Recognition from "@/components/Others/Face_Scan";

export default function LockdownBrowser() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [attemptsToExit, setAttemptsToExit] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substring(2, 10));
  const [isClient, setIsClient] = useState(false);
  const [isAuthorized, SetisAuthorized] = useState(false);
  const [isEyeTracking, SetisEyeTracking] = useState(false);
  const [eyeTrackingWarnings, setEyeTrackingWarnings] = useState(0);


  const [warnings, setWarnings] = useState(0);
  const [gazeData, setGazeData] = useState(null);
  // Set client flag and detect mobile only on client side
  useEffect(() => {
    setIsClient(true);
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  }, []);

  // Prevent right-click and long press (for mobile)
  useEffect(() => {
    if (!isClient) return;

    const handleContextMenu = (e) => e.preventDefault();
    const handleTouchStart = (e) => {
      if (e.touches.length > 1) e.preventDefault(); // Prevent zooming
    };
    
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, [isClient]);

  // Prevent keyboard shortcuts and gestures
  useEffect(() => {
    if (!isClient) return;

    const handleKeyDown = (e) => {
      if (
        e.ctrlKey || 
        e.metaKey || 
        e.altKey || 
        ['F1', 'F5', 'F12', 'Escape'].includes(e.key)
      ) {
        e.preventDefault();
        setAttemptsToExit(prev => prev + 1);
      }
    };

    const handleTouchMove = (e) => {
      if (isMobile) e.preventDefault();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isClient, isMobile]);

  // Request fullscreen (works differently on mobile)
  const requestFullScreen = () => {
    if (!isClient) return;

    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
        .then(() => setIsFullScreen(true))
        .catch(err => console.error('Fullscreen error:', err));
    } else if (elem.webkitRequestFullscreen) { // For Safari
      elem.webkitRequestFullscreen()
        .then(() => setIsFullScreen(true))
        .catch(err => console.error('Fullscreen error:', err));
    } else {
      setIsFullScreen(true);
      alert('Please manually enable fullscreen mode in your browser settings');
    }
  };

  // Exit handler
  const handleExitAttempt = () => {
    setAttemptsToExit(prev => {
      const newAttempts = prev + 1;
      if (newAttempts >= 2) {
        alert('Multiple exit attempts detected. This will be reported.');
      }
      return newAttempts;
    });
  };

  // Don't render lockdown UI until we're on the client
  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-lg">Loading secure browser...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 touch-none">

      <title>Taking Assessment | HED Online Assessment</title>
      {/* Browser Chrome UI - Hidden on mobile */}
      {!isMobile && (
        <div className="p-2 flex items-center justify-between">
          <p/>
          <div className="text-yellow-600 text-sm bg-yellow-100 p-1 rounded-lg border-yellow-400 border">Taking Assessment - Lockdown Browser</div>
          <p/>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative select-none">
        {!isFullScreen && (
          <div className="absolute inset-0 bg-gray-100 bg-opacity-90 flex flex-col items-center justify-center text-blue-800 p-8 z-50">
            <h1 className="text-2xl font-bold mb-4">Lockdown Browser Required</h1>
            <p className="mb-1 text-center">
              {isMobile ? (
                "Please enable full-screen mode and do not switch apps during your session."
              ) : (
                "You must enable full-screen mode to continue. This prevents access to other applications or system functions."
              )}
            </p>
            <p className="mb-6 text-center">
              You are in a secure browser environment. Navigation away from this page is restricted.
            </p>
            <button
              onClick={requestFullScreen}
              className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-8 rounded-lg text-lg"
            >
              {isMobile ? "Start Secure Session" : "Enter Full Screen"}
            </button>
            {isMobile && (
              <p className="mt-4 text-sm text-gray-300">
                Note: On some mobile devices, you may need to manually disable screen rotation.
              </p>
            )}
          </div>
        )}

        {/* Your actual content */}
        <div className="h-full w-full flex flex-col items-center justify-center p-4 overflow-auto">
          
          {/* ANSWER FORM HERE*/}
          {isAuthorized ? (
            <>
            <Eye_Tracking 
              WarningCounts={setEyeTrackingWarnings}
              StartTracking={SetisEyeTracking}
            />
              {isEyeTracking ? <ExamRandomizer /> : null}
            </>
          ) : (
            <Facial_Recognition Authorized={SetisAuthorized} />
          )}



          {/*  END OF ANSWER FORM */}

        </div>
      </div>

      {/* Status Bar */}
      <div className={` text-black p-2 text-xs flex justify-between items-center ${isMobile ? 'text-sm' : ''}`}>
        <div>Secure Mode🔒</div>
        <div>
          <button 
            onClick={handleExitAttempt}
            className="text-red-400 hover:text-red-300 font-bold transition-colors duration-200"
          >
            {isMobile ? "Exit (Admin Only)" : "Exit (Restricted)"}
          </button>
        </div>
        <div>Session ID: {sessionId}</div>
      </div>
    </div>
  );
}