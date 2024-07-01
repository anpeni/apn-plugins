import React from 'react';
import { useTheme, useMediaQuery, makeStyles } from '@material-ui/core';

interface GaugeChartProps {
  value: number;
  min: number;
  max: number;
  title: string;
}

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    background: 'none',
    marginBottom: (props: any) => (props.isMobile ? '-55px' : props.isLaptop ? '-25px' : '0px'),
    top: (props: any) => (props.isMobile ? '10px' : '0px'),
    left: (props: any) => (props.isMobile ? '-115px' : props.isLaptop ? '-66px' : '-55px'),
    width: (props: any) => `${props.viewBoxWidth}px`,
    height: (props: any) => `${props.viewBoxHeight}px`,
  },
  valueText: {
    position: 'absolute',
    top: (props: any) => (props.isMobile ? '60px' : props.isLaptop ? '30px' : '40px'),
    left: '50%',
    transform: 'translateX(-50%)',
    color: () =>
      theme.palette.type === 'dark' ? theme.palette.common.white : theme.palette.common.black,
    fontSize: (props: any) => (props.isMobile ? '25px' : props.isLaptop ? '12px' : '12px'),
    textAlign: 'center',
    fontWeight: 700,
  },
  titleText: {
    position: 'absolute',
    top: (props: any) => (props.isMobile ? '130px' : props.isLaptop ? '70px' : '105px'),
    left: '50%',
    transform: 'translateX(-50%)',
    color: () =>
      theme.palette.type === 'dark' ? theme.palette.common.white : theme.palette.common.black,
    fontSize: (props: any) => (props.isMobile ? '16px' : props.isLaptop ? '8px' : '10px'),
    textAlign: 'center',
    padding: '0px 0px 0px 0px',
  },
}));

export const GraficoAverageDetectionTimeCopy: React.FC<GaugeChartProps> = ({
  value,
  min,
  max,
  title,
}) => {
  const theme = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.down(1370));
  const isMobile = useMediaQuery(theme.breakpoints.down(600));

  const getViewBoxDimensions = () => {
    const viewBoxWidth = isMobile ? 500 : isLaptop ? 250 : 300;
    const viewBoxHeight = isMobile ? 250 : isLaptop ? 120 : 150;
    const posAguja = isMobile ? 100 : isLaptop ? 35 : 50;
    const longAguja = isMobile ? '-8' : isLaptop ? '8' : '5';
    const angle = isMobile ? 7 : isLaptop ? 9 : 9;
    const density = isMobile ? 27 : isLaptop ? 21 : 21;

    return { viewBoxWidth, viewBoxHeight, posAguja, longAguja, angle, density };
  };

  const { viewBoxWidth, viewBoxHeight, posAguja, longAguja, angle, density } =
    getViewBoxDimensions();

  const classes = useStyles({ isMobile, isLaptop, viewBoxWidth, viewBoxHeight });

  const percentageValue = (value - min) / (max - min);

  return (
    <div className={classes.container}>
      <svg
        width={viewBoxWidth}
        height={viewBoxHeight}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      >
        {/* Ticks del medidor */}
        {Array.from({ length: density }, (_, index) => {
          const lineAngle = index * angle;
          const cutoffAngle = percentageValue * 180;
          const lineColor =
            lineAngle <= cutoffAngle
              ? theme.palette.navigation.color
              : theme.palette.primary.main;
          const y1 = isMobile ? 35 : isLaptop ? 20 : 25;
          const y2 = 5;
          const espesor = isMobile ? '4' : isLaptop ? '2px' : '4';

          return (
            <line
              key={index}
              x1={viewBoxWidth / 2}
              y1={viewBoxHeight - y1}
              x2={viewBoxWidth / 2}
              y2={viewBoxHeight - y2}
              stroke={lineColor}
              strokeWidth={espesor}
              transform={`rotate(${lineAngle + 90},${viewBoxWidth / 2},${viewBoxHeight / 2})`}
            />
          );
        })}

        {/* Aguja del medidor */}
        <g transform={`translate(${viewBoxWidth / 2}, ${posAguja})`}>
          <line
            x1="0"
            y1="25"
            x2="0"
            y2={longAguja}
            stroke="turquoise"
            strokeWidth="4"
            transform={`rotate(${percentageValue * 180 - 90},${0},${25})`}
          />
        </g>
      </svg>

      {/* Texto del valor */}
      <div className={classes.valueText}>{`${value.toFixed(1)} ms`}</div>

      {/* Texto del título */}
      <div className={classes.titleText}>{title}</div>
    </div>
  );
};
