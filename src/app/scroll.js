import { useScroll } from "@react-three/drei";
import { Environment, Image } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as CurveExtras from "three/addons/curves/CurveExtras.js";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { easing } from "maath";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import gsap from "gsap";
import {
  useCursor,
  MeshPortalMaterial,
  CameraControls,
  Gltf,
  Text,
  Preload,
} from "@react-three/drei";
import { useRoute, useLocation } from "wouter";
import { geometry } from "maath";
import { suspend } from "suspend-react";

import "./utils";

const helix = new CurveExtras.HelixCurve();
extend(geometry);
function getPoint(X, coeff) {
  const point = helix
    .getPointAt(X * coeff)
    .applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI * 0.5);
  return point;
}
export default function Scrolling(props) {
  const three = useThree();

  // const tubeGeometry = new THREE.TubeGeometry(helix, 100, 2, 3, false);
  // const wireframe = new THREE.Mesh(
  //   tubeGeometry,
  //   new THREE.MeshBasicMaterial({
  //     color: 0xffffff,
  //     opacity: 0.3,
  //     wireframe: true,
  //     transparent: true,
  //   }),
  // );
  // wireframe.rotation.x = Math.PI * 0.5;
  // three.scene.add(wireframe);
  const scroll = useScroll();

  useFrame((state) => {
    //  csmesh.current.material.uniforms.uTime.value = state.clock.getElapsedTime()
    // if (!(group_.current instanceof Group)) return
    //    group_.current.children.map((ch) => {
    //        ch.layers.set(2)
    //    })


  // if(localStorage.getItem(1)==="false"){
    const offset = scroll.offset * 1.5;
    const curve_point = helix.getPointAt(offset*0.6);
    curve_point.applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI * 0.5);
    const p1 = new THREE.Vector3(0, curve_point.y, 0);
    const p2 = new THREE.Vector3(curve_point.x, 0, curve_point.z);
    const cross_product_vector = new THREE.Vector3().crossVectors(p1, p2);
    state.camera.position.set( curve_point.x * Math.sin(Math.PI * 0.5), curve_point.y,  curve_point.z );
    state.camera.lookAt(p1);
  // }
  });


  return (
    <>
      <Perf />
      <Environment
        preset="dawn"
        backgroundIntensity={0.1}
        backgroundBlurriness={10}
      />
    
      <Carousel 
      setpages_4 = {props.setpages_4}
      setpages_0 ={props.setpages_0}/>
    </>
  );
}

function Carousel({ radius = 50, count = 14,setpages_0,setpages_4 }, y,) {
  const coeff = useControls({
    value: 1,
    step: 0.1,
  });
  return Array.from({ length: count }, (_, i) => (
    <Card
       setpages_0 = {setpages_0}
       setpages_4 = {setpages_4}
      key={i}
      index={i}
      url={`/img${Math.floor(i % 9) + 1}.png`}
      //  url={"/Logo.png"}
      position={[
        getPoint(i, 0.06 + Math.sin(i / 500)).x,
        getPoint(i, 0.06 + Math.sin(i / 500)).y - 17,
        getPoint(i, 0.06 + Math.sin(i / 500)).z,
        ,
      ]}
      position_R={[
        getPoint(i, 0.06 + Math.sin(i / 500)).x,
        getPoint(i, 0.06 + Math.sin(i / 500)).y - 17,
        getPoint(i, 0.06 + Math.sin(i / 500)).z,
        ,
      ]}
      // position = {[helix.getPointAt(-(radius * i/12) -10) * 0.00000001,-(radius * i/12) -10,helix.getPointAt(-(radius * i/12) -10).z * 0.0000001]}
      //  position={[Math.cos((  i /( 0.25 *count)) * Math.PI * 2) * radius  ,-(radius * i/7) -10 , Math.sin((i /(0.25*count)) * Math.PI * 2) * radius ]}
      // 2*coeff.value/count  + (Math.PI - (i/count ) * Math.PI * 2)
      //  rotation={[0,getPoint(i , 0.01).y/count *coeff.value, 0]}
    />
  ));
}

