import axios from "axios";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { baseUrl } from "./BaseUrl";
const Headers = styled.div`
    background: #ffffff;
    .sign-in {
        span {
            border: 1px solid #fd961a;
            color: #fd961a;
            font-size: 13px;
            background: transparent;
            padding: 11px 17px;
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
        }
    }
    .sign-up {
        span {
            border: 1px solid #fd961a;
            background: #fd961a;
            font-size: 13px;
            transition: 0.3s;
            font-weight: 600;
            padding: 11px 17px;
            svg {
                margin-left: 10px;
                fill: #fff;
            }
            :hover {
                background: rgba(253, 150, 26, 0.9) !important;
                outline: none !important;
                color: #fff;
            }
        }
    }
    .user {
        display: flex;
        align-items: center;
        padding: 20px 0;
    }
    ul.user li {
        padding-right: 25px;
    }
    @media (max-width: 768px) {
        img {
            width: 115px !important;
            height: 50px !important;
            padding-right: 10px !important;
        }
        span {
            padding: 7px 11px !important;
            font-size: 11px !important;
        }
        ul.user {
        }
        ul.user li.sign-in {
            padding-right: 5px !important;
        }
        ul.user li {
            padding-right: 10px !important;
        }
        ul {
            padding-left: 10px !important;
        }
    }
`;

