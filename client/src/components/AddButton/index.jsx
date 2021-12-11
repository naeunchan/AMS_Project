import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import { DataForm } from "@components";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            zIndex: "1020",
            position: "absolute",

            [theme.breakpoints.down("sm")]: {
                visibility: "hidden",
            },
            [theme.breakpoints.up("sm")]: {
                bottom: "30px",
                left: "80px",
                visibility: "visible",
            },
        },
    },
}));

const AddButton = ({ ...props }) => {
    const classes = useStyles();
    const [modalVisible, setModalVisible] = useState(false);

    const handleClickAddButton = (event) => {
        event.preventDefault();
        setModalVisible(true);
    };

    const handleCloseModal = (event) => {
        event.preventDefault();
        setModalVisible(false);
    };

    return (
        <div className={classes.root}>
            {modalVisible && <DataForm onClose={handleCloseModal} />}
            <IconButton aria-label="add" onClick={handleClickAddButton}>
                <AddCircleOutlineRoundedIcon style={{ color: "black", fontSize: "60px" }} />
            </IconButton>
        </div>
    );
};

export default AddButton;
