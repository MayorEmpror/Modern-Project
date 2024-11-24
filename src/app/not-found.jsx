"use client"

import { useRouter } from "next/router";
import { useEffect } from "react";

const NotFound = (props) => {
  const router = useRouter()
  useEffect(() => {
    router.replace("/")
  })
  return null
};

export default NotFound;