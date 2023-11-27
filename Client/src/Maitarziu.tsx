import React from "react";
import Header from "./components/Header";

type Props = {}

function Maitarziu({}: Props) {
  return (
    <div className="h-screen bg-[#D5CEA3]">
      <Header/>
        <div className="relative flex flex-col justify-between gap-y-2 top-32 items-center">
          <div>
            <h1 className="text-3xl pb-3" style={{ fontWeight: 'bold' }}>Citeste mai tarziu</h1>
          </div>
        </div>
    </div>
  )
}

export default Maitarziu