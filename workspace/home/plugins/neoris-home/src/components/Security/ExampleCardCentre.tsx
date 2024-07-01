import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { BackstageTheme } from '@backstage/theme';
import {CostPerIncident} from './CostPerIncident';

const useStyles = makeStyles<BackstageTheme>(
  theme => ({
  card: {
    backgroundColor: `${
      theme.palette.type === 'dark'
        ? theme.palette.primary.dark
        : theme.palette.primary.light
    }`,
    padding: '0px 10px 0px 10px',
    height: '100%', 
    borderRadius: '20px',
    [theme.breakpoints.down(1500)]: {
      padding: '5px 5px 15px 5px', 
    },
    [theme.breakpoints.down(800)]: {
      padding: '0px 0px 0px 0px', 
    },
  },

  
}));

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
  
}

export function ExampleCardCentre({ label, data, simbolo}: DatastoresAreaCardProps){
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
      <CostPerIncident
            uptime={'Cost per incident'}
            subtitulo={'2887 MHz'}
            title={'dfdfdf'}
            percentageChange={33}
            label={label} 
            data={data} 
            simbolo={simbolo}
            
          />       
      </CardContent>   
    </Card>
  );
}
