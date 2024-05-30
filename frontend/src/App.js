import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { Button, Box, Typography, Container, Paper, Fade } from '@mui/material';
import Webcam from 'react-webcam'; // Import webcam library
import axios from 'axios'; // Import Axios for HTTP requests
import VideoComp from './components/video'; // Import video component
import WebcamComp  from './components/webcamera';
function App() {
  var [fade, setFade] = useState(true);

  // Function to send captured video to Gemini API

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        EmoStream
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
      <VideoComp
        fade={fade}
        setFade={setFade}
      />
       <WebcamComp
       fade={fade}
        setFade={setFade}
      />
      </Box>
    </Container>
  );
}

export default App;
