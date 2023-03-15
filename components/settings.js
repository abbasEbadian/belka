import { alpha, createTheme } from "@mui/material";

export const SETTINGS = {
  WEBSITE_NAME: "بلکاکریپتو",
  WEBSITE_NAME_ENG: "Belka Crypto",
  WEBSITE_NAME_ENG_NO_SPACE: "BelkaCrypto",
}

export const theme = createTheme({
  direction: 'rtl',
  palette: {
    mode: "dark",

    breakpoints: {
      values: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1400
      },
    },
    grey: {
      100: "#111111",
      200: "#1d1d1d"
    },
    primary: {
      light: "#feffc6",
      main: '#fd961a',
      dark: "#a05700",
      contrastText: "#fff"
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      contrastText: '#ffcc00',
    },
    custom: {
      light: '#ffa726',
      main: '#f57c00',
      dark: '#ef6c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    text: {
      primary: "#fff",
      secondary: "#999"
    },
    background: {
      default: "#171d2b",
      paper: "#101721"
    },
    neutral: {
      main: "#aaa",
    },
    simple:{
      main: "#fff",
      contrastText: "#FFF"
    },
    common:{
      white: "#FFF",
      black: "#000"
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,

  },
  components: {
    MuiButton: {
      variants: [
        {
          props: {variant: 'chip'},
          style: {
            padding: "2px 4px",
            minWidth: 'unset',
            height: 'unset !important',

            background: "#01bc8d22",
            color: "#01bc8d",
          }
        }
      ],
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.size === 'medium' && {
            padding: '8px 14px',
            "[class*=startIcon]": {
              margin: "0 0 0 4px"
            }
          }),

        }),
      },
    },
  },
});