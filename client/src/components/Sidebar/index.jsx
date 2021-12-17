import React, { useEffect, useState, useCallback } from "react";
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
import { AddButton, AddChildIcon, SelectChildFile } from "@components";
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
        height: "calc(100% - 61px)",

        [theme.breakpoints.down("sm")]: {
            height: "100%",
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
            marginTop: "60px",
        },
        [theme.breakpoints.up("sm")]: {
            marginTop: "75px",
        },
    },
}));

const useTreeItemStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        color: theme.palette.text.secondary,
        "&:focus > $content": {
            color: "black",
        },
    },
    content: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        "$expanded > &": {
            fontWeight: theme.typography.fontWeightRegular,
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
        fontWeight: "bold",
        fontSize: "1.25rem",
    },
}));

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
            style={{
                "--tree-view-color": color,
                "--tree-view-bg-color": bgColor,
            }}
            classes={{
                root: classes.root,
                content: classes.content,
                expanded: classes.expanded,
                group: classes.group,
                label: classes.label,
            }}
            onClick={onClick}
            {...other}
        />
    );
};

const FlexContainer = styled.div`
    display: flex;
    justify-content: "center";
    align-items: "center";
`;

const Sidebar = ({ onChange, ...props }) => {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [fileList, setFileList] = useState([]);
    const PID = parseInt(sessionStorage.getItem("PID"));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const [created, setCreated] = useState(false);
    const [selectedChildFile, setSelectedChildFile] = useState(false);
    const [childInfo, setChildInfo] = useState({});
    const files = JSON.parse(sessionStorage.getItem("files"));

    const handleSelect = (event, nodeIds) => {
        if (files[nodeIds].path === 0) {
            setSelected(nodeIds);
            onChange(nodeIds);
        } else {
            setChildInfo({
                FID: nodeIds,
                fileInfo: files[nodeIds],
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

    useEffect(() => {
        sessionStorage.removeItem("selected");
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
    }, [PID, created]);

    const drawer = () => {
        const visited = new Map();
        const files = [];

        const dfs = (child) =>
            child.map((file) => {
                const FID = file.FID.toString();

                visited.set(FID, true);

                if (!fileList[file.FID].child.length) {
                    return <StyledTreeItem nodeId={FID} labelText={file.version} key={FID} />;
                }

                return (
                    <StyledTreeItem nodeId={FID} labelText={file.version} key={FID}>
                        {dfs(fileList[file.FID].child)}
                    </StyledTreeItem>
                );
            });

        for (const key in fileList) {
            if (visited.has(key)) {
                continue;
            }

            visited.get(key, true);

            const parent = fileList[key].child.length ? (
                <FlexContainer key={key}>
                    <StyledTreeItem
                        parent
                        nodeId={key}
                        labelText={fileList[key].name}
                        selected={selected}
                    >
                        {dfs(fileList[key].child)}
                    </StyledTreeItem>
                    <AddChildIcon fileName={fileList[key].name} parent={key} />
                </FlexContainer>
            ) : (
                <FlexContainer key={key}>
                    <StyledTreeItem
                        parent
                        nodeId={key}
                        labelText={fileList[key].name}
                        key={key}
                        selected={selected}
                    />
                    <AddChildIcon fileName={fileList[key].name} parent={key} />
                </FlexContainer>
            );

            files.push(parent);
        }

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
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
            </main>
            <AddButton onClick={handleClickCreateButton} />
        </div>
    );
};

Sidebar.propTypes = {
    window: PropTypes.func,
};

export default Sidebar;
