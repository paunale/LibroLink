import React from 'react'
import Header from './components/Header'
import { Link } from 'react-router-dom'

type Props = {}

export default function Genuri({}: Props) {
  return (
    <div className="h-screen bg-[#D5CEA3]">
        <Header/>
        <div className="relative flex flex-col justify-between gap-y-2 top-28 items-center">
          <div>
            <h1 className="text-3xl pb-16" style={{ fontWeight: 'bold' }}>Genuri de carti</h1>
          </div>
          <div className="flex gap-x-4 top-10">
            <div className="flex flex-col items-center justify-center w-16 h-16 bg-[#E5E5CB] rounded-full">
              <Link to="/Copii">
              <button className="text-l items-center">Copii</button>
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center w-16 h-16 bg-[#E5E5CB] rounded-full">
                <Link to="/Poezie">
                <button className="text-m">Poezie</button>
                </Link>
              </div>
            <div className="flex flex-col items-center justify-center w-16 h-16 bg-[#E5E5CB] rounded-full">
              <Link to="/Crestinism">
              <button className="text-xs">Crestinism</button>
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center w-16 h-16 bg-[#E5E5CB] rounded-full">
              <Link to="/Clasici">
              <button className="text-m">Clasici</button>
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center w-16 h-16 bg-[#E5E5CB] rounded-full">
                <Link to="/Gatit">
                <button className="text-m ">Gatit</button>
                </Link>
              </div>
          </div>
            <div className="flex gap-x-4">
              <div className="flex flex-col items-center justify-center w-16 h-16 bg-[#E5E5CB] rounded-full">
                <Link to="/Fictiune">
                <button className="text-m ">Fictiune</button>
                </Link>
              </div>
              <div className="flex flex-col items-center justify-center w-16 h-16 bg-[#E5E5CB] rounded-full">
                <Link to="/Istorice">
                <button className="text-m ">Istorice</button>
                </Link>
              </div>
              <div className="flex flex-col items-center justify-center w-16 h-16 bg-[#E5E5CB] rounded-full">
                <Link to="/Horror">
                <button className="text-m ">Horror</button>
                </Link>
              </div>
              <div className="flex flex-col items-center justify-center w-16 h-16 bg-[#E5E5CB] rounded-full">
                <Link to="/Mister">
                <button className="text-m ">Mister</button>
                </Link>
              </div>
            </div>
            <div className="flex gap-x-4">
              <div className="flex flex-col items-center justify-center w-16 h-16 bg-[#E5E5CB] rounded-full">
                <Link to="/Romane">
                <button className="text-m">Romane</button>
                </Link>
              </div>
              <div className="flex flex-col items-center justify-center w-16 h-16 bg-[#E5E5CB] rounded-full">
                <Link to="/Romantice">
                <button className="text-xs">Romantice</button>
                </Link>
              </div>
              <div className="flex flex-col items-center justify-center w-16 h-16 bg-[#E5E5CB] rounded-full">
                <Link to="/Psihologice">
                <button className="text-xs ">Psihologice</button>
                </Link>
              </div>
              <div className="flex flex-col items-center justify-center w-16 h-16 bg-[#E5E5CB] rounded-full">
                <Link to="/SelfHelp">
                <button className="text-m">Self Help</button>
                </Link>
              </div>
              <div className="flex flex-col items-center justify-center w-16 h-16 bg-[#E5E5CB] rounded-full">
                <Link to="/Tineri">
                <button className="text-m ">Tineri</button>
                </Link>
              </div>
            </div>  
        </div>
    </div>
  )
}