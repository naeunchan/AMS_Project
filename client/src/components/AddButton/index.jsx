import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { AddFile } from "@components";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "240px",
        visibility: "visible",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        background: "transparent",
        boxSizing: "border-box",

        [theme.breakpoints.down("sm")]: {
            visibility: "hidden",
        },
        [theme.breakpoints.up("sm")]: {
            visibility: "visible",
        },

        "& > *": {
            padding: 0,
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
            <Button
                aria-label="add"
                onClick={handleClickAddButton}
                variant="contained"
                style={{
                    backgroundImage:
                        "linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))",
                    width: "100%",
                    fontSize: "0.85rem",
                    height: "37px",
                    color: "white",
                    margin: "20px 15px",
                    borderRadius: "0.5rem",
                }}
            >
                애플리케이션 추가
            </Button>
        </div>
    );
};

export default AddButton;
