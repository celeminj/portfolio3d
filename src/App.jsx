import React, { Suspense, useEffect, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

function Modelo() {
  const fbx = useLoader(FBXLoader, '/source/Home.fbx');
  const fbxpc = useLoader(FBXLoader, '/source/pc.fbx');
  const cuadro = useLoader(FBXLoader, '/source/cuadro1.fbx');
  const texture = useLoader(TextureLoader, '/textures/sssssss.png');
  const texture2 = useLoader(TextureLoader, '/textures/frank.jpg');
  const texture3 = useLoader(TextureLoader, '/textures/hector.png');

  const [hovered, setHovered] = useState(false);
  const [luzEncendida, setLuzEncendida] = useState(true); // 🔘 estado de la luz

  useEffect(() => {
    fbx.traverse((child) => {
      if (child.isMesh) {
        child.material.map = texture;
        child.material.needsUpdate = true;
      }
    });
  }, [fbx, texture]);

  useEffect(() => {
    fbxpc.traverse((child) => {
      if (child.isMesh) {
        child.material.map = texture2;
        child.material.needsUpdate = true;
      }
    });
  }, [fbxpc, texture2]);

  useEffect(() => {
    cuadro.traverse((child) => {
      if (child.isMesh) {
        child.material.map = texture3;
        child.material.needsUpdate = true;
      }
    });
  }, [cuadro, texture3]);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'default';
  }, [hovered]);

  const handlePcClick = () => {
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  };

  const handleImageClick = () => {
    window.location.href = "https://www.youtube.com/watch?v=zoQgXoQMCHc";
  };

  const toggleLuz = () => {
    setLuzEncendida((prev) => !prev);
  };

  const posicionLuz = [0.75, 0.78, -0.72]; // Ajusta según la ubicación de la lámpara

  return (
    <>
      <primitive object={fbx} scale={0.01} />
      <primitive
        object={fbxpc}
        scale={0.01}
        position={[0, 0, 1]}
        onClick={handlePcClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
      <primitive
        object={cuadro}
        scale={0.01}
        position={[0, 0, 2]}
        onClick={handleImageClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />

      {/* Luz que se enciende o apaga con clic */}
      {luzEncendida && (
        <pointLight
          position={posicionLuz}
          intensity={0.9}
          distance={2}
          decay={2}
          color="white"
        />
      )}

      {/* Bombilla interactiva */}
      <mesh
        position={posicionLuz}
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
    </>
  );
}

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
