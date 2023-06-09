import React from 'react'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import NightModeContext from "@/c/Context";
import BottomNav from "@/c/BottomNav";
import { BASEURL, theme } from "@/c/settings";


import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';


import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "nprogress/nprogress.css"
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from 'axios';
import Head from 'next/head';
import Loading from '@/c/Loading';
import Login from './login';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress'
import { useFetchUser } from '@/c/hooks';

// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});
const cssCache = createCache({ key: 'css', prepend: true });

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token)
        config.headers["Authorization"] = `Bearer ${token}`
    return config
})
axios.interceptors.response.use((config) => {

    return config
},
    (error) => {
        if ((error?.response?.status === 401 || error?.response?.status === 400) && localStorage.getItem('token')) {
            localStorage.removeItem('token');
            // window.location.reload()
        }

        return Promise.reject(error)
    }
)


Router.onRouteChangeStart = () => {
    NProgress.start();
};

Router.onRouteChangeComplete = () => {
    NProgress.done();
};

Router.onRouteChangeError = () => {
    NProgress.done();
};

const getToken = async () => {
    if (typeof window === 'undefined') return Promise.resolve(undefined)
    if (!localStorage.getItem("token")) return Promise.resolve(undefined)
    return Promise.resolve((await axios.get(`${BASEURL}account/details/`)).status !== 401)
}

function MyApp({ Component, pageProps }) {
    const [night, setNight] = useState(true);

    const router = useRouter()
    const [checkingAuth, setCheckingAuth] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)

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

    const [queryClient] = React.useState(() => new QueryClient());

    useEffect(() => {
        const check = async() => {
            const authenticated = await getToken()
            if (!authenticated && Component.protected) Router.push('/login')
            setAuthenticated(authenticated)
            setTimeout( () => {
                setCheckingAuth(false)
            }, [2000])
        }
        check()
    }, [])
        console.log(router.pathname);
    return (
        <QueryClientProvider client={queryClient}>
            <CacheProvider value={cssCache}>
                <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                        {router.pathname !== '/' && <CssBaseline />}
                        <NightModeContext.Provider
                            value={{
                                night,
                                setStatus,
                            }}
                        >
                            <Component {...pageProps} />
                            {/* {
                                Component.title &&
                                <Head>
                                    <title> {Component.title} </title>
                                </Head>
                            }
                            {
                                checkingAuth ?
                                    <Loading /> :
                                    <Component {...pageProps} />
                            } */}




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
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}

        </QueryClientProvider>
    );
}

export default MyApp;


