import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { BackstageTheme } from '@backstage/theme';
import { GraficoAverageDetectionTimeCopy } from './GraficoAverageDetectionTimeCopy';

 
const useStyles = makeStyles<BackstageTheme>((theme) => ({
  card: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
    borderRadius: '20px',
    height: '100%',
    width: '100%',
    [theme.breakpoints.down('lg')]: {
      maxWidth: '80%',
    },
    [theme.breakpoints.down(1500)]: {
      maxWidth: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
   
   
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '8px 4px',
    marginLeft: '3px',
  },
  title: {
    color: theme.palette.type === 'dark' ? 'white' : 'black',
    fontSize: '24px',
    fontWeight: 700,
    fontStyle: 'normal',
    marginBottom: '10px',
    textAlign: 'center',
    maxWidth: '100%',
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '16px',
    },
  },
  description: {
    color: theme.palette.type === 'dark' ? 'white' : 'black',
    fontSize: '12px',
    fontWeight: 400,
    fontStyle: 'normal',
    marginBottom: '20px',
    textAlign: 'center',
    maxWidth: '100%',
    [theme.breakpoints.down('sm')]: {
      fontSize: '10px',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '8px',
    },
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: '0 10px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'row',
      flexWrap: 'wrap',
   
    },
    [theme.breakpoints.between('md', 'lg')]: {
      '& > div': {
        width: '50%',
      },
    },
  },
  graficoContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: '20px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: '220px',
    },
    [theme.breakpoints.between('md', 'lg')]: {
      width: '50%',
      justifyContent: 'center',
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '63px',
      height: 'auto',
       width: '180px'
    },
  },
  graficoContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.between('md', 'lg')]: {
      transform: 'scale(1.2)',
      marginLeft: '100px',
    },
    [theme.breakpoints.between(1300, 1500)]: {
     marginLeft:'80px',
    },
    [theme.breakpoints.between(600, 900)]: {
      justifyContent: 'center',
      marginRight:'100px',
     },
     [theme.breakpoints.up(1900)]: {
      justifyContent: 'center',
      marginLeft: '40px',
     },
  },
}));
 
export function ExampleCardLeft() {
  const classes = useStyles();
 
  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <div>
          <div className={classes.title}>Average times</div>
          <div className={classes.description}>
            Average result of the non-zero values of all the indicated products
          </div>
        </div>
        <div className={classes.cardContent}>
          <div className={classes.graficoContainer}>
            <div className={classes.graficoContent}>
              <GraficoAverageDetectionTimeCopy
                value={1.5}
                min={0}
                max={10}
                title={'AVERAGE DETECTION TIME'}
              />
            </div>
          </div>
          <div className={classes.graficoContainer}>
            <div className={classes.graficoContent}>
              <GraficoAverageDetectionTimeCopy
                value={0.5}
                min={0}
                max={10}
                title={'AVERAGE BETWEEN FAILURES TIME'}
              />
            </div>
          </div>
          <div className={classes.graficoContainer}>
            <div className={classes.graficoContent}>
              <GraficoAverageDetectionTimeCopy
                value={3}
                min={0}
                max={10}
                title={'AVERAGE RESOLUTION TIME'}
              />
            </div>
          </div>
          <div className={classes.graficoContainer}>
            <div className={classes.graficoContent}>
              <GraficoAverageDetectionTimeCopy
                value={1.8}
                min={0}
                max={10}
                title={'AVERAGE CONTAINMENT TIME'}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}