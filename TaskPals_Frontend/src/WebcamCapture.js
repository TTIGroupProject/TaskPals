import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: 'user',
};

const WebcamCapture = ({ onCapture, onClose }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [capturing, setCapturing] = useState(false);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      setCapturing(true);
    } else {
      console.error('Webcam reference is not available.');
    }
  }, [webcamRef]);

  const handleUsePhoto = () => {
    if (imgSrc) {
      onCapture(imgSrc);
      setCapturing(false);
    } else {
      console.error('No image source available to use.');
    }
  };

  const handleRetake = () => {
    setImgSrc(null);
    setCapturing(false);
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        style={{
          width: '100%',
          borderRadius: '50%',  
          overflow: 'hidden',   
        }}
      />
      <div>
        {!capturing ? (
          <button onClick={capture}>Capture Photo</button>
        ) : (
          <>
            <button onClick={handleRetake}>Retake Photo</button>
            <button onClick={handleUsePhoto}>Use Photo</button>
            {imgSrc && (
              <img
                src={imgSrc}
                alt="Captured"
                style={{
                  width: '100%',
                  marginTop: '10px',
                  borderRadius: '50%',  
                  overflow: 'hidden',   
                }}
              />
            )}
          </>
        )}
      </div>
      <button onClick={onClose}>Close Camera</button>
    </div>
  );
};

export default WebcamCapture;
