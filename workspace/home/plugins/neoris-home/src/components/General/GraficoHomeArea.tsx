import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTheme, useMediaQuery } from '@material-ui/core';

interface DataPoint {
  name: string;
  uv: number;
}

interface GraficoHomeAreaProps {
  label: string;
  data: DataPoint[];
  simbolo: string;
}

export function GraficoHomeArea({
  label,
  data,
  simbolo,
}: GraficoHomeAreaProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(800));
  const isLaptop = useMediaQuery(theme.breakpoints.down(1500));
  const formatYAxis = (tickItem: number) => {
    return `${tickItem}${simbolo}`; // Agrega el símbolo de porcentaje
  };
  return(
  <ResponsiveContainer width="100%" 
  height={isMobile ? 125 : isLaptop ? 160 : 200}
  
  >
    <AreaChart data={data} margin={{ top: isMobile ? 20 : 0, right: 5, left: isMobile ? -10 : isLaptop ? 50 : 50, bottom: isMobile ? -10 : isLaptop ? -5: 0 }}>
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={theme.palette.navigation.color} stopOpacity={1.8}/>
          <stop offset="95%" stopColor={theme.palette.navigation.color}  stopOpacity={0}/>
        </linearGradient>
      </defs>
      <XAxis 
      dataKey="name" 
      tick={{ fill: `${theme.palette.type === 'dark' ? theme.palette.primary.main : 'black'
    }`,  
      fontSize: isMobile ? 10 : isLaptop ? 15  : 15 }} 
      axisLine={false}
      padding={{ left: isMobile ? 10 : isLaptop ? 15 : 15, right: isMobile ? 10 : isLaptop ? 15 : 20 }}
      tickLine={false}
      
      label={{
        value: label,//'Usage Avg. MHz'
        angle: -90,
        position: 'insideLeft',
        dx: -90,
        dy: -15,
        style: { fill: `${theme.palette.type === 'dark' ? theme.palette.primary.main : 'black'
      }`, 
        fontSize: isLaptop ? 15 : 15 } // Puedes ajustar los valores según sea necesario
      }}

      />
      {/*TSC*/}
        <YAxis 
        tick={{ fill: `${theme.palette.type === 'dark' ? theme.palette.primary.main : '#333'
      }`,  
        fontSize: isMobile ? 10 : 15 }} 
        axisLine={false}
        padding={{ top: isMobile ? 1 : isLaptop ? 15 : 30, bottom: isMobile ? 1 : isLaptop ? 5 : 10}}
        tickLine={false}
        tickFormatter={formatYAxis}
        />
      
      <Tooltip />
      <Area type="monotone" dataKey="uv" stroke={theme.palette.navigation.color} fillOpacity={0.9} fill="url(#colorUv)" strokeWidth={3}/>
    </AreaChart>
  </ResponsiveContainer>
  )
};


