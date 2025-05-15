import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { OrbitControls, Html } from '@react-three/drei';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';

function Modelo() {
  const fbx = useLoader(FBXLoader, '/source/Home.fbx');
  const fbxpc = useLoader(FBXLoader, '/source/cuadro1.fbx');
  const cuadro = useLoader(FBXLoader, '/source/cuadro2.fbx');
  const discoSade = useLoader(FBXLoader, '/source/disco1.fbx');
  const discoPinkFloyd = useLoader(FBXLoader, '/source/disco2.fbx');
  const github = useLoader(FBXLoader, '/source/github.fbx');
  const pc = useLoader(FBXLoader, '/source/pc.fbx');
  const linkedin = useLoader(FBXLoader, '/source/linkedin.fbx');

  const texture = useLoader(TextureLoader, '/textures/gris.jpg');
  const texture2 = useLoader(TextureLoader, '/textures/frank.png');
  const texture3 = useLoader(TextureLoader, '/textures/hector.png');
  const textureSade = useLoader(TextureLoader, '/textures/sade.jpg');
  const texturePinkFloyd = useLoader(TextureLoader, '/textures/pink.jpg');
  const textureGithub = useLoader(TextureLoader, '/textures/github.png');
  const texturePC = useLoader(TextureLoader, '/textures/filmo.png');
  const textureLinkedin = useLoader(TextureLoader, '/textures/linkedin.png');

  const [hovered, setHovered] = useState(false);
  const [luzEncendida, setLuzEncendida] = useState(true);
  const [luzSecundariaEncendida, setLuzSecundariaEncendida] = useState(true);

  const [showPopupSade, setShowPopupSade] = useState(false);
  const [audioSade] = useState(new Audio('/song/sade.mp3'));

  const [showPopupPinkFloyd, setShowPopupPinkFloyd] = useState(false);
  const [audioPinkFloyd] = useState(new Audio('/song/money.mp3'));

  const sadeRef = useRef();
  const pinkFloydRef = useRef();

  useEffect(() => {
    fbx.traverse((child) => {
      if (child.isMesh) {
        child.material.map = texture;
        child.material.needsUpdate = true;
      }
    });
    fbxpc.traverse((child) => {
      if (child.isMesh) {
        child.material.map = texture2;
        child.material.needsUpdate = true;
      }
    });
    cuadro.traverse((child) => {
      if (child.isMesh) {
        child.material.map = texture3;
        child.material.needsUpdate = true;
      }
    });
    discoSade.traverse((child) => {
      if (child.isMesh) {
        child.material.map = textureSade;
        child.material.needsUpdate = true;
      }
    });
    discoPinkFloyd.traverse((child) => {
      if (child.isMesh) {
        child.material.map = texturePinkFloyd;
        child.material.needsUpdate = true;
      }
    });
  pc.traverse((child) => {
        if (child.isMesh) {
          child.material.map = texturePC;
          child.material.needsUpdate = true;
        }
      });
   github.traverse((child) => {
      if (child.isMesh) {
        child.material.map = textureGithub;
        child.material.emissive = new THREE.Color(0x000000); // Luz negra
        child.material.emissiveIntensity = 1;
        child.material.needsUpdate = true;
      }
    });
     linkedin.traverse((child) => {
      if (child.isMesh) {
        child.material.map = textureLinkedin;
        child.material.emissiveIntensity = 1;
        child.material.needsUpdate = true;
      }
    });
  }, [
    fbx, fbxpc, cuadro, discoSade, discoPinkFloyd, github, pc,
    texture, texture2, texture3, textureSade, texturePinkFloyd, textureGithub, texturePC,
  ]);

  useFrame(() => {
    if (github) {
      github.traverse((child) => {
        if (child.isMesh && child.material?.emissiveIntensity !== undefined) {
          const pulse = 0.5 + Math.sin(Date.now() * 0.005) * 0.5;
          child.material.emissiveIntensity = pulse;
        }
      });
    }
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'default';
  }, [hovered]);

  const handleDiscoSadeClick = () => {
    setShowPopupSade(true);
    audioSade.play();
  };

  const closePopupSade = () => {
    setShowPopupSade(false);
    audioSade.pause();
    audioSade.currentTime = 0;
  };

  const handleDiscoPinkFloydClick = () => {
    setShowPopupPinkFloyd(true);
    audioPinkFloyd.play();
  };

  const closePopupPinkFloyd = () => {
    setShowPopupPinkFloyd(false);
    audioPinkFloyd.pause();
    audioPinkFloyd.currentTime = 0;
  };

  const toggleLuz = () => setLuzEncendida((prev) => !prev);
  const toggleLuzSecundaria = () => setLuzSecundariaEncendida((prev) => !prev);

  const posicionLuzPrincipal = [0.75, 0.78, -0.72];
  const posicionLuzSecundaria = [0.78, 0.78, 0.92];

  return (
    <>
      <primitive object={fbx} scale={0.01} />
      <primitive object={fbxpc} scale={0.01} position={[0, 0, 0]} />
      <primitive object={cuadro} scale={0.01} position={[0, 0, 0]} />
          <primitive
        object={linkedin}
        scale={0.01}
        position={[0, 0, 0]}
        onClick={() => window.open('https://es.linkedin.com/in/jordi-celem%C3%ADn', '_blank')}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
        <primitive
        object={pc}
        scale={0.01}
        position={[0, 0, 0]}
        onClick={() => window.open('http://filmo.celemin.me/public/cartelera', '_blank')}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
      <primitive
        ref={sadeRef}
        object={discoSade}
        scale={0.01}
        position={[0, 0, 0]}
        onClick={handleDiscoSadeClick}
      />

      <primitive
        ref={pinkFloydRef}
        object={discoPinkFloyd}
        scale={0.01}
        position={[0, 0, 0]}
        onClick={handleDiscoPinkFloydClick}
      />

      <primitive
        object={github}
        scale={0.01}
        position={[0, 0, 0]}
        onClick={() => window.open('https://github.com/celeminj', '_blank')}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />

      {luzEncendida && (
        <pointLight
          position={posicionLuzPrincipal}
          intensity={0.9}
          distance={2}
          decay={2}
          color="white"
        />
      )}

      {luzSecundariaEncendida && (
        <pointLight
          position={posicionLuzSecundaria}
          intensity={0.9}
          distance={2}
          decay={2}
          color="white"
        />
      )}

      <mesh
        position={posicionLuzPrincipal}
        onClick={toggleLuz}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial
          emissive={luzEncendida ? 'white' : 'black'}
          emissiveIntensity={luzEncendida ? 1 : 0}
          color={luzEncendida ? 'white' : 'gray'}
        />
      </mesh>

      <mesh
        position={posicionLuzSecundaria}
        onClick={toggleLuzSecundaria}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial
          emissive={luzSecundariaEncendida ? 'white' : 'black'}
          emissiveIntensity={luzSecundariaEncendida ? 1 : 0}
          color={luzSecundariaEncendida ? 'white' : 'gray'}
        />
      </mesh>

      {showPopupSade && (
        <Html position={[2, 2, 0]}>
          <div style={popupHtmlStyle}>
            <h2>🎶 Reproduciendo Sade</h2>
            <button onClick={closePopupSade} style={buttonStyle}>Cerrar</button>
          </div>
        </Html>
      )}

      {showPopupPinkFloyd && (
        <Html position={[2, 2.5, 0]}>
          <div style={popupHtmlStyle}>
            <h2>🎸 Reproduciendo Pink Floyd</h2>
            <button onClick={closePopupPinkFloyd} style={buttonStyle}>Cerrar</button>
          </div>
        </Html>
      )}
    </>
  );
}

const popupHtmlStyle = {
  background: 'rgba(0,0,0,0.85)',
  padding: '20px',
  borderRadius: '10px',
  color: 'white',
  textAlign: 'center',
  minWidth: '200px',
};

const buttonStyle = {
  marginTop: '10px',
  padding: '8px 16px',
  backgroundColor: '#ff4b4b',
  border: 'none',
  borderRadius: '5px',
  color: 'white',
  cursor: 'pointer',
};

function App() {
  return (
    <div style={{ margin: 0, padding: 0, overflow: 'hidden', height: '100vh', width: '100%' }}>
      <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 2, 5], fov: 60 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} />
        <Suspense fallback={null}>
          <Modelo />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
