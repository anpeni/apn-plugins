import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { BackstageTheme } from '@backstage/theme';
import {
  CurrentVulnerabilitySummaryFetch,
} from '@anpeni/plugin-sonarcloud';
import { IntrusionAttemps } from './IntrusionAttemps';
import { RealTimeVulnerabilities } from '@anpeni/plugin-sonarcloud';
import { VulnerativityTop5 } from './VulnerativityTop5';
import SecurityIcon from '@mui/icons-material/Security';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';


const useStyles = makeStyles<BackstageTheme>(theme => ({
  card: {
    height: '100%',
    borderRadius: '20px',
    padding: '5px 5px 0px 5px',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    [theme.breakpoints.down(900)]: {
      flexDirection: 'column',
    },
  },
  cardStyle: {
    width: '300px',
    height: '155px',
    [theme.breakpoints.down(1280)]: {
      margin: '0px 0px 0px 70px',
    },
    [theme.breakpoints.down(1122)]: {
      margin: '0px',
    },
    [theme.breakpoints.down(945)]: {
      margin: '0px',
      width: '215px',
    },
    [theme.breakpoints.down(900)]: {
      width: '348px',
      height: '180px',
      margin: '0px 0px 40px 0px',
      paddingBottom: '25px',
    },
    [theme.breakpoints.down(600)]: {
      width: '215px',
      height: '135px',
      margin: '0px 15px 30px 40px',
      paddingBottom: '25px',
    },
  },
  vulneStyle: {
    fontSize: '24px',
    width: '400px',
    height: '100px',
    margin: '-7px 15px 125px 60px',
    padding: '6px 5px 0px 5px',
    [theme.breakpoints.down(1900)]: {
      paddingTop: '10px',
      margin: '10px 0px 0px 30px',
      width: '350px'
    },
    [theme.breakpoints.down(1500)]: {
      margin: '10px 0px 0px 0px',
      width: '330px'
    },
    [theme.breakpoints.down(1400)]: {
      margin: '10px 0px 0px 0px',
      width: '270px'
    },
    [theme.breakpoints.down(1300)]: {
      width: '270px',
    },
    [theme.breakpoints.down(1280)]: {
      margin: '10px 0px 0px 0px',
      width: '400px',
    },
    [theme.breakpoints.down(1081)]: {
      margin: '0px 18px 0px 5px',
      width: '270px'
    },
    [theme.breakpoints.down(900)]: {
      paddingTop: '30px',
      margin: '10px 0px 0px 30px',
      width: '350px'
    },
    [theme.breakpoints.down(600)]: {
      margin: '-50px 4px 0px -11px',
      width: '322px'
    },
  },
  intrusionAttempts: {
    paddingBottom: '20px',
    marginLeft: '20px',
    marginTop: '10px',
    [theme.breakpoints.down(1900)]: {
      paddingBottom: '35px',
      marginLeft: '95px',
    },
    [theme.breakpoints.down(1700)]: {
      paddingBottom: '35px',
      marginLeft: '25px',
    },
    [theme.breakpoints.down(1540)]: {
      marginLeft: '15px',
      marginRight: '0px',
      marginTop: '10px',
    },
    [theme.breakpoints.down(900)]: {
      paddingBottom: '35px',
      marginLeft: '35px',
      marginTop: '35px',
    },
    [theme.breakpoints.down(600)]: {
      paddingBottom: '20px',
      marginLeft: '-30px',
      marginTop: '20px',
    },
  },
  securityIncidents: {
    paddingBottom: '20px',
    marginTop: '30px',
    [theme.breakpoints.down(900)]: {
      paddingBottom: '35px',
      marginTop: '35px',
    },
    [theme.breakpoints.down(600)]: {
      paddingBottom: '20px',
      marginTop: '20px',
    },
  },
}));
 
interface DataPoint {
  name: string;
  uv: number;
}
 
interface DatastoresAreaCardProps {
  title: string;
  label: string;
  data: DataPoint[];
  simbolo: string;
}
 
export function ExampleCardHead({
}: DatastoresAreaCardProps) {
  const classes = useStyles();
 
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <CurrentVulnerabilitySummaryFetch title="Current Vulnerability Summary"/>         
        <div className={classes.cardStyle}>
          <div className={classes.intrusionAttempts}>
            <IntrusionAttemps
              title="Intrusion attempts"
              state="83"
              icon={TroubleshootIcon}
              color="#E3B422"
            />
            <div className={classes.securityIncidents}>
              <IntrusionAttemps
                title="Security incidents"
                state="42"
                icon={SecurityIcon}
                color="#4FD1C5"
              />
            </div>
          </div>
        </div>
        <div className={classes.vulneStyle}>
          <RealTimeVulnerabilities title="Real-Time Vulnerabilities" />
        </div>
        <div>
          <VulnerativityTop5 title="Vulnerability Top 5" vulnerabilities={[]} />
        </div>
      </CardContent>
    </Card>
  );
}