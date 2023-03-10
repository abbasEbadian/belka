import { createTheme } from "@mui/material";

export const SETTINGS = {
    WEBSITE_NAME: "بلکاکریپتو",
    WEBSITE_NAME_ENG: "Belka Crypto",
    WEBSITE_NAME_ENG_NO_SPACE: "BelkaCrypto",
}

export const theme = createTheme({
    palette: {
        grey: {
            100: "#111111",
        },
        primary: {
            light: "#f5c791",
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

        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
});