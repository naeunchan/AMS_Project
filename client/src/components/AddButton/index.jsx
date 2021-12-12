import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import { AddFile } from "@components";

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

const AddButton = ({ onClick, ...props }) => {
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
            {modalVisible && <AddFile onClick={onClick} onClose={handleCloseModal} />}
            <IconButton aria-label="add" onClick={handleClickAddButton}>
                <AddCircleOutlineRoundedIcon style={{ color: "black", fontSize: "60px" }} />
            </IconButton>
        </div>
    );
};

export default AddButton;
