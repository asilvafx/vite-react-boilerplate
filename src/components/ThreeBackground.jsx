import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';

const ThreeBackground = () => {
    useEffect(() => {
        // Check if the canvas already exists
        const existingCanvas = document.getElementById('canvas-scene');
        if (existingCanvas) {
            return; // If it exists, do not create a new scene
        }

        let scene, camera, renderer, controls, shapeMesh, particleSystem, composer;
        const numParticles = 25000;
        const clock = new THREE.Clock();
        const params = {
            particleSize: 0.035,
            particleColor: 0xff5900,
            rotationSpeed: 0.1,
            bloomStrength: 0.8,
            motionTrail: 0.3,
        };

        init();
        animate();

        function init() {
            const canvasEl = document.getElementById('canvas-3d');

            scene = new THREE.Scene();
            scene.background = null; // Set the background to transparent

            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 5;

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enable alpha for transparency
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.domElement.id = 'canvas-scene'; // Set the ID of the canvas
            canvasEl.appendChild(renderer.domElement);

            controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.1;

            initLights();
            initParticles();
            initShape(); // Call the function to create a random shape
            initComposers();
            window.addEventListener('resize', onWindowResize, false);
        }

        function initLights() {
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(1, 3, 2);
            directionalLight.castShadow = true;
            scene.add(directionalLight);
        }

        function initParticles() {
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(numParticles * 3);
            const colors = new Float32Array(numParticles * 3);
            const sizes = new Float32Array(numParticles);

            for (let i = 0; i < numParticles; i++) {
                const phi = Math.acos(-1 + (2 * i) / numParticles);
                const theta = Math.sqrt(numParticles * Math.PI) * phi;
                const x = Math.sin(phi) * Math.cos(theta);
                const y = Math.sin(phi) * Math.sin(theta);
                const z = Math.cos(phi);

                positions[i * 3] = x * 1.5;
                positions[i * 3 + 1] = y * 1.5;
                positions[i * 3 + 2] = z * 1.5;

                const color = new THREE.Color(params.particleColor);
                color.offsetHSL(0, 0, (Math.random() - 0.5) * 0.5);
                colors[i * 3] = color.r;
                colors[i * 3 + 1] = color.g;
                colors[i * 3 + 2] = color.b;

                sizes[i] = params.particleSize * (0.8 + Math.random() * 0.4);
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

            const material = new THREE.PointsMaterial({
                size: params.particleSize,
                vertexColors: true,
                blending: THREE.AdditiveBlending,
                depthTest: true,
                depthWrite: false,
                transparent: true,
                opacity: 0.9,
                sizeAttenuation: true
            });

            particleSystem = new THREE.Points(geometry, material);
            scene.add(particleSystem);
        }

        function initShape() {
            // Remove existing shape if it exists
            if (shapeMesh) {
                scene.remove(shapeMesh);
            }

            const shapes = ['sphere', 'cube', 'torus', 'icosahedron'];
            const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
            let targetGeometry;

            switch (randomShape) {
                case 'sphere':
                    targetGeometry = new THREE.SphereGeometry(1.5, 64, 64);
                    break;
                case 'cube':
                    targetGeometry = new THREE.BoxGeometry(2.2, 2.2, 2.2);
                    break;
                case 'torus':
                    targetGeometry = new THREE.TorusGeometry(1.2, 0.4, 32, 200);
                    break;
                case 'icosahedron':
                    targetGeometry = new THREE.IcosahedronGeometry(1.7, 3);
                    break;
                default:
                    return;
            }

            shapeMesh = new THREE.Mesh(targetGeometry, new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }));
            scene.add(shapeMesh);
        }

        function initComposers() {
            const composer = new EffectComposer(renderer);
            const renderPass = new RenderPass(scene, camera);
            composer.addPass(renderPass);

            const bloomPass = new UnrealBloomPass(
                new THREE.Vector2(window.innerWidth, window.innerHeight),
                params.bloomStrength,
                0.5,
                0.85
            );
            composer.addPass(bloomPass);

            const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
            composer.addPass(gammaCorrectionPass);

            function animate() {
                requestAnimationFrame(animate);
                if (particleSystem) {
                    particleSystem.rotation.y += params.rotationSpeed * clock.getDelta();
                }
                if (shapeMesh) {
                    shapeMesh.rotation.y += params.rotationSpeed * clock.getDelta();
                }
                controls.update();
                composer.render();
            }

            animate();
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        return () => {
            // Clean up the scene on component unmount
            if (renderer) {
                renderer.dispose();
            }
            window.removeEventListener('resize', onWindowResize);
            const canvas = document.getElementById('canvas-scene');
            if (canvas) {
                canvas.remove(); // Remove the canvas from the DOM
            }
        };
    }, []);

    return null; // This component does not render any JSX
};

export default ThreeBackground;