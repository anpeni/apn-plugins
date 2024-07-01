import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { BackstageTheme } from '@backstage/theme';


interface NotificationProps {
  title: string;
  type: 'LOW' | 'MEDIUM' | 'CRITICAL';
  text: string;
  daysAgo: number;
}

const useStyles = makeStyles<BackstageTheme>(theme => ({
  titulo: {
    color: theme.palette.type === 'dark' ? theme.palette.primary.main : '#333',
    fontSize: '24px',
    fontWeight: 700,
    fontStyle: 'normal',
    [theme.breakpoints.down('md')]: {
      fontSize: '20px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '16px',
    },
  },
  notificationContainer: {
    display: 'flex',
    flexDirection: 'row',
    background: theme.palette.type === 'dark' ? theme.palette.navigation.indicator : '#E5E2E2',
    width: '100%',
    minHeight: '90px',
    borderRadius: '15px',
    marginTop: '20px',
    [theme.breakpoints.down('md')]: {
      padding: '8px',
      minHeight: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '10px',
      minHeight: 'auto',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '12px',
      minHeight: 'auto',
      flexDirection: 'column',
    },
  },
  notificationContent: {
    color: theme.palette.type === 'dark' ? theme.palette.primary.main : '#333',
    fontSize: '11px',
    fontWeight: 400,
    fontStyle: 'normal',
    padding: '14px 14px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      fontSize: '10px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '9px',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '8px',
    },
  },
  notificationType: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '4px',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '4px',
    },
  },
  notificationText: {
    marginTop: '6px',
    fontSize: '13px',
    maxWidth: '284px',
    [theme.breakpoints.down('xs')]: {
      marginTop: '4px',
    },
  },
  notificationTypeContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '4px',
  },
  notificationTypeBadge: {
    fontWeight: 700,
    fontStyle: 'normal',
    padding: '1px 5px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    marginRight: '10px',
  },
  notificationDate: {
    fontSize: '9px',
  },
  titleMis: {
    fontSize: '13px',
    fontWeight: 700,
    fontStyle: 'normal',
    marginRight: '10px',
  },
  seeMoreContainer: {
    background: theme.palette.navigation.color,
    borderRadius: '15px',
    padding: '2px 8px 2px 8px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '-17px',
    marginLeft: 'auto',
  },
  seeMoreText: {
    color: `${theme.palette.type === 'dark' ? theme.palette.primary.main : '#333'}`,
    fontSize: '9px',
    fontWeight: 700,
    fontStyle: 'normal',
    marginRight: '2px',
    whiteSpace: 'nowrap',
  },
  viewAllContainer: {
    textAlign: 'center',
    marginTop: '20px',
    [theme.breakpoints.down('xs')]: {
      marginTop: '10px',
    },
  },
  viewAllContent: {
    background: theme.palette.type === 'dark' ? theme.palette.navigation.indicator : '#fff',
    borderRadius: '15px',
    padding: '4px 8px',
    display: 'inline-flex',
    alignItems: 'center',
  },
  viewAllText: {
    color: theme.palette.type === 'dark' ? theme.palette.primary.main : '#333',
    fontSize: '11px',
    fontWeight: 400,
    fontStyle: 'normal',
    marginRight: '2px',
    whiteSpace: 'nowrap',
  },
  viewAllBadge: {
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.type === 'dark' ? theme.palette.primary.main : '#333',
    width: '20px',
    height: '20px',
    marginRight: '4px',
  },
  viewAllBadgeText: {
    fontSize: '10px',
    fontWeight: 700,
    color: '#fff',
  },
}));

const Notification: React.FC<NotificationProps> = ({ title, type, text, daysAgo }) => {
  const classes = useStyles();
  const notificationColors = {
    LOW: '#1DE76E',
    MEDIUM: '#FFC821',
    CRITICAL: '#EE3131',
  };

  return (
    <div className={classes.notificationContainer}>
      <div className={classes.notificationContent}>
        <div className={classes.notificationTypeContainer}>
          <Typography className={classes.titleMis}>
            {title}
          </Typography>
          <div
            className={classes.notificationTypeBadge}
            style={{
              background: notificationColors[type],
              fontSize: '9px',
            }}
          >
            {type}
          </div>
          <Typography className={classes.notificationDate}>
            {daysAgo} days ago
          </Typography>
        </div>
        <Typography className={classes.notificationText}>{text}</Typography>
        <div className={classes.seeMoreContainer}>
          <div className={classes.seeMoreText}>
            See more
          </div>
        </div>
      </div>
    </div>
  );
};

interface SecurityInboxProps {
  title: string;
}

export const SecurityInbox: React.FC<SecurityInboxProps> = ({ title }) => {
  const classes = useStyles();
  

  return (
    <div>
      <Typography className={classes.titulo}>{title}</Typography>
      <Notification
        title="Misconfiguration"
        type="LOW"
        text="Publicly accessible EC3 instances should not have highly-privileged IAM roles"
        daysAgo={27}
      />
      <Notification
        title="Misconfiguration"
        type="CRITICAL"
        text="Publicly accessible EC3 instances should not have highly-privileged IAM roles"
        daysAgo={27}
      />
      <Notification
        title="Misconfiguration"
        type="MEDIUM"
        text="Publicly accessible EC3 instances should not have highly-privileged IAM roles"
        daysAgo={27}
      />
      <Notification
        title="Misconfiguration"
        type="LOW"
        text="Publicly accessible EC3 instances should not have highly-privileged IAM roles"
        daysAgo={27}
      />
      <div className={classes.viewAllContainer}>
        <div className={classes.viewAllContent}>
          <Typography className={classes.viewAllText}>
            View All Important issues
          </Typography>
          <div className={classes.viewAllBadge}>
            <Typography className={classes.viewAllBadgeText}>
              14
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
