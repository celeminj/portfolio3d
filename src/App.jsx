import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { OrbitControls, Html } from '@react-three/drei';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { gsap } from 'gsap';
function Modelo() {
  const fbx = useLoader(FBXLoader, '/source/Home.fbx');
  const fbxpc = useLoader(FBXLoader, '/source/pc.fbx');
  const cuadro = useLoader(FBXLoader, '/source/cuadro1.fbx');
  const discoSade = useLoader(FBXLoader, '/source/Sade.fbx');
  const discoPinkFloyd = useLoader(FBXLoader, '/source/PinkFloyd.fbx');

  const texture = useLoader(TextureLoader, '/textures/sssssss.png');
  const texture2 = useLoader(TextureLoader, '/textures/frank.jpg');
  const texture3 = useLoader(TextureLoader, '/textures/hector.png');
  const textureSade = useLoader(TextureLoader, '/textures/sade.jpg');
  const texturePinkFloyd = useLoader(TextureLoader, '/textures/pink.jpg');

  const [hovered, setHovered] = useState(false);
  const [luzEncendida, setLuzEncendida] = useState(true);
  const [luzSecundariaEncendida, setLuzSecundariaEncendida] = useState(true);

  const [showPopupSade, setShowPopupSade] = useState(false);
  const [audioSade] = useState(new Audio('/song/sade.mp3'));

  const [showPopupPinkFloyd, setShowPopupPinkFloyd] = useState(false);
  const [audioPinkFloyd] = useState(new Audio('/song/money.mp3'));

  // Refs para los discos
  const sadeRef = useRef();
  const pinkFloydRef = useRef();

  // Estado para el arrastre (Sade)
  const [isDraggingSade, setIsDraggingSade] = useState(false);
  const [rotationYSade, setRotationYSade] = useState(0);
  const [startXSade, setStartXSade] = useState(null);

  // Estado para el arrastre (Pink Floyd)
  const [isDraggingPF, setIsDraggingPF] = useState(false);
  const [rotationYPF, setRotationYPF] = useState(0);
  const [startXPF, setStartXPF] = useState(null);

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
    discoSade.traverse((child) => {
      if (child.isMesh) {
        child.material.map = textureSade;
        child.material.needsUpdate = true;
      }
    });
  }, [discoSade, textureSade]);

  useEffect(() => {
    discoPinkFloyd.traverse((child) => {
      if (child.isMesh) {
        child.material.map = texturePinkFloyd;
        child.material.needsUpdate = true;
      }
    });
  }, [discoPinkFloyd, texturePinkFloyd]);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'default';
  }, [hovered]);

  useEffect(() => {
    if (sadeRef.current) {
      sadeRef.current.rotation.y = rotationYSade;
    }
  }, [rotationYSade]);

  useEffect(() => {
    if (pinkFloydRef.current) {
      pinkFloydRef.current.rotation.y = rotationYPF;
    }
  }, [rotationYPF]);

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

  gsap.to(pinkFloydRef.current, {
    rotationY: "+=" + Math.PI * 2, // Una vuelta completa
    duration: 1,
    ease: "power2.out",
    onUpdate: () => {
      pinkFloydRef.current.rotation.y = pinkFloydRef.current.rotationY;
    }
  });
};


  const closePopupPinkFloyd = () => {
    setShowPopupPinkFloyd(false);
    audioPinkFloyd.pause();
    audioPinkFloyd.currentTime = 0;
  };

  const toggleLuz = () => {
    setLuzEncendida((prev) => !prev);
  };

  const toggleLuzSecundaria = () => {
    setLuzSecundariaEncendida((prev) => !prev);
  };

  const posicionLuzPrincipal = [0.75, 0.78, -0.72];
  const posicionLuzSecundaria = [0.78, 0.78, 0.92];

  return (
    <>
      <primitive object={fbx} scale={0.01} />
      <primitive object={fbxpc} scale={0.01} position={[0, 0, 1]} />
      <primitive object={cuadro} scale={0.01} position={[0, 0, 2]} />

      {/* Disco Sade */}
      <primitive
        ref={sadeRef}
        object={discoSade}
        scale={0.01}
        position={[0, 0, 3]}
        onClick={handleDiscoSadeClick}
      />

      {/* Disco Pink Floyd */}
      <primitive
        ref={pinkFloydRef}
        object={discoPinkFloyd}
        scale={0.01}
        position={[2, 0, 3]}
        onClick={handleDiscoPinkFloydClick}
      />

      {/* Luz principal */}
      {luzEncendida && (
        <pointLight
          position={posicionLuzPrincipal}
          intensity={0.9}
          distance={2}
          decay={2}
          color="white"
        />
      )}

      {/* Luz secundaria */}
      {luzSecundariaEncendida && (
        <pointLight
          position={posicionLuzSecundaria}
          intensity={0.9}
          distance={2}
          decay={2}
          color="white"
        />
      )}

      {/* Bombilla principal */}
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

      {/* Bombilla secundaria */}
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

      {/* Popup Sade */}
      {showPopupSade && (
        <Html position={[0, 1.5, 3]}>
          <div style={popupHtmlStyle}>
            <h2>🎶 Reproduciendo Sade</h2>
            <button onClick={closePopupSade} style={buttonStyle}>Cerrar</button>
          </div>
        </Html>
      )}

      {/* Popup Pink Floyd */}
      {showPopupPinkFloyd && (
        <Html position={[2, 1.5, 3]}>
          <div style={popupHtmlStyle}>
            <h2>🎸 Reproduciendo Pink Floyd</h2>
            <button onClick={closePopupPinkFloyd} style={buttonStyle}>Cerrar</button>
          </div>
        </Html>
      )}
    </>
  );
}

// Estilos para los popups y botones
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
