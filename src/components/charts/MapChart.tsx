import React from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';
import { geoData } from './geoData'; // Dados do mapa do Brasil

interface MapChartProps {
  data: Array<{
    region: string;
    latency: number;
    availability: number;
    errorRate: number;
    requestCount: number;
  }>;
  nameField: string;
  valueField: keyof Pick<MapChartProps['data'][0], 'latency' | 'availability' | 'errorRate' | 'requestCount'>;
  height?: number;
}

export const MapChart: React.FC<MapChartProps> = ({
  data,
  nameField,
  valueField,
  height = 400
}) => {
  const chartData = data.map(item => ({
    id: item.region,
    value: item[valueField]
  }));

  return (
    <div style={{ height }}>
      <ResponsiveChoropleth
        data={chartData}
        features={geoData.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors="blues"
        domain={[0, Math.max(...chartData.map(d => d.value))]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        projectionScale={600}
        projectionTranslation={[0.5, 0.5]}
        projectionRotation={[0, 0, 0]}
        enableGraticule={true}
        graticuleLineColor="rgba(0, 0, 0, .2)"
        borderWidth={0.5}
        borderColor="#152538"
        legends={[
          {
            anchor: 'bottom-left',
            direction: 'column',
            justify: true,
            translateX: 20,
            translateY: -20,
            itemsSpacing: 0,
            itemWidth: 94,
            itemHeight: 18,
            itemDirection: 'left-to-right',
            itemTextColor: '#444444',
            itemOpacity: 0.85,
            symbolSize: 18,
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000000',
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
      />
    </div>
  );
};
