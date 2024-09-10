import { useState } from "react";
import React from "react";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import MedicationIcon from "@mui/icons-material/Medication";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CreateIcon from "@mui/icons-material/Create";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AssistWalkerIcon from "@mui/icons-material/AssistWalker";

export function BarraNavegacion() {
  const [menuPaciente, setMenuPaciente] = useState(false);
  const [menuHamburguesa, setMenuHamburguesa] = useState(false);
  const toggleDropdownMenuPaciente = (e) => {
    e.preventDefault();
    setMenuPaciente(!menuPaciente);
  };

  function abrirMenuHamburguesa() {
    setMenuHamburguesa(!menuHamburguesa);
  }

  function cerrarMenuHamburguesa() {
    setMenuHamburguesa(false);
  }

  return (
    <div>
      <div className={`flex flex-col justify-between h-screen text-xl`}>
        <div className="hidden lg:block">
          <div className="perfil flex flex-col items-start mt-6 p-3 ml-6">
            <img
              src="/foto-avatar.webp"
              className="w-1/5 rounded-full"
              alt="foto de perfil"
            />
            <span className="mt-4">Nombre de usuario</span>
            <span className="opacity-70">Admin</span>

            <Link to="perfil" className="block underline">
              Ver perfil
            </Link>
          </div>
          <hr />
          <div className="navegacion mt-6 ml-6 flex flex-col items-start h-full">
            <div className="pacientes p-3 flex flex-col items-baseline w-full">
              <Link
                to="#"
                onClick={toggleDropdownMenuPaciente}
                className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#017a98] after:transition-all after:duration-300 hover:after:w-full"
              >
                <PersonIcon className="text-[#017a98]" />
                Pacientes
              </Link>
              {menuPaciente && (
                <div className="flex flex-col items-left h-full w-full ring ring-[#017a98] rounded-lg mt-2">
                  <div className="mostrarPacientes p-3">
                    <Link
                      to="todosLospacientes"
                      className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#017a98] after:transition-all after:duration-300 hover:after:w-full"
                    >
                      <AssistWalkerIcon className="text-[#017a98]" /> Listar
                      pacientes
                    </Link>
                  </div>
                  <div className="registrar p-3">
                    <Link
                      to="paciente/registrar"
                      className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#017a98] after:transition-all after:duration-300 hover:after:w-full"
                    >
                      <AutoStoriesIcon className="text-[#017a98]" />
                      Registrar
                    </Link>
                  </div>
                  <div className="modificar p-3">
                    <Link
                      to="paciente/modificar"
                      className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#017a98] after:transition-all after:duration-300 hover:after:w-full"
                    >
                      <CreateIcon className="text-[#017a98]" />
                      Modificar
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="stock-del-hogar p-3">
              <Link
                to="stockDelHogar"
                className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#017a98] after:transition-all after:duration-300 hover:after:w-full"
              >
                <MedicationIcon className="text-[#017a98]" />
                Stock del hogar
              </Link>
            </div>

            <div className="pedidos p-3">
              <Link
                to="pedidos"
                className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#017a98] after:transition-all after:duration-300 hover:after:w-full"
              >
                <ShoppingCartIcon className="text-[#017a98]" />
                Pedidos
              </Link>
            </div>

            <div className="lista-de-usuarios p-3">
              <Link
                to="listaDeUsuarios"
                className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#017a98] after:transition-all after:duration-300 hover:after:w-full"
              >
                <FormatListBulletedIcon className="text-[#017a98]" />
                Lista de usuarios
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden lg:block cerrar-sesion lg:ml-6 lg:p-3">
          <Link to="cerrarSesion" className="underline">
            Cerrar sesión
          </Link>
        </div>

        <button
          onClick={abrirMenuHamburguesa}
          className="space-y-1 group lg:hidden m-4"
        >
          <div className="w-6 h-1 bg-[#017a98]"></div>
          <div className="w-6 h-1 bg-[#017a98]"></div>
          <div className="w-6 h-1 bg-[#017a98]"></div>
        </button>
      </div>

      {menuHamburguesa && (
        <div
          className={`fixed inset-0 bg-white flex flex-col items-start p-8 transform transition-transform duration-700 z-10 ease-in-out`}
          style={{
            transform: menuHamburguesa ? "translateX(0)" : "translateX(-100%)",
          }}
        >
          <button
            onClick={cerrarMenuHamburguesa}
            className="self-end text-xl font-bold mb-8 text-[#017a98]"
          >
            X
          </button>
          <div className="perfil flex flex-col items-start mt-6">
            <img
              src="/foto-avatar.webp"
              className="w-20 rounded-full"
              alt="foto de perfil"
            />
            <span className="mt-4">Nombre de usuario</span>
            <span className="opacity-70">Admin</span>
            <Link
              to="perfil"
              onClick={cerrarMenuHamburguesa}
              className="block underline"
            >
              Ver perfil
            </Link>
          </div>
          <hr className="w-full my-4" />
          <div className="navegacion flex flex-col items-start w-full">
            <div className="pacientes p-3">
              <Link
                to="#"
                onClick={toggleDropdownMenuPaciente}
                className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#017a98] after:transition-all after:duration-300 hover:after:w-full"
              >
                <PersonIcon className="text-[#017a98]" />
                Pacientes
              </Link>
              {menuPaciente && (
                <div className="flex flex-col items-start mt-4 ml-6 w-full">
                  <Link
                  onClick={cerrarMenuHamburguesa}
                    to="todosLospacientes"
                    className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#017a98] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    <AssistWalkerIcon className="text-[#017a98]" /> Listar
                    pacientes
                  </Link>

                  <Link
                    onClick={cerrarMenuHamburguesa}
                    to="paciente/registrar"
                    className="mb-2"
                  >
                    <AutoStoriesIcon className="text-[#017a98]" />
                    Registrar
                  </Link>
                  <Link
                    onClick={cerrarMenuHamburguesa}
                    to="paciente/modificar"
                  >
                    <CreateIcon className="text-[#017a98]" />
                    Modificar
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="stockDelHogar"
              onClick={cerrarMenuHamburguesa}
              className="p-3 mt-4"
            >
              <MedicationIcon className="text-[#017a98]" />
              Stock del hogar
            </Link>
            <Link
              to="pedidos"
              onClick={cerrarMenuHamburguesa}
              className="p-3 mt-4"
            >
              <ShoppingCartIcon className="text-[#017a98]" />
              Pedidos
            </Link>
            <Link
              to="listaDeUsuarios"
              onClick={cerrarMenuHamburguesa}
              className="p-3 mt-4"
            >
              <FormatListBulletedIcon className="text-[#017a98]" />
              Lista de usuarios
            </Link>
          </div>
          <div className="cerrar-sesion flex flex-grow items-end p-3">
            <Link
              to="cerrarSesion"
              onClick={cerrarMenuHamburguesa}
              className="underline"
            >
              Cerrar sesión
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default BarraNavegacion;
