import React, { useState } from 'react';
import grid_bg from '../assets/bg/grid1.png';
import video_bg from '../assets/bg/bg.mp4';

const BackgroundVideo = () => {
    const [videoError, setVideoError] = useState(false);

    const handleVideoError = () => {
        setVideoError(true);
    };

    return (
        <div className="bg-extra">
            {videoError ? (
                <div
                    className="w-full h-screen"
                    style={{ backgroundImage: `url(${grid_bg})` }}
                ></div>
            ) : (
                <video
                    controls={false}
                    playsInline
                    autoPlay
                    loop
                    muted
                    onError={handleVideoError}
                    className="w-full h-screen object-cover"
                >
                    <source
                        src={video_bg}  
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    );
};

export default BackgroundVideo;