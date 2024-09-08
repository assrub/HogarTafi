import React from 'react';

function Header() {
  return (
    <>
      {/* Header (Barra de navegación, imagen de fondo y sección "Nosotros") */}
      <header>
        <nav className="bg-gray-900 text-white py-4">
          <div className="container mx-auto flex items-center justify-between">
            <a className="text-white text-xl font-bold" href="#">Hogar Tafi</a>
            <button className="text-white lg:hidden focus:outline-none">
              <span className="material-icons">menu</span>
            </button>
            <div className="hidden lg:flex space-x-4" id="navbarNavDropdown">
              <ul className="flex space-x-4">
                <li className="p-3"><a className="text-white flex items-center" aria-current="page" href="#nosotros"><i className="bi bi-house-door-fill mr-2" /> Nosotros</a></li>
                <li className="p-3"><a className="text-white flex items-center" href="#actividades"><i className="bi bi-dice-5-fill mr-2" /> Actividades</a></li>
                <li className="p-3"><a className="text-white flex items-center" href="#servicios"><i className="bi bi-briefcase-fill mr-2" /> Servicios</a></li>
                <li className="p-3"><a className="text-white flex items-center" href="#instalaciones"><i className="bi bi-building-fill mr-2" /> Instalaciones</a></li>
                <li className="p-3"><a className="text-white flex items-center" href="#contacto"><i className="bi bi-telephone-fill mr-2" /> Contacto</a></li>
              </ul>
              <ul className="ml-auto flex space-x-4">
                <li className="p-3"><a className="text-white flex items-center" href="/UserPanel"><i className="bi bi-person-fill mr-2" /> Login</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <section className="bg-cover bg-center h-screen flex items-center" id="nosotros" style={{ backgroundImage: 'url("src/Assets/Images/Main/bg-nosotros.jpg")' }}>
          <div className="container mx-auto">
            <div className="flex justify-center">
              <div className="text-center text-white max-w-2xl">
                <h1 className="text-4xl font-bold">Hogar Tafi</h1>
                <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, distinctio. Perspiciatis quo possimus velit nisi praesentium accusantium assumenda, corporis, iure sed incidunt debitis pariatur. Qui quia iure dolores? Libero dolores, exercitationem maiores magnam obcaecati laborum optio ullam quia minus rerum cupiditate quos nobis officia, voluptatem corrupti asperiores repudiandae praesentium eos!</p>
              </div>
            </div>
          </div>
        </section>
      </header>
    </>
  );
}

export default Header;
