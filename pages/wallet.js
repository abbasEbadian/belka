import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import Sidebar from "../components/Sidebar";
import { styled } from '@mui/material/styles';
import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";
import Router from "next/router";
import Image from "next/image";
import axios from "axios";
import { BASEURL, SETTINGS } from "../components/settings";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CoinDeposit from "../components/Wallet/CoinDeposit";
import CoinWithdraw from "../components/Wallet/CoinWithdraw";
import NightModeContext from "../components/Context";
import RialDeposit from "../components/Wallet/RialDeposit";
import RialWithdraw from "../components/Wallet/RialWithdraw";
import WalletTableC from "../components/Wallet/WalletTable";
import { useFetchCoins, useFetchWallet } from '../components/hooks'
import { Typography } from "@mui/material";


const Main = styled('div')`
   
    width: 100%;
    min-height: 100vh;
    position: relative;
    button {
        font-family: IRANSansX;
        border: none !important;
        outline: none !important;
        background-color: transparent;
    }

    .dep-btn {
        color: #30e0a1 !important;
        border: 1px solid #30e0a1 !important;
        padding: 3px 16px;
        border-radius: 13px;
        transition: 0.3s all;
        :hover {
            background-color: #30e0a1;
            color: #fff !important;
        }
    }
    .with-btn {
        color: #f6543e !important;
        border: 1px solid #f6543e !important;
        padding: 3px 16px;
        border-radius: 13px;
        transition: 0.3s all;
        :hover {
            background-color: #f6543e;
            color: #fff !important;
        }
    }
    .trade-btn {
        color: #108abb;
        border: 1px solid #108abb !important;
        padding: 3px 16px;
        border-radius: 13px;
        transition: 0.3s all;
        :hover {
            background-color: #108abb;
            color: #fff !important;
        }
    }
    table > .scrollable > tbody > tr {
        width: 100%;
    }
    table > .scrollable > tbody > tr:nth-of-type(odd) > * {
        width: 100%;
        background-color: #f9f9f9;
    }
    .text-success {
        color: #30e0a1 !important;
    }

    @media (max-width: 992px) {
        .kAUJUI thead tr th,
        .kAUJUI tbody tr th,
        .kAUJUI tbody tr td {
            padding-right: 2px !important;
            padding-left: 10px !important;
            border: none;
        }
        .bhIPnB .text-field-1 {
            top: 24px;
            right: 32px;
            font-size: 14px;
        }
        .bhIPnB .text-field-2 span {
            font-weight: bold;
            font-size: 15px !important;
        }
    }
`;
const Content = styled('div')`
    overflow: hidden;
    transition: 0.1s all;
    padding-bottom: 70px;
    .scrollable {
        overflow: auto;
    }
    @media (max-width: 1300px) {
        .mx-1200 {
            flex-wrap: wrap;
        }
        .y-inv {
            margin-right: 0;
        }
    }

    @media (max-width: 992px) {
        .mx-1200 {
            flex-wrap: wrap;
            flex-direction: column;
            align-items: center;
        }
        .y-inv {
            margin-right: 0;
        }
    }
    @media (max-width: 786px) {
    }
    .scrollable {
        max-height: 450px !important;
        overflow-y: auto !important;
        tbody tr {
            width: 336px;
        }
        ::-webkit-scrollbar {
            width: 5px;
            height: 9px;
        }
        ::-webkit-scrollbar-thumb {
            background-color: #00293957;
            border-radius: 20px;
            width: 5px;
        }
    }
`;

const WalletMain = styled('div')`
    padding: 20px 32px;
    min-height: 100vh;
    h4 {
        font-weight: 600;
        font-size: 23px;

        color: #5c5c5c;
    }

    .balance-1 {
        background: url("/images/bg-balance.png");
        height: 125px;
    }
    .balance-2 {
        background: url("/images/bg-balance-2.png");
        height: 125px;
    }
    @media (max-width: 992px) {
        .balance-2 {
            margin-top: 10px;
        }
    }

    @media (max-width: 992px) {
        .balance-to-col {
            display: flex;
            align-items: center;
            flex-direction: column;
            .me-3 {
                margin-right: 0 !important;
            }
        }
    }
`;

