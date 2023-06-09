import React from 'react'
import HeaderMobile from '@/c/indexComponents/HeaderMobile'
import logo from '@/p/images/logo.png'
import SearchIcon from '@mui/icons-material/Search';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LanguageIcon from '@mui/icons-material/Language';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import styled from '@emotion/styled'
import Image from 'next/image';
import Link from 'next/link';
import { Button, Stack } from '@mui/material';
import { theme } from '../settings';
const Headerbody = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--white);
	transition: background-color 0.5s ease 0s;
    padding-inline: 32px;

    .navbar-nav > a{
        padding-inline: 8px;
        display: grid;
        place-items:center;
    }
    .dropdown-menu a {
        width: 100%;
        display: block;
        font-size: 12px;
        text-align: left;
        padding: 6px
    }
    .header-box{
        background-color:var(--white);
        .navbar-brand{
            position: relative;
           margin-right: 64px;
        }
        .nav-item a.dropdown-item{
            color: var(--blue900);
            font-size: 12px;
            font-weight: 400;
            text-align: left;
        }
        .rewards-hubs-box{
            .rewards-hubs-link{
                color: var(--green);
                background-color: var(--opgreen);
                font-size: 14px;
                font-weight: 500;
                border-radius: 8px;
                padding: 7px 10px;
                margin-left: 24px;
            }
        }
        .search-box{
            background-color: var(--white300);
            border-radius: 20px;
            padding-inline: 10px;
            padding-block: 8px;
            .search-input{
                border: none;
                background: transparent;
                font-size: 14px;
                color: var(--blue900);

                &::placeholder{
                    color: var(--white400);
                }
            }
            .btn-search{
                color: var(--white400);
                border: none;
                background-color: transparent;
            }
        }
    }
   
    @media (max-width: 992px){
        .header-box{
            display: none;
        }
        .user-body{
            display: none;
        }
    }
`
function Header() {
    return (
        <>
            <Headerbody>
                <HeaderMobile />
                <div className="header-box d-lg-flex align-items-center">
                    <div className="nav-box">
                        <Navbar expand="lg">
                            <Container>
                                <Navbar.Brand href="#home">
                                    <Image src={logo} alt="" width={52} height={52} />
                                </Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto">
                                        <Nav.Link as={Link} href="/" >خانه</Nav.Link>
                                        <Nav.Link as={Link}  href="/trade">خرید وفروش</Nav.Link>
                                        <NavDropdown title="راهنما" >
                                            <NavDropdown.Item href="/help_buy_sell" as={Link}>
                                                راهنمای خرید و فروش
                                            </NavDropdown.Item>
                                            
                                            <NavDropdown.Item href="/help_buy_usdt" as={Link}>راهنمای خرید تتر</NavDropdown.Item>
                                            
                                            <NavDropdown.Item href="/help_metavers" as={Link}>
                                                راهنمای سایت
                                            </NavDropdown.Item>
                                            
                                            <NavDropdown.Item href="/help_register" as={Link}>
                                                راهنمای ثبت نام
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                        <Nav.Link href="#link">آکادمی</Nav.Link>
                                        <Nav.Link href="#link">سوالات متداول</Nav.Link>
                                        <Nav.Link href="#link">قوانین ما</Nav.Link>
                                        <Nav.Link href="#link">درباره ما</Nav.Link>
                                        <Nav.Link href="#link">تماس با ما</Nav.Link>


                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>




                    </div>


                </div>
                <div className="user-body d-lg-flex align-items-center">
                    <Stack direction="row" gap={1}>
                        <Link href="/login">
                            <Button variant='outlined' >
                                 ورود
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button variant='contained' >
                                ثبت نام
                            </Button>
                        </Link>
                    </Stack>

                </div>
            </Headerbody>
        </>
    )
}

export default Header