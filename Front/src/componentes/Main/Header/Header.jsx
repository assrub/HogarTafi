import React, {useState} from "react";

function Header() {

  const [abrirNav, setabrirNav] = useState(false);

  const toggleMenu = () => {
    setabrirNav(!abrirNav);
  };


  return (
    <>
     
      <header>
        <nav className="bg-[#242526] text-white lg:py-2 hidden lg:block">
          <div className="w-full flex  px-4 justify-between">
            <div className="logo flex items-center">
              <img
                src="../public/Logo.jpg"
                className="w-16 rounded-3xl"
                alt="Logo"
              />
              <a className="text-white text-2xl font-bold mx-2" href="#">
                Hogar Tafi
              </a>
            </div>

            <div className="nav-pagina-principal flex-grow text-xl flex justify-center gap-6">
              <a
                className="text-white flex items-center p-6 rounded-xl hover:bg-[rgb(58,59,60)]"
                href="#nosotros"
              >
                Nosotros
              </a>
              <a
                className="text-white flex items-center p-6 rounded-xl hover:bg-[rgb(58,59,60)]"
                href="#actividades"
              >
                Actividades
              </a>
              <a
                className="text-white flex items-center p-6 rounded-xl hover:bg-[rgb(58,59,60)]"
                href="#servicios"
              >
                Servicios
              </a>
              <a
                className="text-white flex items-center p-6 rounded-xl hover:bg-[rgb(58,59,60)]"
                href="#instalaciones"
              >
                Instalaciones
              </a>
              <a
                className="text-white flex items-center p-6 rounded-xl hover:bg-[rgb(58,59,60)]"
                href="#contacto"
              >
                Contacto
              </a>
            </div>

            <div className="login text-xl">
              <a
                className="text-white flex items-center p-6 rounded-xl hover:bg-[rgb(58,59,60)]"
                href="/login"
              >
                Login
              </a>
            </div>
          </div>
        </nav>

        <nav className="nav-celu lg:hidden bg-[#242526] text-white">
      <div className="w-full flex items-center px-4 justify-between">
    
        <div className="logo flex items-center">
          <img src="../public/Logo.jpg" className="w-14 rounded-3xl" alt="Logo" />
          <a className="text-white text-lg font-bold mx-2" href="#">
            Hogar Tafi
          </a>
        </div>

        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none p-2 rounded-md"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

    
      <div
        className={`lg:flex lg:items-center lg:justify-between w-full lg:w-auto ${
          abrirNav ? "block" : "hidden"
        }`}
      >
        <div className="nav-pagina-principal flex-grow text-xl flex flex-col lg:flex-row lg:justify-center gap-2 mt-4 lg:mt-0">
          <a className="text-white p-6 rounded-xl hover:bg-[rgb(58,59,60)]" href="#nosotros">
            
            Nosotros
          </a>
          <a className="text-white p-6 rounded-xl hover:bg-[rgb(58,59,60)]" href="#actividades">
            
            Actividades
          </a>
          <a className="text-white p-6 rounded-xl hover:bg-[rgb(58,59,60)]" href="#servicios">
           
            Servicios
          </a>
          <a className="text-white p-6 rounded-xl hover:bg-[rgb(58,59,60)]" href="#instalaciones">
           
            Instalaciones
          </a>
          <a className="text-white p-6 rounded-xl hover:bg-[rgb(58,59,60)]" href="#contacto">
           
            Contacto
          </a>
        </div>

       
        <div className="login text-xl flex justify-center mt-4 lg:mt-0">
          <a
            className="text-white flex items-center p-6 rounded-xl hover:bg-[rgb(58,59,60)]"
            href="/login"
          >
            
            Login
          </a>
        </div>
      </div>
    </nav>

        <section
          className="bg-cover bg-center h-screen flex items-center"
          id="nosotros"
          style={{
            backgroundImage: 'url("src/Assets/Images/Main/bg-nosotros.jpg")',
          }}
        >
          <div className="container mx-auto">
            <div className="flex justify-center">
              <div className="text-center text-white max-w-2xl">
                <h1 className="text-4xl font-bold">Hogar Tafi</h1>
                <p className="mt-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Blanditiis, distinctio. Perspiciatis quo possimus velit nisi
                  praesentium accusantium assumenda, corporis, iure sed incidunt
                  debitis pariatur. Qui quia iure dolores? Libero dolores,
                  exercitationem maiores magnam obcaecati laborum optio ullam
                  quia minus rerum cupiditate quos nobis officia, voluptatem
                  corrupti asperiores repudiandae praesentium eos!
                </p>
              </div>
            </div>
          </div>
        </section>
      </header>
    </>
  );
}

export default Header;
