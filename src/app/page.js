"use client";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import Scrolling from "./scroll";
import { useState } from "react";
import {
  ScrollControls,
  useScroll,
  Scroll,
  Loader,
  Environment,
} from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import { SrcAlphaFactor } from "three";
import { Suspense } from "react";
   localStorage.setItem("pages",4)
export default function Home() {
  console.log(Canvas);
  const [pages,setpages] = useState(4)
  
  return (
    <>
   

   
      <Canvas
     //   frameloop="demand"
        camera={{

          fov: 70,
          near: 0.1,
          far: 1000,
          position: [0,0,0],
        }}
      >
        {/* <color args={["#ffffff "]} attach={"background"} /> */}
     
        <ScrollControls pages={pages} >
        {/* <OrbitControls/> */}
          {/* <mesh>
            // <OrbitControls/>
            <boxGeometry />
            <meshBasicMaterial color={"red"} />
          </mesh> */}
          <Scroll>
            <Suspense>
            <Scrolling  setpages_0={()=>{
              setpages(0)
            }}
            setpages_4={()=>{
              setpages(4)
            }}
            />
            </Suspense>
          </Scroll>
       
        </ScrollControls>
        <Environment preset="dawn" background blur={0.5} />
      </Canvas>
      <Loader/>

      {/* <main className="flex min-h-screen top-[-90vh] relative 76 flex-col items-center justify-between p-5" onScroll={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}>
        <div className="z-10  gap-2 max-w-5xl w-full bg-slte-50 items-center justify-between font-mono text-sm lg:flex">
          <p className="fixed text-xl left-0 top-0 flex w-full justify-center  pb-6 pt-8 backdrop-blur-2xl  lg:static lg:w-auto   lg:p-4 ">
            Education
          </p>
          <p className="fixed text-xl left-0 top-0 flex w-full justify-center  pb-6 pt-8 backdrop-blur-2xl  lg:static lg:w-auto   lg:p-4 ">
            Projects
          </p>
          <p className="fixed text-xl left-0 top-0 flex w-full justify-center  pb-6 pt-8 backdrop-blur-2xl  lg:static lg:w-auto   lg:p-4 ">
            Pricing
          </p>
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <a
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{"  "}
              <Image
                src="/logo.png"
                alt="Hashir Logo"
                width={100}
                height={24}
                priority
              />
              Hashir
            </a>
          </div>
        </div>


        <div className="backdrop-blur-lg  mb-32 grid text-center gap-10 lg:max-w-7xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            className="group rounded-lg border border-transparent px-5 py-4 bg-red-600 transition-colors hover:border-red-300 hover:bg-red-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Our goals{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Find in-depth information about Next.js features and API. Find
              in-depth information about Next.js features and API. Find in-depth
              information about Next.js features and API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Examples{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
              Learn about Next.js in an interactive course with&nbsp;quizzes!
              Learn about Next.js in an interactive course with&nbsp;quizzes!
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Templates{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Explore the Next.js 13 playground. Explore the Next.js 13
              playground. Explore the Next.js 13 playground.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Deploy{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Instantly deploy your Next.js site to a shareable URL with Vercel.
              Instantly deploy your Next.js site to a shareable URL with Vercel.
              Instantly deploy your Next.js site to a shareable URL with Vercel.
            </p>
          </a>
        </div>
      </main> */}
      
    </>
  );
}
