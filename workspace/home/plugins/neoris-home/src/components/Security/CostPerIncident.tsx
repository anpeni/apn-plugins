import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { BackstageTheme } from '@backstage/theme';
import { useTheme, useMediaQuery } from '@material-ui/core';
import { GraficoHomeAreaExampleBar } from './GraficoHomeAreaExampleBar';
import { GraficoHomeAreaExample } from './GraficoHomeAreaExample';


interface DataPoint {
  name: string;
  uv: number;
  up: number;
  ut: number;
}
interface DatastoresAreaCardProps {
  title: string;
  label: string;
  data: DataPoint[];
  simbolo: string;
  uptime: string;
  subtitulo: string;
  percentageChange: number;
}

const useStyles = makeStyles<BackstageTheme>(theme => ({
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(3),
  },
  cardTitle: {
    color:
      theme.palette.type === 'dark'
        ? "#fff"
        : "#000",
    fontSize: '24px',
    fontWeight: 700,
    padding: theme.spacing(0, 2),
    [theme.breakpoints.down('md')]: {
      fontSize: '18px',
    },
  },
  sectionContainer: {
    background:
      theme.palette.type === 'dark'
        ? '#101112'
        : '#E5E2E2',
    borderRadius: '18px',
    padding: theme.spacing(1, 4),
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(2),
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  sectionTitle: {
    color:
      theme.palette.type === 'dark'
      ? "#fff"
      : "#000",
    fontSize: '13px',
    fontWeight: 600,
  },
  sectionSubtitle: {
    color:
      theme.palette.type === 'dark'
      ? "#fff"
      : "#000",
    fontSize: '9px',
    fontWeight: 400,
  },
  sortBy: {
    color:
      theme.palette.type === 'dark'
      ? "#fff"
      : "#000",
    fontSize: '9px',
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },
  chartContainer: {
    marginLeft: '-70px',
    marginBottom: theme.spacing(2),
  },
  legendItem: {
    borderRadius: '7px',
    color:
      theme.palette.type === 'dark'
      ? "#fff"
      : "#000",
    fontSize: '10px',
    fontWeight: 400,
    padding: theme.spacing(0.5, 1.5),
    marginRight: theme.spacing(1),
    whiteSpace: 'nowrap',
  },
}));

export const CostPerIncident: React.FC<DatastoresAreaCardProps> = ({
  uptime,
  label,
  data,
  simbolo,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={classes.cardContainer}>
      <Typography className={classes.cardTitle}>{uptime}</Typography>
      <div className={classes.sectionContainer}>
        <div className={classes.sectionHeader}>
          <div>
            <Typography className={classes.sectionTitle}>Statistics</Typography>
            <Typography className={classes.sectionSubtitle}>
              May 2023
            </Typography>
          </div>
          <Typography className={classes.sortBy}>
            Sort by: Monthly &#9660;
          </Typography>
        </div>
        <div className={classes.chartContainer}>
          <GraficoHomeAreaExample label={label} data={data} simbolo={simbolo} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {[
            'Name 1',
            'Name 2',
            'Name 3',
            'Name 4',
            'Name 5',
            'Name 6',
            'Name 7',
          ].map((name, index) => (
            <div
              key={index}
              className={classes.legendItem}
              style={{
                background: [
                  '#0BB98C',
                  '#0A6C86',
                  '#EC3237',
                  'none',
                  'none',
                  'none',
                  'none',
                ][index],
                marginLeft: index !== 0 ? theme.spacing(2) : 0,
                marginBottom: isMobile ? theme.spacing(1) : 0,
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: ['#0BB98C', '#0A6C86', '#EC3237', '#E3B422', '#F48D46', '#3CACF3', '#0BB98C'][
                  index
                ],
              }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
      <div className={classes.sectionContainer}>
        <div className={classes.sectionHeader}>
          <div>
            <Typography className={classes.sectionTitle}>
              Comparative
            </Typography>
            <Typography className={classes.sectionSubtitle}>
              May 2023
            </Typography>
          </div>
          <Typography className={classes.sortBy}>
            Sort by: Monthly &#9660;
          </Typography>
        </div>
        <div className={classes.chartContainer}>
          <GraficoHomeAreaExampleBar
            label={label}
            data={data}
            simbolo={simbolo}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <div className={classes.legendItem} style={{ background: '#0BB98C' }}>
            2022
          </div>
          <div
            className={classes.legendItem}
            style={{ background: '#0A6C86', marginLeft: theme.spacing(2) }}
          >
            2023
          </div>
        </div>
      </div>
    </div>
  );
};
