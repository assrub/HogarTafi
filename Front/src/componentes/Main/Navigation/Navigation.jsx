import React from 'react';
import Carousel from './Carousel';

function Navigation() {
  const images = [
    'src/Assets/Images/Main/tarjeta-servicios.jpg',
    'src/Assets/Images/Main/tarjeta-servicios.jpg',
    'src/Assets/Images/Main/tarjeta-servicios.jpg',
  ];
  

  return (
    <>
      {/* Sección "Actividades" */}
      <section id="actividades" className="bg-cover bg-center py-6">
      <div className="container mx-auto">
    <h2 className="text-center text-3xl font-bold text-gray-900">Actividades</h2>

    {/* Carousel de Material Tailwind */}
   <Carousel images={images} />
  </div>
      </section>

      {/* Sección "Servicios" */}
      <section id="servicios" className="py-8 bg-gray-100 text-gray-900">
        <div className="container mx-auto">
          <h3 className="text-center text-2xl font-semibold pt-4">Servicios</h3>
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Servicio 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex">
                <div className="w-1/3">
                  <img src="src/Assets/Images/Main/tarjeta-servicios.jpg" className="object-cover w-full h-full" alt="Imagen 1" />
                </div>
                <div className="w-2/3 bg-gray-100 p-4">
                  <h5 className="text-lg font-semibold">Título 1</h5>
                  <p className="text-gray-700">Descripción de la tarjeta 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.</p>
                </div>
              </div>
            </div>
            {/* Servicio 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex">
                <div className="w-1/3">
                  <img src="src/Assets/Images/Main/tarjeta-servicios.jpg" className="object-cover w-full h-full" alt="Imagen 2" />
                </div>
                <div className="w-2/3 bg-gray-100 p-4">
                  <h5 className="text-lg font-semibold">Título 2</h5>
                  <p className="text-gray-700">Descripción de la tarjeta 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.</p>
                </div>
              </div>
            </div>
            {/* Servicio 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex">
                <div className="w-1/3">
                  <img src="src/Assets/Images/Main/tarjeta-servicios.jpg" className="object-cover w-full h-full" alt="Imagen 3" />
                </div>
                <div className="w-2/3 bg-gray-100 p-4">
                  <h5 className="text-lg font-semibold">Título 3</h5>
                  <p className="text-gray-700">Descripción de la tarjeta 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.</p>
                </div>
              </div>
            </div>
            {/* Servicio 4 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex">
                <div className="w-1/3">
                  <img src="src/Assets/Images/Main/tarjeta-servicios.jpg" className="object-cover w-full h-full" alt="Imagen 4" />
                </div>
                <div className="w-2/3 bg-gray-100 p-4">
                  <h5 className="text-lg font-semibold">Título 4</h5>
                  <p className="text-gray-700">Descripción de la tarjeta 4. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección "Instalaciones" */}
      <section id="instalaciones" className="py-8 bg-cover bg-center" style={{ backgroundImage: 'url("src/Assets/Images/Main/instalaciones-bg.jpg")' }}>
        <div className="container mx-auto">
          <h2 className="text-center text-3xl font-bold text-gray-900">Instalaciones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div>
              <img src="src/Assets/Images/Main/instalaciones.jpeg" className="w-full h-auto rounded-lg shadow-lg" alt="..." />
            </div>
            <div>
              <img src="src/Assets/Images/Main/instalaciones.jpeg" className="w-full h-auto rounded-lg shadow-lg" alt="..." />
            </div>
            <div>
              <img src="src/Assets/Images/Main/instalaciones.jpeg" className="w-full h-auto rounded-lg shadow-lg" alt="..." />
            </div>
            <div>
              <img src="src/Assets/Images/Main/instalaciones.jpeg" className="w-full h-auto rounded-lg shadow-lg" alt="..." />
            </div>
            <div>
              <img src="src/Assets/Images/Main/instalaciones.jpeg" className="w-full h-auto rounded-lg shadow-lg" alt="..." />
            </div>
            <div>
              <img src="src/Assets/Images/Main/instalaciones.jpeg" className="w-full h-auto rounded-lg shadow-lg" alt="..." />
            </div>
          </div>
        </div>
      </section>

      {/* Sección "Contacto" */}
      <section id="contacto" className="py-8 bg-gray-100">
        <h2 className="text-center text-2xl font-bold text-gray-900">Contacto</h2>
        <div className="flex justify-center py-8">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full h-full">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.9886579559634!2d-62.27961112464322!3d-38.718069386259444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95edbca5014e1a5d%3A0x9039aa43c9238a1b!2sBlandengues%20365%2C%20B8000GIG%20Bah%C3%ADa%20Blanca%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1718401035228!5m2!1ses-419!2sar" className="w-full h-full border-0" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className="w-full">
              <div className="mb-4">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input id="nombre" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" placeholder="" />
              </div>
              <div className="mb-4">
                <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido</label>
                <input id="apellido" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" placeholder="" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" placeholder="" />
              </div>
              <div className="mb-4">
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input id="telefono" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" placeholder="" />
              </div>
              <div className="mb-4">
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700">Mensaje</label>
                <textarea id="mensaje" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" rows="3"></textarea>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Navigation;
