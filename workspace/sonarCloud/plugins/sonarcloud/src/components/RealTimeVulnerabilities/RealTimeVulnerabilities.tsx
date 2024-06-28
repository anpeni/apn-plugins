import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GraficoRealTimeVulnerBar from './GraficoRealTimeVulnerBar';
import { userSonarDataAnalysis } from '../../hooks/userSonarDataAnalysis';
import { useSse } from '../../hooks/useSse';



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
    [theme.breakpoints.down(1500)]: {
      fontSize: '16px',
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
        : '#fff',
    borderRadius: '16px',
    width: '100%',
    height: '100%',
    padding: theme.spacing(3, 1, 0, 0),
  },
}));

export const RealTimeVulnerabilities: React.FC<UptimeCardProps> = ({
  title,
}) => {

  const classes = useStyles();
  const { data, fetchVulnerabilities } = userSonarDataAnalysis();
    // @ts-ignore
  const handleSseMessage = (message: any) => {

    fetchVulnerabilities();
  };

  useSse('https://app.dev.svsm.neoris.cloud/api/sonarcloud-server/events', handleSseMessage);

  useEffect(() => {
    fetchVulnerabilities();
  }, [fetchVulnerabilities]);

  const lastUvValue = data.length > 0 ? (data.length > 6 ? data[6].uv : data[data.length - 1].uv) : ' ';


  return (
    <div className={classes.cardContainer}>
      <div className={classes.title}>
        {title}
        <span className={classes.vulnerabilityNumber}>{lastUvValue}</span>
      </div>
      <div className={classes.chartContainer}>
        <GraficoRealTimeVulnerBar simbolo="%" data={data} />
      </div>
    </div>
  );
};
