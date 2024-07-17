import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Enlace } from "./Barra de navegacion/Enlace";
import "tailwindcss/tailwind.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import FromDatosPacientes from "./FormDatosPaciente";
import Stock from "./Stock";

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
    <BrowserRouter>
      <div className="">
        {/* navbar */}
        <div className="w-screen py-6 px-5 lg:px-16 bg-[#252525] flex justify-between">
          <span className="text-3xl text-neutral-300 font-semibold">
            Hogar Tafi
          </span>

          <ul className="hidden md:flex items-center space-x-5">
            <li className="relative">
              <div className="relative">
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
                    <Link
                      to="/Pacientes/Mostrar"
                      className="block px-4 py-2 text-neutral-300 hover:bg-gray-200 hover:text-gray-800 rounded-t-md"
                    >
                      Mostrar
                    </Link>
                    <Link
                      to="/Pacientes/Cargar"
                      className="block px-4 py-2 text-neutral-300 hover:bg-gray-200 hover:text-gray-800"
                    >
                      Cargar
                    </Link>
                    <Link
                      to="/Pacientes/Modificar"
                      className="block px-4 py-2 text-neutral-300 hover:bg-gray-200 hover:text-gray-800 rounded-b-md"
                    >
                      Modificar
                    </Link>
                  </div>
                )}
              </div>
            </li>
            <li>
              <Link
                to="/StockDelHogar"
                className="block px-4 py-2 text-neutral-300 hover:bg-gray-200 hover:text-gray-800 rounded-t-md"
              >
                Stock del hogar
              </Link>
            </li>
            <li>
              <Link
                to="/Empleados"
                className="block px-4 py-2 text-neutral-300 hover:bg-gray-200 hover:text-gray-800 rounded-t-md"
              >
                Empleados
              </Link>
            </li>
            <li>
              <Link
                to="/Empleados"
                className="block px-4 py-2 text-neutral-300 hover:bg-gray-200 hover:text-gray-800 rounded-t-md"
              >
                Pedidos
              </Link>
            </li>
            <li>
            <Link
                to="/ListaDeUsuarios"
                className="block px-4 py-2 text-neutral-300 hover:bg-gray-200 hover:text-gray-800 rounded-t-md"
              >
                Lista de usuarios
              </Link>
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
          <button
            onClick={toggleHamburger}
            className="space-y-1 group md:hidden"
          >
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
                  <Link
                      to="/Pacientes/Mostrar"
                      className="block px-4 py-2 text-neutral-300 hover:bg-gray-200 hover:text-gray-800 rounded-t-md"
                    >
                      Mostrar
                    </Link>
                    <Link
                      to="/Pacientes/Cargar"
                      className="block px-4 py-2 text-neutral-300 hover:bg-gray-200 hover:text-gray-800"
                    >
                      Cargar
                    </Link>
                    <Link
                      to="/Pacientes/Modificar"
                      className="block px-4 py-2 text-neutral-300 hover:bg-gray-200 hover:text-gray-800 rounded-b-md"
                    >
                      Modificar
                    </Link>
                </div>
              )}
            </li>
            <li>
              <Link
                to="/StockDelHogar"
                className="block px-4 py-2 text-neutral-300 hover:bg-gray-200 hover:text-gray-800 rounded-t-md"
              >
                Stock del hogar
              </Link>
            </li>
            <li>
              <Link
                to="/Empleados"
                className="block px-4 py-2 text-neutral-300 hover:bg-gray-200 hover:text-gray-800 rounded-t-md"
              >
                Empleados
              </Link>
            </li>
            <li>
              <Link
                to="/Pedidos"
                className="block px-4 py-2 text-neutral-300 hover:bg-gray-200 hover:text-gray-800 rounded-t-md"
              >
                Pedidos
              </Link>
            </li>
            <li>
            <Link
                to="/ListaDeUsuarios"
                className="block px-4 py-2 text-neutral-300 hover:bg-gray-200 hover:text-gray-800 rounded-t-md"
              >
                Lista de usuarios
              </Link>
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

      <Routes>
        <Route
          path="/Pacientes/Mostrar"
          element={<FromDatosPacientes mostrar={true} />}
        />
        <Route path="/Pacientes/Cargar" element={<FromDatosPacientes />} />
        <Route path="/Empleados" />
        <Route path="/Pedidos" />
        <Route path="/ListaDeUsuarios" />
        <Route path="/Pacientes/Stock" element={<Stock />}/>
        <Route path="/Pacientes/Recetas" />
      </Routes>
    </BrowserRouter>
  );
}
