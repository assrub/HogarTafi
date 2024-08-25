 
export default function SelectPacientes() {
  return (
    <div className="relative inline-block w-full text-gray-700">
      <select
        className="block appearance-none w-full bg-gray-800 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    
      >
        <option value="">Seleccione un paciente</option>
       
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 3a1 1 0 00-.707 1.707l3.586 3.586-3.586 3.586A1 1 0 1010.707 13l4-4a1 1 0 000-1.414l-4-4A1 1 0 0010 3z" />
        </svg>
      </div>
    </div>
  );
}