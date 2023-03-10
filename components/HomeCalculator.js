import React from "react";
import Select from 'react-select'
import styled from "styled-components";
import Image from "next/image";
import { useEffect, useState } from "react";
import Router from "next/router";
import { baseUrl } from "../components/BaseUrl";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SETTINGS } from "./settings";



const Calc = styled.div`
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
        align-items: stretch;
        input{
            height: 100%;
        }
        img {
            width: 22px;
            margin-left: 10px;
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
	.send-coin {
		margin-bottom : 15px;
		margin-top : 15px;
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

const HomeCalculator = () => {

    const [coins, setCoins] = useState([]);

    const [selectedOption, setSelectedOption] = useState();
    const [selectedOptionTwo, setSelectedOptionTwo] = useState();


    let config = {
        url: `${baseUrl}service/list/`,
        method: "GET",
    };

    useEffect(() => {
        axios(config)
            .then((res) => {
                setCoins(res.data);


            })
            .catch((error) => { });
    }, []);

    const docalc = (selectedOption) => {

        setSelectedOption(selectedOption);



    };

    const docalctwo = (selectedOptionTwo) => {

        setSelectedOptionTwo(selectedOptionTwo);


    };


    const excalc = (e) => {

        var src = selectedOption.value;
        var dst = selectedOptionTwo.value;

        if (selectedOptionTwo.key == 0) {

            var res = src * dst * e;
        } else {
            var res = (src / dst) * e;
        }



        document.getElementById('ramount').value = res;



    };



    return (
        <Calc>
            <div className="container">
                <h2>
                    ماشین حساب <span> {SETTINGS.WEBSITE_NAME}</span>
                </h2>
                <div className="send-coin">
                    <h6>مقدار و نوع ارز  </h6>
                    <div className="send-box">

                        <input
                            className="amount"
                            id="amount"
                            placeholder="مقدار"
                            type="tel"
                            onKeyUp={(e) => {
                                excalc(e.target.value);
                            }}

                        />
                        <Select
                            value={selectedOption}
                            onChange={docalc}
                            placeholder="انتخاب"
                            options={
                                typeof coins === typeof [] ?(coins.length > 0
                                    ? coins
                                        .filter(i => i.name != "تومان")
                                        .map((i, index) => {
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
                                                value: i.buyPrice,
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
                                            value: i.buyPrice,
                                            key: index,
                                        };
                                    })): []
                            }
                        />

                    </div>
                </div>
                <div className="send-coin">
                    <h6>مقدار و نوع ارز دریافتی </h6>
                    <div className="send-box">


                        <Select
                            value={selectedOptionTwo}
                            onChange={docalctwo}
                            placeholder="انتخاب"
                            options={
                                typeof coins === typeof [] ?(coins.length !== 0
                                    ? coins.map((i, index) => {
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
                                            value: i.buyPrice,
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
                                            value: i.buyPrice,
                                            key: index,
                                        };
                                    })): []
                            }
                        />

                        <input
                            className="ramount"
                            placeholder="مقدار"
                            type="number"
                            id="ramount"


                        />

                    </div>
                </div>
            </div>
        </Calc>
    );
};

export default HomeCalculator;
