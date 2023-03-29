import Head from "next/head";
import { styled } from '@mui/material/styles';
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import Router from "next/router";
import LandingHeaders from "../components/LandingHeaders";
import LandingFooter from "../components/LandingFooter";
import HomeCalculator from "../components/HomeCalculator";
import { SETTINGS } from "../components/settings";
import { Box } from "@mui/material";
import { useFetchCoins } from "../components/hooks/fetchCoins";

const Main = styled(Box)`
    background-color: #111;
    width: 100%;
    min-height: 100vh;
    .fill-fff {
        fill: #bbbbbb;
        margin: 0 5px;
        cursor: pointer;
    }
    .arrows {
        fill: #fff;
        margin-right: 5px;
        cursor: pointer;
    }
    .changes {
        direction: ltr;
        text-align: center;
        width: 60px;
        margin-right: 22px;
        padding: 2px;
        border-radius: 12px;
        color: #fff;
        font-size: 13px;
    }
    .plus {
        background-color: #04c53e;
    }
    .zero {
        background-color: #7ae2fc;
    }
    .nega {
        background-color: #f14640;
    }
`;

const Slider = styled(Box)`
    height: 100%;
    position: relative;
    padding-block: 100px;
    .op-0 {
        opacity: 0;
        height: 0 !important;
        overflow: hidden;
        transition: 2s;
        h3,
        button {
            opacity: 0;
        }
    }
    h3 {
        font-size: 64px;
        font-weight: 600;
        color: #fff;
        text-transform: uppercase;
        text-align: center;
        line-height: 100px;
        position: relative;
        top: -20px;
        span {
            font-weight: 800;
            color: #fd961a;
            z-index: 11;
        }
        transition: 2s;
    }
    .span {
        text-align: center;
        font-size: 14px;
        position: relative;
        top: -20px;
    }
    button {
        border: 1px solid #fd961a !important;
        color: #fd961a;
        position: relative;
        top: -20px;
        font-size: 18px;
        margin-top: 30px;
        background: transparent;
        padding: 11px 26px;
        font-weight: 600;
        transition: 0.3s;
        svg {
            fill: #fd961a;
            margin-left: 10px;
        }
        :hover {
            background: rgba(253, 150, 26, 0.9) !important;
            outline: none !important;
            color: #fff;
            svg {
                fill: #fff;
            }
        }
        transition: 2s;
    }
    .active {
        transition: 2s;
        display: flex !important;
        opacity: 1;
    }
    .item-1 {
        transition: 2s;
        background-image: linear-gradient(
                rgba(0, 0, 0, 0.5),
                rgba(0, 0, 0, 0.5)
            ),
            url("/images/bg1.jpg");
        min-height: 570px;
        color: #fff;
        background-position: 50% 50%;
        -webkit-background-size: cover;
        background-size: cover;
        -webkit-backface-visibility: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .item-2 {
        transition: 2s;
        background-image: linear-gradient(
                rgba(0, 0, 0, 0.5),
                rgba(0, 0, 0, 0.5)
            ),
            url("/images/bg2.jpg");
        min-height: 570px;
        color: #fff;
        background-position: 50% 50%;
        -webkit-background-size: cover;
        background-size: cover;
        -webkit-backface-visibility: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .arrow {
        position: absolute;
        transition: 0.5s;
        cursor: pointer;
        svg {
            fill: rgb(253, 150, 26);
        }
        transform: rotate(180deg);
    }
    .right-arrow {
        right: 0;
        top: 45%;
        opacity: 0;
        
    }
    .left-arrow {
        left: 0;
        top: 45%;
        opacity: 0;
    }
    :hover {
        .right-arrow {
            opacity: 1;
            right: 30px;
        }
        .left-arrow {
            opacity: 1;
            left: 30px;
        }
    }
    @media (max-width: 1100px) {
        h3 {
            font-size: 40px !important;
            line-height: 60px;
            margin-top: -30px;
        }
        .item-1,
        .item-2 {
            min-height: 400px !important;
            height: 400px;
        }
        button {
        }
    }
    @media (max-width: 768px) {
        h3 {
            font-size: 30px !important;
            line-height: 50px;
        }
        button {
            font-size: 14px;
            padding: 9px 26px;
        }
        .item-1,
        .item-2 {
            justify-content: flex-start;
            padding-top: 56px;
            min-height: 400px !important;
            height: 400px;
        }
    }
`;

