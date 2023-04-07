import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import { BASEURL, SETTINGS } from "../components/settings";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "bootstrap/dist/css/bootstrap.css";
import Image from "next/image";
import axios from "axios";
import NightModeContext from "../components/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useFetchBanks, useFetchCards } from "../components/hooks";



const Content = styled('div')`
    overflow: hidden;
    transition: 0.1s all;
    background-color: #e4e3ef;
    width: 100%;
    min-height: 100vh;
    padding-bottom: 70px;

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
        overflow-x: hidden;
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
const CardsMain = styled('div')`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 70px 32px;
    overflow: hidden;
    @media (max-width: 1250px) {
        padding-top: 16px;
    }
    .bg-dark-2 label div {
        color: #fff !important;
    }
`;
const Box = styled('div')`
    width: 100%;
    height: 100%;
    background-color: #fff;
    box-shadow: 0px 2px 8px rgba(50, 50, 50, 0.12);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    padding: 24px;
    svg {
        margin-left: 6px;
    }
    .auth-btn {
        margin-top: 24px;
        width: 130px;
        margin-right: auto;
        margin-left: auto;
        height: 40px;
        border-radius: 8px;
    }
    .edit-prof {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        span {
            font-size: 16px;
            font-weight: 700;
        }
    }
    .setting {
        display: flex;
        align-items: center;
        padding-bottom: 13px;
        padding-top: 13px;
        border-bottom: 1px solid #eee;
        span {
            color: #777777;
        }
    }
    @media (max-width: 1250px) {
        margin-bottom: 50px;
        margin-top: 0;
    }
    .under-line {
        padding-bottom: 16px;
        border-bottom: 1px solid #eee;
        margin-bottom: 20px;
    }
`;
const Card = styled('div')`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding: 16px;
    width: 100%;
    margin-top: 20px;
    justify-content: space-between;
    .divs {
        display: flex;
        align-items: center;
    }
`;

const AddCard = styled('button')`
    width: 260px;
    height: 40px;
    margin-right: auto;
    margin-left: auto;
    background: linear-gradient(90deg, #5965f9 -1.72%, #7d86fd 100%);
    border-radius: 16px;
    margin-top: 40px;
    color: #fff;
`;

const Modal = styled('div')`
    position: absolute;
    z-index: 10;
    width: 450px;
    padding: 20px;
    right: 50%;
    bottom: 40%;
    transform: translate(50%);
    background-color: #646464;
    border-radius: 16px;
    padding-top: 0;
    @media (max-width: 768px) {
        width: 280px;
    }
    .modal-h {
        padding-top: 10px;
    }
    input {
        display: block;
        width: 100%;
        background-color: transparent;
        border: 1px solid #fff;
        color: #fff;
        border-radius: 16px;
        height: 40px;

        padding: 10px;
        direction: ltr;
        :first-child {
            margin-top: 20px;
			margin-Bottom : 20px;
        }
        ::placeholder {
            color: #fff;
        }
    }
    select {
        background-color: transparent;
        border-radius: 16px;
        margin-top: 10px;
        color: #fff;
    }
    button {
        width: 100%;
        height: 40px;
        border-radius: 16px;
        background-color: #04c42d;
    }
	.sheba {
		direction: ltr;
	}
`;
Cards.title = `صرافی ${SETTINGS.WEBSITE_NAME} | حساب های بانکی`
export default function Cards() {
    const [cardNumber, setCardNumber] = useState("");
    const [shaba, setShaba] = useState("");
    const [bank, setBank] = useState("");
    const [showModal, setShowModal] = useState(false);



    const stts = useContext(NightModeContext);

    const [showMenu, setShowMenu] = useState(true);
    const menuHandler = () => {
        setShowMenu(!showMenu);
    };

    const { data: cards } = useFetchCards()
    const { data: bankNames } = useFetchBanks()


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
                response.data.error == 1
                    ? toast.error(response.data.message)
                    : toast.success("اطلاعات حساب شما ثبت شد و توسط کارشناسان در حال بررسی می باشد.");
                setShowModal(false);
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    return (
        <>
            <div className="max-w-1992">
                <Sidebar show-menu={menuHandler} active="5" show={showMenu} />
                {showModal ? (
                    <Modal>
                        <div className="modal-h">
                            <svg
                                onClick={() => {
                                    setShowModal(false);
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
                                    stroke="#fff"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                                <path
                                    d="M20 20L12 12"
                                    stroke="#fff"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                            </svg>
                        </div>
                        <div>
                            <input
                                onChange={(e) => {
                                    setCardNumber(e.target.value);
                                }}
                                type="number"
                                placeholder="شماره کارت"
                                value={cardNumber}
                            />


                            <InputGroup className="mb-3 sheba">
                                <InputGroup.Text id="basic-addon1">IR</InputGroup.Text>
                                <Form.Control
                                    placeholder=" IR شماره شبا بدون "
                                    type="number"
                                    aria-describedby="basic-addon1"
                                    onChange={(e) => {
                                        setShaba(e.target.value);
                                    }}
                                />
                            </InputGroup>

                            <select
                                className="form-control"
                                onChange={(e) => {
                                    setBank(e.target.value);
                                }}
                                value={bank}
                            >
                                <option>انتخاب</option>
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
                                className="btn-success mt-4"
                                disabled={
                                    cardNumber.length == 0 ||
                                    shaba.length == 0 ||
                                    bank.length == 0
                                }
                            >
                                افزودن کارت
                            </button>
                        </div>
                    </Modal>
                ) : (
                    ""
                )}
                <Content
                    className={
                        showMenu
                            ? stts.night == "true"
                                ? "pr-176 bg-dark-2"
                                : "pr-176 "
                            : stts.night == "true"
                                ? "bg-dark-2 pr-80"
                                : " pr-80"
                    }
                >
                    <Header show-menu={menuHandler} />
                    <CardsMain>
                        <Box className={stts.night == "true" ? "bg-gray" : ""}>
                            <h6 className="under-line">
                                حساب یا کارت های متصل
                            </h6>
                            {cards.map((item) => {
                                return (
                                    <Card key={item.card}>
                                        <div className="divs">
                                            {" "}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="16"
                                                viewBox="0 0 20 16"
                                                fill="#777777"
                                            >
                                                <path
                                                    id="ic_credit_card_24px"
                                                    d="M20,4H4A1.985,1.985,0,0,0,2.01,6L2,18a1.993,1.993,0,0,0,2,2H20a1.993,1.993,0,0,0,2-2V6A1.993,1.993,0,0,0,20,4Zm0,14H4V12H20ZM20,8H4V6H20Z"
                                                    transform="translate(-2 -4)"
                                                ></path>
                                            </svg>
                                            <div>
                                                <span className="me-2 d-block">
                                                    {item.bank}
                                                </span>
                                                <span className="me-2 d-block">
                                                    {item.card}
                                                </span>
                                            </div>
                                        </div>
                                        {item.status == "confirmed" ? (
                                            <div className="text-success-2">
                                                تایید شده
                                            </div>
                                        ) : item.status == "pending" ? (
                                            <span>در حال بررسی</span>
                                        ) : (
                                            <div className="text-danger">
                                                رد شده
                                            </div>
                                        )}
                                    </Card>
                                );
                            })}
                            <AddCard
                                onClick={() => {
                                    setShowModal(true);
                                }}
                            >
                                افزودن کارت
                            </AddCard>
                        </Box>
                    </CardsMain>
                </Content>
            </div>
        </>
    );
}
