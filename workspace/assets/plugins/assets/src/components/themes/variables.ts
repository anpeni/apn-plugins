/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Built-in Backstage color palettes.
 *
 * @public
 */
export const vars = {
  fontFamily: 'Inter, sans-serif',
  light: {
    type: 'light' as const,
    mode: 'light' as const,
    primary: {
      main: '#FFFFFF',
      light: '#EFEFEF',
      dark: '#060B28B3',
    },
    secondary: {
      main: '#101112',
      light: '#FFAB00',
      dark: '#6554C0',
      ark: '#3333',
    },
    grey: {
      50: '#C1C7D0',
      100: '#7A869A',
      200: '#6B778C',
      300: '#5E6C84',
      400: '#505F79',
      500: '#42526E',
      600: '#344563',
      700: '#253858',
      800: '#060B28B3',
      900: '#091E42',
    },
    error: {
      main: '#FF5630',
      light: '#FF8F73',
      dark: '#DE350B',
    },
    warning: {
      main: '#FFAB00',
      light: '#FFE380',
      dark: '#FF8B00',
    },
    success: {
      main: '#36B37E',
      light: '#79F2C0',
      dark: '#006644',
    },
    info: {
      main: '#0065FF',
      light: '#4C9AFF',
      dark: '#0747A6',
    },

    shadow: {
      soft: '0 4px 20px 0 rgba(0, 0, 0, 0.7)',
      sidebar: '0 4px 13px 0 rgba(0, 0, 0, 0.75)',
    },
    fontColor: {
      white: '#FFF',
      black: '#000',
    },
    background: {
      default: '#FFF', // General
      paper: 'rgba(255,255,255,0)', // Tarjetas (invisible)
      generic: '#FFF',
      card: '#EFEFEF',
      accent: '#4FD1C5', // ? Turquesa de acento
      highlight: '#101112', // ? Color oscurillo (negro)
      white: '#FFF',
    },
    navigation: {
      color: '#4FD1C5',
      indicator: '#2684FF',
    },
    text: {
      primary: '#333',
      secondary: '#FFF',
    },
    table: {
      headerBackground: '#101112',
      evenRows: '#E5E2E2',
    },
  },
  dark: {
    type: 'dark' as const,
    mode: 'dark' as const,
    primary: {
      main: '#FFFFFF',
      light: '#4C9AFF',
      dark: '#222429',
    },
    secondary: {
      main: '#101112',
      light: '#FFAB00',
      dark: '#6554C0',
    },
    grey: {
      50: '#C1C7D0',
      100: '#7A869A',
      200: '#6B778C',
      300: '#5E6C84',
      400: '#505F79',
      500: '#42526E',
      600: '#344563',
      700: '#253858',
      800: '#060B28B3',
      900: '#091E42',
    },
    error: {
      main: '#FF5630',
      light: '#FF8F73',
      dark: '#DE350B',
    },
    warning: {
      main: '#FFAB00',
      light: '#FFE380',
      dark: '#FF8B00',
    },
    success: {
      main: '#36B37E',
      light: '#79F2C0',
      dark: '#006644',
    },
    info: {
      main: '#0065FF',
      light: '#4C9AFF',
      dark: '#0747A6',
    },

    shadow: {
      soft: '0px 0px 1px 0px rgba(255, 255, 255, 0.5)',
      sidebar: 'rgba(255, 255, 255, 0.6)',
    },
    fontColor: {
      white: '#FFF',
      black: '#000',
    },
    background: {
      default: '#18191D', // General
      paper: 'rgba(255,255,255,0)', // Tarjetas (invisible)
      generic: '#18191D',
      card: '#222429',
      accent: '#4FD1C5', // ? Turquesa de acento
      highlight: '#101112', // ? Color oscurillo (negro)
      white: '#FFF',
      cardTransparent: 'rgba(255,255,255,0)',
    },
    navigation: {
      color: '#4FD1C5',
      indicator: '#101112',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#FFF', // este es el name de table #FFF #101112
    },
    table: {
      headerBackground: '#101112',
      evenRows: '#17191C',
    },
  },
};