const MainTable = styled(Box)`
    position: relative;
    top: -50px;
    z-index: 10;
    width: calc(100vw - 100px);
    background-color: rgb(29, 29, 29);
    min-height: 200px;
    margin-right: auto;
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border-radius: 10px;
    span {
        margin-right: 8px;
    }
    .select-shop {
        position: absolute;
        top: -42px;
        height: 40px;
        width: 200px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        button {
            transition: all 0.3s;
            width: 100px;
            height: 100%;
            color: #fff;
            border-radius: 5px 0px 0 0;
            background-color: #feffc6;
            color: #000;

            :last-child {
                border-radius: 0px 5px 0 0;
                border-left: 1px solid #020202 !important;
            }
        }
        .active {
            background-color: #fd961a;
            color: #fff;
        }
    }
    .search {
        position: absolute;
        top: -42px;
        height: 40px;
        width: 250px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: transparent;
        right: 20px;
        input {
            width: 100%;
            border-radius: 8px 8px 0 0 !important;
            height: 40px;
            padding-inline: 16px 40px;
        }
        svg {
            position: absolute;
            cursor: pointer;
            right: 8px;
            color: #ddd;
            fill: #aaa;
            transform: scale(0.8);
        }
    }
    .scrollable {
        max-height: 500px;
        overflow: auto;
        width: 100%;
    }
    table {
        width: 100%;
        color: #fff;
        .btn-yellow {
            background-color: #fd961a;
            color: #fff;
            padding: 3px 16px;
        }
        thead,
        tbody {
            tr {
                th {
                    padding: 20px;
                }
                td {
                    padding: 10px 20px;
                }
            }
        }
        thead {
            border-bottom: 1px solid #cccc;
        }
        tbody {
            tr {
                border-bottom: 1px solid #cccc;
            }
        }
    }

    @media (max-width: 1100px) {
        width: 100%;
        border-radius: 0;
        table {
            font-size: 13px;
            white-space: nowrap;
        }
    }
    @media (max-width: 768px) {
        .select-shop {
            width: calc(100% - 20px);
            left: 10px;
            button {
                transition: all 0.3s;
                width: 50%;
            }
        }
        .search {
            width: calc(100% - 20px);
            top: -92px;
            right: 10px;
            input {
                border-radius: 5px !important;
            }
        }
        table {
            font-size: 13px;
            white-space: nowrap;
            thead,
            tbody {
                tr {
                    th {
                        padding: 20px 10px;
                    }
                    td {
                        padding: 10px 10px;
                    }
                }
            }
        }
        button {
            font-size: 13px;
        }
    }
`;

const Features = styled(Box)`
    z-index: 10;
    width: 100%;
    background-color: rgb(29, 29, 29);
    min-height: 200px;
    margin-right: auto;
    margin-left: auto;
    display: flex;
    align-items: center;
    margin-bottom: 50px;
    margin-top: 0;
    justify-content: space-around;
    p,
    h4 {
        max-width: 216px;
        color: #fff;
    }
    h4 {
        font-size: 18px;
        font-weight: 600;
    }
    p {
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
    }
    svg {
        fill: #fd961a;
        margin-right: 20px;
    }
    @media (max-width: 1100px) {
        flex-wrap: wrap;
        .d-flex {
            margin: 50px 200px;
        }
    }
    @media (max-width: 768px) {
        .d-flex {
            margin: 50px 100px;
        }
    }
    @media (max-width: 550px) {
        .d-flex {
            margin: 30px 20px;
            flex-direction: column;
            align-items: center;
            p,
            h4 {
                text-align: center;
            }
            svg {
                order: -1;
                margin-right: 0;
                margin-bottom: 20px;
            }
        }
    }
`;

const AboutUs = styled(Box)`
    h3 {
        font-size: 45px;
        font-weight: 800;
        color: #fff;
        margin-bottom: 30px;
        span {
            color: #fd961a;
        }
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    h6 {
        color: #999;
        line-height: 28px;
        font-weight: 400;
        position: relative;
        display: inline-block;
        text-transform: uppercase;
        margin-bottom: 25px;
        font-size: 14px;
        ::before {
            position: absolute;
            content: "";
            height: 2px;
            right: -50px;
            top: 13px;
            width: 30px;
            background: #fd961a;
            text-transform: uppercase;
            font-size: 14px;
        }
        ::after {
            position: absolute;
            content: "";
            height: 2px;
            left: -50px;
            top: 13px;
            width: 30px;
            background: #fd961a;
            text-transform: uppercase;
            font-size: 14px;
        }
    }
    @media (max-width: 992px) {
        h6 {
            padding: 0 10px;
            ::after,
            ::before {
                content: none;
            }
        }
    }
`;

