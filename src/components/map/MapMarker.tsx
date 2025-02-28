
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
    // Create a popup but don't add it to the map yet
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    }).setHTML(`<div class="p-2 text-sm font-medium">${point.title}</div>`);

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

    const marker = new mapboxgl.Marker({ 
      color: markerColor,
      // Small random offset to prevent exact overlay of markers at the same location
      offset: [
        Math.random() * 10 - 5,
        Math.random() * 10 - 5
      ]
    })
      .setLngLat(point.coordinates)
      .setPopup(popup)
      .addTo(map);

    // Show popup on hover
    marker.getElement().addEventListener('mouseenter', () => {
      popup.addTo(map);
    });

    marker.getElement().addEventListener('mouseleave', () => {
      popup.remove();
    });

    marker.getElement().addEventListener('click', () => {
      onClick(point);
    });

    return () => {
      marker.remove();
    };
  }, [map, point, onClick]);

  return null;
};

export default MapMarker;
