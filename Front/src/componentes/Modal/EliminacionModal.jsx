import React from 'react';

const EliminacionModal = ({ isOpen, mensaje, onConfirm, onClose }) => {
  if (!isOpen) return null; // Si el modal no está abierto, no renderiza nada

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Confirmación</h2>
        <p>{mensaje}</p>
        <div className="flex justify-end mt-4">
          <button className="bg-gray-300 text-black px-4 py-2 rounded mr-2" onClick={onClose}>
            Cancelar
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EliminacionModal;
