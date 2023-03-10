import { Person, PersonAdd } from "@mui/icons-material";
import { AppBar, Box, Button, Collapse, Container, Divider, IconButton, List, ListItemButton, ListItemText, Menu, MenuItem, MenuList, Stack, Typography, useMediaQuery } from "@mui/material";
import { styled } from '@mui/material/styles';
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { baseUrl } from "./BaseUrl";
import { SETTINGS } from './settings'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';


const Headers = styled(AppBar)(({ theme }) => ({
    background: theme.palette.common.white,

}))

const Nav = styled(Box)(({ theme }) => ({
    background: theme.palette.grey[100],
    paddingBlock: 2,
    [".active-nav"]: {
        color: `1px solid ${theme.palette.primary.main}`
    }
}))
const LandingHeaders = ({ page }) => {
    const [LoginUser, setLoginUser] = useState(false);
    const [Show, setShow] = useState(false);
    const isMobile = useMediaQuery("(max-width: 992px)")

    let token = "";
    setTimeout(() => {
        if (typeof window !== 'undefined') token = localStorage.getItem("token");
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
                        // setLoginUser(true)
                    } else {
                        // setLoginUser(false)
                    }
                })
                .catch((error) => { });
        }, 2200);
    }, []);


    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const open = Boolean(anchorEl);
    const open2 = Boolean(anchorEl2);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenu2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    return (
        <Headers>
            <Container maxWidth={"xl"}>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} paddingY={{
                    xs: 0,
                    md: 1
                }}>
                    <Box position={"relative"} width={130} height={62}>
                        <Image src={"/images/logo2.png"} layout={"fill"} onClick={() => Router.push("/")} alt='logo' />
                    </Box>

                    {!LoginUser ?
                        <Stack direction={"row"} spacing={2} alignItems={"center"} flexGrow={1} justifyContent={"flex-end"}>
                            <Link href={"/login"}>
                                <Button variant="outlined" startIcon={<Person />} size={!isMobile ? "large" : "small"}>
                                    <Typography color="primary">ورود</Typography>
                                </Button>
                            </Link>
                            <Link href={"/register"}>
                                <Button variant="contained" startIcon={<PersonAdd />} size={!isMobile ? "large" : "small"}>
                                    ثبت نام
                                </Button>
                            </Link>


                        </Stack>
                        :
                        <Link href={"/dashboard"}>
                            <Button variant="contained" startIcon={<Person />} size={!isMobile ? "large" : "small"}>
                                حساب کاربری
                            </Button>
                        </Link>
                    }
                </Stack>
            </Container>
            <Nav className="test">
                {!isMobile ? <Stack direction={'row'} justifyContent={"center"}>
                    {
                        NAVITEMS.map((item, idx) => {
                            if (item.path) return <Link href={item.path} key={idx}>
                                <Button variant='text' className={page === item.slug ? "active-nav" : ""} color={"neutral"}>
                                    <Typography variant="body2" color="common.white">{item.title}</Typography>
                                </Button>
                            </Link>

                            return <Box key={idx}>
                                <Button endIcon={<KeyboardArrowDownIcon />} onClick={handleMenu} variant="text" className={page === item.slug ? "active-nav" : ""} color={"neutral"}>
                                    <Typography variant="body2" color="common.white">{item.title}</Typography>
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    sx={{ "&, ul": { padding: " 0 !important" }, "li": { paddingBlock: 1.6 } }}
                                >
                                    {item.children.map((child, idx2) => {
                                        return <><MenuItem onClick={handleClose} key={idx2} >
                                            <Link href={child.path}>
                                                {/* <Button variant='text' fullWidth  color={"neutral"}  sx={{'&, & *': {p: 0}, height: "100%"}}> */}
                                                <Typography variant="body2" color="common.white">{child.title}</Typography>
                                                {/* </Button> */}
                                            </Link>
                                        </MenuItem>
                                            {idx2 < item.children.length - 1 && <Divider sx={{ margin: "0 !important" }} />}
                                        </>
                                    })}

                                </Menu>
                            </Box>
                        })
                    }
                </Stack>
                    :
                    <>
                        <IconButton onClick={handleMenu2}>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl2}
                            open={open2}
                            onClose={handleClose2}
                            sx={{
                                "&, ul": { padding: " 0 !important" },
                                "li": { paddingBlock: 1.6 },
                                "ul": {
                                    display: "flex",
                                    flexDirection: "column",
                                    maxWidth: "100vw",
                                    width: 300
                                }
                            }}
                        >
                            {
                                NAVITEMS.map((item, idx) => {
                                    if (item.path) return <Link href={item.path} key={idx}>
                                        <Button variant='text' className={page === item.slug ? "active-nav" : ""} color={"neutral"}>
                                            <Typography variant="body2" color="common.white">{item.title}</Typography>
                                        </Button>
                                    </Link>

                                    return <Box key={idx}>
                                        <Button fullWidth endIcon={<KeyboardArrowDownIcon />} onClick={e => setShow(f => !f)} variant="text" className={page === item.slug ? "active-nav" : ""} color={"neutral"}>
                                            <Typography variant="body2" color="common.white">{item.title}</Typography>
                                        </Button>
                                        <Collapse in={Show} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding >
                                                
                                                    {
                                                        item.children.map((child, idx2) => {
                                                            return <><ListItemButton sx={{ pl: 4 }}><ListItemText key={idx2}>
                                                                <Link href={child.path}>
                                                                    <Typography variant="body2" color="common.white">{child.title}</Typography>
                                                                </Link>
                                                            </ListItemText>
                                                            </ListItemButton>
                                                            {idx2 < item.children.length - 1 && <Divider sx={{ margin: "0 !important" }} />}
                                                            </>
                                                        })
                                                    }
                                                    
                                            </List>
                                        </Collapse>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose2}
                                            sx={{ "&, ul": { padding: " 0 !important" }, "li": { paddingBlock: 1.6 } }}
                                        >


                                        </Menu>
                                    </Box>
                                })
                            }

                        </Menu>
                    </>
                }

              
            </Nav>
        </Headers>
    );
};
export default LandingHeaders;



const NAVITEMS = [
    { slug: "home", title: "خانه", path: "/" },
    { slug: "trade", title: " خرید و فروش", path: "/trade" },
    { slug: "wallet", title: "خرید و فروش تتر", path: "/wallet" },
    {
        slug: "help", title: ` راهنمای ${SETTINGS.WEBSITE_NAME}`, path: null, children: [
            { slug: "", title: "آموزش خرید و فروش ارز دیجیتال", path: "/help_buy_sell" },
            { slug: "", title: "آموزش خرید و فروش تتر", path: "/help_buy_usdt" },
            { slug: "", title: "راهنمای ثبت نام", path: "/help_register" },
        ]
    },
    { slug: "", title: `آکادمی ${SETTINGS.WEBSITE_NAME}`, path: "/" },
    { slug: "faq", title: "سوالات متداول", path: "/faq" },
    { slug: "rules", title: "قوانین ما", path: "/our_rules" },
    { slug: "about", title: "درباره ما", path: "/about_us" },
    { slug: "contact", title: "تماس با ما", path: "/contact_us" },
]