
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Map from "@/components/Map";
import SearchPanel from "@/components/map/SearchPanel";
import { ResearchStudy } from "@/types/research";

interface MapViewProps {
  studies: ResearchStudy[];
}

const MapView: React.FC<MapViewProps> = ({ studies }) => {
  const [searchResults, setSearchResults] = useState<ResearchStudy[]>([]);

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
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-3/4">
            <Map points={studies} />
          </div>
          <div className="w-full lg:w-1/4">
            <SearchPanel 
              studies={studies} 
              onSearchResults={setSearchResults} 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapView;
