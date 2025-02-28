
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
    const marker = new mapboxgl.Marker({ color: '#FF0000' })
      .setLngLat(point.coordinates)
      .addTo(map);

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
