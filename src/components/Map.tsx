import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ExternalLink, X } from 'lucide-react';

interface MapPoint {
  id: string;
  title: string;
  author: string;
  location: string;
  coordinates: [number, number];
  repositoryUrl?: string;
  summary?: string;
}

interface MapProps {
  points?: MapPoint[];
}

const Map: React.FC<MapProps> = ({ points = [] }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [selectedStudies, setSelectedStudies] = useState<MapPoint[]>([]);

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

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    points.forEach(point => {
      const markerElement = document.createElement('div');
      markerElement.className = 'cursor-pointer';
      
      const marker = new mapboxgl.Marker({ color: '#FF0000' })
        .setLngLat(point.coordinates)
        .addTo(map.current!);

      marker.getElement().addEventListener('click', () => {
        if (!selectedStudies.find(study => study.id === point.id)) {
          setSelectedStudies(prev => [...prev, point]);
        }
      });
      
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

  const removeStudyFromList = (studyId: string) => {
    setSelectedStudies(prev => prev.filter(study => study.id !== studyId));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
        <div ref={mapContainer} className="absolute inset-0" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10 rounded-lg" />
      </div>
      
      {selectedStudies.length > 0 && (
        <Card>
          <ScrollArea className="h-[200px]">
            <CardContent className="space-y-4 p-4">
              {selectedStudies.map(study => (
                <div key={study.id} className="relative bg-muted p-4 rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => removeStudyFromList(study.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <h3 className="font-semibold mb-2">{study.title}</h3>
                  <p className="text-sm mb-2">Autor: {study.author}</p>
                  <p className="text-sm mb-2">Local: {study.location}</p>
                  {study.summary && (
                    <p className="text-sm text-muted-foreground mb-2">{study.summary}</p>
                  )}
                  {study.repositoryUrl && (
                    <a
                      href={study.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Ver repositório <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              ))}
            </CardContent>
          </ScrollArea>
        </Card>
      )}
    </div>
  );
};

export default Map;
