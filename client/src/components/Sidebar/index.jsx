import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import axios from "axios";
import Swal from "sweetalert2";
import styled from "@emotion/styled";
import styles from "@style";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        zIndex: "1000",
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0,
            zIndex: "1000",
            marginTop: "60px",
        },
    },
    appBar: {
        [theme.breakpoints.down("sm")]: {
            marginLeft: drawerWidth,
            marginTop: "60px",
        },
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginTop: "63px",
        },
        [theme.breakpoints.up("lg")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginTop: "65px",
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        [theme.breakpoints.down("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            marginTop: "60px",
        },
        [theme.breakpoints.up("sm")]: {
            marginTop: "63px",
            paddingLeft: 0,
        },
        [theme.breakpoints.up("lg")]: {
            marginTop: "65px",
            paddingLeft: 0,
        },
    },
    tree: {
        height: 240,
        flexGrow: 1,
        maxWidth: 400,
        marginLeft: "10px",

        [theme.breakpoints.down("sm")]: {
            marginTop: "60px",
        },
        [theme.breakpoints.up("sm")]: {
            marginTop: "70px",
        },
        [theme.breakpoints.up("lg")]: {
            marginTop: "75px",
        },
    },
}));

const Sidebar = (props) => {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [fileList, setFileList] = useState();
    const PID = parseInt(sessionStorage.getItem("PID"));
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
        axios
            .get("/api/files", {
                params: { PID },
            })
            .then((res) => {
                if (res.data) {
                    setFileList(res.data);
                }
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "에러가 발생했습니다!",
                });
            });
    }, [PID]);

    const drawer = () => {
        const visited = new Map();
        const files = [];

        const dfs = (child) =>
            child.map((file) => {
                const FILE_ID = file.FILE_ID.toString();

                visited.set(FILE_ID, true);

                if (!fileList[file.FILE_ID].child.length) {
                    return <TreeItem nodeId={FILE_ID} label={file.name} key={FILE_ID} />;
                }

                return (
                    <TreeItem nodeId={FILE_ID} label={file.name} key={FILE_ID}>
                        {dfs(fileList[file.FILE_ID].child)}
                    </TreeItem>
                );
            });

        for (const key in fileList) {
            if (visited.has(key)) {
                continue;
            }

            visited.get(key, true);

            const parent = fileList[key].child.length ? (
                <TreeItem nodeId={key} label={fileList[key].name} key={key}>
                    {dfs(fileList[key].child)}
                </TreeItem>
            ) : (
                <TreeItem nodeId={key} label={fileList[key].name} key={key} />
            );

            files.push(parent);
        }

        return (
            <TreeView
                className={classes.tree}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {files}
            </TreeView>
        );
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar className={classes.appBar} style={{ display: "flex" }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        FILE NAME
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === "rtl" ? "right" : "left"}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        {drawer()}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer()}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
            </main>
        </div>
    );
};

Sidebar.propTypes = {
    window: PropTypes.func,
};

export default Sidebar;
