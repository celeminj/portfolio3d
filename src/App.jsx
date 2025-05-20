import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { OrbitControls, Html,Bounds  } from '@react-three/drei';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';

function Modelo() {
  const fbx = useLoader(FBXLoader, '/source/armario.fbx');
  const fbxpc = useLoader(FBXLoader, '/source/cuadro1.fbx');
  const cuadro = useLoader(FBXLoader, '/source/cuadro2.fbx');
  const discoSade = useLoader(FBXLoader, '/source/disco1.fbx');
  const discoPinkFloyd = useLoader(FBXLoader, '/source/disco2.fbx');
  const github = useLoader(FBXLoader, '/source/github.fbx');
  const pc = useLoader(FBXLoader, '/source/pc.fbx');
  const linkedin = useLoader(FBXLoader, '/source/linkedin.fbx');
  const poster = useLoader(FBXLoader, '/source/poster.fbx');
  const switchs = useLoader(FBXLoader, '/source/sw.fbx');
  const estanteria_alargada = useLoader(FBXLoader, '/source/estanteria_alargada.fbx');
  const estanteria = useLoader(FBXLoader, '/source/estanterias.fbx');
  const libro2 = useLoader(FBXLoader, '/source/librosql.fbx');
  const librotumando = useLoader(FBXLoader, '/source/librotumado.fbx');
  const mesa = useLoader(FBXLoader, '/source/mesa.fbx');
  const parquet = useLoader(FBXLoader, '/source/suelodemadera.fbx');
  const silla = useLoader(FBXLoader, '/source/silla.fbx');
  const sueloyparedes = useLoader(FBXLoader, '/source/sueloyparedes.fbx');
  const sugetar_estanteria = useLoader(FBXLoader, '/source/sugetar_estanteria.fbx');
  const sujetar_poster = useLoader(FBXLoader, '/source/sujetar_poster.fbx');
  const sw = useLoader(FBXLoader, '/source/sw.fbx');
  const visualcodeicon = useLoader(FBXLoader, '/source/visualcodeicon.fbx');
  const lampara = useLoader(FBXLoader, '/source/luces.fbx');
  const cama_madera = useLoader(FBXLoader, '/source/cama_madera.fbx');
  const colchon = useLoader(FBXLoader, '/source/colchon.fbx');
  const cortina = useLoader(FBXLoader, '/source/cortina.fbx');
  const manta = useLoader(FBXLoader, '/source/manta.fbx');
  const libros_abajo = useLoader(FBXLoader, '/source/libros_abjao.fbx');
  const libros_arriba = useLoader(FBXLoader, '/source/libros_arriba.fbx');
  const libros_medio = useLoader(FBXLoader, '/source/libros_medio.fbx');
  const almohada = useLoader(FBXLoader, '/source/almohada.fbx');



  const texture = useLoader(TextureLoader, '/textures/textura_armario.png');
  const texture2 = useLoader(TextureLoader, '/textures/frank.png');
  const texture3 = useLoader(TextureLoader, '/textures/hector.png');
  const textureSade = useLoader(TextureLoader, '/textures/sade.jpg');
  const texturePinkFloyd = useLoader(TextureLoader, '/textures/pink.jpg');
  const textureGithub = useLoader(TextureLoader, '/textures/github.png');
  const texturePC = useLoader(TextureLoader, '/textures/filmo.png');
  const textureLinkedin = useLoader(TextureLoader, '/textures/linkedin.png');
  const texturePoster = useLoader(TextureLoader, '/textures/poster.png');
  const parquet_texture = useLoader(TextureLoader, '/textures/parquet.png');
  const posterTxt = useLoader(TextureLoader, '/textures/textura_poster.png');
  const suelo_texture = useLoader(TextureLoader, '/textures/suelo_habitacion.png');
  const textura_angular = useLoader(TextureLoader, '/textures/textura_angular.png');
  const textura_armario = useLoader(TextureLoader, '/textures/parquet.png');
  const textura_estanteria = useLoader(TextureLoader, '/textures/textura_estanteria.png');
  const textura_mysql = useLoader(TextureLoader, '/textures/textura_mysql.png');
  const textura_php = useLoader(TextureLoader, '/textures/textura_php.png');
  const gris = useLoader(TextureLoader, '/textures/gris.jpg');
  const blue = useLoader(TextureLoader, '/textures/blue.jpg');
  const [hovered, setHovered] = useState(false);
  const [luzEncendida, setLuzEncendida] = useState(true);
  const [luzSecundariaEncendida, setLuzSecundariaEncendida] = useState(true);

  const [showPopupSade, setShowPopupSade] = useState(false);
  const [audioSade] = useState(new Audio('/song/dire.mp3'));

  const [showPopupPinkFloyd, setShowPopupPinkFloyd] = useState(false);
  const [audioPinkFloyd] = useState(new Audio('/song/money.mp3'));

  const sadeRef = useRef();
  const pinkFloydRef = useRef();

  useEffect(() => {
    libros_medio.traverse((child) => { 
      if (child.isMesh) {
        child.material.map = textura_php;
        child.material.needsUpdate = true;
      }
    });
    libros_arriba.traverse((child) => {
      if (child.isMesh) { 
        child.material.map = textura_php;
        child.material.needsUpdate = true;
      }
    });
    libros_abajo.traverse((child) => { 
      if (child.isMesh) {
        child.material.map = textura_angular;
        child.material.needsUpdate = true;
      }
    });
    cama_madera.traverse((child) => {
      if (child.isMesh) { 
        child.material.map = textura_armario;
        child.material.needsUpdate = true;
      }
    });

   
    cortina.traverse((child) => {
      if (child.isMesh) {
        child.material.map = gris;
        child.material.needsUpdate = true;
      }
    });
    manta.traverse((child) => {
      if (child.isMesh) {
        child.material.map = gris;
        child.material.needsUpdate = true;
      }

    });

    visualcodeicon.traverse((child) => {
      if (child.isMesh) {
        child.material.map = blue;
            child.material.emissive = new THREE.Color(808080); 
        child.material.emissiveIntensity = 1;
        child.material.needsUpdate = true;
      }
    });
    lampara.traverse((child) => {
      if (child.isMesh) {
        child.material.map = gris;
        child.material.needsUpdate = true;
      }
    });
    sujetar_poster.traverse((child) => {
      if (child.isMesh) {
        child.material.map = gris;
        child.material.needsUpdate = true;
      }
    });
    sueloyparedes.traverse((child) => {
      if (child.isMesh) {
        child.material.map = suelo_texture;
        child.material.needsUpdate = true;
      }
    });
    switchs.traverse((child) => {
      if (child.isMesh) { 
        child.material.needsUpdate = true;
      }
    });
    poster.traverse((child) => {
      if (child.isMesh) {
        child.material.map = posterTxt;
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
          child.material = new THREE.MeshStandardMaterial({
          map: textureSade
        });
        child.material.needsUpdate = true;
      }
    });
   discoPinkFloyd.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          map: texturePinkFloyd
        });
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
        child.material.emissive = new THREE.Color(808080); 
        child.material.emissiveIntensity = 2;
        child.material.needsUpdate = true;
      }
    });
    linkedin.traverse((child) => {
      if (child.isMesh) {
        child.material.map = textureLinkedin;
            child.material.emissive = new THREE.Color(808080); 
        child.material.emissiveIntensity = 2;
        child.material.needsUpdate = true;
      }
    });
    fbx.traverse((child) => {
          if (child.isMesh) {
            child.material.map = textura_estanteria;
            child.material.needsUpdate = true;
          }
        });
    estanteria_alargada.traverse((child) => {
      if (child.isMesh) {
        child.material.map = textura_armario;
        child.material.needsUpdate = true;
      }
    });
    parquet.traverse((child) => {
      if (child.isMesh) {
        child.material.map = parquet_texture;
        child.material.needsUpdate = true;
      }
    });
    mesa.traverse((child) => {  
      if (child.isMesh) {
        child.material.map = textura_estanteria;
        child.material.needsUpdate = true;
      }
    });
    libro2.traverse((child) => {
      if (child.isMesh) {
        child.material.map = textura_mysql;
        child.material.needsUpdate = true;
      }
    });
    librotumando.traverse((child) => { 
      if (child.isMesh) {
        child.material.map = textura_php;
        child.material.needsUpdate = true;
      }
    });
    estanteria.traverse((child) => {
      if (child.isMesh) {
        child.material.map = textura_estanteria;
        child.material.needsUpdate = true;
      }
    }
    );
  }, [
    fbx, fbxpc, cuadro, discoSade, discoPinkFloyd, github, pc, linkedin, poster, lampara,almohada,colchon,
    texture, texture2, texture3, textureSade, texturePinkFloyd, textureGithub, texturePC, textureLinkedin, texturePoster
  ]);

  useFrame(() => {
    if (github) {
      github.traverse((child) => {
        if (child.isMesh && child.material?.emissiveIntensity !== undefined) {
          const pulse = 0.1 + Math.sin(Date.now() * 0.002) * 0.1;
          child.material.emissiveIntensity = pulse;
        }
      });
    } 
    if (linkedin) {
      linkedin.traverse((child) => {
        if (child.isMesh && child.material?.emissiveIntensity !== undefined) {
          const pulse = 0.1 + Math.sin(Date.now() * 0.002) * 0.1;
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

  const posicionLuzPrincipal = [2.75, 1.10, -0.15];
  const posicionLuzSecundaria = [0.45, 1.1, -0.55];


  return (
    <>
      <primitive object={fbx} scale={0.01} />
      <primitive object={fbxpc} scale={0.01} position={[0, 0, 0]} />
      <primitive object={cuadro} scale={0.01} position={[0, 0, 0]} />
      <primitive
        object={poster}
        scale={0.01}
        position={[0, 0, 0]}
        onClick={() => window.open('http://projecto.oulin.me/Juegos/TresFuentes/TresFuentes/tresfuentes.html', '_blank')}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
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
        ref={switchs}
        object={switchs}
        scale={0.01}
        position={[0, 0, 0]}
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

      <primitive object={lampara} scale={0.01} position={[0, 0, 0]} />
      <primitive object={almohada} scale={0.01} position={[0, 0, 0]} />
      <primitive object={colchon} scale={0.01} position={[0, 0, 0]} />
      <primitive object={cama_madera} scale={0.01} position={[0, 0, 0]} />
      <primitive object={libros_abajo} scale={0.01} position={[0, 0, 0]} />
      <primitive object={cortina} scale={0.01} position={[0, 0, 0]} />
      <primitive object={manta} scale={0.01} position={[0, 0, 0]} />
      <primitive object={estanteria_alargada} scale={0.01} position={[0, 0, 0]} />
      <primitive object={estanteria} scale={0.01} position={[0, 0, 0]} />
      <primitive object={libro2} scale={0.01} position={[0, 0, 0]} />
      <primitive object={librotumando} scale={0.01} position={[0, 0, 0]} />
      <primitive object={mesa} scale={0.01} position={[0, 0, 0]} />
      <primitive object={parquet} scale={0.01} position={[0, 0, 0]} />
      <primitive object={silla} scale={0.01} position={[0, 0, 0]} />
      <primitive object={sueloyparedes} scale={0.01} position={[0, 0, 0]} />
      <primitive object={sugetar_estanteria} scale={0.01} position={[0, 0, 0]} />
      <primitive object={sujetar_poster} scale={0.01} position={[0, 0, 0]} />
      <primitive object={sw} scale={0.01} position={[0, 0, 0]} />
      <primitive object={libros_arriba} scale={0.01} position={[0, 0, 0]} />
      <primitive object={libros_medio} scale={0.01} position={[0, 0, 0]} />
      <primitive 
        object={visualcodeicon} 
        scale={0.01} 
        position={[0, 0, 0]}
        onClick={() => window.open('https://code.visualstudio.com/', '_blank')}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />

      {luzEncendida && (
        <pointLight
          position={posicionLuzPrincipal}
          intensity={1.9}
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
            <h2>🎶 Reproduciendo Dire Straits</h2>
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
    <div
      style={{
        margin: 0,
        padding: 0,
        overflow: "hidden",
        height: "100vh",
        width: "100%",
      }}
    >
      <Canvas shadows camera={{ position: [0, 1, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
        <Suspense fallback={null}>
          <Bounds fit clip observe margin={1.2}>
            <Modelo />
          </Bounds>
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
