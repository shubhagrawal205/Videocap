import React, { useState, useRef, useEffect } from "react";
import { Button, TextField, Card, CardContent, Typography } from "@mui/material";

const App = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [captions, setCaptions] = useState([]);
  const [captionText, setCaptionText] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const videoRef = useRef(null);

  const addCaption = () => {
    if (captionText && timestamp) {
      setCaptions([...captions, { text: captionText, time: parseFloat(timestamp) }]);
      setCaptionText("");
      setTimestamp("");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current) {
        const currentTime = videoRef.current.currentTime;
        const activeCaption = captions.find(cap => Math.abs(cap.time - currentTime) < 0.5);
        if (activeCaption) {
          document.getElementById("caption-display").innerText = activeCaption.text;
        } else {
          document.getElementById("caption-display").innerText = "";
        }
      }
    }, 500);
    return () => clearInterval(interval);
  }, [captions]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
      <Card style={{ width: "100%", maxWidth: "600px", padding: "20px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Video Caption App</Typography>
          <TextField
            fullWidth
            label="Enter video URL"
            variant="outlined"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            margin="normal"
          />
          {videoUrl && (
            <video ref={videoRef} controls style={{ width: "100%", marginTop: "10px" }}>
              <source src={videoUrl} type="video/mp4" />
            </video>
          )}
          <Typography id="caption-display" align="center" variant="h6" style={{ padding: "10px", backgroundColor: "#f0f0f0", marginTop: "10px" }}></Typography>
        </CardContent>
      </Card>

      <Card style={{ width: "100%", maxWidth: "600px", padding: "20px", marginTop: "20px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
        <CardContent>
          <Typography variant="h6">Add Caption</Typography>
          <TextField
            fullWidth
            label="Enter caption text"
            variant="outlined"
            value={captionText}
            onChange={(e) => setCaptionText(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            type="number"
            label="Timestamp (in seconds)"
            variant="outlined"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={addCaption} fullWidth style={{ marginTop: "10px" }}>Add Caption</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
