import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { My } from "@components";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));

const MuiMenu = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const anchorRef = useRef(null);

    const handleClickEditButton = (e) => {
        if (e.key !== "Enter") {
            setOpen(false);
            setModalVisible(true);
        }
    };

    const handleClickLogoutButton = (e) => {
        if (e.key !== "Enter") {
            setOpen(false);
            sessionStorage.removeItem("PID");

            Swal.fire({
                icon: "success",
                title: "로그아웃 되었습니다!",
            }).then(() => {
                navigate("/login");
            });
        }
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    function handleListKeyDown(event) {
        if (event.key === "Enter") {
            event.preventDefault();
        }
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        }
    }

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div
            className={classes.root}
            onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
            }}
        >
            {modalVisible && <My onClick={handleCloseModal} />}
            <div>
                <Button
                    disableRipple
                    disableTouchRipple
                    style={{ backgroundColor: "transparent" }}
                    ref={anchorRef}
                    aria-controls={open ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <AccountCircleIcon style={{ fontSize: 35 }} />
                </Button>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === "bottom" ? "center top" : "center bottom",
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="menu-list-grow"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        <MenuItem onClick={handleClickEditButton}>
                                            마이 페이지
                                        </MenuItem>
                                        <MenuItem onClick={handleClickLogoutButton}>
                                            로그아웃
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );
};

export default MuiMenu;
