import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useTheme, useMediaQuery } from '@material-ui/core';
import { CSSProperties } from 'react';

interface DataPoint {
  name: string;
  color: string;
  uv: number;
}

interface GraficoHomeBarProps {
  data: DataPoint[];
  simbolo: string;
}

function GraficoRealTimeVulnerBar({ data }: GraficoHomeBarProps) {
  const theme = useTheme();

  const isLaptop = useMediaQuery(theme.breakpoints.down(1700));
  const isTablet = useMediaQuery(theme.breakpoints.down(900));
  const isMobile = useMediaQuery(theme.breakpoints.down(600));

  const chartStyles: CSSProperties = {
    width: '91%',
    height: isMobile ? 100 : isTablet ? 160 : isLaptop ? 160 : 140,
  };

  const labelStyles: CSSProperties = {
    paddingTop: '32px',
    marginTop: '-53px',
    marginBottom: '-3px',
    paddingLeft: '15px',
    color: theme.palette.type === 'dark' ? theme.palette.primary.main : '#333',
    fontSize: '17px',
    fontStyle: 'normal',
  };

  const axisLineColor =
    theme.palette.type === 'dark'
      ? "#fff"
      : "#000";

  const xAxisStyles = {
    dataKey: 'name',
    tick: { fill: 'none' },
    axisLine: { stroke: axisLineColor, strokeWidth: 3.5 },
    padding: { left: 0, right: 0 },
    tickLine: false,
    label: '',
  };

  const barChartStyles = {
    margin: { top: 0, right: 0, left: 0, bottom: 0 },
  };

  const containerStyles: CSSProperties = {
    width: '95%',
    marginLeft: '15px',
    display: 'flex',
    flexDirection: 'row', 
    marginTop: '-23px',
    justifyContent: 'space-between', 
    color: theme.palette.type === 'dark' ? theme.palette.primary.main : '#333',
    fontFamily: 'sans-serif',
    fontSize: '14px',
    fontStyle: 'normal',
    marginBottom: '13px',
  };

  const centeredContainerStyles: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '103%',
  };

  return (
    <>
      <div style={labelStyles}>Last 48 hours</div>
      <div style={centeredContainerStyles}>
        <ResponsiveContainer
          width={chartStyles.width}
          height={chartStyles.height}
        >
          <BarChart data={data} margin={barChartStyles.margin}>
            <XAxis {...xAxisStyles} />
            <Tooltip />
            <Bar
              dataKey="uv"
              barSize={isMobile ? 8 : isTablet ? 11 : isLaptop ? 7 : 11}
              radius={[20, 20, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={containerStyles}>
        <div>-48H</div>
        <div>Now</div>
      </div>
    </>
  );
}

export default GraficoRealTimeVulnerBar;
