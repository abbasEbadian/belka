import React, { useContext, useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Select from "react-select";
import axios from "axios";
import NightModeContext from "../Context";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { BASEURL } from "../settings";
import { useFetchCoins, useFetchOrders, useFetchWallet } from "../hooks";
 
const Main = styled('div')`
    box-shadow: 5px 7px 12px -5px #9f9fbb;
    -webkit-box-shadow: 5px 7px 12px -5px #9f9fbb;
    height: 300px;
    width: 96%;
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 20px;
    margin-right: 20px;
    padding: 0.75rem 1.45rem !important;
    @media (max-width: 699px) {
        margin-right: 0 !important  ;
        .amount {
            width: 122px !important;
        }
        .res-699 {
            flex-direction: column;
        }
        .send-coin {
            margin-bottom: 20px !important;
            margin-top: 0 !important;
        }
        button {
            width: 100% !important;
        }
    }
    h4 {
        font-size: 16px;
        font-weight: 600;
    }
    .change {
        width: 336px;
        height: 400px;
        background: #ffffff;
        box-shadow: 0px 2px 8px rgba(50, 50, 50, 0.12);
        border-radius: 16px;
        position: relative;
    }
    .change-head {
        background: rgba(255, 157, 0, 0.2);
        width: 336px;
        height: 39px;
        border-radius: 16px 16px 0px 0px;
        padding: 8px 16px;
        color: #ff9d00;
        font-weight: 600;
        font-size: 16px;
    }
    .change-svg {
        position: absolute;
        left: 20px;
        top: 20px;
    }
    .padd {
        padding: 16px;
    }
    .send-coin {
        color: #4c4c4c;
        font-weight: normal;
        font-size: 16px;
        line-height: 23px;
        margin-bottom: 50px;
        margin-top: 50px;
    }
    .send-box {
        display: flex;
        border-radius: 8px;
        border: 1.5px solid #dbdbdb;
        flex-direction: row-reverse;
        img {
            width: 22px;
            margin-left: 10px;
        }
        [class*="control"]{
            height: 39px;
        }
    }
    .css-1s2u09g-control,
    .css-b62m3t-container {
        border: none !important;
        border-radius: 0 !important;
        border-top-left-radius: 8px !important;
        border-bottom-left-radius: 8px !important;
        white-space: nowrap !important;
        img {
            width: 11px !important;
        }
        width: 130px;
    }
    .css-b62m3t-container {
        border-right: 1px solid #dbdbdb !important;
        font-size: 12px !important;
    }

    .css-319lph-ValueContainer {
        font-size: 13px !important;
        border: none !important;
        border-radius: 0 !important;
    }

    .css-14el2xx-placeholder {
        font-size: 13px;
    }
    .amount {
        width: 152px;
        font-size: 14px;
        background: #edf8fc;
        border-left: 1px solid #dbdbdb;
        border-radius: 0 8px 8px 0;
        padding: 8px;
    }
    button {
        color: #fff;
        width: 88%;
        height: 42px;
        background-color: #5965f9 !important;
        border-radius: 8px;
        margin-right: auto;
        margin-left: auto;
        :hover {
            opacity: 0.9;
        }
    }
`;
const Change = () => {
    const [sourcePrice, setSourcePrice] = useState();
    const [showMenu, setShowMenu] = useState(false);
    const [selectedOption, setSelectedOption] = useState();
    const [selectedOptionTwo, setSelectedOptionTwo] = useState();
    const [calcRespons, setCalcRespons] = useState();
    const [loading, setLoading] = useState(false);
    const stts = useContext(NightModeContext);
    const [destinationPrice, setDestinationPrice] = useState("");

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };
    const handleChangeTwo = (selectedOptionTwo) => {
        setSelectedOptionTwo(selectedOptionTwo);
    };


    
    const {data: coins = []} = useFetchCoins()
    const {data: wallet = []} = useFetchWallet()
    

    // Fee
    let selectItem = [];
    let selectTwoItem = [];

    selectItem = coins.find((i) => {
        return selectedOption !== undefined ? i.id == selectedOption.value : "";
    });
    let selectItemWallet = wallet.find((i) => {
        return selectedOptionTwo !== undefined
            ? i.service.id == selectedOptionTwo.value
            : "";
    });
    selectTwoItem = coins.find((i) => {
        return selectedOptionTwo !== undefined
            ? i.id == selectedOptionTwo.value
            : "";
    });

    const changeHandler = (e) => {
        setLoading(true);
        let data = new FormData();
        data.append(
            "destination",
            selectedOption !== undefined ? selectedOption.value : ""
        );
        data.append(
            "source",
            selectedOptionTwo !== undefined ? selectedOptionTwo.value : ""
        );
        data.append(
            "source-price",
            parseInt(selectTwoItem !== undefined ? sourcePrice : "")
        );
        data.append("destination-price", 0);
        data.append("changed", "source");

        let config = {
            headers: {
                "Content-type": "application/json",
                
            },
            method: "POST",
            url: `${BASEURL}order/calculator/`,
            data: data,
        };
        axios(config)
            .then((response) => {
                setLoading(false);
                setCalcRespons(response.data);
                setDestinationPrice(response.data.destination_price);
                toast.success("نتیجه  : "  + response.data.destination_price);
            })
            .catch((error) => {});

    };
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            let data = new FormData();
            data.append(
                "destination",
                selectedOption !== undefined ? selectedOption.value : ""
            );
            data.append(
                "source",
                selectedOptionTwo !== undefined ? selectedOptionTwo.value : ""
            );
            data.append(
                "source-price",
                parseInt(selectTwoItem !== undefined ? sourcePrice : "")
            );
            data.append("destination-price", 0);
            data.append("changed", "source");

            let config = {
                headers: {
                    "Content-type": "application/json",
                    
                },
                method: "POST",
                url: `${BASEURL}order/calculator/`,
                data: data,
            };
            axios(config)
                .then((response) => {
                    setLoading(false);
                    setCalcRespons(response.data);
                    setDestinationPrice(response.data.destination_price);
                })
                .catch((error) => {});
        }, 2300);
    }, [sourcePrice, selectedOption, selectedOptionTwo]);
    let newCoins = coins.filter(
        (names) =>
            selectTwoItem !== undefined && names.name !== selectTwoItem.name
    );
    let newCoinsTwo = coins.filter(
        (names) => selectItem !== undefined && names.name !== selectItem.name
    );
    return (
        <Main className={stts.night == "true" ? "bg-gray no-shadow" : ""}>
            <h4>تبدیل</h4>
            <div className="d-flex flex-wrap res-699 w-100 justify-content-around align-items-center">
                <div className="send-coin">
                    <h6>مقدار و نوع ارز</h6>
                    <div className="send-box">
                        <input
                            className="amount"
                            placeholder="مقدار"
                            type="number"
                            onChange={(e) => {
                                setSourcePrice(e.target.value);
                            }}
                        />
                        <Select
                            value={selectedOptionTwo}
                            onChange={handleChangeTwo}
                            placeholder="انتخاب"
                            options={
                                newCoinsTwo.length !== 0
                                    ? newCoinsTwo.map((i, index) => {
                                          return {
                                              label: i,
                                              label: (
                                                  <div>
                                                      <img
                                                          src={i.image}
                                                          alt=""
                                                      />
                                                      {i.name}
                                                  </div>
                                              ),
                                              value: i.id,
                                              key: index,
                                          };
                                      })
                                    : coins.map((i, index) => {
                                          return {
                                              label: i,
                                              label: (
                                                  <div>
                                                      <img
                                                          src={i.image}
                                                          alt=""
                                                      />
                                                      {i.name}
                                                  </div>
                                              ),
                                              value: i.id,
                                              key: index,
                                          };
                                      })
                            }
                        />
                    </div>
                </div>
                {}
                <div className="send-coin">
                    <h6>مقدار و نوع ارز دریافتی </h6>
                    <div className="send-box">
                        <input
                            disabled
                            className="amount"
                            placeholder="مقدار دریافتی"
                            type="text"
                            value={
                                calcRespons !== undefined
                                    ? Intl.NumberFormat("en-US").format(calcRespons.destination_price)
                                    : ""
                            }
                        />
                        <Select
                            value={selectedOption}
                            onChange={handleChange}
                            placeholder="انتخاب"
                            options={
                                newCoins.length !== 0
                                    ? newCoins.map((i, index) => {
                                          return {
                                              label: i,
                                              label: (
                                                  <div>
                                                      <img
                                                          src={i.image}
                                                          alt=""
                                                      />
                                                      {i.name}
                                                  </div>
                                              ),
                                              value: i.id,
                                              key: index,
                                          };
                                      })
                                    : coins.map((i, index) => {
                                          return {
                                              label: i,
                                              label: (
                                                  <div>
                                                      <img
                                                          src={i.image}
                                                          alt=""
                                                      />
                                                      {i.name}
                                                  </div>
                                              ),
                                              value: i.id,
                                              key: index,
                                          };
                                      })
                            }
                        />
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <button
                    onClick={changeHandler}
                  
                >
                    تبدیل
                </button>
            </div>
        </Main>
    );
};

export default Change;