const WalletTable = styled('table')`
    min-width: 600px;
    width: 100%;
    margin-top: 20px;
    .arrows {
        display: flex;
        flex-direction: column;
        margin-left: 3px;
        svg {
            margin-bottom: 3px;
        }
    }
    thead tr th {
        font-weight: 500;

        :first-child {
            border-radius: 0 16px 0 0 !important;
        }
        :last-child {
            border-radius: 16px 0 0 0 !important;
        }
    }
    tbody tr {
        :last-child {
            td {
                :first-child {
                    border-radius: 0 0 16px 0 !important;
                }
                :last-child {
                    border-radius: 0 0 0 16px !important;
                }
            }
        }
    }
    thead tr {
        width: 100%;
        border: none;
        background: #fff;
        border-radius: 8px;
        height: 80px;
        border-bottom: 1px solid #ccc;
    }
    thead tr th,
    tbody tr th,
    tbody tr td {
        padding-right: 20px;
        border: none;
    }
    tbody {
        border-top: none !important;
        background-color: #fff;
        width: 100%;
    }
    .change-num {
        width: 40px;
        height: 22px;
        left: 115px;
        top: 0px;
        background: rgba(246, 84, 62, 0.2);
        border-radius: 51px;
        color: #f6543e;
        text-align: center;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    tbody tr {
        border-bottom: 1px solid #e8e8e8;
    }
    @media (max-width: 992px) {
        .remove-mob {
            display: none !important;
        }
        thead tr th {
            font-weight: 500;

            :nth-child(2) {
                border-radius: 0 16px 0 0 !important;
            }
            :nth-child(5) {
                border-radius: 16px 0 0 0 !important;
            }
        }
        tbody tr {
            :last-child {
                td {
                    :nth-child(2) {
                        border-radius: 0 0 16px 0 !important;
                    }
                    :nth-child(5) {
                        border-radius: 0 0 0 16px !important;
                    }
                }
            }
        }
        .remove-mob-2 {
            width: 40px;
            display: none;
        }
        .d-none {
            display: block;
        }
        min-width: 220px;
        font-size: 10px;
        img {
            width: 16px;
            height: 16px;
        }
    }
`;

const ShowGenModal = styled('div')`
    width: 260px;
    height: 200px;
    border-radius: 20px;
    background-color: #818181;
    position: fixed;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    padding: 20px;
    color: #fff;
    p {
        margin-top: 10px;
        font-size: 12px;
        color: #fff;
        text-align: center;
        font-family: IRANSansX, sans-serif;
    }
    button {
        width: 100px;
        font-size: 12px;
        margin-top: 14px;
    }
    .btn-danger {
        background-color: #ff6060;
        :hover {
            background-color: #ff606099;
        }
    }
    .btn-success {
        background-color: #0da827;
        :hover {
            background-color: #0da82799;
        }
    }

`;


Wallet.protected = true
Wallet.title = `صرافی ${SETTINGS.WEBSITE_NAME} | کیف پول`

