import { Grid } from '@material-ui/core';
import React from 'react';
import { ExampleCardHead } from './ExampleCardHead';
import { ExampleCardLeft } from './ExampleCardLeft';
import { ExampleCardRight } from './ExampleCardRight';
import { ExampleCardCentre } from './ExampleCardCentre';
// eslint-disable-next-line @backstage/no-relative-monorepo-imports
import { useTheme, useMediaQuery } from '@material-ui/core';

const dataCpu = [
  { name: '22:00', uv: 1000 },
  { name: '00:00', uv: 2500 },
  { name: '02:00', uv: 600 },
  { name: '04:00', uv: 1300 },
  { name: '06:00', uv: 2000 },
  { name: '08:00', uv: 900 },
];

const dataCostStatistic = [
  { name: 'Jan', uv: 325, up: 450, ut: 250 },
  { name: 'Feb', uv: 650, up: 700, ut: 650 },
  { name: 'Mar', uv: 950, up: 650, ut: 950 },
  { name: 'Apr', uv: 1100, up: 325, ut: 750 },
  { name: 'May', uv: 600, up: 222, ut: 350 },
  { name: 'Jun', uv: 750, up: 450, ut: 150 },
  { name: 'Jul', uv: 450, up: 325, ut: 35 },
  { name: 'Aug', uv: 300, up: 100, ut: 10 },
  { name: 'Sep', uv: 700, up: 50, ut: 677 },
  { name: 'Oct', uv: 700, up: 450, ut: 450 },
  { name: 'Nov', uv: 500, up: 800, ut: 250 },
  { name: 'Dec', uv: 0, up: 625, ut: 90 },
];

/** @public */
export const HomeSecurity = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(800));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down(1900));
  const isVeryLargeScreen = useMediaQuery(theme.breakpoints.up(1900));

  return (
    <div
      style={{
        paddingTop: isMobile ? '5px' : '5px',
        margin: '0px 20px 0px 20px',
      }}
    >
      <Grid container direction="column" spacing={4}>
        <Grid item lg={12} xs={12} sm={12}>
          <Grid container direction="row" spacing={isMobile ? 4 : 4}>
            <Grid item lg={isLargeScreen ? 8 : 12} xs={12} sm={12}>
              <ExampleCardHead
                title="Cluster CPU"
                label="Usage Avg. MHz"
                data={dataCpu}
                simbolo=""
              />
            </Grid>
            {isLargeScreen && (
              <Grid item lg={4} xs={12} sm={12}>
                <ExampleCardRight />
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item lg={12} xs={12} sm={12}>
          <Grid container direction="row" spacing={isMobile ? 4 : 4}>
            <Grid item lg={2} xs={12} sm={12}>
              <ExampleCardLeft />
            </Grid>
            <Grid item lg={isVeryLargeScreen ? 7 : 10} xs={12} sm={12}>
              <ExampleCardCentre
                title="Cluster CPU"
                label="Usage Avg. MHz"
                data={dataCostStatistic}
                simbolo=""
              />
            </Grid>
            <Grid item lg={isVeryLargeScreen ? 3 : false} xs={12} sm={12}>
              {isVeryLargeScreen && <ExampleCardRight />}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
