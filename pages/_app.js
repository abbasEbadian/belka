import React from 'react'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import NightModeContext from "../components/Context";
import BottomNav from "../components/BottomNav";
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
import "bootstrap/dist/css/bootstrap.css";
import { AuthGuard } from "../components/AuthGaurd";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from 'axios';

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token)
        config.headers["Authorization"] = `Bearer ${token}`
    return config
})


function MyApp({ Component, pageProps }) {
    const [night, setNight] = useState(true);
    const [online, setOnline] = useState(true);

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

    useEffect(() => {
        window.addEventListener("offline", (e) => {
            setOnline(false)
        });

        window.addEventListener("online", (e) => {
            setOnline(true)
        });
    }, [])
    const [queryClient] = React.useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <CacheProvider value={cssCache}>
                <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <NightModeContext.Provider
                            value={{
                                night,
                                setStatus,
                            }}
                        >
                            { online?
                                    Component.protected ?
                                        <AuthGuard>
                                            <Component {...pageProps} />
                                        </AuthGuard>
                                        :
                                        <Component {...pageProps} />
                                    :
                                    <h1> OFFLINE !</h1>
                            }
                            
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

                            <BottomNav />
                        </NightModeContext.Provider>
                    </ThemeProvider>
                </CacheProvider>
            </CacheProvider>
            <ReactQueryDevtools initialIsOpen={false} />

        </QueryClientProvider>
    );
}

export default MyApp;

