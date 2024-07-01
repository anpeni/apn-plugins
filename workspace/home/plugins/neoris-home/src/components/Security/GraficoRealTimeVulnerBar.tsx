import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useTheme, useMediaQuery } from '@material-ui/core';

interface DataPoint {
  name: string;
  color: string;
  uv: number;
}
interface GraficoHomeBarProps {
  data: DataPoint[];
  simbolo: string;
}

function GraficoRealTimeVulnerBar({ data, simbolo }: GraficoHomeBarProps) {
  const theme = useTheme();
  
  const isLaptop = useMediaQuery(theme.breakpoints.down(1370));
  const isIpad = useMediaQuery(theme.breakpoints.down(900));
  const isMobile = useMediaQuery(theme.breakpoints.down(600));

  const formatYAxis = (tickItem: number) => {
    return `${tickItem}${simbolo}`; // Agrega el símbolo de porcentaje
  };

  return (
    <div 
    >
      <div
        style={{
          paddingTop: '5px',
          paddingLeft: '65px',
          color: `${theme.palette.type === 'dark' ? theme.palette.primary.main : '#333'}`,
          fontSize: isMobile ? '10px' : isIpad ? '14px' : isLaptop ? '10px' : '14px',
          fontWeight: 700,
          fontStyle: 'normal',
        }}
      >
        Last 48 hours
      </div>
      <ResponsiveContainer
        width={isMobile ? '80%' : isIpad ? '93%' : isLaptop ? '90%': '100%'}
        height={isMobile ? 60 : isIpad ? 100 : isLaptop ? 65 : 100}

      >
        <BarChart
          data={data}
          margin={{
            top: isMobile ? 5 : isIpad ? 20 : isLaptop ? 5 : 20,
            right: isMobile ? 1 :  isIpad ? 1 : isLaptop ? 1 : 30,
            left: isMobile ? 10 : isIpad ? 0 : isLaptop ? 10: 0,
            bottom: isMobile ? -10 : isIpad ? -10 : isLaptop ? -10: -10,
          }}
        >
          <XAxis
            dataKey="name"
            tick={{
              fill: 'none',
            }}
            axisLine={{
              stroke: 'white',
              strokeWidth: 3.5,
            }}
            padding={{
              left: isMobile ? 1 : isIpad ? 5 : isLaptop ? 5 : 5,
              right: isMobile ? 1 : isIpad ? 1 : isLaptop ? 1 : 1,
            }}
            tickLine={false}
            label=""
          />
          <YAxis
            tick={{
              fill: 'none',
            }}
            axisLine={false}
            padding={{
              top: isMobile ? 1 : isIpad ? 0 : isLaptop ? 1 : 0,
              bottom: isMobile ? 1 : isIpad ? 1 : isLaptop ? 1 : 1,
            }}
            tickLine={false}
            tickFormatter={formatYAxis}
          />
          <Tooltip />

          <Bar
            dataKey="uv"
            barSize={isMobile ? 5 : isIpad ? 10 : isLaptop ? 5 : 10}
            radius={[20, 20, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          paddingLeft: isMobile ? '70px' : isIpad ? '65px' : isLaptop ? '70px' :'65px',
          marginTop: isMobile ? '-15px' : isIpad ? '-15px' : isLaptop ? '-15px' :'-15px',
          
        }}
      >
        <div
          style={{
            paddingLeft: isMobile ? 1 : 0,
            color: `${theme.palette.type === 'dark' ? theme.palette.primary.main : '#333'}`,
            fontSize: isMobile ? '10px' : isIpad ? '14px' : isLaptop ? '10px' : '14px',
            fontWeight: 700,
            fontStyle: 'normal',
            
          }}
        >
          -48 H
        </div>
        <div
          style={{
            color: `${theme.palette.type === 'dark' ? theme.palette.primary.main : '#333'}`,
            fontSize: isMobile ? '10px' : isIpad ? '14px': isLaptop ? '10px' :'14px',
            fontWeight: 700,
            fontStyle: 'normal',
            paddingLeft: isMobile ? '97px' : isIpad ? '230px' :isLaptop ? '70px' : '280px',
          }}
        >
          Now
        </div>
      </div>
    </div>
  );
}

export default GraficoRealTimeVulnerBar;