const WeAre = styled(Box)`
    display: flex;
    align-items: center;
    width: calc(100vw - 100px);
    margin-top: 50px;
    .pxx {
        padding: 0 100px;
    }
    h5 {
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
        color: #fff;
    }
    p {
        line-height: 28px;
        color: #999;
        line-height: 28px;
        font-weight: 400;
    }
    ul {
        list-style: none;
        display: flex;
        align-items: center;
        margin-top: 40px;
        li {
            cursor: pointer;
            font-weight: 600;
            font-size: 16px;
            color: rgb(153, 153, 153);
            padding: 0 20px;
            border-right: 1px solid #999;
            :last-child {
                border-right: none;
                padding-right: 0;
            }
        }
        .active {
            color: #fd961a;
        }
    }
    .about-p {
        margin-top: 22px;
    }
    button {
        background: #fd961a;
        display: block;
        color: #fff;
        padding: 5px 12px;
        border-radius: 8px;
        font-weight: 500;
        margin-top: 30px;
        :hover {
            opacity: 0.9;
        }
    }
    @media (max-width: 1100px) {
        width: calc(100vw - 50px);
        ul {
            white-space: nowrap;
        }
        img {
            width: 300px !important;
        }
    }
    @media (max-width: 992px) {
        flex-direction: column;
        img {
            order: -1;
            margin-bottom: 40px;
        }
        .pxx {
            padding: 0 0px;
        }
    }
    @media (max-width: 550px) {
        img {
            width: 200px !important;
        }
        .pxx {
            padding: 0 0px;
        }
        UL {
            padding-left: 0 !important;
        }
        ul li {
            font-size: 14px;
            padding: 0 14px;
        }
    }
`;

