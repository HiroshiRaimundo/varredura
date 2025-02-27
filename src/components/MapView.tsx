
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Map from "@/components/Map";

interface ResearchStudy {
  id: string;
  title: string;
  author: string;
  coAuthors: string;
  summary: string;
  repositoryUrl: string;
  location: string;
  coordinates: [number, number];
  type: "artigo" | "dissertacao" | "tese" | "outro";
}

interface MapViewProps {
  studies: ResearchStudy[];
}

const MapView: React.FC<MapViewProps> = ({ studies }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visualização Geográfica</CardTitle>
        <CardDescription>
          Mapa do Amapá com localização dos estudos registrados. 
          Clique nos marcadores para ver mais detalhes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Map points={studies} />
      </CardContent>
    </Card>
  );
};

export default MapView;
