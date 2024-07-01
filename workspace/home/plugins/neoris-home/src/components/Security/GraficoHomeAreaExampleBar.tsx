import React from 'react';
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  BarChart,
  Bar
} from 'recharts';
import { useTheme, useMediaQuery } from '@material-ui/core';

interface DataPoint {
  name: string;
  uv: number;
  up: number;
  ut: number;
}

interface GraficoHomeAreaProps {
  label: string;
  data: DataPoint[];
  simbolo: string;
}

export function GraficoHomeAreaExampleBar({
  data,
  simbolo,
}: GraficoHomeAreaProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(800));
  const isLaptop = useMediaQuery(theme.breakpoints.down(1500));
  const formatYAxis = (tickItem: number) => {
    return `${tickItem}${simbolo}`; // Agrega el símbolo de porcentaje
  };

  return (
    <ResponsiveContainer
      width="100%"
      height={isMobile ? 125 : isLaptop ? 160 : 250}
    >
      <BarChart
        data={data}
        margin={{
          top: isMobile ? 20 : 0,
          right: 5,
          left: 50,
          bottom: isMobile ? -10 : isLaptop ? -5 : 0,
        }}
        barGap={0}

      >
        <XAxis
          dataKey="name"
          tick={{
            fill: `${theme.palette.type === 'dark' ? theme.palette.primary.main : 'black'}`,
            fontSize: isMobile ? 7 : isLaptop ? 12 : 12,
            fontWeight: isMobile ? 0 : 400,
            fontStyle: 'normal',
          }}
          axisLine={false}
          padding={{
            left: isMobile ? 5 : isLaptop ? 15 : 5,
            right: isMobile ? 5 : isLaptop ? 15 : 5,
          }}
          tickLine={false}

        />
        <YAxis
          tick={{
            fill: `${theme.palette.type === 'dark' ? theme.palette.primary.main : '#333'}`,
            fontSize: isMobile ? 10 :isLaptop ? 12 :15,
            fontWeight: 400,
            fontStyle: 'normal',
          }}
          axisLine={false}
          padding={{
            top: isMobile ? 1 : isLaptop ? 15 : 30,
            bottom: isMobile ? 1 : isLaptop ? 5 : 10,
          }}
          tickLine={false}
          tickFormatter={formatYAxis}
          domain={[0, 'dataMax']}
          scale="linear"
        />
        <ReferenceLine y={0} stroke="#e0e0e0" strokeDasharray="3 3" />
        <ReferenceLine y={200} stroke="#e0e0e0" strokeDasharray="3 3" />
        <ReferenceLine y={400} stroke="#e0e0e0" strokeDasharray="3 3" />
        <ReferenceLine y={600} stroke="#e0e0e0" strokeDasharray="3 3" />
        <ReferenceLine y={800} stroke="#e0e0e0" strokeDasharray="3 3" />
        <ReferenceLine y={1000} stroke="#e0e0e0" strokeDasharray="3 3" />
        <Tooltip />

        <Bar dataKey="up" fill="#096C86" barSize={isMobile ? 5 :isLaptop ? 10 :16} radius={[10, 10, 0, 0]} />
        <Bar dataKey="ut" fill="#09BA8C" barSize={isMobile ? 5 :isLaptop ? 10 :16} radius={[10, 10, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