const Items = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
    div {
        margin-top: 40px;
        width: 33.3%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    img {
    }
    h4 {
        font-size: 18px;
        margin-top: 10px;
        font-weight: 600;
        color: #fff;
        line-height: 32px;
    }
    p {
        color: #999;
        line-height: 28px;
        font-weight: 400;
        font-size: 16px;
    }
    @media (max-width: 768px) {
        div {
            width: 50%;
        }
    }
    @media (max-width: 550px) {
        div {
            width: 100%;
        }
    }
`;

const Calc = styled(Box)`
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
        url("/images/calc.jpg");
    height: 218px;
    position: relative;
    background-attachment: fixed;
    background-size: cover;
    margin: 70px 0;
    padding: 60px 0;

    .container {
        background: #1d1d1d;
        width: 1140px;
        height: 358px;
        margin-top: -130px;
        margin-right: auto;
        margin-left: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h2 {
            color: #fff;
            margin: 0;
            margin-bottom: 60px;
            font-weight: 800;
            span {
                color: #fd961a;
            }
        }
        .ccs {
            margin: 0 40px;
            color: #fff;
        }
        .inp-box {
            display: flex;
            flex-direction: row-reverse;
        }
        .divv {
            width: 50px;
            background-color: #fd961a;
            height: 45px;
        }
        input {
            border: 1px solid #2d2d2d;
            font-size: 19px;
            line-height: 1;
            text-align: center;
            font-weight: 600;
            color: #fff;
            width: 230px;
            outline: none;
            display: inline-block;
            padding: 0;
            margin: 0;
            background: #181818;
            min-width: 95px;
            border-right: 0;
            height: 45px;
        }
    }
    @media (max-width: 768px) {
        .container .d-flex {
            display: flex;
            flex-direction: column-reverse;
            span {
                margin: 16px 0;
            }
        }
    }
    @media (max-width: 576px) {
        .container {
            width: 100%;
        }
    }
`;

const Blog = styled(Box)`
    h3 {
        font-size: 45px;
        font-weight: 800;
        color: #fff;
        margin-bottom: 30px;
        span {
            color: #fd961a;
        }
    }
    margin-top: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
    h6 {
        color: #999;
        line-height: 28px;
        font-weight: 400;
        position: relative;
        display: inline-block;
        text-transform: uppercase;
        margin-bottom: 25px;
        font-size: 14px;
        ::before {
            position: absolute;
            content: "";
            height: 2px;
            right: -50px;
            top: 13px;
            width: 30px;
            background: #fd961a;
            text-transform: uppercase;
            font-size: 14px;
        }
        ::after {
            position: absolute;
            content: "";
            height: 2px;
            left: -50px;
            top: 13px;
            width: 30px;
            background: #fd961a;
            text-transform: uppercase;
            font-size: 14px;
        }
    }
	.posts img {
		width:100%
	}
	.posts a {
		
         color: #f9bd31 !important;
    }
	
    @media (max-width: 992px) {
        h6 {
            padding: 0 10px;
            ::after,
            ::before {
                content: none;
            }
        }
    }
    .posts {
        display: flex;
    }
    @media (max-width: 992px) {
        .posts {
            align-items: center;
            flex-wrap: wrap;
            flex-direction: column;
        }
    }
`;

const Post = styled(Box)`
    margin: 0 10px;
    h5 {
        color: #fff;
        font-size: 18px;
        line-height: 28px;
        font-weight: 600;
        margin-top: 16px;
    }
    p {
        color: #999;
        line-height: 28px;
        font-weight: 400;
        font-size: 16px;
    }
    @media (max-width: 1180px) {
        width: 90%;
        margin-right: auto;
        margin-left: auto;
        img {
            width: 100%;
        }
        h5 {
            font-size: 16px;
        }
        p {
            line-height: 22px;
            font-size: 14px;
        }
    }
    button {
        background: #fd961a;
        display: block;
        color: #fff;
        padding: 7px 14px;
        border-radius: 8px;
        font-weight: 400;
        font-size: 14px;
        margin-top: 10px;
        margin-bottom: 40px;
        :hover {
            opacity: 0.9;
        }
    }
`;


export default function Home() {
    const [showMenu, setShowMenu] = useState(true);
    const [showSlider, setShowSlider] = useState(false);
    const [aboutActive, setAboutActive] = useState(1);
    const [activeBtn, setActiveBtn] = useState(1);
    const [searchActive, setSearchActive] = useState(false);
    const [searchWord, setSearchWord] = useState("");

    const { isLoading: isCoinLoading, data: coins} = useFetchCoins()
    // const { isBlogLoading, data:blogData} = useQuery("get-blogs", () => {
    //     return axios.get(`https://blog.metavers-ex.com/wp-json/wp/v2/posts`)
    // })

    let row = -1;
   



    const [ress, setRess] = useState([]);
    const searchHandler = (e) => {
        setSearchWord(e.target.value);
        setSearchActive(true);
        setRess(
            coins?.filter(
                (item) =>
                    item.name.includes(e.target.value) ||
                    item.small_name.includes(e.target.value) ||
                    item.small_name_slug.includes(e.target.value.toUpperCase())
            )
        );
    };
    const [sortMethod, setSortMethod] = useState(false);
    const sortHandler = (e) => {
        setSortMethod(!sortMethod);
        sortMethod
            ? coins?.sort(
                (a, b) => a.quote_usd.percent24h - b.quote_usd.percent24h
            )
            : coins?.sort(
                (a, b) => b.quote_usd.percent24h - a.quote_usd.percent24h
            );
        ress.length !== 0 && sortMethod
            ? ress.sort(
                (a, b) => a.quote_usd.percent24h - b.quote_usd.percent24h
            )
            : ress.sort(
                (a, b) => b.quote_usd.percent24h - a.quote_usd.percent24h
            );
    };

    return (
        <Main>
            <Head>
                <title>صرافی  {SETTINGS.WEBSITE_NAME} </title>
                <link rel="shortcut icon" href="/images/favicon.ico" />

                <link rel="manifest" href="manifest.json" />


            </Head>
            <LandingHeaders
                page="index"
                show={showMenu}
                setshow={setShowMenu}
            />
            <Slider>
                <div className={showSlider ? "item-1 active" : "op-0"}>
                    <h3>
                        {SETTINGS.WEBSITE_NAME} ، راهی <span>جدید</span> و <span>امن</span>
                        <br />
                        به دنیای ارز دیجیتال
                    </h3>
                    <button
                        onClick={() => {
                            Router.push("/register");
                        }}
                        className="btn btn-primary"
                    >
                        شروع کنید
                    </button>
                </div>
                <div className={!showSlider ? "item-2 active" : "op-0"}>
                    <h3>
                        <span>سریع</span> و <span>امن</span>
                        <br />
                        این شعار  {SETTINGS.WEBSITE_NAME}  است
                    </h3>
                    <span className="span">
                        خرید و فروش امن بیت کوین و ارزهای دیجیتال با  {SETTINGS.WEBSITE_NAME}
                    </span>
                    <span className="span">
                        با  {SETTINGS.WEBSITE_NAME}  سریع و اسان و با رعایت تمامی پرتکل های امنیتی
                        داخلی و بین المللی معاملات خود را پیش ببرید
                    </span>
                    <button
                        onClick={() => {
                            Router.push("/register");
                        }}
                        className="btn btn-primary"
                    >
                        شروع کنید
                    </button>
                </div>
                <div
                    className="arrow right-arrow"
                    onClick={() => {
                        setShowSlider(!showSlider);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20.41"
                        height="28"
                        viewBox="0 0 7.41 12"
                    >
                        <path
                            id="ic_chevron_right_24px"
                            d="M10,6,8.59,7.41,13.17,12,8.59,16.59,10,18l6-6Z"
                            transform="translate(-8.59 -6)"
                        />
                    </svg>
                </div>
                <div
                    className="arrow left-arrow"
                    onClick={() => {
                        setShowSlider(!showSlider);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20.41"
                        height="28"
                        viewBox="0 0 7.41 12"
                    >
                        <path
                            id="ic_chevron_left_24px"
                            d="M15.41,7.41,14,6,8,12l6,6,1.41-1.41L10.83,12Z"
                            transform="translate(-8 -6)"
                        />
                    </svg>
                </div>
            </Slider>
            <MainTable>
                <div className="select-shop">

                    <button
                        onClick={() => {
                            setActiveBtn(2);
                        }}
                        className={activeBtn == 2 && "active"}
                    >
                        تتر
                    </button>
                    <button
                        onClick={() => {
                            setActiveBtn(1);
                        }}
                        className={activeBtn == 1 && "active"}
                    >
                        تومان
                    </button>
                </div>
                <div className="search">
                    <input
                        type="text"
                        placeholder="نام ارز ..."
                        name=""
                        id=""
                        onChange={searchHandler}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25.49"
                        height="25.49"
                        viewBox="0 0 17.49 17.49"
                    >
                        <path
                            id="ic_search_24px"
                            d="M15.5,14h-.79l-.28-.27a6.51,6.51,0,1,0-.7.7l.27.28v.79l5,4.99L20.49,19Zm-6,0A4.5,4.5,0,1,1,14,9.5,4.494,4.494,0,0,1,9.5,14Z"
                            transform="translate(-3 -3)"
                        />
                    </svg>
                </div>
                <div className="scrollable">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>نام ارز</th>
                                <th>قیمت خرید</th>
                                <th>قیمت فروش</th>
                                <th onClick={sortHandler}>
                                    تغییرات 24 ساعت
                                    <svg
                                        className="arrows"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="9.18"
                                        height="18"
                                        viewBox="0 0 9.18 18"
                                    >
                                        <path
                                            id="ic_unfold_more_24px"
                                            d="M12,5.83,15.17,9l1.41-1.41L12,3,7.41,7.59,8.83,9Zm0,12.34L8.83,15,7.42,16.41,12,21l4.59-4.59L15.17,15Z"
                                            transform="translate(-7.41 -3)"
                                        />
                                    </svg>
                                </th>
                                <th className="align-middle res-d-none">
                                    نمودار هفتگی
                                </th>
                                <th>اکشن</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!searchActive ?
                                 coins?.map((item) => {
                                    row++;
                                    if (item.name !== "تومان") {
                                        return (
                                            <tr key={item.id}>
                                                <td>{row}</td>
                                                <td>
                                                    <img
                                                        src={item.image}
                                                        width={25}
                                                        alt=""
                                                    />
                                                    <span>
                                                        {item.small_name_slug}
                                                    </span>
                                                    <span>{item.name}</span>
                                                </td>
                                                {activeBtn == 1 ? (
                                                    <>
                                                        <td>
                                                            {Math.trunc(
                                                                (item.buyPrice *
                                                                    (item.trade_fee /
                                                                        100) +
                                                                    item.buyPrice) *
                                                                    coins[0]
                                                                    .buyPrice
                                                            ).toLocaleString()}
                                                        </td>
                                                        <td>
                                                            {Math.trunc(
                                                                item.buyPrice *
                                                                coins[0]
                                                                    .buyPrice -
                                                                item.buyPrice *
                                                                (item.trade_fee /
                                                                    100) *
                                                                coins[0]
                                                                    .buyPrice
                                                            ).toLocaleString()}
                                                        </td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td>
                                                            {(
                                                                item.buyPrice *
                                                                (item.trade_fee /
                                                                    100) +
                                                                item.buyPrice
                                                            ).toLocaleString()}
                                                        </td>
                                                        <td>
                                                            {(
                                                                item.buyPrice -
                                                                item.buyPrice *
                                                                (item.trade_fee /
                                                                    100)
                                                            ).toLocaleString()}
                                                        </td>
                                                    </>
                                                )}
                                                <td>
                                                    <div
                                                        className={
                                                            item.quote_usd !==
                                                                undefined &&
                                                                item.quote_usd
                                                                    .percent24h >
                                                                0
                                                                ? "plus changes"
                                                                : item.quote_usd !==
                                                                    undefined &&
                                                                    item
                                                                        .quote_usd
                                                                        .percent24h <
                                                                    0
                                                                    ? "nega changes"
                                                                    : "zero changes"
                                                        }
                                                    >
                                                        {item.quote_usd !==
                                                            undefined &&
                                                            item.quote_usd
                                                                .percent24h > 0
                                                            ? "+ " +
                                                            item.quote_usd
                                                                .percent24h
                                                            : item.quote_usd
                                                                .percent24h}
                                                    </div>
                                                </td>
                                                <td>
                                                    {item.quote_usd !==
                                                        undefined &&
                                                        item.quote_usd
                                                            .percent24h > 0 ? (
                                                        <img
                                                            className="ch-img"
                                                            src={
                                                                "/images/green-chart" +
                                                                (Math.floor(
                                                                    Math.random() *
                                                                    6
                                                                ) +
                                                                    1) +
                                                                ".svg"
                                                            }
                                                            alt=""
                                                            width={160}
                                                            height={60}
                                                        />
                                                    ) : (
                                                        <img
                                                            className="ch-img"
                                                            src={
                                                                "/images/red-chart" +
                                                                (Math.floor(
                                                                    Math.random() *
                                                                    6
                                                                ) +
                                                                    1) +
                                                                ".svg"
                                                            }
                                                            alt=""
                                                            width={160}
                                                            height={60}
                                                        />
                                                    )}
                                                </td>
                                                <td>
                                                    <button
                                                        onClick={() => {
                                                            Router.push(
                                                                "/trade"
                                                            );
                                                        }}
                                                        className="btn btn-yellow"
                                                    >
                                                        معامله
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    }
                                })
                                : ress.map((item) => {
                                    row++;
                                    if (item.name !== "تومان") {
                                        return (
                                            <tr key={item.id}>
                                                <td>{row}</td>
                                                <td>
                                                    <img
                                                        src={item.image}
                                                        width={25}
                                                        alt=""
                                                    />
                                                    <span>
                                                        {item.small_name_slug}
                                                    </span>
                                                    <span>{item.name}</span>
                                                </td>
                                                {activeBtn == 1 ? (
                                                    <>
                                                        <td>
                                                            {(
                                                                (item.buyPrice *
                                                                    (item.trade_fee /
                                                                        100) +
                                                                    item.buyPrice) *
                                                                coins[0]
                                                                    .buyPrice
                                                            ).toLocaleString()}
                                                        </td>
                                                        <td>
                                                            {(
                                                                item.buyPrice *
                                                                coins[0]
                                                                    .buyPrice -
                                                                item.buyPrice *
                                                                (item.trade_fee /
                                                                    100) *
                                                                coins[0]
                                                                    .buyPrice
                                                            ).toLocaleString()}
                                                        </td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td>
                                                            {(
                                                                item.buyPrice *
                                                                (item.trade_fee /
                                                                    100) +
                                                                item.buyPrice
                                                            ).toLocaleString()}
                                                        </td>
                                                        <td>
                                                            {(
                                                                item.buyPrice -
                                                                item.buyPrice *
                                                                (item.trade_fee /
                                                                    100)
                                                            ).toLocaleString()}
                                                        </td>
                                                    </>
                                                )}
                                                <td>
                                                    <div
                                                        className={
                                                            item.quote_usd !==
                                                                undefined &&
                                                                item.quote_usd
                                                                    .percent24h >
                                                                0
                                                                ? "plus changes"
                                                                : item.quote_usd !==
                                                                    undefined &&
                                                                    item
                                                                        .quote_usd
                                                                        .percent24h <
                                                                    0
                                                                    ? "nega changes"
                                                                    : "zero changes"
                                                        }
                                                    >
                                                        {item.quote_usd !==
                                                            undefined &&
                                                            item.quote_usd
                                                                .percent24h > 0
                                                            ? "+ " +
                                                            item.quote_usd
                                                                .percent24h
                                                            : item.quote_usd
                                                                .percent24h}
                                                    </div>
                                                </td>
                                                <td>
                                                    {item.quote_usd !==
                                                        undefined &&
                                                        item.quote_usd
                                                            .percent24h > 0 ? (
                                                        <img
                                                            className="ch-img"
                                                            src={
                                                                "/images/green-chart" +
                                                                (Math.floor(
                                                                    Math.random() *
                                                                    6
                                                                ) +
                                                                    1) +
                                                                ".svg"
                                                            }
                                                            alt=""
                                                            width={160}
                                                            height={60}
                                                        />
                                                    ) : (
                                                        <img
                                                            className="ch-img"
                                                            src={
                                                                "/images/red-chart" +
                                                                (Math.floor(
                                                                    Math.random() *
                                                                    6
                                                                ) +
                                                                    1) +
                                                                ".svg"
                                                            }
                                                            alt=""
                                                            width={160}
                                                            height={60}
                                                        />
                                                    )}
                                                </td>
                                                <td>
                                                    <button
                                                        onClick={() => {
                                                            Router.push(
                                                                "/trade"
                                                            );
                                                        }}
                                                        className="btn btn-yellow"
                                                    >
                                                        معامله
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    }
                                })}
                        </tbody>
                    </table>
                </div>
            </MainTable>
            <Features>
                <div className="d-flex">
                    <div>
                        <h4>احراز هویت سریع</h4>
                        <p>
                            در سریع ترین زمان ممکن، ثبت نام کنید و احراز هویت
                            شوید
                        </p>
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        viewBox="0 0 18 22"
                    >
                        <path
                            id="ic_verified_user_24px"
                            d="M12,1,3,5v6c0,5.55,3.84,10.74,9,12,5.16-1.26,9-6.45,9-12V5ZM10,17,6,13l1.41-1.41L10,14.17l6.59-6.59L18,9Z"
                            transform="translate(-3 -1)"
                        />
                    </svg>
                </div>
                <div className="d-flex">
                    <div>
                        <h4>ضمانت امنیت </h4>
                        <p>ما امنیت دارایی های شما را در  {SETTINGS.WEBSITE_NAME}  تضمین میکنیم</p>
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        viewBox="0 0 18 22"
                    >
                        <path
                            id="ic_security_24px"
                            d="M12,1,3,5v6c0,5.55,3.84,10.74,9,12,5.16-1.26,9-6.45,9-12V5Zm0,10.99h7c-.53,4.12-3.28,7.79-7,8.94V12H5V6.3l7-3.11v8.8Z"
                            transform="translate(-3 -1)"
                        />
                    </svg>
                </div>
                <div className="d-flex">
                    <div>
                        <h4>خرید و فروش سریع</h4>
                        <p>
                            خرید و فروش و واریز و برداشت سریع را با  {SETTINGS.WEBSITE_NAME}  تجربه
                            کنید
                        </p>
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        viewBox="0 0 20 20"
                    >
                        <path
                            id="ic_shopping_cart_24px"
                            d="M7,18a2,2,0,1,0,2,2A2,2,0,0,0,7,18ZM1,2V4H3l3.6,7.59L5.25,14.04A1.933,1.933,0,0,0,5,15a2.006,2.006,0,0,0,2,2H19V15H7.42a.248.248,0,0,1-.25-.25l.03-.12L8.1,13h7.45a1.991,1.991,0,0,0,1.75-1.03l3.58-6.49A.977.977,0,0,0,21,5a1,1,0,0,0-1-1H5.21L4.27,2H1ZM17,18a2,2,0,1,0,2,2A2,2,0,0,0,17,18Z"
                            transform="translate(-1 -2)"
                        />
                    </svg>
                </div>
            </Features>
            <AboutUs>
                <h3>
                    درباره <span>ما</span>
                </h3>
                <h6>
                    صرافی  {SETTINGS.WEBSITE_NAME}  با فراهم آوردن محیطی امن و سریع و معاملات با
                    کمترین کارمزد، سعی در برطرف کردن نیاز کاربران ایرانی دارد
                </h6>
                <WeAre>
                    <div className="pxx">
                        <h5> {SETTINGS.WEBSITE_NAME}  را بیشتر بشناسید</h5>
                        <p>
                            {SETTINGS.WEBSITE_NAME}  محلی است برای هر فردی که میخواهد در سریع ترین
                            زمان ممکن و با کمترین کارمزد، و با رعایت امنیت و
                            آسودگی خیال از حفظ سرمایه خود، در بازار ارز دیجیتال
                            به خرید و فروش و هولد کردن بپردازد.
                        </p>
                        <ul>
                            <li
                                className={aboutActive == 1 ? "active" : ""}
                                onClick={() => {
                                    setAboutActive(1);
                                }}
                            >
                                ماموریت ما
                            </li>
                            <li
                                className={aboutActive == 2 ? "active" : ""}
                                onClick={() => {
                                    setAboutActive(2);
                                }}
                            >
                                مزایای ما
                            </li>
                            <li
                                className={aboutActive == 3 ? "active" : ""}
                                onClick={() => {
                                    setAboutActive(3);
                                }}
                            >
                                پشتیبانی از جفت‌ارزها
                            </li>
                        </ul>
                        {aboutActive == 1 ? (
                            <p className="about-p">
                                ما وظیفه داریم تا معاملات شما را با کمترین
                                کارمزد و بدون دخالت واسطه ها، در کمترین زمان
                                ممکن انجام دهیم و خیال شما را بابت حفظ دارایی
                                هایتان راحت کنیم.
                            </p>
                        ) : aboutActive == 2 ? (
                            <p className="about-p">
                                احراز هویت سریع، کیف پول دیجیتال، کارمزد پایین،
                                خرید و فروش سریع، خرید و فروش در قیمت های خاص،
                                امنیت بالا تنها برخی از مزایای ما میباشد.
                            </p>
                        ) : (
                            <p className="about-p">
                                {SETTINGS.WEBSITE_NAME}  با پشتیبانی از ارزهای مختلف، امکان پرداخت
                                با تومان و حتی سایر رمزارزها و خرید و فروش و
                                تبدیل آن‌ها به یکدیگر را می‌دهد
                            </p>
                        )}
                    </div>
                    <img src="/images/about-us.png" alt="" width={385} />
                </WeAre>
            </AboutUs>
            <Items>
                <div>
                    <img
                        src="/images/strong-security.png"
                        alt=""
                        width={42}
                        height={45}
                    />
                    <h4>امنیت قوی</h4>
                    <p>مقابله با تمامی حملات و کدگزاری تمام داده ها</p>
                </div>
                <div>
                    <img
                        src="/images/world-coverage.png"
                        alt=""
                        width={42}
                        height={45}
                    />
                    <h4>جهانی</h4>
                    <p>ارائه خدمات در تمامی کشورهای دنیا</p>
                </div>
                <div>
                    <img
                        src="/images/payment-options.png"
                        alt=""
                        width={42}
                        height={45}
                    />
                    <h4>تنوع در پرداخت</h4>
                    <p>پرداخت آنلاین، کارت به کارت و شبا</p>
                </div>
                <div>
                    <img
                        src="/images/mobile-app.png"
                        alt=""
                        width={42}
                        height={45}
                    />
                    <h4>اپلیکیشن موبایل</h4>
                    <p>دارای اپلیکیشن اندروید و ios</p>
                </div>
                <div>
                    <img
                        src="/images/cost-efficiency.png"
                        alt=""
                        width={42}
                        height={45}
                    />
                    <h4>کارمزد پایین</h4>
                    <p>پرداخت کمترین کارمزد برای معاملات</p>
                </div>
                <div>
                    <img
                        src="/images/high-liquidity.png"
                        alt=""
                        width={42}
                        height={45}
                    />
                    <h4>نقدینگی بالا</h4>
                    <p>امکان خرید و فروش در حجم بالا</p>
                </div>
            </Items>
            <HomeCalculator />
            {/* <Blog>
                <h3>
                    مقالات <span>ما</span>
                </h3>
                <h6>آخرین پست های وبلاگ  {SETTINGS.WEBSITE_NAME} </h6>
                <div className="posts">
                    { blogData?.data?.map((item) => {
                        return (<Post key={item.id}>
                            <div key={item.id}>
                                <img
                                    src={item.fimg_url}
                                    alt={item.title.rendered}
                                />
                                <h5>{item.title.rendered}</h5>
                                <p>
                                    {item.excerpt.rendered.toString().replace(regex, "").split('', 100)}
                                </p>
                                <a href={item.guid.rendered}> بیشتر بخوانید </a>
                            </div>
                        </Post>)
                    })}
                </div>
            </Blog> */}
            <LandingFooter />
        </Main>
    );
}

export async function getServerSideProps(context) {
    // let services = []
    // try {
    //     const data = await fetch(`${BASEURL}/service/list/`)
    //     services = await r.json()

    // } catch (error) {
    //     console.log(error)
    // }

    return {
        props: {
            // services
        }, // will be passed to the page component as props
    }
}
