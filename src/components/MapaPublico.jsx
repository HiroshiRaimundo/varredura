import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getEstudos } from '../services/estudosService';

// Corrigindo o problema dos ícones do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Coordenadas do centro do Amapá
const AMAPA_CENTER = [0.9022, -52.0030];
const ZOOM_LEVEL = 7;

function MapaPublico() {
  const [estudos, setEstudos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarEstudos = async () => {
      try {
        const dadosEstudos = await getEstudos();
        setEstudos(dadosEstudos);
      } catch (error) {
        console.error("Erro ao carregar estudos:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarEstudos();
  }, []);

  if (loading) {
    return <div>Carregando mapa...</div>;
  }

  return (
    <div className="mapa-container" style={{ height: '500px', width: '100%' }}>
      <MapContainer 
        center={AMAPA_CENTER} 
        zoom={ZOOM_LEVEL} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {estudos.map((estudo) => {
          // Verificar se o estudo tem coordenadas válidas
          if (estudo.latitude && estudo.longitude) {
            return (
              <Marker 
                key={estudo.id} 
                position={[estudo.latitude, estudo.longitude]}
              >
                <Popup>
                  <div>
                    <h3>{estudo.titulo}</h3>
                    <p><strong>Autor:</strong> {estudo.autor}</p>
                    <p><strong>Data:</strong> {new Date(estudo.data).toLocaleDateString('pt-BR')}</p>
                    {estudo.descricao && <p>{estudo.descricao}</p>}
                    {estudo.link && (
                      <a href={estudo.link} target="_blank" rel="noopener noreferrer">
                        Ver estudo completo
                      </a>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          }
          return null;
        })}
      </MapContainer>
    </div>
  );
}

export default MapaPublico; 