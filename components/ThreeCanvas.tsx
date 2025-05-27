import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Box } from '@mui/material';
import * as THREE from 'three';


const ThreeCanvas: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0, // Behind the terminal
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={100} depth={30} count={2000} factor={4} saturation={0} fade speed={1} />
        {/* <OrbitControls /> */} {/* Optional: if you want camera controls */}
      </Canvas>
    </Box>
  );
};

export default ThreeCanvas;