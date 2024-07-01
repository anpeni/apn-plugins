import React from 'react';
import { useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BackstageTheme } from '@backstage/theme';


const useStyles = makeStyles<BackstageTheme>(theme => ({
  content: {
    position: 'relative',
    width: '147px',
    height: '147px',
    [theme.breakpoints.down(1370)]: {
      width: '100px',
      height: '100px',
    },
    [theme.breakpoints.down(900)]: {
      width: '130px',
      height: '130px',
    },
    [theme.breakpoints.down(600)]: {
      width: '146px',
      height: '148px',
    },
  },
}));
interface RatingProps {
  rating: number; // Asumiendo una escala de 0 a 10
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const theme = useTheme();


  const strokeDasharray = 360; // Circunferencia del círculo SVG (2 * Math.PI * 45)
  const strokeDashoffset = strokeDasharray - (strokeDasharray * rating) / 10;
  const classes = useStyles();

  const textColor =
    theme.palette.type === 'dark'
    ? "#fff"
    : "#000"

  return (
    <div className={classes.content}>
      <svg
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient
            id="paint0_linear_1852_2493"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="15%"
          >
            <stop stopColor="#05CD99" />
            <stop offset="1" stopColor="#05CD99" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="none"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#paint0_linear_1852_2493)"
          strokeWidth="7"
          strokeDasharray={`${strokeDasharray}`}
          strokeDashoffset={`${strokeDashoffset}`}
          transform="rotate(70 50 50)"
          strokeLinecap="round"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          fill={textColor}
          dy=".3em"
          fontSize="30"
          fontWeight={700}
        >
          {rating.toFixed(1)}
        </text>
        <text
          x="50%"
          y="70%"
          textAnchor="middle"
          fill={textColor}
          dy="-.5em"
          fontSize="7"
          fontWeight={500}
        >
          Average Rating
        </text>
      </svg>
    </div>
  );
};

export default Rating;
