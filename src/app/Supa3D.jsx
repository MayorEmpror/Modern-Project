import { Canvas } from "@react-three/fiber";
import Castle from "./Castle.jsx";

export default function Supa3d() {
  return (
    <Canvas
      shadows
      camera={{
        fov: 70,
        near: 0.1,
        far: 1000,
        position: [0, 0, -10],
      }}
    >
      <color args={["#ff0000"]} attach={"background"} />
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color={"red"} />
      </mesh>
      <Castle/>
    </Canvas>
  );
}
