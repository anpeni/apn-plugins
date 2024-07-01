// import React from 'react';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import { BackstageTheme } from '@backstage/theme';
// import { vars } from '../../../../../packages/app/src/themes/variables';
// import { useTheme, useMediaQuery } from '@material-ui/core';
// import AverageRatingGraph from './AverageRatingGraph';
// import GraficoRealTimeVulnerBar from './GraficoRealTimeVulnerBar';

// const data = [
//   { name: '1Q20', uv: 25, color: '#0BB98C' },
//   { name: '2Q20', uv: 50, color: '#0BB98C' },
//   { name: '3Q20', uv: 0, color: '#0BB98C' },
//   { name: '4Q20', uv: 10, color: '#0BB98C' },
//   { name: '1Q21', uv: 0, color: '#0BB98C' },
//   { name: '2Q21', uv: 40, color: '#0BB98C' },
//   { name: '3Q21', uv: 0, color: '#0BB98C' },
//   // ... otros datos
// ];

// interface UptimeCardProps {
//   uptime: string;
//   subtitulo: string;
//   percentageChange: number;
//   icon: React.ElementType;
// }

// const useStyles = makeStyles<BackstageTheme>(theme => ({
//   titulo: {
//     color: `${theme.palette.type === 'dark' ? '#FFF' : '#333'}`,
//     fontFamily: 'sans-serif',
//     fontSize: '24px',
//     fontWeight: 700,
//     fontStyle: 'normal',
//     [theme.breakpoints.down(1370)]: {
//       fontSize: '10px',
//       padding: '0px 2px',
//     },
//     [theme.breakpoints.down(900)]: {
//       fontSize: '24px',
//       padding: '0px 2px 0px 0px',
//     },
//     [theme.breakpoints.down(600)]: {
//       fontSize: '12px',
//       padding: '0px 2px',
//     },
//   },

//   vulnerativeNumber: {
//     color: '#0BB98C',
//     fontFamily: 'sans-serif',
//     fontSize: '32px',
//     padding: '0px 25px',
//     fontWeight: 700,
//     lineHeight: 'normal',
//     fontStyle: 'normal',
//     [theme.breakpoints.down(1370)]: {
//       fontSize: '20px',
//       padding: '0px 5px 0px 15px',
//     },
//     [theme.breakpoints.down(900)]: {
//       fontSize: '32px',
//       padding: '0px 15px 0px 30px',
//     },
//     [theme.breakpoints.down(600)]: {
//       fontSize: '12px',
//       padding: '2px 5px 0px 5px',
//     },
//   },
// }));

// export const RealTimeVulnerabilities: React.FC<UptimeCardProps> = ({
//   uptime,
//   subtitulo,
//   percentageChange,
//   icon: Icon,
// }) => {
//   const classes = useStyles();
//   const theme = useTheme();
//   const isLaptop = useMediaQuery(theme.breakpoints.down(1370));
//   const isIpad = useMediaQuery(theme.breakpoints.down(900));
//   const isMobile = useMediaQuery(theme.breakpoints.down(600));

//   return (
//     <div
//       style={{
//         display: 'flexrow',
//         paddingLeft: isMobile
//           ? '20px'
//           : isIpad
//           ? '2px'
//           : isLaptop
//           ? '10px'
//           : '10px',
//       }}
//     >
//       <div
//         style={{
//           display: 'flex',
//           paddingLeft: isMobile
//             ? '17px'
//             : isIpad
//             ? '0px'
//             : isLaptop
//             ? '10px'
//             : '17px',
//           paddingBottom: isMobile
//             ? '10px'
//             : isIpad
//             ? '10px'
//             : isLaptop
//             ? '10px'
//             : '10px',
//         }}
//       >
//         <Typography className={classes.titulo}>{uptime}</Typography>
//         <Typography className={classes.vulnerativeNumber}>12</Typography>
//       </div>
//       <div
//         style={{
//           paddingTop: isMobile
//             ? '8px'
//             : isIpad
//             ? '10px'
//             : isLaptop
//             ? '10px'
//             : '10px',
//           paddingBottom: isMobile
//             ? '0px'
//             : isIpad
//             ? '0px'
//             : isLaptop
//             ? '0px'
//             : '0px',
//           marginRight: isMobile
//             ? '-7px'
//             : isIpad
//             ? '30px'
//             : isLaptop
//             ? '-50px'
//             : '0px',
//           background: '#101112',
//           borderRadius: isMobile
//             ? '10px'
//             : isIpad
//             ? '20px'
//             : isLaptop
//             ? '10px'
//             : '20px',
//           marginLeft: isMobile
//             ? '1px'
//             : isIpad
//             ? '4px'
//             : isLaptop
//             ? '-10px'
//             : '-10px',
//         }}
//       >
//         <div
//           style={{
//             marginLeft: '-45px',
//             paddingBottom: isMobile
//               ? '7px'
//               : isIpad
//               ? '15px'
//               : isLaptop
//               ? '15px'
//               : '15px',
//             marginRight: isMobile
//               ? '-32px'
//               : isIpad
//               ? '-15px'
//               : isLaptop
//               ? '-20px'
//               : '-15px',
//           }}
//         >
//           <GraficoRealTimeVulnerBar
//             simbolo="%"
//             data={data}
//           ></GraficoRealTimeVulnerBar>
//         </div>
//       </div>
//     </div>
//   );
// };
