import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
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

export function GraficoHomeAreaExample({
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
      <AreaChart
        data={data}
        margin={{
          top: isMobile ? 20 : 0,
          right: 5,
          left: 50,
          bottom: isMobile ? -10 : isLaptop ? -5 : 0,
        }}
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
            left: isMobile ? 10 : isLaptop ? 15 : 15,
            right: isMobile ? 10 : isLaptop ? 15 : 20,
          }}
          tickLine={false}
        />
        <YAxis
          tick={{
            fill: `${theme.palette.type === 'dark' ? theme.palette.primary.main : '#333'}`,
            fontSize: isMobile ? 10 :isLaptop ? 12 :15,
            fontFamily: 'sans-serif',
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
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#EE3131"
          fill="none"
          strokeWidth={1.78}
        />
        <Area
          type="monotone"
          dataKey="up"
          stroke="#096C86"
          fill="none"
          strokeWidth={1.78}
        />
        <Area
          type="monotone"
          dataKey="ut"
          stroke="#09BA8C"
          fill="none"
          strokeWidth={1.78}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
