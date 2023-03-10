import { useEffect, useState } from "react";
import NightModeContext from "../components/Context";
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
        <NightModeContext.Provider
            value={{
                night,
                setStatus,
            }}
        >
            <Component {...pageProps} />
        </NightModeContext.Provider>
    );
}

export default MyApp;
