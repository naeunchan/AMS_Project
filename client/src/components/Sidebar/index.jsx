import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import axios from "axios";
import Swal from "sweetalert2";
import { AddButton, AddChildIcon, SelectChildFile, Spinner, Modal } from "@components";
import styled from "@emotion/styled";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        zIndex: "1000",
        boxSizing: "border-box",
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            height: "calc(100vh - 125px)",
            flexShrink: 0,
            zIndex: "1000",
            marginTop: "60px",
        },
    },
    appBar: {
        [theme.breakpoints.down("sm")]: {
            marginTop: "60px",
            visibility: "visible",
            background: "rgb(123, 128, 154)",
        },
        [theme.breakpoints.up("sm")]: {
            visibility: "hidden",
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
        height: "calc(100% - 90px)",
        overflowX: "hidden",
        background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))",
        marginLeft: "10px",
        borderRadius: "20px",
        marginTop: "80px",
        boxShadow: "rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem",
        [theme.breakpoints.down("sm")]: {
            height: "calc(100% - 25px)",
            marginTop: "10px",
        },
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
            marginTop: "30px",
        },
        [theme.breakpoints.up("sm")]: {
            margin: "20px",
        },
    },
}));

const useTreeItemStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        "&:focus > $content": {
            background: "linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))",
        },
    },
    content: {
        color: "white",
        borderRadius: "8px",
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        "$expanded > &": {
            fontWeight: theme.typography.fontWeightRegular,
        },
        "&:hover": {
            background: "rgba(80,80,80,0.7)",
        },
    },
    group: {
        marginLeft: 0,
        "& $content": {
            paddingLeft: theme.spacing(2),
        },
    },
    label: {
        fontWeight: "inherit",
        color: "black",
    },
    labelRoot: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0.5, 0),
        color: "white",
    },
    labelText: {
        flexGrow: 1,
        fontSize: "1rem",
    },
    parent: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0.5, 0),
        fontSize: "1.25rem",
        color: "white",
    },
}));

const FlexContainer = styled.div`
    display: flex;
    border-radius: 8px;
`;

const StyledTreeItem = (props) => {
    const classes = useTreeItemStyles();
    const { labelText, color, bgColor, parent, onClick, ...other } = props;

    return (
        <TreeItem
            label={
                <div className={classes.labelRoot}>
                    <Typography
                        variant="body2"
                        className={parent ? classes.parent : classes.labelText}
                    >
                        {labelText}
                    </Typography>
                </div>
            }
            classes={{
                root: classes.root,
                content: classes.content,
                group: classes.group,
                label: classes.label,
            }}
            onClick={onClick}
            {...other}
        />
    );
};

const Sidebar = ({ onChange, ...props }) => {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const PID = parseInt(sessionStorage.getItem("PID"));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const [created, setCreated] = useState(false);
    const [selectedChildFile, setSelectedChildFile] = useState(false);
    const [childInfo, setChildInfo] = useState({});
    const [allFiles, setAllFiles] = useState();
    const [allUsers, setAllUsers] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        sessionStorage.removeItem("selected");
        const getFiles = async () => {
            setIsLoading(true);
            axios
                .get("/api/files", {
                    params: { PID },
                })
                .then((res) => {
                    if (res.data) {
                        setAllFiles(res.data);
                        setIsLoading(false);
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: "에러가 발생했습니다!",
                    });
                });
        };
        getFiles();
    }, [PID, created]);

    useEffect(() => {
        sessionStorage.removeItem("users");
        const getUsers = async () => {
            axios.get("/api/users").then((res) => {
                setAllUsers(res.data);
            });
        };

        getUsers();
    }, []);

    sessionStorage.setItem("files", JSON.stringify(allFiles));
    sessionStorage.setItem("users", JSON.stringify(allUsers));

    const handleSelect = (event, nodeIds) => {
        if (allFiles[nodeIds].path === 0) {
            setSelected(nodeIds);
            onChange(nodeIds);
        } else {
            setChildInfo({
                FID: nodeIds,
                fileInfo: allFiles[nodeIds],
            });
            setSelectedChildFile(true);
        }
    };

    const handleCloseSelectedModal = () => {
        setChildInfo({});
        setSelectedChildFile(false);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleClickCreateButton = async () => {
        await axios
            .get("/api/files", {
                params: {
                    PID,
                },
            })
            .then((res) => {
                if (res.data) {
                    sessionStorage.setItem("files", JSON.stringify(res.data));
                }
            });
        setCreated(!created);
    };

    const drawer = () => {
        const visited = new Map();
        const files = [];

        const dfs = (child) =>
            child.map((file) => {
                const FID = file.FID.toString();

                visited.set(FID, true);

                if (!allFiles[file.FID].child.length) {
                    return <StyledTreeItem nodeId={FID} labelText={file.version} key={FID} />;
                }

                return (
                    <StyledTreeItem nodeId={FID} labelText={file.version} key={FID}>
                        {dfs(allFiles[file.FID].child)}
                    </StyledTreeItem>
                );
            });

        for (const key in allFiles) {
            if (visited.has(key) || allFiles[key].path !== 0) {
                continue;
            }

            visited.get(key, true);

            const parent = allFiles[key].child.length ? (
                <FlexContainer key={key}>
                    <StyledTreeItem
                        parent
                        nodeId={key}
                        labelText={allFiles[key].name}
                        selected={selected}
                    >
                        {dfs(allFiles[key].child)}
                    </StyledTreeItem>
                    <AddChildIcon fileName={allFiles[key].name} parent={key} />
                </FlexContainer>
            ) : (
                <FlexContainer key={key}>
                    <StyledTreeItem
                        parent
                        nodeId={key}
                        labelText={allFiles[key].name}
                        key={key}
                        selected={selected}
                    />
                    <AddChildIcon fileName={allFiles[key].name} parent={key} />
                </FlexContainer>
            );

            files.push(parent);
        }
        console.log(files);
        return (
            <TreeView
                className={classes.tree}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                onNodeSelect={handleSelect}
            >
                {files}
            </TreeView>
        );
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            {isLoading && <Spinner />}
            <div className={classes.root}>
                {selectedChildFile && (
                    <SelectChildFile fileInfo={childInfo} onClose={handleCloseSelectedModal} />
                )}
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
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer}>
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
                            <AddButton onClick={handleClickCreateButton} />
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                </main>
            </div>
        </>
    );
};

Sidebar.propTypes = {
    window: PropTypes.func,
};

export default Sidebar;
