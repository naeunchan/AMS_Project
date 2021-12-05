import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

const DatePickers = ({ label, ...props }) => {
    const classes = useStyles();
    const today = new Date();
    const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

    return (
        <form className={classes.container} noValidate>
            <TextField
                id="date"
                label={label}
                type="date"
                defaultValue={date}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                style={{ ...props.style }}
            />
        </form>
    );
};

export default DatePickers;
