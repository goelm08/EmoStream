// create boilerplate code
import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { Button, Box, Typography, Container, Paper, Fade } from '@mui/material';


function VideoComp({fade, setFade}) {
    const [currentVideo, setCurrentVideo] = useState(0); // Index of video

    const handleNext = () => {
        setFade(false);
        setTimeout(() => {
          setCurrentVideo((prevVideo) => (prevVideo + 1) % videos.length);
          setFade(true);
        }, 300);
      };
    
      const handlePrevious = () => {
        setFade(false);
        setTimeout(() => {
          setCurrentVideo((prevVideo) => (prevVideo - 1 + videos.length) % videos.length);
          setFade(true);
        }, 300);
      };
  
    const videos = [
      // Add your video URLs here
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://www.youtube.com/watch?v=soPklL9cWDg',
      'https://www.youtube.com/watch?v=gYUDZnzOnHk',
    ];

    return (     <Paper elevation={3} sx={{ p: 2, flex: 1 }}>
        <Fade in={fade} timeout={500}>
          <Box>
            <ReactPlayer 
              url={videos[currentVideo]} 
              controls
              playing={true}
              width="100%" 
              height="700px" // Adjust as needed
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button variant="outlined" startIcon={<ThumbUpIcon />}>
                Like
              </Button>
              <Button variant="outlined" startIcon={<ThumbDownIcon />}>
                Dislike
              </Button>
              <Button variant="contained" startIcon={<SkipPreviousIcon />} onClick={handlePrevious}>
                Previous
              </Button>
              <Button variant="contained" startIcon={<SkipNextIcon />} onClick={handleNext}>
                Next
              </Button>
            </Box>
          </Box>
        </Fade>
      </Paper>)
}

export default VideoComp;