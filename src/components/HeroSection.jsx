import React, { useEffect, useRef } from 'react';
import { Vector } from "p5";
import StatsSection from "./StatsSection";

const HeroSection = () => {
    const sourceCanvasRef = useRef(null);
    const targetCanvasRef = useRef(null);
    const dots = [];
    const imageSrc = 'https://cdn.rawgit.com/TheoGil/codepen-assets/5880eb52/portrait.jpg?raw=true';
    const detailLevel = 8;
    const minDotRadius = 0.5;
    const maxDotRadius = 4;
    const dotColor = '#7CDFFF';

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
            this.comfortZone = 100;
        }

        addPredator(predator) {
            this.predator = predator;
        }

        update() {
            if (this.predator) {
                const distanceFromPredator = this.pos.dist(this.predator.pos);
                if (distanceFromPredator < this.comfortZone) {
                    this.color = this.hoverColor;
                    this.target = this.predator.pos;
                } else {
                    this.target = this.originalPos;
                    this.color = this.originalColor;
                }
            }
            this.vel.add(this.acc);
            this.vel.limit(this.maxspeed);
            this.pos.add(this.vel);
            this.acc.mult(0);
        }

        applyForce(force) {
            this.acc.add(force);
        }

        seek(target) {
            const desired = Vector.sub(target, this.pos);
            const d = desired.mag();
            if (d < 100) {
                const m = map_range(d, 0, 100, 0, this.maxspeed);
                desired.setMag(m);
            } else {
                desired.setMag(this.maxspeed);
            }
            const steer = Vector.sub(desired, this.vel);
            steer.limit(this.maxforce);
            this.applyForce(steer);
        }

        draw() {
            dot(this.ctx, this.pos.x, this.pos.y, this.radius, this.color);
        }
    }

    useEffect(() => {
        const sourceCanvas = sourceCanvasRef.current;
        const targetCanvas = targetCanvasRef.current;
        const sourceCtx = sourceCanvas.getContext('2d');
        const targetCtx = targetCanvas.getContext('2d');
        const imageObj = new Image();

        imageObj.crossOrigin = "Anonymous";
        imageObj.src = imageSrc;
        imageObj.onload = initializeDots;

        function initializeDots() {
            sourceCanvas.width = window.innerWidth;
            sourceCanvas.height = window.innerHeight;
            targetCanvas.width = window.innerWidth;
            targetCanvas.height = window.innerHeight;

            sourceCtx.drawImage(
                imageObj,
                targetCanvas.width / 2 - imageObj.width / 2,
                targetCanvas.height / 2 - imageObj.height / 2
            );

            const imageData = sourceCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);

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
                        dots.push(dot);
                    }
                }
            }

            loop();
        }


        function loop() {
            requestAnimationFrame(loop);
            targetCtx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
            dots.forEach((dot) => {
                dot.seek(dot.target);
                dot.update();
                dot.draw();
            });
        }
    }, []);

    return (
        <section className="w-full h-full max-w-screen-lg mx-auto my-16 relative">

            <div className="canvas-container w-full pointer-events-none absolute top-0">
                <canvas ref={sourceCanvasRef} style={{display: 'none'}}></canvas>
                <canvas ref={targetCanvasRef}></canvas>
            </div>

            <StatsSection/>

        </section>
    );
};

export default HeroSection;