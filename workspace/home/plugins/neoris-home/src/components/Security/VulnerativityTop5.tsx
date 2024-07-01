import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { BackstageTheme } from '@backstage/theme';



interface Vulnerability {
  id: string;
  name: string;
  severity: string;
}

interface UptimeCardProps {
  title: string;
  vulnerabilities: Vulnerability[];
}

const useStyles = makeStyles<BackstageTheme>(theme => ({
  titulo: {
    color: theme.palette.type === 'dark' ? theme.palette.primary.main : '#333',
    fontSize: '24px',
    fontWeight: 700,
    paddingLeft: '16px',
    paddingBottom: '10px',
    [theme.breakpoints.down(1900)]: {
      paddingLeft: '130px',
      paddingTop: '70px',
    },
    [theme.breakpoints.down(1700)]: {
      paddingLeft: '50px',
      paddingTop: '70px',
      fontSize: '18px',
    },
    [theme.breakpoints.down(1520)]: {
      paddingLeft: '20px',
      paddingTop: '70px',
    },
    [theme.breakpoints.down(1300)]: {
      fontSize: '16px',
      paddingLeft: '25px',
      paddingTop: '80px',
      marginBottom: '-5px',
    },
    [theme.breakpoints.down(1280)]: {
      fontSize: '24px',
      paddingLeft: '80px',
    },
    [theme.breakpoints.down(1133)]: {
      paddingLeft: '4px',
    },
    [theme.breakpoints.down(900)]: {
      fontSize: '24px',
      paddingTop: '225px',
      paddingLeft: '37px',
    },
    [theme.breakpoints.down(600)]: {
      fontSize: '17px',
      paddingLeft: '0px',
      paddingTop: '160px',
    },
  },
  vulnerabilityContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: '15px',
    [theme.breakpoints.down(1900)]: {
      paddingLeft: '130px',
    },
    [theme.breakpoints.down(1700)]: {
      paddingLeft: '50px',
    },
    [theme.breakpoints.down(1520)]: {
      paddingLeft: '20px',
    },
    [theme.breakpoints.down(900)]: {
      paddingLeft: '28px',
      display: 'inline-flex'
    },
    [theme.breakpoints.down(600)]: {
      paddingLeft: '0px',
    },
  },
  vulnerability: {
    marginBottom: '1px',
    [theme.breakpoints.down(1280)]: {
      paddingLeft: '74px',
    },
    [theme.breakpoints.down(1133)]: {
      paddingLeft: '4px',
    },
  },
  vulnerabilityDetails: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: '3px',
    padding: '3px',
    borderRadius: '10px',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.navigation.indicator
        : '#E5E2E2',
    [theme.breakpoints.down(1300)]: {
      marginTop: '9px',
    },
    [theme.breakpoints.down(1700)]: {
      marginTop: '8px',
    },
  },
  state: {
    color:
      theme.palette.type === 'dark'
        ? "#fff"
        : "#000",
    fontSize: '12px',
    marginLeft: '5px',
    marginRight: '5px',
  },
  stateClass: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#EE3131',
    borderRadius: '5px',
    marginLeft: '3px',
  },
  vulneraClass: {
    color:
      theme.palette.type === 'dark'
      ? "#fff"
      : "#000",
    fontSize: '12px',
    marginLeft: '16px',
    marginRight: '80px',
    padding: '3px',
    [theme.breakpoints.down(1900)]: {
      marginRight: '40px',
    },
    [theme.breakpoints.down(900)]: {
      marginRight: '110px',
    },
    [theme.breakpoints.down(600)]: {
      marginRight: '60px',
    },
  },
}));
 
const defaultVulnerabilities = [
  { id: '88312', name: 'Vulnerability 1', severity: 'CRITICAL' },
  { id: '88313', name: 'Vulnerability 2', severity: 'CRITICAL' },
  { id: '88314', name: 'Vulnerability 3', severity: 'CRITICAL' },
  { id: '88315', name: 'Vulnerability 4', severity: 'CRITICAL' },
  { id: '88316', name: 'Vulnerability 5', severity: 'CRITICAL' },
];
export const VulnerativityTop5: React.FC<UptimeCardProps> = ({ title }) => {
  const classes = useStyles();
  return (
    // Sin generar un nodo adicional al DOM
    <>
      <Typography className={classes.titulo}>{title}</Typography>
      <div className={classes.vulnerabilityContainer}>
        {defaultVulnerabilities.map((vulnerability, index) => (
          <div key={index} className={classes.vulnerability}>
            <div className={classes.vulnerabilityDetails}>
              <Typography className={classes.state}>
                ID: {vulnerability.id}
              </Typography>
              <Typography className={classes.vulneraClass}>
                {vulnerability.name}
              </Typography>
              <div className={classes.stateClass}>
                <Typography className={classes.state}>
                  {vulnerability.severity}
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
 