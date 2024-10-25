import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sección de Información */}
          <div>
            <h5 className="text-lg font-semibold">Hogar Tafi</h5>
            <p className="text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta sunt voluptatem, deleniti error enim amet mollitia atque dolor cumque assumenda.</p>
          </div>
          
          {/* Sección de Enlaces */}
          <div>
            <h5 className="text-lg font-semibold">Enlaces</h5>
            <ul className="list-none space-y-2">
              <li><a href="#nosotros" className="text-white hover:text-gray-300">Nosotros</a></li>
              <li><a href="#actividades" className="text-white hover:text-gray-300">Actividades</a></li>
              <li><a href="#servicios" className="text-white hover:text-gray-300">Servicios</a></li>
              <li><a href="#contacto" className="text-white hover:text-gray-300">Contacto</a></li>
            </ul>
          </div>

          {/* Sección de Contacto */}
          <div>
            <h5 className="text-lg font-semibold">Contacto</h5>
            <p className="text-gray-400">
              <i className="bi bi-geo-alt-fill mr-2" /> Dirección: Calle Blandengues 365, Bahia Blanca<br />
              <i className="bi bi-telephone-fill mr-2" /> Teléfono: +15412312123<br />
              <i className="bi bi-envelope-fill mr-2" /> Email: contacto@hogartafi.com
            </p>
          </div>
        </div>
        
        {/* Sección de Derechos Reservados */}
        <div className="text-center mt-4">
          <p className="mb-0 text-gray-500">© 2024 Hogar Tafi. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
