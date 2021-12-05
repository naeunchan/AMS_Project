import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: "none",
    },
}));

const FileUpload = () => {
    const classes = useStyles();

    const handleChange = (e) => {};

    return (
        <div className={classes.root}>
            <input
                accept=".apk"
                multiple
                className={classes.input}
                id="icon-button-file"
                type="file"
            />
            <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <AddIcon fontSize="large" />
                </IconButton>
            </label>
        </div>
    );
};

export default FileUpload;
