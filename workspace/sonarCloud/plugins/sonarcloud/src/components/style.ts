import { makeStyles } from '@material-ui/core/styles';
import { BackstageTheme } from '@backstage/theme';



export const useStyles = makeStyles<BackstageTheme>(theme => ({
  content: {
    display: 'flexrow',
    paddingLeft: '1px',
    [theme.breakpoints.down(1500)]: {
      paddingLeft: '0px',
      marginLeft: '-20px',
    },
    [theme.breakpoints.down(1280)]: {
      display: 'flexrow',
      paddingLeft: '1px',
    },
    [theme.breakpoints.down(1051)]: {
      paddingLeft: '0px',
      marginLeft: '-20px',
    },
    [theme.breakpoints.down(900)]: {
      paddingLeft: '20px',
    },
    [theme.breakpoints.down(600)]: {
      paddingLeft: '10px',
    },
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '10px',
    paddingLeft: '50px',
    [theme.breakpoints.down(1500)]: {
      paddingTop: '25px',
      paddingLeft: '30px',
    },
    [theme.breakpoints.down(900)]: {
      paddingTop: '10px',
      paddingLeft: '50px',
    },
    [theme.breakpoints.down(600)]: {
      paddingTop: '5px',
      paddingLeft: '20px',
    },
  },
  titulo: {
    color: `${
      theme.palette.type === 'dark' ? theme.palette.text.primary : '#333'
    }`,
    fontSize: '24px',
    padding: '0px 25px',
    fontWeight: 700,
    fontStyle: 'normal',
    [theme.breakpoints.down(1500)]: {
      fontSize: '16px',
      padding: '0px 0px 0px 25px',
    },
    [theme.breakpoints.down(1280)]: {
      fontSize: '24px',
      padding: '0px 25px',
      fontWeight: 700,
      fontStyle: 'normal',
    },
    [theme.breakpoints.down(1051)]: {
      fontSize: '16px',
      padding: '0px 0px 0px 25px',
    },
    [theme.breakpoints.down(900)]: {
      fontSize: '24px',
      padding: '0px 25px',
    },
    [theme.breakpoints.down(600)]: {
      fontSize: '12px',
      padding: '0px 2px',
    },
  },
  state: {
    color: `${
      theme.palette.type === 'dark' ? theme.palette.text.primary : '#333'
    }`,
    fontSize: '16px',
    padding: '0px 50px',
    fontWeight: 700,
    fontStyle: 'normal',
 
    [theme.breakpoints.down(900)]: {
      fontSize: '14px',
      padding: '0px 50px',
    },
    [theme.breakpoints.down(600)]: {
      fontSize: '20px',
      padding: '0px 2px',
    },
  },
  stateNumber: {
    fontSize: '32px',
    fontWeight: 700,
    lineHeight: 'normal',
    fontStyle: 'normal',
    [theme.breakpoints.down(900)]: {
      fontSize: '32px',
    },
    [theme.breakpoints.down(600)]: {
      fontSize: '33px',
      padding: '0px 2px',
    },
  },
}));