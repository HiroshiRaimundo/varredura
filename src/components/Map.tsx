
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Interface para os pontos no mapa
interface MapPoint {
  id: string;
  title: string;
  author: string;
  location: string;
  coordinates: [number, number];
  repositoryUrl?: string;
}

interface MapProps {
  points?: MapPoint[];
}

const Map: React.FC<MapProps> = ({ points = [] }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  // Coordenadas do centro do Amapá
  const amapaCenterLng = -51.0669;
  const amapaCenterLat = 1.0354;

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map with the provided token
    mapboxgl.accessToken = 'pk.eyJ1Ijoib2RyMjAyNSIsImEiOiJjbTduZmJ6emUwMGxoMmlxNDQ2MGtkNXl2In0.e-WKQa0gIyZM9w7SaGi_ag';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      projection: 'mercator',
      zoom: 7, // Zoom mais próximo para ver o Amapá
      center: [amapaCenterLng, amapaCenterLat], // Centralizado no Amapá
      pitch: 30,
      maxBounds: [
        [amapaCenterLng - 3, amapaCenterLat - 3], // Sudoeste
        [amapaCenterLng + 3, amapaCenterLat + 3]  // Nordeste
      ]
    });

    // Adiciona controles de navegação
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Adiciona efeitos atmosféricos
    map.current.on('style.load', () => {
      map.current?.setFog({
        color: 'rgb(255, 255, 255)',
        'high-color': 'rgb(200, 200, 225)',
        'horizon-blend': 0.2,
      });
    });

    // Desabilita o zoom do scroll para uma experiência mais suave
    map.current.scrollZoom.disable();

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, []);

  // Atualiza os marcadores quando os pontos mudam
  useEffect(() => {
    if (!map.current || !points.length) return;

    // Limpa marcadores existentes
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Adiciona novos marcadores
    points.forEach(point => {
      // Cria um elemento para o popup
      const popupContent = document.createElement('div');
      popupContent.className = 'p-2';
      popupContent.innerHTML = `
        <h3 class="font-bold">${point.title}</h3>
        <p class="text-sm">Autor: ${point.author}</p>
        <p class="text-sm">Local: ${point.location}</p>
        ${point.repositoryUrl ? `<a href="${point.repositoryUrl}" target="_blank" class="text-blue-500 hover:underline text-sm">Ver repositório</a>` : ''}
      `;

      // Cria o popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setDOMContent(popupContent);

      // Cria o marcador
      const marker = new mapboxgl.Marker({ color: '#FF0000' })
        .setLngLat(point.coordinates)
        .setPopup(popup)
        .addTo(map.current!);
      
      markersRef.current.push(marker);
    });

    // Se há pontos, ajusta o mapa para mostrar todos eles
    if (points.length > 1) {
      const bounds = new mapboxgl.LngLatBounds();
      points.forEach(point => {
        bounds.extend(point.coordinates as mapboxgl.LngLatLike);
      });
      
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 12
      });
    } else if (points.length === 1) {
      // Se há apenas um ponto, centraliza o mapa nele
      map.current.flyTo({
        center: points[0].coordinates,
        zoom: 12
      });
    }
  }, [points]);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10 rounded-lg" />
    </div>
  );
};

export default Map;
