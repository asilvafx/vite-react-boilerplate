import React, { useEffect, useRef } from 'react';
import { Vector } from "p5";
import StatsSection from "./StatsSection";
import canvas_video from "../assets/bg/canvas.mp4";

const HeroSection = () => {
    const sourceCanvasRef = useRef(null);
    const targetCanvasRef = useRef(null);
    const videoRef = useRef(null); // Reference for the video element
    const dots = useRef([]); // Use useRef to persist dots across renders
    const detailLevel = 8;
    const minDotRadius = 0.5;
    const maxDotRadius = 5;
    const dotColor = '#859293';

    function map_range(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }

    function dot(ctx, x, y, radius, color) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();
    }

    class Dot {
        constructor(options) {
            this.originalPos = new Vector(options.x, options.y);
            this.pos = this.originalPos.copy();
            this.target = this.originalPos.copy();
            this.vel = new Vector(0, 0);
            this.acc = new Vector(0, 0);
            this.radius = options.radius;
            this.color = options.color;
            this.originalColor = this.color;
            this.hoverColor = options.hoverColor;
            this.ctx = options.context;
            this.maxforce = 0.1;
            this.maxspeed = 4;
        }

        update() {
            this.vel.add(this.acc);
            this.vel.limit(this.maxspeed);
            this.pos.add(this.vel);
            this.acc.mult(0);
        }

        draw() {
            dot(this.ctx, this.pos.x, this.pos.y, this.radius, this.color);
        }
    }

    useEffect(() => {
        const sourceCanvas = sourceCanvasRef.current;
        const targetCanvas = targetCanvasRef.current;
        const sourceCtx = sourceCanvas.getContext('2d', { willReadFrequently: true });
        const targetCtx = targetCanvas.getContext('2d', { willReadFrequently: true });
        const videoElement = videoRef.current;

        const initializeDots = () => {
            sourceCanvas.width = window.innerWidth;
            sourceCanvas.height = window.innerHeight;
            targetCanvas.width = window.innerWidth;
            targetCanvas.height = window.innerHeight;
        };

        const loop = () => {
            requestAnimationFrame(loop);
            targetCtx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);

            // Draw the current video frame onto the source canvas
            sourceCtx.drawImage(videoElement, 0, 0, sourceCanvas.width, sourceCanvas.height);

            // Clear previous dots
            dots.current = []; // Clear previous frame dots

            // Get the image data from the source canvas
            const imageData = sourceCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);

            // Reinitialize dots based on the current video frame
            for (let y = 0; y < sourceCanvas.height; y += detailLevel) {
                const row = sourceCanvas.width * y;
                for (let x = 0; x < sourceCanvas.width; x += detailLevel) {
                    const pixel = (row + x) * 4;
                    const brightness = (imageData.data[pixel] + imageData.data[pixel + 1] + imageData.data[pixel + 2]) / 3;
                    const radius = map_range(brightness, 0, 255, 0, maxDotRadius);

                    if (radius > minDotRadius) {
                        const dot = new Dot({
                            x,
                            y,
                            radius,
                            color: dotColor,
                            context: targetCtx,
                        });
                        dots.current.push(dot);
                    }
                }
            }

            // Update and draw the dots
            dots.current.forEach((dot) => {
                dot.update();
                dot.draw();
            });
        };

        videoElement.crossOrigin = "anonymous"; // Set crossOrigin attribute
        videoElement.src = canvas_video; // Set the video source
        videoElement.onloadeddata = () => {
            videoElement.play().catch(error => {
                console.error("Error attempting to play the video:", error);
            });
            initializeDots(); // Initialize dots when video is loaded
            loop(); // Start the animation loop
        };

        // Initialize dots on window resize
        const handleResize = () => {
            initializeDots();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section className="w-full h-full max-w-screen-lg mx-auto mb-16 relative">
            <div className="canvas-container pointer-events-none">
                <div className="relative w-full h-auto">
                    <canvas ref={sourceCanvasRef} style={{ display: 'none' }}></canvas>
                    <canvas ref={targetCanvasRef}></canvas>
                    <video ref={videoRef} autoPlay playsInline loop muted style={{ display: 'none' }}></video>
                </div>
            </div>
            <div className="flex flex-col">
                <h2 className="text-4xl font-bold mb-4 p-2 neon-text-intense bg-clip-text">$BOLT
                    Token</h2>
                <p className="text-gray-400 text-lg p-2 max-w-md neon-text bg-clip-text">
                    The native token powering the next generation of decentralized applications.
                </p>
            </div>
            <StatsSection />
        </section>
    );
};

export default HeroSection;