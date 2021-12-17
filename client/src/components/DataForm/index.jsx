import React, { useEffect, useState } from "react";
import { Modal, TextArea, FileUpload } from "@components";
import { isMobile } from "react-device-detect";
import styled from "@emotion/styled";
import styles from "@style";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import clsx from "clsx";

const FlexContainer = styled.div`
    display: flex;
    width: 100%;
`;

const MobileScreen = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: ${styles.color.mobile};
    justify-content: center;
    align-items: center;
    font-size: 50px;
    font-weight: bold;
    color: white;
`;

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
        width: "100%",
    },
    root: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
    },
    margin: {
        margin: "10px 0",
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: "25ch",
    },
}));

const MenuProps = {
    PaperProps: {
        style: {
            width: 250,
        },
    },
    variant: "menu",
    getContentAnchorEl: null,
};

const DataForm = ({
    onClose,
    fileName = JSON.parse(sessionStorage.getItem("selected")).fileName,
    FID = parseInt(JSON.parse(sessionStorage.getItem("selected")).FID),
    ...props
}) => {
    const classes = useStyles();
    const [team, setTeam] = useState({});
    const PID = {};
    const userPID = parseInt(sessionStorage.getItem("PID"));
    const [fileInfo, setFileInfo] = useState({
        fileName,
        version: "",
        password: "",
        description: "",
        FID,
    });
    const [values, setValues] = useState({
        showPassword: false,
    });

    useEffect(() => {
        const groups = {};

        sessionStorage.setItem("selected", JSON.stringify({ FID, fileName }));

        axios
            .get("/api/coworker")
            .then((res) => {
                res.data.forEach((v) => {
                    const { team_name, ...user } = v;

                    if (groups.hasOwnProperty(team_name)) {
                        groups[team_name] = [...groups[team_name], user];
                    } else {
                        groups[team_name] = [user];
                    }
                });
            })
            .then(() => {
                setTeam(groups);
            });
    }, [fileName, FID]);

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const [personName, setPersonName] = useState([]);

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    const handleChangeVersion = (event) => {
        setFileInfo({ ...fileInfo, version: event.target.value });
    };

    const handleChangePassword = (event) => {
        setFileInfo({ ...fileInfo, password: event.target.value });
    };

    const handleChangeDescription = (event) => {
        setFileInfo({ ...fileInfo, description: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (event) => {
        let chunks = [];

        if (event.target.value && event.target.value.length === 1) {
            chunks = event.target.value[0].split("-");
        } else if (event.target.value && event.target.value.length > 1) {
            chunks = event.target.value[event.target.value.length - 1].split("-");
        }

        if (chunks[0] === "Select" && chunks[1] === "All") {
            let groupName = chunks[chunks.length - 1];

            let names = [...personName];
            let allSelected = true;

            for (let { user_name } of team[groupName]) {
                if (names.indexOf(user_name) < 0) {
                    allSelected = false;
                    break;
                }
            }

            for (let { user_name } of team[groupName]) {
                if (names.indexOf(user_name) >= 0) {
                    names.splice(names.indexOf(user_name), 1);
                }
            }

            if (!allSelected) {
                const name = [];

                for (let { user_name } of team[groupName]) {
                    name.push(user_name);
                }

                names = [...names, ...name];
            }

            setPersonName(names);
        } else {
            setPersonName(event.target.value);
        }
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    if (isMobile) {
        return (
            <MobileScreen>
                <div>PC 환경에서 </div>
                <div>진행해주세요!</div>
            </MobileScreen>
        );
    }

    if (windowSize.width <= 767) {
        return (
            <MobileScreen>
                <div>더 큰 화면에서</div>
                <div>진행해주세요!</div>
            </MobileScreen>
        );
    }

    return (
        <Modal width="650px" height="700px" style={{ padding: "0 35px" }}>
            <TextArea
                label="애플리케이션명"
                style={{
                    display: "flex",
                    margin: "10px 0",
                    width: "100%",
                }}
                fontSize="25px"
                fontWeight="bold"
                defaultValue={fileName}
                readOnly
            />
            <FlexContainer>
                <TextArea
                    label="버전"
                    style={{
                        display: "flex",
                        margin: "11px 5px 10px 5px",
                    }}
                    required
                    onChange={handleChangeVersion}
                />
                <FormControl className={clsx(classes.margin, classes.textField)} required>
                    <InputLabel htmlFor="standard-adornment-password">비밀번호</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={values.showPassword ? "text" : "password"}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        onChange={handleChangePassword}
                    />
                </FormControl>
                <FormControl className={classes.formControl} style={{ margin: "10px 0 10px 5px" }}>
                    <InputLabel>팀원 추가</InputLabel>
                    <Select
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<Input />}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MenuProps}
                    >
                        {Object.keys(team).map((key) => {
                            let list = team[key].map((person) => {
                                const checked = personName.indexOf(person.user_name) > -1;

                                if (checked) {
                                    PID[person.PID] = person.user_name;
                                    sessionStorage.setItem("coworkers", JSON.stringify(PID));
                                }

                                return (
                                    person.PID !== userPID && (
                                        <MenuItem key={person.PID} value={person.user_name}>
                                            <Checkbox checked={checked} />
                                            <ListItemText primary={person.user_name} />
                                        </MenuItem>
                                    )
                                );
                            });
                            list.unshift(
                                <MenuItem key={key} value={`Select-All-${key}`}>
                                    <ListItemText primary={key} secondary="팀 전체 선택/해제" />
                                </MenuItem>
                            );

                            return list;
                        })}
                    </Select>
                </FormControl>
            </FlexContainer>
            <TextField
                id="outlined-multiline-static"
                label="상세정보"
                rows={15}
                multiline
                style={{
                    display: "flex",
                    margin: "10px 0",
                    width: "100%",
                }}
                variant="outlined"
                onChange={handleChangeDescription}
            />
            <FileUpload
                style={{
                    width: "50px",
                    height: "100px",
                }}
                onClose={onClose}
                fileInfo={{
                    ...fileInfo,
                    coworkers: personName.length
                        ? JSON.parse(sessionStorage.getItem("coworkers"))
                        : sessionStorage.removeItem("coworkers") || {},
                }}
            />
        </Modal>
    );
};

export default DataForm;
