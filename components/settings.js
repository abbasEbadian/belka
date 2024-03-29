import { alpha, createTheme } from "@mui/material";

export const SETTINGS = Object.freeze({
  WEBSITE_NAME: "بلکاکریپتو",
  WEBSITE_NAME_ENG: "Belka Crypto",
  WEBSITE_NAME_ENG_NO_SPACE: "BelkaCrypto",

})
export const BASEURL = "https://api.belkacrypto.com/api/v2/"

export const theme = createTheme({
  direction: 'rtl',
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
  palette: {
    mode: "dark",


    grey: {
      100: "#111111",
      200: "#1d1d1d",
      300: "#1f2533",
      400: "#757b89",
      900: "#eee",
    },
    primary: {
      light: "#e5f7f2",
      main: '#01bc8d',
      dark: "#0c9371",
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
      secondary: "#848c9c"
    },
    background: {
      default: "#101721",
      paper: "#171d29"
    },
    neutral: {
      main: "#aaa",
      dark: "#888"
    },
    simple: {
      main: "#fff",
      contrastText: "#FFF"
    },
    common: {
      white: "#FFF",
      black: "#000"
    },
    success: {
      light: alpha("#00bd8d", 0.2),
      main: "#00bd8d",
      dark: "#00bd8d66",
      contrastText: "#FFF"
    },
    dark: {
      light: "#303748",
      main: "#1f2533",
      dark: "#1f2533aa"
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,


  },
  shape: {
    borderRadius: 10
  },
  components: {
    MuiFilledInput: {
      styleOverrides:{
        root: {
          borderRadius: "4px 4px 0 0 ",
          ["input"]: {
            paddingBlock: "10px"
          }
        }
      }
    },
    MuiInputBase:{
      styleOverrides: {
        root: {
          borderRadius: 4
        }
      }
    },
    MuiTextField:{
      defaultProps: {
        size: "small"
      }
    },
    MuiDivider: {
      variants: [
        {
          props: { transparent: true },
          style: {
            border: 0
          }
        }
      ]
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: "0.75rem 1.25rem"
        }
      }
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'chip' },
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
          borderRadius: 4,
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