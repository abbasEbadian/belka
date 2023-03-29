import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import Sidebar from "../components/Sidebar";
import { styled } from '@mui/material/styles';
import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";
import Router from "next/router";
import axios from "axios";
import { BASEURL } from "../components/settings";
import NightModeContext from "../components/Context";
import moment from "jalali-moment";
const Main = styled('div')`
    background-color: #e4e3ef;
    width: 100%;
    min-height: 100vh;
    .scrollable {
        max-height: 500px;
        overflow: auto;
    }
    .tabs {
        background-color: #fff;
        display: flex;
        align-items: center;
        border-radius: 10px;
        width: 200px;
        overflow: hidden;
        justify-content: space-between;
        .active-span {
            background-color: #eee;
        }
        span {
            font-size: 15px !important;
            cursor: pointer;
            :first-child {
            }
            padding: 10px 13px;
        }
    }
    .tabs-dark {
        display: flex;
        align-items: center;
        border: 1px solid #ccc;
        border-radius: 10px;
        width: 200px;
        justify-content: space-between;
        overflow: hidden;
        .active-span {
            background-color: #ffffff28;
        }
        span {
            font-size: 15px !important;
            cursor: pointer;
            :first-child {
                padding-left: 16px;
                border-left: 1px solid #ccc;
            }
            padding: 10px 13px;
        }
    }
`;
const Content = styled('div')`
    overflow: hidden;
    transition: 0.1s all;
    .p-32 {
        padding: 32px;
        span {
            font-weight: 600;
            font-size: 18px;
            line-height: 26px;
            color: #323232;
        }
    }
`;
const HistoryTable = styled('table')`
    min-width: 600px;
    width: 100%;
    margin-top: 20px;
    min-width: 800px;
    overflow: auto;
    thead tr {
        width: 100%;
        border: none;
        background: #fff;
        border-radius: 8px;
        height: 80px;
        font-size: 15px;
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
        border-top: 1px solid #eee;
        :last-child {
            td {
                padding-bottom: 20px;
                padding-top: 20px;
                :first-child {
                    border-radius: 0 0 16px 0 !important;
                }
                :last-child {
                    border-radius: 0 0 0 16px !important;
                }
            }
        }
    }
    thead tr th,
    tbody tr th,
    tbody tr td {
        padding-right: 20px;
        border: none;
    }
    tbody {
        overflow: auto;

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
    @media (max-width: 992px) {
        .remove-mob {
            display: none !important;
        }
        .remove-mob-2 {
            width: 40px;
            display: none;
        }
        .d-none {
            display: block;
        }
    }
`;