function Card({ url, ...props }) {
 
  const [, params] = useRoute("/item/:id");
  const [change, setChange] = useState(false);
  const ref = useRef();
  const text = useRef()
  const textL = useRef();
  const [hovered, hover] = useState(false);
  const pointerOver = (e) => (e.stopPropagation(), hover(true));
  const pointerOut =  () => hover(false);
  let position = false;
  let coeff = [5, 0, 0];
  localStorage.setItem(props.index, false);
  useFrame((state, delta) => {
   
    //  position = [props.position[0] + 10 ,props.position[1] + 1,props.position[2]]
 
     easing.damp3(ref.current.scale, change ? 3 : 1, 0.1,delta)
    // easing.damp3(
    //   ref.current.position,
    //   localStorage.getItem(props.index) === "true" ? position : props.position,
    //   0.2,
    //   delta,
    // );
    // easing.damp3(
    //   coeff,
    //   localStorage.getItem(props.index) === "true" ? [1, 0, 0] : [5, 0, 0],
    //   0.2,
    //   delta,
    // );
 //   const init_position = state.camera.position.x
   //   if (localStorage.getItem(props.index) === "true") {
   //     console.log("should animate")
  //  gsap.to(
  //    state.camera.position,
   //   {x:30, duration: 1,},
    //  {x:30,duration:3,ease:"linear"}
    //  { value: 1, duration: 3, ease: "Linear" }
  //  )
    // gsap.to(state.camera.position, {x:30,duration:3,ease:"linear"})
    //  easing.damp3(
    //  state.camera.position,
    //    localStorage.getItem(props.index) === "true"
    //     ? [10, 10, 10]
    //     : state.camera.position,
    //    2,
    //     5,
    //  );
   // console.log(state.camera.position);
    //    state.camera.position.set(1, 1, 1);
    //  }
    // else   if (localStorage.getItem(props.index) === "false") {
    //   gsap.fromTo(
    //     state.camera.position,
    //     {x : 30},
    //     {x : init_position,duration:1,ease:"linear"}
  //  )
    // gsap.to(
    //   state.camera.position,
    //   {x:init_position, duration: 1,},
    //  {x:30,duration:3,ease:"linear"}
    //  { value: 1, duration: 3, ease: "Linear" }
   // }
  
    // gsap.to(state.camera.position, {x:30,duration:3,ease:"linear"})
    //  easing.damp3(
    //  state.camera.position,
    //    localStorage.getItem(props.index) === "true"
    //     ? [10, 10, 10]
    //     : state.camera.position,
    //    2,
    //     5,
    //  );
  
    //    state.camera.position.set(1, 1, 1);
      
    // state.camera.position.set    (0,0,0)

      easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1,delta)

  // easing.damp3(ref.current.scale, change ? 3 : 1, 0.1,delta)

    // easing.damp(
    //   ref.current.material,
    //   "radius",
    //   hovered ? 0.25 : 0.1,
    //   0.2,
    //   delta,
    // );
     easing.damp(ref.current.material, "zoom", hovered ? 0.6 : 0.75, 0.2, delta);
  });
    
  useEffect(() => {
    ref.current.lookAt(0, props.position[1], 0);
  //  text.current.lookAt(0,props.position_R[1],0);
    textL.current.lookAt(0,props.position[1]-14,0);
    
   
  }, []);
  const [, setLocation] = useLocation();
  return (
    //   <Frame
    //   setpages_0 ={props.setpages_0}
    //   setpages_4 ={props.setpages_4}
    //    id="01" name={`pick\nles`} author="Omar Faruq Tawsif" bg="#e4cdac" position={props.position} >
    //   <Gltf 
    //   onDoubleClick={(e)=>{
    //     props.setpages_4(),
    //     setLocation("/")
    //   }}
    //   src="/still_life_based_on_heathers_artwork-transformed.glb" scale={5}  position={[props.position.x/100, -0.7, -2]} />
     
    // </Frame>
    <>
    <Image
     
      onClick={() => {
        localStorage.setItem(
          props.index,
          localStorage.getItem(props.index) === "false" ? true : false,
        );

        // setChange(!change);
      }}
      alt={"pic"}
      ref={ref}
      url={url}
      transparent
      side={THREE.DoubleSide}
      onPointerOver={pointerOver}
      onPointerOut={pointerOut}
      position={position ? position : props.position}
      {...props}
    >
      <bentPlaneGeometry args={[coeff[0], 30, 25, 20, 20]} />
      <Text 
       
    rotation-z = {Math.PI * 0.5}
    position-x = {17}
  //   position={[props.position_R[0] + props.position_R[2]/5,props.position_R[1],props.position_R[2]   ]}
     scale ={2}
     color={"white"}>
     Lorem epsum dolor 
     </Text>
    </Image>
    <Text 
      ref={textL}
    
     position={[props.position[0],props.position[1] -14,props.position[2]  ]}
     scale ={3}
     color={"white"}>
     Lorem epsum dolor 
     </Text>


     

     {/* <Text 
     // ref={text}
   
     position={[props.position[0],props.position[1] -14,props.position[2] + props.position[2]/10]}
     scale ={3}
     color={"white"}>
     Lorem epsum dolor 
     </Text> */}
    </>
  );
}

