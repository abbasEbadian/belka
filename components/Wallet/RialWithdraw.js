import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from '@mui/material/styles';
import QRCode from "react-qr-code";
import axios from "axios";
import Select from "react-select";

const Main = styled('div')`
    z-index: 10;
    .box {
        width: 595px;
        background: #ffffff;
        border-radius: 16px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 32px;
        padding-top: 16px;
        p {
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            text-align: right;
            color: #29335c;
        }
        .text-red {
            color: #f15152;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
        }
    }
    @media (max-width: 992px) {
        .box {
            width: 90% !important;
            z-index: 1;
        }
    }
    @media (max-width: 786px) {
        .to-col {
            flex-direction: column;
            align-items: center;
        }
        .box {
            height: 560px !important;
        }
    }
`;

const InputBox = styled('div')`
    width: 100%;
    position: relative;
    input {
        background: #ffffff;
        border: 1.5px solid #dbdbdb;
        box-sizing: border-box;
        border-radius: 8px;
        padding: 10px;
        width: 100%;
        margin-top: 7px;
        @media (max-width: 786px) {
            height: 40px;
        }
    }
    button {
        position: absolute;
        width: 86px;
        height: 31px;
        background: rgba(16, 138, 187, 0.3);
        border-radius: 61px;
        left: 12px;
        top: 12px;
        font-size: 12px;
        font-weight: 500;
        color: #29335c;
    }
`;

const Submit = styled('button')`
    :disabled {
        opacity: 0.5;
    }
    width: 193px;
    height: 37px;
    background: linear-gradient(90deg, #5965f9  -1.72%, #7d86fd  100%);
    border-radius: 32px;
    color: #ffff;
    font-weight: 500;
    font-size: 14px;
    margin-right: auto;
    margin-left: auto;
    margin-top: 24px;
    transition: 0.5s;
    :hover {
        opacity: 0.9;
    }
`;

const AddCard = styled('div')`
    button {
        width: 130px;
        height: 36px;
        border-radius: 10px;
    }
    .d-flex {
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-between;
    }
    input {
        width: 100%;
        direction: ltr;
        margin-bottom: 16px;
        height: 40px;
        padding: 10px;
        border-radius: 10px;
        border: 1px solid #ddd;
    }
    .w-50 {
        direction: rtl;
    }
`;
const Limits = styled('div')`
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
    margin-top: 20px;
    span {
        display: block;
        text-align: center;
    }
`;

