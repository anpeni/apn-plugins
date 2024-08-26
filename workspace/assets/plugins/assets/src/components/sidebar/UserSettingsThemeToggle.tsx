import React from 'react';
import useObservable from 'react-use/lib/useObservable';
import { makeStyles } from '@material-ui/core';
import { appThemeApiRef, useApi } from '@backstage/core-plugin-api';
import ContrastIcon from '@mui/icons-material/Contrast';
import { useSidebarOpenState } from '@backstage/core-components';
import MySwitchTheme from './SwitchPropioTheme';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  contrastIcon: {
    fill: 'currentColor',
    width: '0.75em',
    height: '0.75em',
    display: 'inline-block',
    fontSize: '1.5rem',
    transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    flexShrink: 0,
    userSelect: 'none',
    color: `${
      theme.palette.type === 'dark'
        ? 'rgba(255, 255, 255, 0.60)'
        : 'rgba(6, 11, 40, 0.8)'
    }`,
  },
  tema: {
    marginLeft: '10px',
    fontWeight: 500,
    color: `${
      theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.60)' : '#000'
    }`,
    alignItems: 'center',
    fontSize: '16px',
  },
}));

/** @public */
export const UserSettingsThemeToggle = () => {
  const classes = useStyles();
  const appThemeApi = useApi(appThemeApiRef);
  const themeId = useObservable(
    appThemeApi.activeThemeId$(),
    appThemeApi.getActiveThemeId(),
  );

  const handleSetTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    appThemeApi.setActiveThemeId(
      event.target.checked ? 'neoris-dark' : 'neoris-light',
    );
  };
  const { isOpen } = useSidebarOpenState();

  return (
    <>
      {isOpen ? (
        <a
          style={{
            display: 'flex',
            flexFlow: 'row nowrap',
            marginLeft: '3px',
            justifyContent: 'center',
            alignItems: 'center',
            height: '48px',
            width: '224px',
          }}
        >
          <>
            <div>
              <ContrastIcon className={classes.contrastIcon} />
            </div>
            <span className={classes.tema}>Theme</span>
          </>
          <div style={{ marginLeft: '15px' }}>
            <MySwitchTheme
              checked={themeId === 'neoris-dark'}
              onChange={handleSetTheme}
              name="checkedTheme"
            ></MySwitchTheme>
          </div>
        </a>
      ) : (
        <div style={{ marginLeft: '10px', marginTop: '15px' }}>
          <MySwitchTheme
            checked={themeId === 'neoris-dark'}
            onChange={handleSetTheme}
            name="checkedTheme"
          ></MySwitchTheme>
        </div>
      )}
    </>
  );
};
