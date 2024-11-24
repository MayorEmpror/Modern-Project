import * as THREE from "three";
//import particlesVertexShader from "./shaders/wobble/particles/vertex.glsl.js"
//import particlesFragmentShader from "./shaders/wobble/particles/fragment.glsl.js";
import { useThree, useFrame } from "@react-three/fiber";
import { useRef, forwardRef } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  GodRays,
  N8AO,
  Noise,
  SMAA,
} from "@react-three/postprocessing";
import {
  MeshTransmissionMaterial,
  Html,
  AccumulativeShadows,
  RandomizedLight,
} from "@react-three/drei";
import { useEffect, useState } from "react";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { TextureLoader } from "three";
// import { SSAO } from '@react-three/postprocessing'
import { BlendFunction } from "postprocessing";
import { RGBELoader } from "three/examples/jsm/Addons.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { Text, Text3D } from "@react-three/drei";
import { MeshRefractionMaterial } from "@react-three/drei";
import {
  Environment,
  MeshReflectorMaterial,
  useAnimations,
} from "@react-three/drei";
import gsap from "gsap";

import { useControls } from "leva";
import { Perf } from "r3f-perf";
export default function Castle() {
  const cube = useRef();
  const { invalidate, camera, gl } = useThree()
  const Machine = useLoader(GLTFLoader, "/static/bench.glb");
  const Room = useLoader(GLTFLoader, "/static/Room.glb");
  Machine.scene.scale.set(0.0025, 0.0025, 0.0025);
  const { actions } = useAnimations(Machine.animations, Machine.scene);
  
  useEffect(() => {
    console.log(actions);
    // actions["Take 001"].repetitions = <Infi></Infi>
 
    setInterval(() => {
    invalidate()

    }, 100)
   
    // actions["Take 001"].fadeIn(0.98).play()
    // actions.loop = 2000
    // actions["Take 001"].getMixer().addEventListener( 'loop', function() {
    //   actions["Take 001"].fadeIn(0.98).play()
    //} );

    // console.log(actions)
  }, [actions]);

  Machine.scene.position.set(105.77, 28, 40);
  Machine.scene.rotation.set(2.98, -4.81, -9.26);
  const three = useThree();
  useFrame((state) => {
 
    actions["Armature|ArmatureAction"].play()
  
    state.camera.lookAt(cube.current.position);
  });
  return (
    <>
      <EffectComposer enableNormalPass>
        {/* <Bloom/> */}
        <N8AO aoRadius={50} distanceFalloff={0.25} intensity={6} screenSpaceRadius halfRes/>
        {/* <Bloom /> */}
        {/* <DepthOfField worldFocusDistance={10} worldFocusRange={10} focusDistance={10}/> */}
        {/* <Noise */}

        <Noise opacity={0.05} />
      </EffectComposer>

      <Perf/>
      <Text3D
        font={"/nike.json"}
        scale={8}
        position={[82.77, 68, 85]}
        rotation={[2.98, -4.81, -9.26]}
      >
        {"Crafting\nDigital\nExcellence"}
        <MeshTransmissionMaterial
          clearcoat={1}
          // chromaticAberration={0.03}
          anisotrophicBlur={0.1}
          roughness={0.15}
          thickness={2.5}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.2}
          color={"red"}
        />
      </Text3D>
  
      <mesh
        ref={cube}
        position={[-2.8090904726218238, 19.82, 0.05579508562222024]}
      >
        <boxGeometry />
        <meshBasicMaterial />
      </mesh>
      <Environment preset="night" />
      <primitive
        onClick={() => {
          console.log(three.camera.position);
        }}
        object={Room.scene}
      />
      <primitive
        onClick={() => {
          console.log(three.camera.position);
        }}
        object={Machine.scene}
      />
      <mesh>
        <boxGeometry />
        <meshBasicMaterial />
      </mesh>
    </>
  );
}

