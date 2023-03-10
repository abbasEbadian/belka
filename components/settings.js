import { createTheme } from "@mui/material";

export const SETTINGS = {
    WEBSITE_NAME: "بلکاکریپتو",
    WEBSITE_NAME_ENG: "Belka Crypto",
    WEBSITE_NAME_ENG_NO_SPACE: "BelkaCrypto",
}

export const theme = createTheme({
    palette: {
        mode:"dark",
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
            dark: "#a05700"
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
            primary: "#FFF",
            secondary: "#999"
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
});