function Frame({
  id,
  name,
  author,
  bg,
  width = 30,
  height = 30.61803398875,
  children,
  ...props
}) {
  const portal = useRef();
  const mesh = useRef()
  useEffect(()=>{
    mesh.current.lookAt(0, props.position[1], 0);
  },[])
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/item/:id");
//  const [hovered, hover] = useState(false);
//  useCursor(hovered);
  useFrame((state, dt) =>
    easing.damp(portal.current, "blend", params?.id === id ? 1 : 0, 0.2, dt),
  
);

  return (
    <group {...props}>  
      <mesh
        ref = {mesh}
        name={id}
        onDoubleClick={(e) => (
           props.setpages_0(),
          e.stopPropagation(), setLocation("/item/" + e.object.name)
        )}
       // onPointerOver={(e) => hover(true)}
       // onPointerOut={() => hover(false)}
      >
        <MeshPortalMaterial
    ref={portal}
    events={params?.id === id}
    side={THREE.DoubleSide}
  >
    <color attach="background" args={[bg]} />
    
    {children}
  </MeshPortalMaterial>
        {/* <roundedPlaneGeometry args={[width, height,0.1]} /> */}
        <bentPlaneGeometry args={[5, 30, 25, 20, 20]} />
       
      </mesh>
    </group>
  );
}

function Rig({
  position = new THREE.Vector3(0, 0, 2),
  focus = new THREE.Vector3(0, 0, 0),
}) {
  const { controls, scene } = useThree();
  const [, params] = useRoute("/item/:id");
  // useEffect(() => {
  //   const active = scene.getObjectByName(params?.id);
  //   if (active) {
  //     active.parent.localToWorld(position.set(0, 0, 0));
  //     active.parent.localToWorld(focus.set(0, 0, -2));
  //   }
  //   controls?.setLookAt(...position.toArray(), ...focus.toArray(), true);
  // });
  return (
   
     <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
  );
}

// function Card({ url, ...props }) {
//   const ref = useRef()
//   const [hovered, hover] = useState(false)

//   const pointerOver = (e) => (e.stopPropagation(), hover(true))
//   const pointerOut = (e) => (e.stopPropagation(),hover(false))

//   useFrame((state, delta) => {
//     easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, 0.1)
//     easing.damp(ref.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, 0.1)
//     easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, 0.1)
//   })
//   // useEffect(()=>{
//   //   ref.current.lookAt(0,props.position[1],0)
//   //  },[])
//   return (
//     <Image alt={"picutre"} ref={ref} url={url}
//     onPointerOver={pointerOver} onPointerOut={pointerOut}
//     transparent
//     {...props}
//      side={THREE.DoubleSide}
//     position= {props.position}//{[Math.sin((1 / 1) * Math.PI * 2) * 1.4, 0, Math.cos((1 / 1) * Math.PI * 2) * 1]}
//     rotation= {props.rotation}//{[0, Math.PI + (1 / 1) * Math.PI * 2, 0]}
//     >
//       <planeGeometry args={[30,25, 1, 20, 20]} />
//     </Image>
//   )
// }