const Nav = styled.nav`
    border-bottom: 1px solid #222;
    position: relative;
    height: 50px;
    color: rgb(153, 153, 153);
    display: flex;
    align-items: center;
    justify-content: center;
    background: #111;
    text-align: center;
    width: 100%;
    li {
        margin: 0 13px;
        cursor: pointer;
        font-weight: 500;
        font-size: 15px;
        color: #fff;
    }
    ul {
        margin-bottom: 0;
    }
    .active {
        color: #fd961a;
    }
    .menu-btn {
        display: none;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        cursor: pointer;
        transition: 0.5s;
        span {
            transition: 0.5s;
            width: 24px;
            height: 2px;
            background-color: #fd961a;
            padding: 0 !important;
            margin: 3px 0;
        }
    }
    .open-menu {
        span {
            :first-child {
                transform: rotate(45deg) translateY(7px) translateX(4px) !important;
            }
            :nth-child(2) {
                opacity: 0;
            }

            :nth-child(3) {
                transform: rotate(-45deg) translateY(-7px) translateX(4px) !important;
            }
        }
    }
	.dropdown {
    position: absolute;
    margin: 0px;
    padding: 0px;
    display: none;
    list-style: none;
    z-index: 99999;
    background: black;


		
	}
	.mobilemenu {
		display:none;
	}
	ul li:hover {
		color:orange;
	}
	.guideli:hover > ul{
    display:block;
}
    @media (max-width: 992px) {
        justify-content: flex-start;
        padding: 0 14px;

      .desktopmenu {
		  
		  display : none !important; 
	  }
        .menu-btn {
            display: flex;
        }
		
		.mobilemenu {
	    display: none;
    list-style: none;
    position: absolute;
    width: 320px;
    z-index: 999;
    background: black;
    top: 50px;
	border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
		
	}
	
	.mobilemenu li {
		
		padding:5px;
	}
	
	.mobilemenu .dropdown {
    position: relative;
    margin: 0px;
    padding: 0px;
    list-style: none;
    z-index: 99999;
    background: #555;
}
		
    }
`;
const LandingHeaders = (props) => {
    const [LoginUser, setLoginUser] = useState(false);
	const [Show ,setShow] = useState(false);
	
	 const handleClick = () => {

  var x = document.getElementById("mobilemenu2");
  
  console.log(x.style.display);
  
  if (x.style.display === "none" || x.style.display === "" ) {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }


    

  };
	
    let token = "";
    setTimeout(() => {
        if( typeof window !=='undefined' )token = localStorage.getItem("token");
    }, 2000);

    useEffect(() => {
        setTimeout(() => {
            let config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                url: `${baseUrl}account/details/`,
                method: "GET",
            };
            axios(config)
                .then((res) => {
                    if (res.status == "200") {
                        setLoginUser(true)
                    }else{
                        setLoginUser(false)
                    }
                })
                .catch((error) => {});
        }, 2200);
    }, []);
    return (
        <Headers>
            <div className="container">
                <div className="d-flex align-items-center justify-content-between">
                    <img
                        onClick={() => {
                            Router.push("/");
                        }}
                        className="logo"
                        src="/images/logo2.png"
                      
                        height={62}
                        alt=""
                    />
                    {!LoginUser &&
                    <ul className="unstyled user d-flex">
                        <li className="sign-in">
                            <span
                                className="btn btn-primary"
                                onClick={() => {
                                    Router.push("/login");
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="16"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        id="ic_person_24px"
                                        d="M12,12A4,4,0,1,0,8,8,4,4,0,0,0,12,12Zm0,2c-2.67,0-8,1.34-8,4v2H20V18C20,15.34,14.67,14,12,14Z"
                                        transform="translate(-4 -4)"
                                    />
                                </svg>
                                ورود
                            </span>
                        </li>
                        <li className="sign-up">
                            <span
                                className="btn btn-primary"
                                onClick={() => {
                                    Router.push("/register");
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="16"
                                    viewBox="0 0 22 16"
                                >
                                    <path
                                        id="ic_person_add_24px"
                                        d="M15,12a4,4,0,1,0-4-4A4,4,0,0,0,15,12ZM6,10V7H4v3H1v2H4v3H6V12H9V10Zm9,4c-2.67,0-8,1.34-8,4v2H23V18C23,15.34,17.67,14,15,14Z"
                                        transform="translate(-1 -4)"
                                    />
                                </svg>
                                ثبت نام
                            </span>
                        </li>
                    </ul>
                    }
                    {LoginUser &&
                    <ul className="unstyled user d-flex">
                        <li className="sign-in">
                            <span
                                className="btn btn-primary"
                                onClick={() => {
                                    Router.push("/dashboard");
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="16"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        id="ic_person_24px"
                                        d="M12,12A4,4,0,1,0,8,8,4,4,0,0,0,12,12Zm0,2c-2.67,0-8,1.34-8,4v2H20V18C20,15.34,14.67,14,12,14Z"
                                        transform="translate(-4 -4)"
                                    />
                                </svg>
                                حساب کاربری
                            </span>
                        </li>
                        
                    </ul>}
                </div>
            </div>
            <Nav className="navigation">
			 <ul className="desktopmenu list-unstyled d-flex align-items-center">
                    <li
                        onClick={() => {
                            Router.push("/");
                        }}
                        className={props.page == "index" && "active"}
                    >
                        خانه
                    </li>
                    <li
                        onClick={() => {
                            Router.push("/trade");
                        }}
                        className={props.page == "trade" && "active"}
                    >
                        خرید و فروش{" "}
                    </li>
                    <li
                        onClick={() => {
                            Router.push("/change");
                        }}
                        
                        className={props.page == "change" && "active"}
                    >
                        خرید و فروش تتر{" "}
                    </li>
                    <li
                        onClick={() => {
                            Router.push("/guide");
                        }}
                        className={ 'guideli ' + (props.page == "guide" && "active") }
						
                    >
                        راهنمای متاورس
						<ul className="dropdown" >
						
						<li className="menu-items" ><a href="https://metavers-ex.com/help_buy_sell">آموزش خرید و فروش ارز دیجیتال</a></li>
						<li className="menu-items" ><a href="https://metavers-ex.com/help_buy_usdt">آموزش خرید و فروش تتر
</a></li>
						<li className="menu-items" ><a href="https://metavers-ex.com/help_register">راهنمای ثبت نام
</a></li>
						
						</ul>
						
						
                    </li>
                    <li>
                        <a className="no-under" target="blank" href="https://blog.metavers-ex.com">
                            آکادمی متاورس{" "}
                        </a>
                    </li>

                    <li
                        onClick={() => {
                            Router.push("/faq");
                        }}
                        className={props.page == "faq" && "active"}
                    >
                        {" "}
                        سوالات متداول{" "}
                    </li>
                    <li
                        onClick={() => {
                            Router.push("/our_rules");
                        }}
                        className={props.page == "our_rules" && "active"}
                    >
                        قوانین ما{" "}
                    </li>
                    <li
                        onClick={() => {
                            Router.push("/about_us");
                        }}
                        className={props.page == "about_us" && "active"}
                    >
                        درباره ما{" "}
                    </li>
                    <li
                        onClick={() => {
                            Router.push("/contact_us");
                        }}
                        className={props.page == "contact_us" && "active"}
                    >
                        تماس با ما
                    </li>
                </ul>
                <ul className="mobilemenu" id="mobilemenu2">
                    <li
                        onClick={() => {
                            Router.push("/");
                        }}
                        className={props.page == "index" && "active"}
                    >
                        خانه
                    </li>
                    <li
                        onClick={() => {
                            Router.push("/trade");
                        }}
                        className={props.page == "trade" && "active"}
                    >
                        خرید و فروش{" "}
                    </li>
                    <li
                        onClick={() => {
                            Router.push("/change");
                        }}
                        
                        className={props.page == "change" && "active"}
                    >
                        خرید و فروش تتر{" "}
                    </li>
                    <li
                        onClick={() => {
                            Router.push("/guide");
                        }}
                        className={ 'guideli ' + (props.page == "guide" && "active") }
						
                    >
                        راهنمای متاورس
						<ul className="dropdown" >
						
						<li className="menu-items" ><a href="https://metavers-ex.com/help_buy_sell">آموزش خرید و فروش ارز دیجیتال</a></li>
						<li className="menu-items" ><a href="https://metavers-ex.com/help_buy_usdt">آموزش خرید و فروش تتر
</a></li>
						<li className="menu-items" ><a href="https://metavers-ex.com/help_register">راهنمای ثبت نام
</a></li>
						
						</ul>
						
						
                    </li>
                    <li>
                        <a className="no-under" target="blank" href="https://blog.metavers-ex.com">
                            آکادمی متاورس{" "}
                        </a>
                    </li>

                    <li
                        onClick={() => {
                            Router.push("/faq");
                        }}
                        className={props.page == "faq" && "active"}
                    >
                        {" "}
                        سوالات متداول{" "}
                    </li>
                    <li
                        onClick={() => {
                            Router.push("/our_rules");
                        }}
                        className={props.page == "our_rules" && "active"}
                    >
                        قوانین ما{" "}
                    </li>
                    <li
                        onClick={() => {
                            Router.push("/about_us");
                        }}
                        className={props.page == "about_us" && "active"}
                    >
                        درباره ما{" "}
                    </li>
                    <li
                        onClick={() => {
                            Router.push("/contact_us");
                        }}
                        className={props.page == "contact_us" && "active"}
                    >
                        تماس با ما
                    </li>
                </ul>
                <div
                    className={Show ? "menu-btn open-menu" : "menu-btn"}
                    onClick={() => {
                         setShow(!Show);
						handleClick();
                    }}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </Nav>
        </Headers>
    );
};

export default LandingHeaders;