export default function History() {
    const stts = useContext(NightModeContext);
    const [showMenu, setShowMenu] = useState(true);
    const [orders, setOrders] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [coins, setCoins] = useState([]);
    const [tabActive, setTabActive] = useState("trade");
    let config = {
        url: `${BASEURL}service/list/`,
        method: "GET",
    };
    useEffect(() => {
        axios(config)
            .then((res) => {
                setCoins(res.data);
            })
            .catch((error) => {});
    }, []);
    const menuHandler = () => {
        setShowMenu(!showMenu);
    };
    console.log(transactions);
    let token = "";
    let trans = [];

    setTimeout(() => {
        if( typeof window !=='undefined' )token = localStorage.getItem("token");
    }, 1000);
    useEffect(() => {
        if (
            localStorage.getItem("token") == null ||
            typeof window == "undefined"
        ) {
            Router.push("/login");
        }
    }, []);
    useEffect(() => {
        setTimeout(() => {
            let config = {
                headers: {
                    "Content-type": "application/json",
                    
                },
                url: `${BASEURL}transaction/list/`,
                method: "GET",
            };
            axios(config)
                .then((res) => {
                    setTransactions(res.data);
                })
                .catch((error) => {});
        }, 1200);
    }, []);
    let order_config = {};
    setTimeout(() => {
        order_config = {
            headers: {
                "Content-type": "application/json",
                
            },
            url: `${BASEURL}order/list/`,
            method: "GET",
        };
    }, 3000);
    useEffect(() => {
        setTimeout(() => {
            axios(order_config)
                .then((res) => {
                    if (res.status == "200") {
                        setOrders(res.data);
                    }
                })
                .catch((error) => {});
        }, 4000);
    }, []);

    console.log(orders);

    return (
        <Main
            className={
                stts.night == "true" ? "bg-dark-2 max-w-1992" : "max-w-1992"
            }
        >
            <Head>
                {" "}
                <link rel="shortcut icon" href="/images/fav.png" />
                <title>صرافی متاورس | تاریخچه معاملات</title>
            </Head>

            <Sidebar show-menu={menuHandler} active="4" show={showMenu} />
            <Content className={showMenu ? "pr-176" : "pr-80"}>
                <Header show-menu={menuHandler} />
                <div className="p-32">
                    <div
                        className={stts.night == "true" ? "tabs-dark" : "tabs"}
                    >
                        <span
                            className={
                                tabActive == "trade" ? "active-span" : ""
                            }
                            onClick={() => {
                                setTabActive("trade");
                            }}
                        >
                            معاملات
                        </span>
                        <span
                            className={
                                tabActive == "history" ? "active-span" : ""
                            }
                            onClick={() => {
                                setTabActive("history");
                            }}
                        >
                            واریز و برداشت
                        </span>
                    </div>
                    {tabActive == "trade" ? (
                        <div className="scrollable">
                            <HistoryTable
                                className={
                                    stts.night == "true" ? " table" : " table"
                                }
                            >
                                <thead>
                                    <tr className="align-middle ">
                                        <th scope="col">
                                            <div className="d-flex align-items-center">
                                                شماره تراکنش
                                            </div>
                                        </th>
                                        <th scope="col">
                                            <div className="d-flex align-items-center ">
                                                تاریخ معامله
                                            </div>
                                        </th>
                                        <th scope="col">
                                            <div className="d-flex align-items-center">
                                                نوع معامله
                                            </div>
                                        </th>

                                        <th scope="col">
                                            <div className="d-flex align-items-center ">
                                                پرداخت
                                            </div>
                                        </th>
                                        <th scope="col">
                                            <div className="d-flex align-items-center ">
                                                دریافت
                                            </div>
                                        </th>
                                        <th scope="col">
                                            <div className="d-flex align-items-center ">
                                                وضعیت
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.length !== 0
                                        ? orders.map((item) => {
                                              return (
                                                  <tr key={item.id}>
                                                      <td
                                                          scope="row"
                                                          className="pt-12"
                                                      >
                                                          {item.id}
                                                      </td>

                                                      <td className="align-middle">
                                                          {item.published}
                                                      </td>
                                                      <td className="align-middle">
                                                          {item.destination_asset ==
                                                              "USDT" ||
                                                          item.destination_asset ==
                                                              "IRT" ? (
                                                              <div className="text-danger">
                                                                  فروش
                                                              </div>
                                                          ) : item.source_asset ==
                                                                "USDT" ||
                                                            item.source_asset ==
                                                                "IRT" ? (
                                                              <div className="text-success-2">
                                                                  خرید
                                                              </div>
                                                          ) : (
                                                              <div className="text-warning">
                                                                  تبدیل
                                                              </div>
                                                          )}
                                                      </td>
                                                      <td className="align-middle">
                                                          {new Intl.NumberFormat().format((item.source_amount))}{" "}
															  {item.source_asset}
                                                      </td>
                                                      <td className="align-middle">
                                                          {
                                                           new Intl.NumberFormat().format(( item.destination_amount))
                                                          }{" "}
                                                          {  item.destination_asset}
                                                      </td>
                                                      <td className="align-middle">
                                                          {item.status ==
                                                              "accepted" ||
                                                          item.status ==
                                                              "delivered" ? (
                                                              <div className="text-success-2">
                                                                  انجام شده
                                                              </div>
                                                          ) : item.status ==
                                                            "pending" ? (
                                                              <span>
                                                                  در انتظار
                                                              </span>
                                                          ) : (
                                                              <div className="text-danger">
                                                                  رد شده
                                                              </div>
                                                          )}
                                                      </td>
                                                  </tr>
                                              );
                                          })
                                        : ""}
                                </tbody>
                            </HistoryTable>
                        </div>
                    ) : (
                        <div className="scrollable">
                            <HistoryTable
                                className={
                                    stts.night == "true" ? "table" : " table"
                                }
                            >
                                <thead>
                                    <tr className="align-middle ">
                                        <th scope="col">
                                            <div className="d-flex align-items-center">
                                                شماره تراکنش
                                            </div>
                                        </th>
                                        <th scope="col">
                                            <div className="d-flex align-items-center">
                                                تاریخ تراکنش
                                            </div>
                                        </th>
                                        <th scope="col">
                                            <div className="d-flex align-items-center ">
                                                نوع تراکنش
                                            </div>
                                        </th>
										     <th scope="col">
                                            <div className="d-flex align-items-center ">
                                                ارز 
                                            </div>
                                        </th>
										
                                        <th scope="col">
                                            <div className="d-flex align-items-center ">
                                                مقدار تراکنش
                                            </div>
                                        </th>
                                        <th scope="col">
                                            <div className="d-flex align-items-center ">
                                                وضعیت تراکنش
                                            </div>
                                        </th>
                                        <th scope="col">
                                            <div className="d-flex align-items-center ">
                                               کد رهگیری
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.lenght !== 0
                                        ? transactions.map((item) => {
                                              return (
                                                  <tr key={item.id}>
                                                      <td
                                                          scope="row"
                                                          className="pt-12"
                                                      >
                                                          {item.id}
                                                      </td>

                                                      <td className="align-middle">
                                                          {item.published}
                                                      </td>
                                                      <td className="align-middle">
                                                          {item.type ==
                                                          "deposit" ? (
                                                              <div className="text-success-2">
                                                                  واریز
                                                              </div>
                                                          ) : (
                                                              <div className="text-danger">
                                                                  برداشت
                                                              </div>
                                                          )}
                                                      </td>
													      <td className="align-middle">
                                                          <span>
                                                              {item.service.name}
                                                          </span>
                                                      </td>
                                                      <td className="align-middle">
                                                          <span>
                                                              {item.amount}
                                                          </span>
                                                      </td>
                                                      <td className="align-middle">
                                                          {item.status ==
                                                          "accepted" ? (
                                                              <div className="text-success-2">
                                                                  انجام شده
                                                              </div>
                                                          ) : item.status ==
                                                            "pending" ? (
                                                              <span>
                                                                  در انتظار
                                                              </span>
                                                          ) : (
                                                              <div className="text-danger">
                                                                  رد شده
                                                              </div>
                                                          )}
                                                      </td>
                                                      <td className="align-middle">
                                                          <span>
                                                              {item.status_details}
                                                          </span>
                                                      </td>
                                                  </tr>
                                              );
                                          })
                                        : ""}
                                </tbody>
                            </HistoryTable>
                        </div>
                    )}
                </div>
            </Content>
        </Main>
    );
}
