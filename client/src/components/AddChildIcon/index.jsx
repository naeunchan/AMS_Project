import React, { useState } from "react";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import IconButton from "@material-ui/core/IconButton";
import { DataForm } from "@components";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down("sm")]: {
            visibility: "hidden",
        },
        [theme.breakpoints.up("sm")]: {
            visibility: "visible",
        },
    },
}));

const AddChildIcon = ({ fileName, parent, ...props }) => {
    const classes = useStyles();
    const [modalVisible, setModalVisible] = useState(false);

    const handleClickAddButton = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <div className={classes.root}>
            {modalVisible && (
                <DataForm fileName={fileName} parent={parent} onClose={handleCloseModal} />
            )}
            <IconButton aria-label="addChild" onClick={handleClickAddButton}>
                <AddRoundedIcon style={{ color: "black" }} />
            </IconButton>
        </div>
    );
};

export default AddChildIcon;
