import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import "./FacialExpression.css";

export default function ExpressionDetector() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [expression, setExpression] = useState("Detecting...");

  // Start Webcam
  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      videoRef.current.srcObject = stream;
    });
  };

  // Load face-api models
  const loadModels = async () => {
    const MODEL_URL = "/models";
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  };

  useEffect(() => {
    loadModels().then(startVideo);
  },[]);

    const detectExpressionOnce = async () => {
    const detections = await faceapi
      .detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      )
      .withFaceExpressions();

    if (!detections[0]) {
      console.log("No face detected");
      return;
    }

    const expr = detections[0].expressions;
    const mostProbable = Object.keys(expr).reduce((a, b) =>
      expr[a] > expr[b] ? a : b
    );

    setExpression(mostProbable);
    console.log("Expression:", mostProbable, expr[mostProbable]);
  };



  return (
    <div className="mood-container">
      <h1 className="page-title">Live Mood Detection</h1>

      <div className="detection-section">
        
        {/* LEFT: Video Feed */}
        <div className="video-card">
          <div ref={canvasRef} className="video-wrapper">
            <video
              ref={videoRef}
              width="350"
              height="260"
              autoPlay
              muted
              className="video-feed"
            />
          </div>
        </div>

        {/* RIGHT: Mood Info */}
        <div className="mood-info">
          <h2 className="mood-title">Live Mood Detection</h2>
          <p className="mood-description">
            Your current mood is being analyzed in real-time. Enjoy music tailored to your feelings.
          </p>

          <button className="start-btn" onClick={detectExpressionOnce}>
            Detect Mood
          </button>

          <p className="current-mood">
            Current Mood: <span>{expression.toUpperCase()}</span>
          </p>
        </div>
      </div>

      {/* Recommended Music */}
      <div className="music-section">
        <h2 className="music-title">Recommended Tracks</h2>

        <div className="tracks-list">
          {[
            "Sunrise Serenade",
            "Midnight Groove",
            "Electric Pulse",
            "Tranquil Echoes",
            "Rhythmic Heartbeat",
            "Dreamy Horizons",
            "Urban Flow",
            "Soulful Journey",
            "Cosmic Dance",
            "Velvet Nights",
          ].map((track, i) => (
            <div className="track-item" key={i}>
              <div>
                <h4>{track}</h4>
                <p className="artist-name">Artist Name</p>
              </div>
              <button className="play-btn">▶</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}