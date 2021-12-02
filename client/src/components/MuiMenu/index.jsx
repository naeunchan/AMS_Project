// import React from "react";
// import { withStyles } from "@material-ui/core/styles";
// import IconButton from "@material-ui/core/IconButton";
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import EditIcon from "@material-ui/icons/Edit";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";

// const StyledMenu = withStyles({
// 	paper: {
// 		border: "1px solid #d3d4d5",
// 	},
// })((props) => (
// 	<Menu
// 		elevation={0}
// 		getContentAnchorEl={null}
// 		anchorOrigin={{
// 			vertical: "bottom",
// 			horizontal: "center",
// 		}}
// 		transformOrigin={{
// 			vertical: "top",
// 			horizontal: "center",
// 		}}
// 		{...props}
// 	/>
// ));

// const StyledMenuItem = withStyles((theme) => ({
// 	root: {
// 		"&:focus": {
// 			backgroundColor: theme.palette.primary.main,
// 			"& .MuiListItemIcon-root, & .MuiListItemText-primary": {
// 				color: theme.palette.common.white,
// 			},
// 		},
// 	},
// }))(MenuItem);

// const MuiMenu = ({ onClickEditButton, onClickLogoutButton }) => {
// 	const handleClickEditButton = () => {
// 		console.log("Go My Page");
// 	};

// 	const handleClickLogoutButton = () => {
// 		console.log("Logout");
// 	};

// 	const [anchorEl, setAnchorEl] = React.useState(null);

// 	const handleClick = (event) => {
// 		if (!anchorEl) {
// 			setAnchorEl(event.currentTarget);
// 		} else {
// 			setAnchorEl(null);
// 		}
// 	};

// 	const handleClose = () => {
// 		setAnchorEl(null);
// 	};

// 	return (
// 		<div>
// 			<IconButton
// 				aria-controls="customized-menu"
// 				aria-haspopup="true"
// 				onClick={handleClick}>
// 				<AccountCircleIcon style={{ fontSize: 35 }} />
// 			</IconButton>
// 			<StyledMenu
// 				disableScrollLock={true}
// 				id="customized-menu"
// 				anchorEl={anchorEl}
// 				keepMounted
// 				open={Boolean(anchorEl)}
// 				onClose={handleClose}>
// 				<StyledMenuItem onClick={handleClickEditButton}>
// 					<ListItemIcon>
// 						<EditIcon fontSize="small" />
// 					</ListItemIcon>
// 					<ListItemText primary="개인정보 수정" />
// 				</StyledMenuItem>
// 				<StyledMenuItem onClick={handleClickLogoutButton}>
// 					<ListItemIcon>
// 						<ExitToAppIcon fontSize="small" />
// 					</ListItemIcon>
// 					<ListItemText primary="로그아웃" />
// 				</StyledMenuItem>
// 			</StyledMenu>
// 		</div>
// 	);
// };

// export default MuiMenu;

import React from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	paper: {
		marginRight: theme.spacing(2),
	},
}));

const MuiMenu = () => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);

	const handleClickEditButton = () => {
		console.log("Go My Page");
		setOpen(false);
	};

	const handleClickLogoutButton = () => {
		console.log("Logout");
		setOpen(false);
	};

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	function handleListKeyDown(event) {
		if (event.key === "Tab") {
			event.preventDefault();
			setOpen(false);
		}
	}

	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	return (
		<div className={classes.root}>
			<div>
				<Button
					disableRipple
					disableTouchRipple
					style={{ backgroundColor: "transparent" }}
					ref={anchorRef}
					aria-controls={open ? "menu-list-grow" : undefined}
					aria-haspopup="true"
					onClick={handleToggle}>
					<AccountCircleIcon style={{ fontSize: 35 }} />
				</Button>
				<Popper
					open={open}
					anchorEl={anchorRef.current}
					role={undefined}
					transition
					disablePortal>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							style={{
								transformOrigin:
									placement === "bottom"
										? "center top"
										: "center bottom",
							}}>
							<Paper>
								<ClickAwayListener onClickAway={handleClose}>
									<MenuList
										autoFocusItem={open}
										id="menu-list-grow"
										onKeyDown={handleListKeyDown}>
										<MenuItem
											onClick={handleClickEditButton}>
											마이 페이지
										</MenuItem>
										<MenuItem
											onClick={handleClickLogoutButton}>
											로그아웃
										</MenuItem>
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</div>
		</div>
	);
};

export default MuiMenu;
