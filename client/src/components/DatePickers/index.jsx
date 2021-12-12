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

const DatePickers = ({ label, onChange, ...props }) => {
    const classes = useStyles();

    const changeDate = (date) => {
        if (date < 10) {
            return `0${date}`;
        }

        return date;
    };

    const today = new Date();
    const year = today.getFullYear();
    const month = changeDate(today.getMonth() + 1);
    const day = changeDate(today.getDate());

    return (
        <form className={classes.container} noValidate>
            <TextField
                id="date"
                label={label}
                type="date"
                defaultValue={`${year}-${month}-${day}`}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={onChange}
                style={{ ...props.style }}
            />
        </form>
    );
};

export default DatePickers;
