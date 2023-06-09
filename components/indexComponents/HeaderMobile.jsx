import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import logo from '@/p/index_images/logo.svg'
import LineWeightIcon from '@mui/icons-material/LineWeight';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import LanguageIcon from '@mui/icons-material/Language';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import styled from '@emotion/styled'
import Link from 'next/link';
import Image from 'next/image';
import { Stack } from '@mui/material';
const Headerbody = styled.header`
    width: 100%;
    direction: rtl;
    padding-top: 8px;
    .MuiListItemText-root{
        text-align: right;
    }
    @media (min-width: 992px) {
        display: none;
    }

`
const SideBarBox = styled.div`
    padding-block: 16px;
    margin-inline: 16px;
    .login-box{
        width: 100%;
        .login{
            color: var(--blue900);
            background-color: var(--white300);
            font-size: 14px;
            padding-inline:32px;
            padding-block: 8px;
            width: auto;
            font-weight: 600;
            white-space: nowrap;
            border-radius: 4px;
            margin-left: 15px;
            
        }
        .sign-up{
            color: var(--white);
            background-color: var(--green);
            font-size: 14px;
            padding-inline: 32px;
            padding-block: 8px;
            width: auto;
            font-weight: 500;
            white-space: nowrap;
            border-radius: 4px;
            margin-left: 15px;
        }
    }
    .MuiListItemText-root{
        text-align: right;
    }
    .nav-icon-box{
            .nav-icon{
                color: var(--blue900);
                background-color: var(--white300);
                border-radius: 50%;
                border: none;
                padding: 5px;
                font-size: 12px;
                font-weight: 600;
                margin-inline: 8px;
                width: 40px;
                height: 40px;
                display: flex;
                &:hover{
                    color: var(--green);
                }
                svg{
                    margin-right: auto;
                }
                
            }
        }
        .search-cloes{
            width: 100%;
            .btn-cloes{
                color: var(--white400);
                border: none;
                background-color: transparent;
            }
        }
        .search-box{
            background-color: transparent;
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
`
export default function TemporaryDrawer() {
    const [state, setState] = React.useState(false);

    const toggleDrawer = (anchor, open) => (event) => {
        setState(open);
    };

    const list = (anchor) => (
        <SideBarBox>
            <Box
                sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
                role="presentation"
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
            >
                <div className="search-cloes d-flex align-items-center justify-content-between">
                    <div className="">
                        <button className='btn-cloes'><CloseIcon /></button>
                    </div>

                </div>
                <Divider />
                <Stack direction={"row"} gap={2} p={2} >
                    <Link href="/login" >
                        <Button variant='outlined' fullWidth>
                            ورود
                        </Button>
                    </Link>
                    <Link href="/register" >
                        <Button variant='contained' fullWidth>
                            ثبت نام
                        </Button>
                    </Link>
                </Stack>
                <List>
                    {links.map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <Link href={text.href}>
                                <ListItemButton>
                                    <ListItemText primary={text.label} sx={{ ["span"]: { textAlign: "left" } }} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))}
                </List>



            </Box>
        </SideBarBox>

    );

    return (
        <>
            <Headerbody>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <div className="">
                        <Image src={"/images/logo.png"} alt="" width={40} height={40} />
                    </div>
                    <Button onClick={toggleDrawer("left", true)} sx={{["&, *"]: {padding: "0px !important"}, minWidth: "30px", }}>{<LineWeightIcon />}</Button>
                </Stack>
                <Drawer
                    anchor={"left"}
                    open={state}
                    onClose={toggleDrawer("left", false)}
                >
                    {list("left")}
                </Drawer>
            </Headerbody>

        </>
    );
}

const links = [
    {
        label: 'خانه',
        href: "/"
    },
    {
        label: 'خرید وفروش',
        href: "/trade"
    },
    {
        label: 'راهنما',
        href: "/guide"
    },
    {
        label: 'آکادمی',
        href: "/help_metavers"
    },
    {
        label: 'سوالات متداول',
        href: "/faq"
    },
    {
        label: 'قوانین ما',
        href: "our_rules"
    },
    {
        label: 'درباره ما',
        href: "/about_us"
    },
    {
        label: 'تماس با ما',
        href: "/contact_us"
    }]