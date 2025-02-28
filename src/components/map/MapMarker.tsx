
import React from 'react';
import mapboxgl from 'mapbox-gl';
import { MapPoint } from '@/types/map';

interface MapMarkerProps {
  point: MapPoint;
  map: mapboxgl.Map;
  onClick: (point: MapPoint) => void;
}

const MapMarker: React.FC<MapMarkerProps> = ({ point, map, onClick }) => {
  React.useEffect(() => {
    // Create a detailed popup with more information
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: [0, -10],
      className: 'custom-popup'
    }).setHTML(`
      <div class="p-2 text-sm">
        <h4 class="font-bold mb-1">${point.title}</h4>
        <p class="text-xs">Autor: ${point.author}</p>
        <p class="text-xs">Tipo: ${point.type}</p>
      </div>
    `);

    // Choose marker color based on study type
    let markerColor = '#FF0000';
    switch (point.type) {
      case 'artigo':
        markerColor = '#FF0000'; // Red
        break;
      case 'dissertacao':
        markerColor = '#0066FF'; // Blue
        break;
      case 'tese':
        markerColor = '#008000'; // Green
        break;
      case 'livros':
        markerColor = '#800080'; // Purple
        break;
      case 'ebooks':
        markerColor = '#FF6600'; // Orange
        break;
      default:
        markerColor = '#808080'; // Grey for 'outro'
    }

    // Apply a small random offset to prevent exact overlay of markers at the same location
    const marker = new mapboxgl.Marker({ 
      color: markerColor,
      offset: [
        Math.random() * 10 - 5,
        Math.random() * 10 - 5
      ]
    })
      .setLngLat(point.coordinates)
      .addTo(map);

    // Show popup on hover
    marker.getElement().addEventListener('mouseenter', () => {
      popup.addTo(map);
      popup.setLngLat(point.coordinates);
    });

    marker.getElement().addEventListener('mouseleave', () => {
      popup.remove();
    });

    marker.getElement().addEventListener('click', () => {
      onClick(point);
    });

    return () => {
      marker.remove();
      popup.remove();
    };
  }, [map, point, onClick]);

  return null;
};

export default MapMarker;
