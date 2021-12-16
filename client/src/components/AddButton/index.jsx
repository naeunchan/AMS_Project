import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import { AddFile } from "@components";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "240px",
		visibility: "visible",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: 0,
		backgroundColor: "white",
		borderTop: "1px solid rgba(80, 80, 80, 0.2)",
		borderRight: "1px solid rgba(80, 80, 80, 0.2)",
		position: "fixed",
		bottom: 0,
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
			{modalVisible && (
				<AddFile onClick={onClick} onClose={handleCloseModal} />
			)}
			<IconButton aria-label="add" onClick={handleClickAddButton}>
				<AddCircleOutlineRoundedIcon
					style={{ color: "black", fontSize: "60px" }}
				/>
			</IconButton>
		</div>
	);
};

export default AddButton;
