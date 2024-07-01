import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BackstageTheme } from '@backstage/theme';


interface UptimeCardProps {
  title: string;
  state: string;
  icon: React.ElementType;
  color: string;
}

const useStyles = makeStyles<BackstageTheme>(theme => ({
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down(900)]: {
      height: '80%',
    },
    [theme.breakpoints.down(600)]: {
      padding: '0 18px',
      height: '80%',
    },
  },
  card: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.navigation.indicator
        : '#E5E2E2',
    borderRadius: 20,
    height: 87,
    width: 300,
    [theme.breakpoints.down(1540)]: {
      width: 250,
      height: '100%',
    },
    [theme.breakpoints.down(900)]: {
      width: 350,
      height: '100%',
    },
    [theme.breakpoints.down(600)]: {
      width: 270,
      height: '100%',
      borderRadius: 10,
    },
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.navigation.color,
    width: 50,
    height: 50,
    borderRadius: 15,
    marginTop: '-6px',
    [theme.breakpoints.down(900)]: {
      width: 50,
      height: 50,
    },
    [theme.breakpoints.down(600)]: {
      width: 50,
      height: 50,
      borderRadius: 10,
    },
  },
  titulo: {
    color: theme.palette.primary.main,
    fontSize: 12,
    padding: '0 2px',
    fontWeight: 700,
  },
  subtitulo: {
    fontSize: 32,
    marginTop: '-10px',
    padding: '4px 0px',
    fontWeight: 700,
    whiteSpace: 'nowrap',
  },
}));

export const IntrusionAttemps: React.FC<UptimeCardProps> = ({
  title,
  state,
  icon: Icon,
  color,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const computedColor =
    theme.palette.type === 'dark'
      ? "#fff"
      : "#000";

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <div>
          <Typography
            className={classes.titulo}
            style={{ color: computedColor }}
          >
            {title}
          </Typography>
          <Typography
            className={classes.subtitulo}
            style={{ color: theme.palette.type === 'dark' ? color : '#E3B422' }}
          >
            {state}
          </Typography>
        </div>
        <div className={classes.icon}>
          <Icon style={{ fontSize: isMobile ? 18 : 25 }} />
        </div>
      </CardContent>
    </Card>
  );
};
