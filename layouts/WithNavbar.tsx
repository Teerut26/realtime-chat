import React from "react";
import Navabar from "../components/Navabar";

interface WithNavbar {
  children: any;
}

export default function WithNavbar({ children }: WithNavbar) {
  return (
    <>
      <Navabar />
      {children}
    </>
  );
}
