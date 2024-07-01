import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GraficoRealTimeVulnerBarCopy from './GraficoRealTimeVulnerBarCopy';


const data = [
  { name: '1Q20', uv: 25, color: '#0BB98C' },
  { name: '2Q20', uv: 50, color: '#0BB98C' },
  { name: '3Q20', uv: 0, color: '#0BB98C' },
  { name: '4Q20', uv: 10, color: '#0BB98C' },
  { name: '1Q21', uv: 0, color: '#0BB98C' },
  { name: '2Q21', uv: 40, color: '#0BB98C' },
  { name: '3Q21', uv: 0, color: '#0BB98C' },
  // ... otros datos
];

interface UptimeCardProps {
  title: string;
}

const useStyles = makeStyles(theme => ({
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    color: theme.palette.type === 'dark' ? theme.palette.primary.main : '#333',
    fontSize: '24px',
    fontWeight: 700,
    marginBottom: '7px',
    marginLeft: '13px',
    [theme.breakpoints.down(1900)]: {
      fontSize: '21px',
      paddingTop: '50px',
    },
    [theme.breakpoints.down(1500)]: {
      fontSize: '14px',
    },
    [theme.breakpoints.down(1280)]: {
      paddingRight: '10px',
      fontSize: '20px',
    },
    [theme.breakpoints.down(600)]: {
      fontSize: '17px',
    },
  },
  vulnerabilityNumber: {
    color: '#0BB98C',
    fontSize: '29px',
    fontWeight: 700,
    lineHeight: 'normal',
    paddingLeft: '40px',
  },
  chartContainer: {
    background:
      theme.palette.type === 'dark'
        ? theme.palette.navigation.indicator
        : '#E5E2E2',
    borderRadius: '16px',
    width: '100%',
    height: '100%',
    padding: theme.spacing(3, 1, 0, 0),
  },
}));

export const RealTimeVulnerabilitiesCopy: React.FC<UptimeCardProps> = ({
  title,
}) => {
  const classes = useStyles();



  return (
    <div className={classes.cardContainer}>
      <div className={classes.title}>
        {title}
        <span className={classes.vulnerabilityNumber}>12</span>
      </div>
      <div className={classes.chartContainer}>
        <GraficoRealTimeVulnerBarCopy simbolo="%" data={data} />
      </div>
    </div>
  );
};
