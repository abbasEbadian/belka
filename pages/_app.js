import { ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import NightModeContext from "../components/Context";
import { theme } from "../components/settings";


import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});
const cssCache = createCache({ key: 'css', prepend: true });

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    const [night, setNight] = useState(false);

    const setStatus = (i) => {
        setNight(i);
    };

    useEffect(() => {
        !(function () {
            var i = "1EBClY",
                a = window,
                d = document;
            function g() {
                var g = d.createElement("script"),
                    s = "https://www.goftino.com/widget/" + i,
                    l = localStorage.getItem("goftino_" + i);
                (g.async = !0), (g.src = l ? s + "?o=" + l : s);
                d.getElementsByTagName("head")[0].appendChild(g);
            }
            "complete" === d.readyState
                ? g()
                : a.attachEvent
                    ? a.attachEvent("onload", g)
                    : a.addEventListener("load", g, !1);
        })();
    }, []);
    return (
        <CacheProvider value={cssCache}>
            <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                    <NightModeContext.Provider
                        value={{
                            night,
                            setStatus,
                        }}
                    >
                        <Component {...pageProps} />
                        <ToastContainer
                            rtl={true}
                            position="top-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            pauseOnFocusLoss={false}
                            draggable
                            pauseOnHover={false}
                        />
                    </NightModeContext.Provider>
                </ThemeProvider>
            </CacheProvider>
        </CacheProvider>
    );
}

export default MyApp;
