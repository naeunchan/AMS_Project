import React, { useEffect, useState } from "react";
import { Modal, DatePickers, TextArea, FileUpload } from "@components";
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
import axios from "axios";

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
    parent = parseInt(JSON.parse(sessionStorage.getItem("selected")).parent),
    ...props
}) => {
    const classes = useStyles();
    const [team, setTeam] = useState({});
    const [fileInfo, setFileInfo] = useState({
        fileName,
        version: "",
        date: "",
        description: "",
        parent,
    });

    useEffect(() => {
        const groups = {};

        sessionStorage.setItem("selected", JSON.stringify({ parent, fileName }));

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
    }, [fileName, parent]);

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

    const handleChangeDate = (event) => {
        setFileInfo({ ...fileInfo, date: event.target.value });
    };

    const handleChangeDescription = (event) => {
        setFileInfo({ ...fileInfo, description: event.target.value });
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
                required
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
                <DatePickers
                    label="마감일"
                    style={{ margin: "10px 0" }}
                    onChange={handleChangeDate}
                />
                <FormControl className={classes.formControl} style={{ margin: "10px 5px" }}>
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
                            let list = team[key].map((person) => (
                                <MenuItem key={person.PID} value={person.user_name}>
                                    <Checkbox checked={personName.indexOf(person.user_name) > -1} />
                                    <ListItemText primary={person.user_name} />
                                </MenuItem>
                            ));

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
                    date: fileInfo.date ? fileInfo.date : new Date().toISOString().slice(0, 10),
                    personName,
                }}
            />
        </Modal>
    );
};

export default DataForm;
