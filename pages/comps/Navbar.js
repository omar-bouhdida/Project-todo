/* eslint-disable jsx-a11y/alt-text */
import Head from "next/head"
import Image from "next/image"

const Navbar = () => {
  return (
    <nav>
        <div className="bg-gray-800">
            <div className="h-16 px-8 flex items-center">
                <p className="text-white font-bold flex"> ToDo List App</p>
            </div>
        </div>
    </nav>
  )
}

export default Navbar