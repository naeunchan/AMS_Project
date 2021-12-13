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
	readOnly = false,
	fontSize = "15px",
	fontWeight = "normal",
	defaultValue,
	onChange,
	onKeyUp,
	...props
}) => {
	const classes = useStyles();

	return (
		<form
			className={classes.root}
			noValidate
			autoComplete="off"
			style={{ ...props.style }}
			onSubmit={(e) => {
				e.preventDefault();
			}}>
			<TextField
				label={label}
				minRows="12"
				maxRows="12"
				fullWidth
				multiline={multiline}
				required={required}
				onChange={onChange}
				onKeyUp={onKeyUp}
				InputProps={{ readOnly }}
				inputProps={{ style: { fontSize, fontWeight } }}
				defaultValue={defaultValue}
			/>
		</form>
	);
};

export default TextArea;
