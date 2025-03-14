import React from 'react';
import MapaPublico from '../components/MapaPublico';
// ... outros imports necessários

function Publico() {
  return (
    <div className="publico-container">
      <h1>Mapa de Estudos no Amapá</h1>
      <p>Visualize todos os estudos registrados no estado do Amapá</p>
      
      <div className="mapa-section">
        <MapaPublico />
      </div>
      
      {/* Outros conteúdos da página pública */}
    </div>
  );
}

export default Publico; 