export default function Wallet() {
    const [id, setId] = useState(null);
    const [showMenu, setShowMenu] = useState(true);
    const [showCoinDeposit, setShowCoinDeposit] = useState(false);
    const [showCoinWithDrow, setShowCoinWithDrow] = useState(false);
    const [showRialDeposit, setShowRialDeposit] = useState(false);
    const [showRialWithDrow, setShowRialWithDrow] = useState(false);
    const [blur, setBlur] = useState(false);
    const [itemTo, setItemTo] = useState([]);
    const [allT, setAllT] = useState(0);
    const [allToman, setAllToman] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [showGenModal, setShowGenModal] = useState(false);
    const [itemToGen, setItemToGen] = useState();
    const [actives, setActives] = useState(true);
    const stts = useContext(NightModeContext);


    const { isLoading: isWalletLoading, data: wallet } = useFetchWallet()
    const { isLoading: isCoinsLoading, data: coins } = useFetchCoins()



    // 138198.4164
    let row = 0;
    let token = "";
    let allTether = 0;
    const ShowGenModalHandler = (item) => {
        setShowGenModal(true);
    };
    const genratee = (item) => {
        generateHandler(item.id);
    };
    const allCalc = (res) => {
        for (let i = 0; i < res.length; i++) {
            if (res[i].service.small_name_slug !== "IRT") {
                allTether += res[i].balance * res[i].service.buyPrice;
                setAllT(allTether);
            } else {
                allTether += res[i].balance / res[i].service.buyPrice;
                setAllT(allTether);
            }
        }
    };

    setTimeout(() => {
        if (typeof window !== 'undefined') token = localStorage.getItem("token");
    }, 2000);



    const menuHandler = () => {
        setShowMenu(!showMenu);
    };

    // generate

    const generateHandler = (e) => {
        let data = {
            service: e,
        };
        setTimeout(() => {
            let config_3 = {
                headers: {
                    "Content-type": "application/json",

                },
                method: "POST",
                url: `${BASEURL}wallet/generate/`,
                data: data,
            };
            axios(config_3)
                .then((response) => {
                    response.data.error != 1
                        ? toast.success("کیف پول شما با موفقیت ساخته شد") &&
                        setTimeout(() => {
                            location.reload();
                        }, 2000)
                        : toast.error(response.data.message);
                    if (
                        response.data.message ==
                        "شما کیف پول شما از قبل ساخته شده است."
                    ) {
                        setShowCoinDeposit();
                    }
                })
                .catch((error) => {
                    toast.error(response.data.message);
                });
        }, 2000);
    };


    let ids = [];
    return (
        <>
            
            <Main >
                <Sidebar show-menu={menuHandler} active="3" show={showMenu} />
                <Content className={showMenu ? "pr-176" : "pr-80"}>
                    <Header show-menu={menuHandler} />
                    <WalletMain className={blur ? " bg-blur" : ""}>
                    <WalletTableC wallet={wallet} />
                        <Typography variant="h6" >کیف پول شما</Typography >
                        <div className="scrollable">
                            <WalletTable>
                                <thead>
                                    <tr className="align-middle ">
                                        <th scope="col" className="remove-mob">
                                            <div className="d-flex align-items-center">
                                                #
                                            </div>
                                        </th>
                                        <th scope="col">
                                            <div className="d-flex align-items-center">
                                                <div className="arrows">
                                                    <svg
                                                        width="6"
                                                        height="5"
                                                        viewBox="0 0 6 5"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M2.50405 1.22444C2.59165 1.11489 2.70278 1.02645 2.82919 0.965679C2.95561 0.904904 3.09407 0.873348 3.23434 0.873348C3.3746 0.873348 3.51307 0.904904 3.63949 0.965679C3.7659 1.02645 3.87702 1.11489 3.96462 1.22444L5.75901 3.46766C5.86914 3.6052 5.93816 3.77106 5.95812 3.94612C5.97809 4.12118 5.94818 4.29832 5.87186 4.45713C5.79554 4.61593 5.67589 4.74994 5.52672 4.84372C5.37755 4.93749 5.20492 4.98721 5.02873 4.98714H1.43995C1.26375 4.98721 1.09112 4.93749 0.941953 4.84372C0.792783 4.74994 0.673142 4.61593 0.596817 4.45713C0.520492 4.29832 0.49059 4.12118 0.510555 3.94612C0.53052 3.77106 0.59954 3.6052 0.709663 3.46766L2.50405 1.22444Z"
                                                            fill="#657D95"
                                                        />
                                                    </svg>
                                                    <svg
                                                        width="6"
                                                        height="5"
                                                        viewBox="0 0 6 5"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M3.96502 4.48999C3.87742 4.59954 3.76629 4.68797 3.63988 4.74875C3.51346 4.80952 3.375 4.84108 3.23473 4.84108C3.09447 4.84108 2.956 4.80952 2.82958 4.74875C2.70317 4.68797 2.59205 4.59954 2.50445 4.48999L0.710056 2.24677C0.599934 2.10923 0.530913 1.94337 0.510948 1.76831C0.490983 1.59325 0.520885 1.41611 0.59721 1.2573C0.673535 1.09849 0.793176 0.964484 0.942346 0.870713C1.09152 0.77694 1.26415 0.727223 1.44034 0.727289L5.02912 0.727289C5.20532 0.727223 5.37795 0.77694 5.52712 0.870713C5.67629 0.964484 5.79593 1.09849 5.87225 1.2573C5.94858 1.41611 5.97848 1.59325 5.95852 1.76831C5.93855 1.94337 5.86953 2.10923 5.75941 2.24677L3.96502 4.48999Z"
                                                            fill="#657D95"
                                                        />
                                                    </svg>
                                                </div>
                                                اسم
                                            </div>
                                        </th>
                                        <th scope="col">
                                            <div className="d-flex align-items-center ">
                                                <div className="arrows">
                                                    <svg
                                                        width="6"
                                                        height="5"
                                                        viewBox="0 0 6 5"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M2.50405 1.22444C2.59165 1.11489 2.70278 1.02645 2.82919 0.965679C2.95561 0.904904 3.09407 0.873348 3.23434 0.873348C3.3746 0.873348 3.51307 0.904904 3.63949 0.965679C3.7659 1.02645 3.87702 1.11489 3.96462 1.22444L5.75901 3.46766C5.86914 3.6052 5.93816 3.77106 5.95812 3.94612C5.97809 4.12118 5.94818 4.29832 5.87186 4.45713C5.79554 4.61593 5.67589 4.74994 5.52672 4.84372C5.37755 4.93749 5.20492 4.98721 5.02873 4.98714H1.43995C1.26375 4.98721 1.09112 4.93749 0.941953 4.84372C0.792783 4.74994 0.673142 4.61593 0.596817 4.45713C0.520492 4.29832 0.49059 4.12118 0.510555 3.94612C0.53052 3.77106 0.59954 3.6052 0.709663 3.46766L2.50405 1.22444Z"
                                                            fill="#657D95"
                                                        />
                                                    </svg>
                                                    <svg
                                                        width="6"
                                                        height="5"
                                                        viewBox="0 0 6 5"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M3.96502 4.48999C3.87742 4.59954 3.76629 4.68797 3.63988 4.74875C3.51346 4.80952 3.375 4.84108 3.23473 4.84108C3.09447 4.84108 2.956 4.80952 2.82958 4.74875C2.70317 4.68797 2.59205 4.59954 2.50445 4.48999L0.710056 2.24677C0.599934 2.10923 0.530913 1.94337 0.510948 1.76831C0.490983 1.59325 0.520885 1.41611 0.59721 1.2573C0.673535 1.09849 0.793176 0.964484 0.942346 0.870713C1.09152 0.77694 1.26415 0.727223 1.44034 0.727289L5.02912 0.727289C5.20532 0.727223 5.37795 0.77694 5.52712 0.870713C5.67629 0.964484 5.79593 1.09849 5.87225 1.2573C5.94858 1.41611 5.97848 1.59325 5.95852 1.76831C5.93855 1.94337 5.86953 2.10923 5.75941 2.24677L3.96502 4.48999Z"
                                                            fill="#657D95"
                                                        />
                                                    </svg>
                                                </div>
                                                مقدار
                                            </div>
                                        </th>
                                        <th className=" " scope="col">
                                            اکشن
                                        </th>
                                        <th className=""></th>
                                        <th className="remove-mob"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {coins.map((item) => {
                                        {
                                            row++;
                                        }
                                        return (
                                            <tr key={item.row}>
                                                <td
                                                    scope="row"
                                                    className="pt-12 remove-mob-2"
                                                >
                                                    {row}
                                                </td>
                                                <td className="align-middle">
                                                    <img
                                                        src={item.image}
                                                        alt="coin"
                                                        width={25}
                                                        height={25}
                                                    />
                                                    <span className="me-2">
                                                        {item.name}
                                                    </span>

                                                    <span className="ms-1 text-center">

                                                    </span>
                                                </td>
                                                <td className="align-middle">
                                                    {wallet.lenght !== 0
                                                        ? wallet.map((wal) => {
                                                            return wal.service !==
                                                                null &&
                                                                wal.service
                                                                    .id ===
                                                                item.id ? (
                                                                <span key={wal.id}>
                                                                    <span className="d-none">
                                                                        {ids.push(
                                                                            item.id
                                                                        )}
                                                                    </span>
                                                                    {wal
                                                                        .balance
                                                                        .lenght !==
                                                                        0 &&
                                                                        wal.balance !==
                                                                        undefined ? (
                                                                        <span>
                                                                            {" "}
                                                                            {
                                                                                new Intl.NumberFormat().format(wal.balance)
                                                                            }{" "}
                                                                        </span>
                                                                    ) : (
                                                                        " 1 "
                                                                    )}
                                                                </span>
                                                            ) : (
                                                                ""
                                                            );
                                                        })
                                                        : ""}
                                                </td>
                                                <td className="align-middle ">
                                                    {ids.indexOf(item.id) ==
                                                        -1 ? (
                                                        <>
                                                            <button
                                                                onClick={() => {
                                                                    ShowGenModalHandler(
                                                                        item
                                                                    );
                                                                    setItemToGen(
                                                                        item
                                                                    );
                                                                    setItemTo(
                                                                        item
                                                                    );
                                                                }}
                                                                className="dep-btn"
                                                                disabled={
                                                                    !loaded
                                                                }
                                                            >
                                                                واریز
                                                            </button>
                                                            {showGenModal && (
                                                                <ShowGenModal>
                                                                    <p>
                                                                        شما کیف
                                                                        پول این
                                                                        ارز را
                                                                        ندارید.
                                                                        آیا
                                                                        می‌خواهید
                                                                        کیف پول
                                                                        این ارز
                                                                        برای شما
                                                                        ایجاد
                                                                        شود؟
                                                                    </p>
                                                                    <div className="d-flex justify-content-between mt-5">
                                                                        <button
                                                                            className="btn btn-danger"
                                                                            onClick={() => {
                                                                                setShowGenModal(
                                                                                    false
                                                                                );
                                                                            }}
                                                                        >
                                                                            لغو
                                                                        </button>
                                                                        <button
                                                                            className="btn btn-success"
                                                                            disabled={
                                                                                !actives
                                                                            }
                                                                            onClick={() => {
                                                                                genratee(
                                                                                    itemToGen
                                                                                );
                                                                                setActives(
                                                                                    false
                                                                                );
                                                                            }}
                                                                        >
                                                                            ایجاد
                                                                            کیف
                                                                            پول
                                                                        </button>
                                                                    </div>
                                                                </ShowGenModal>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <button
                                                            disabled={!loaded}
                                                            onClick={() => {
                                                                setId(item.id);
                                                                if (
                                                                    item.name ==
                                                                    "تومان"
                                                                ) {
                                                                    setShowRialDeposit(
                                                                        true
                                                                    );
                                                                } else {
                                                                    setShowCoinDeposit(
                                                                        true
                                                                    );
                                                                }
                                                                setBlur(true);
                                                                setItemTo(item);
                                                            }}
                                                            className="dep-btn"
                                                        >
                                                            واریز
                                                        </button>
                                                    )}
                                                </td>
                                                <td className="align-middle ">
                                                    {ids.indexOf(item.id) ==
                                                        -1 ? (
                                                        <button
                                                            disabled={!loaded}
                                                            onClick={() => {
                                                                ShowGenModalHandler(
                                                                    item
                                                                );
                                                                setItemToGen(
                                                                    item
                                                                );
                                                                setItemTo(item);
                                                            }}
                                                            className="with-btn"
                                                        >
                                                            برداشت
                                                        </button>
                                                    ) : (
                                                        <button
                                                            disabled={!loaded}
                                                            onClick={() => {
                                                                if (
                                                                    item.name ==
                                                                    "تومان"
                                                                ) {
                                                                    setShowRialWithDrow(
                                                                        true
                                                                    );
                                                                } else {
                                                                    setShowCoinWithDrow(
                                                                        true
                                                                    );
                                                                }
                                                                setItemTo(item);
                                                                setBlur(true);
                                                            }}
                                                            className="with-btn"
                                                        >
                                                            برداشت
                                                        </button>
                                                    )}
                                                </td>
                                                <td className="align-middle remove-mob">
                                                    <button
                                                        onClick={() => {
                                                            Router.push(
                                                                "/trade"
                                                            );
                                                        }}
                                                        className="trade-btn"
                                                    >
                                                        معامله
                                                    </button>
                                                </td>
                                                <td className="d-none"></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </WalletTable>
                        </div>
                    </WalletMain>
                </Content>
                {showCoinDeposit ? (
                    <CoinDeposit
                        wallet={wallet}
                        itemTo={itemTo}
                        setBlur={setBlur}
                        stts={stts}
                        setShowCoinDeposit={setShowCoinDeposit}
                        token={token}
                    />
                ) : (
                    ""
                )}
                {showCoinWithDrow ? (
                    <CoinWithdraw
                        wallet={wallet}
                        itemTo={itemTo}
                        setBlur={setBlur}
                        stts={stts}
                        setShowCoinWithDrow={setShowCoinWithDrow}
                        token={token}
                    />
                ) : (
                    ""
                )}
                {showRialDeposit ? (
                    <RialDeposit
                        wallet={wallet}
                        itemTo={itemTo}
                        setBlur={setBlur}
                        stts={stts}
                        setShowRialDeposit={setShowRialDeposit}
                        token={token}
                    />
                ) : (
                    ""
                )}
                {showRialWithDrow ? (
                    <RialWithdraw
                        wallet={wallet}
                        itemTo={itemTo}
                        setBlur={setBlur}
                        stts={stts}
                        setShowRialWithDrow={setShowRialWithDrow}
                        token={token}
                    />
                ) : (
                    ""
                )}
            </Main>
        </>
    );
}
