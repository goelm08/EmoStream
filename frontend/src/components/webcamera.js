import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { Button, Box, Typography, Container, Paper, Fade } from '@mui/material';
import Webcam from 'react-webcam'; // Import webcam library
import axios from 'axios'; // Import Axios for HTTP requests

function WebcamComp({ fade, setFade }) {
    const webcamRef = useRef(null); // Reference for webcam component
    const [capturedVideo, setCapturedVideo] = useState(null); // State to store captured video

    // Function to handle video capture
    const captureVideo = () => {
        const capturedData = webcamRef.current.getScreenshot(); // Capture video frame
        setCapturedVideo(capturedData); // Set captured video data
    };

    const [selectedEmoji, setSelectedEmoji] = useState(null);

    const emojis = [
        { label: 'Happy', emoji: '🤣' },
        { label: 'Sad', emoji: '😢' },
        { label: 'Neutral', emoji: '😐' },
        { label: 'Excited', emoji: '😄' },
        { label: 'Angry', emoji: '😡' }
    ];

    useEffect(() => {
        // After 10 seconds, automatically select the "Happy" emoji
        const timer = setTimeout(() => {
          setSelectedEmoji(0); // Index 0 represents the "Happy" emoji
        }, 10000);
    
        // Clear the timer when the component unmounts or when selectedEmoji changes
        return () => clearTimeout(timer);
      }, []); // useEffect will only run once after the component mounts

    const handleEmojiClick = (index) => {
        setSelectedEmoji(index);
    };


    return (
        <Paper elevation={3} sx={{ p: 2, flex: 1 }}>
            <Fade in={fade} timeout={500}>
                <Box sx={{ width: '100%', height: '100%', position: 'relative' }}> {/* For better positioning */}
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{
                            width: { ideal: 1280 },  // Set ideal resolution for better quality
                            height: { ideal: 720 }  // Adjust as needed
                        }}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Fill container
                    />

                    {/* Capture/Send buttons overlaid on webcam feed */}
                    <Box sx={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', gap: 1, justifyContent: 'center' }}>
                        {/* <Button variant="contained" onClick={captureVideo}>Capture Video</Button> */}
                        {emojis.map((emoji, index) => (
                            <span
                                key={index}
                                role="img"
                                aria-label={emoji.label}
                                style={{
                                    fontSize: selectedEmoji === index ? '150px' : '70px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleEmojiClick(index)}
                            >
                                {emoji.emoji}
                            </span>
                        ))}
                    </Box>
                </Box>
            </Fade>
        </Paper>
    )
}

export default WebcamComp;