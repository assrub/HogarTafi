import React, { useState } from "react";
import {
ChevronDownIcon,
} from "@heroicons/react/16/solid";
import { Link } from "./Barra de navegacion/Link";
import "tailwindcss/tailwind.css";

export default function Navegacion() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isHamburgerOpen, setHamburgerOpen] = useState(false);

  const toggleDropdown = (e) => {
    e.preventDefault();
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleHamburger = () => {
    setHamburgerOpen(!isHamburgerOpen);
  };

  return (
    <div className="">
      {/* navbar */}
      <div className="w-screen py-6 px-5 lg:px-16 bg-[#252525] flex justify-between">
        <span className="text-3xl text-neutral-300 font-semibold">
          Hogar Tafi
        </span>

        <ul className="hidden md:flex items-center space-x-5">
          <li className="relative">
            <div className="block px-2 py-2 text-neutral-300 hover:bg-gray-200 hover:text-gray-800 hover:rounded-lg">
              <a
                href="#"
                onClick={toggleDropdown}
                className="cursor-pointer flex items-center space-x-2"
              >
                <span>Pacientes</span>
                <ChevronDownIcon className="w-4 h-4 text-neutral-300" />
              </a>
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#252525] rounded-md shadow-lg z-20">
                <Link texto={"Mostrar"} link={"#"} />
                <Link texto={"Cargar"} link={"#"} />
                <Link texto={"Modificar"} link={"#"} />
              </div>
            )}
          </li>
          <li>
            <Link texto={"Stock del hogar"} link={"#"} />
          </li>
          <li>
            <Link texto={"Empleados"} link={"#"} />
          </li>
          <li>
            <Link texto={"Pedidos"} link={"#"} />
          </li>
          <li>
            <Link texto={"Lista de usuarios"} link={"#"} />
          </li>
        </ul>

        <div className="hidden md:flex items-center  space-x-5">     
          <a href="#">
            <img
              src="../../public/imagen-avatar.png"
              className="size-10 rounded-3xl"
              alt=""
            />
            <div className="flex justify-center">
            <ChevronDownIcon className="w-4 h-4 text-neutral-300" />
            </div>
          </a>
        </div>

        {/* hamburger menu */}
        <button onClick={toggleHamburger} className="space-y-1 group md:hidden">
          <div className="w-6 h-1 bg-white"></div>
          <div className="w-6 h-1 bg-white"></div>
          <div className="w-6 h-1 bg-white"></div>
        </button>
      </div>

      {/* menu */}
      {isHamburgerOpen && (
        <ul className="bg-[#252525] text-neutral-300 w-screen pb-10 absolute top-0 right-0 duration-150 flex flex-col space-y-3">
          <button
            onClick={toggleHamburger}
            className="px-10 py-8 relative ml-auto"
          >
            <div className="w-6 h-1 rotate-45 absolute bg-white"></div>
            <div className="w-6 h-1 -rotate-45 absolute bg-white"></div>
          </button>
          <li className="relative">
            <div className="block px-2 py-2 text-neutral-300 hover:bg-gray-200 hover:text-gray-800 hover:rounded-lg">
              <a
                href="#"
                onClick={toggleDropdown}
                className="cursor-pointer flex items-center space-x-2"
              >
                <span>Pacientes</span>
                <ChevronDownIcon className="w-4 h-4 text-neutral-300" />
              </a>
            </div>
            {isDropdownOpen && (
              <div className="mt-2 w-48 bg-[#252525] rounded-md shadow-lg z-20">
                <Link texto={"Mostrar"} link={"#"} />
                <Link texto={"Cargar"} link={"#"} />
                <Link texto={"Modificar"} link={"#"} />
              </div>
            )}
          </li>
          <li>
            <Link texto={"Stock del hogar"} link={"#"} />
          </li>
          <li>
            <Link texto={"Empleados"} link={"#"} />
          </li>
          <li>
            <Link texto={"Pedidos"} link={"#"} />
          </li>
          <li>
            <Link texto={"Lista de usuarios"} link={"#"} />
          </li>
          <li className="hover:bg-gray-200 hover:rounded-lg">
            <a href="#">
              <img
                src="../../public/imagen-avatar.png"
                className="size-10 rounded-3xl ml-2 "
                alt=""
              />
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}
