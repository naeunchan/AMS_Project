import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
	root: {
		"& .MuiTextField-root": {
			margin: 0,
			minWidth: "100px",
		},
	},
}));

const TextArea = ({
	minRows = "1",
	label = "",
	multiline = false,
	required = false,
	fontSize = "15px",
	fontWeight = "normal",
	...props
}) => {
	const classes = useStyles();

	return (
		<form
			className={classes.root}
			noValidate
			autoComplete="off"
			style={{ ...props.style }}>
			<TextField
				label={label}
				minRows="12"
				maxRows="12"
				fullWidth
				multiline={multiline}
				required={required}
				inputProps={{ style: { fontSize, fontWeight } }}
			/>
		</form>
	);
};

export default TextArea;