const RialWithdraw = (props) => {
    const wallet = props.wallet;
    const itemTo = props.itemTo;
    const [value, setValue] = useState();
    const [selectedOption, setSelectedOption] = useState();
    const [cards, setCards] = useState([]);
    const [bankNames, setBankNames] = useState("");

    const [cardNumber, setCardNumber] = useState("");
    const [shaba, setShaba] = useState("");
    const [bank, setBank] = useState("");
    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };
    const [getOtp, setGetOtp] = useState(false);
    const [otp, setOtp] = useState("");
    
    let token = "";
    if( typeof window !=='undefined' )token = localStorage.getItem("token");
    let cc = [];

    useEffect(() => {
        let config = {
            headers: {
                "Content-type": "application/json",
                
            },
            url: `${BASEURL}bank/list/`,
            method: "GET",
        };
        axios(config)
            .then((res) => {
                if (res.status == "200") {
                    setCards(res.data);
                }
            })
            .catch((error) => {});
    }, []);
    cc = Object.entries(cards);
    let item = wallet.find((i) => {
        if (i.service !== undefined) {
            return i.service.small_name_slug == itemTo.small_name_slug;
        }
    });
    const addCardHandler = (e) => {
        let data = {
            card: cardNumber,
            shaba,
            bank,
        };
        let config = {
            method: "POST",
            url: `${BASEURL}bank/add/`,
            data: data,
            headers: {
                "Content-type": "application/json",
                
            },
        };

        axios(config)
            .then((response) => {
                toast.error(response.data.message);
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const withdrawOtpHandler = (e) => {
        let config = {
            method: "GET",
            url: `${BASEURL}wallet/withdrawal/otp/`,
            headers: {
                "Content-type": "application/json",
                
            },
        };
        axios(config)
            .then((response) => {
                setGetOtp(true);
                response.data.error > 0
                    ? toast.error(response.data.message)
                    : toast.success(response.data.message);
            })
            .catch((error) => {});
    };

    const withdrawHandler = (e) => {
        let data = {
            type: "2",
            amount: value,
            bank_id: selectedOption,
            otp,
        };
        let config = {
            method: "POST",
            url: `${BASEURL}wallet/manage/`,
            data: data,
            headers: {
                "Content-type": "application/json",
                
            },
        };

        axios(config)
            .then((response) => {
                response.data.error > 0
                    ? toast.error(response.data.message)
                    : toast.success(response.data.message);
            })
            .catch((error) => {});
    };
    
    return (
        <>
            <Main>
                {!getOtp ? (
                    <div
                        className={
                            props.stts.night == "true" ? "bg-gray box" : " box"
                        }
                    >
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <span>برداشت ریالی</span>
                            <svg
                                onClick={() => {
                                    props.setBlur(false);
                                    props.setShowRialWithDrow(false);
                                }}
                                className="c-p"
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 20L20 12"
                                    stroke="#777777"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M20 20L12 12"
                                    stroke="#777777"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <p>
                            در صورت تمایل به برداشت موجودی کیف پول ریالی ،
                            درخواست خود را اینجا ثبت نمایید.
                        </p>
                        <p className="text-red">
                            مبلغ به صورت پایا به شما انتقال داده می شود
                        </p>
                        <span>میزان برداشت </span>
                        <Limits>
                            <span>
                                حداقل مقدار برداشت :{" "}
                                <span className="text-danger">
                                    {itemTo !== undefined && itemTo.withdraw.min}{" "}
                                    {itemTo.name}
                                </span>
                            </span>
                            <span>
                                حداکثر مقدار برداشت :{" "}
                                <span className="text-danger">
                                    {itemTo !== undefined && itemTo.withdraw.max}{" "}
                                    {itemTo.name}
                                </span>
                            </span>
                            <span>
                                کارمزد برداشت :{" "}
                                <span className="text-danger">
                                    {itemTo !== undefined && itemTo.withdraw.fee}{" "}
                                    {itemTo.name}
                                </span>
                            </span>
                        </Limits>
                        <InputBox>
                            <input
                                value={value}
                                onChange={(e) => {
                                    setValue(e.target.value);
                                }}
                                type="text"
                            />
                            <button
                                onClick={() => {
                                    setValue(item.balance);
                                }}
                                className={
                                    props.stts.night == "true"
                                        ? "color-white-2"
                                        : " "
                                }
                            >
                                کل موجودی
                            </button>
                        </InputBox>
                        {cards.length == 0 ? (
                            <AddCard>
                                <span className="d-block mt-4 mb-3">
                                    افزودن کارت
                                </span>
                                <div className="d-flex">
                                    <input
                                        onChange={(e) => {
                                            setCardNumber(e.target.value);
                                        }}
                                        type="text"
                                        placeholder="شماره کارت"
                                    />
                                    <input
                                        onChange={(e) => {
                                            setShaba(e.target.value);
                                        }}
                                        type="text"
                                        placeholder="شماره شبا"
                                    />
                                </div>
                                <div className="flex-row align-center w-100 d-flex justify-content-between">
                                    <select
                                        className="mb-4 form-control"
                                        onChange={(e) => {
                                            setBank(e.target.value);
                                        }}
                                    >
                                        {bankNames.length !== 0
                                            ? bankNames.map((i) => {
                                                  return (
                                                      <option
                                                          key={i.name}
                                                          value={i.name}
                                                      >
                                                          {i.name}
                                                      </option>
                                                  );
                                              })
                                            : ""}
                                    </select>
                                    <button
                                        onClick={addCardHandler}
                                        className="btn-success"
                                    >
                                        افزودن کارت
                                    </button>
                                </div>
                            </AddCard>
                        ) : (
                            <>
                                <span className="d-block mt-4">حساب مقصد</span>

                                <select
                                    className="form-control"
                                    placeholder="انتخاب"
                                    onChange={handleChange}
                                >
                                    <option value="">انتخاب</option>

                                    {cards.length !== 0
                                        ? cards.map((i) => {
                                              if (i.status == "confirmed") {
                                                  return (
                                                      <option
                                                          key={i.name}
                                                          value={i.id}
                                                      >
                                                          {i.card}
                                                      </option>
                                                  );
                                              }
                                          })
                                        : ""}
                                </select>
                                {value > item.balance ? (
                                    <div className="text-danger mt-2 me-2">
                                        موجودی ناکافی !
                                    </div>
                                ) : (
                                    ""
                                )}
                                <div className="w-100 d-flex justify-content-center">
                                    <Submit
                                        onClick={withdrawOtpHandler}
                                        disabled={value > item.balance || itemTo.withdraw.min > value || itemTo.withdraw.max < value}
                                    >
                                        ثبت درخواست برداشت
                                    </Submit>
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <div
                        className={
                            props.stts.night == "true" ? "bg-gray box" : " box"
                        }
                    >
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <span>برداشت ریالی</span>
                            <svg
                                onClick={() => {
                                    props.setBlur(false);
                                    props.setShowRialWithDrow(false);
                                }}
                                className="c-p"
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 20L20 12"
                                    stroke="#777777"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M20 20L12 12"
                                    stroke="#777777"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        <span>لطفا کد تایید را وارد نمایید </span>
                        <InputBox>
                            <input
                                value={otp}
                                onChange={(e) => {
                                    setOtp(e.target.value);
                                }}
                                type="text"
                            />
                        </InputBox>
                        <div className="w-100 d-flex justify-content-center">
                            <Submit onClick={withdrawHandler}>
                                ثبت درخواست برداشت
                            </Submit>
                        </div>
                    </div>
                )}
            </Main>
        </>
    );
};

export default RialWithdraw;
