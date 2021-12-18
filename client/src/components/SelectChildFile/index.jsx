import React, { useEffect, useState } from "react";
import { Modal, TextArea, Button } from "@components";
import styled from "@emotion/styled";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import clsx from "clsx";
import styles from "@style";

const AStyled = styled.a`
    &:visited {
        color: #4b70fd;
    }
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

const FlexContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: "center";
    align-items: "center";
`;

const MenuProps = {
    PaperProps: {
        style: {
            width: 250,
        },
    },
    variant: "menu",
    getContentAnchorEl: null,
};

const SelectChildFile = ({ onClose, fileInfo, ...props }) => {
    const classes = useStyles();
    const { FID, ...rest } = fileInfo;
    const { name, version, password, count, description } = rest.fileInfo;
    const [newCount, setNewCount] = useState(count);
    const users = JSON.parse(sessionStorage.getItem("users"));
    const PID = sessionStorage.getItem("PID");
    const teamInfo = JSON.parse(sessionStorage.getItem("team"));
    const [team, setTeam] = useState([]);
    const [link, setLink] = useState([]);

    const onClick = () => {
        axios.post("/api/count", null, {
            params: {
                count: newCount + 1,
                FID,
            },
        });

        setNewCount(newCount + 1);
    };

    useEffect(() => {
        const coworkers = async () => {
            await axios
                .get("/api/file/coworker", {
                    params: {
                        FID,
                    },
                })
                .then((res) => {
                    setTeam(res.data);
                });
        };
        axios
            .post("/api/download", null, {
                params: {
                    fileName: name,
                },
            })
            .then((res) => {
                setLink(res.data);
            });
        coworkers();
    }, [FID, name]);

    return (
        <Modal width="650px" height="700px" style={{ padding: "0 35px" }}>
            <TextArea
                label="APK 파일명"
                style={{
                    display: "flex",
                    margin: "10px 0",
                    width: "100%",
                }}
                fontSize="25px"
                fontWeight="bold"
                defaultValue={name}
                readOnly
            />
            <FlexContainer>
                <TextArea
                    label="버전"
                    style={{
                        display: "flex",
                        margin: "11px 5px 10px 5px",
                    }}
                    readOnly
                    defaultValue={version}
                />
                <FormControl className={clsx(classes.margin, classes.textField)}>
                    <InputLabel htmlFor="standard-adornment-password">비밀번호</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={"password"}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility">
                                    <VisibilityOff />
                                </IconButton>
                            </InputAdornment>
                        }
                        defaultValue={password}
                        readOnly
                    />
                </FormControl>
                <FormControl className={classes.formControl} style={{ margin: "10px 0 10px 5px" }}>
                    <InputLabel>팀원({team.length}명)</InputLabel>
                    <Select
                        value={""}
                        input={<Input />}
                        MenuProps={MenuProps}
                        disabled={!team.length}
                    >
                        {team.map((user, index) => {
                            const CPID = user.PID;

                            return (
                                PID !== CPID && (
                                    <MenuItem value={index} key={CPID}>
                                        {users[CPID].name}({teamInfo[users[CPID].TID].name})
                                    </MenuItem>
                                )
                            );
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
                inputProps={{
                    readOnly: true,
                }}
                defaultValue={description}
            />
            <TextField
                id="outlined-multiline-static"
                label="첨부파일"
                rows={2}
                multiline
                style={{
                    display: "flex",
                    margin: "10px 0",
                    width: "100%",
                }}
                variant="outlined"
                defaultValue=" "
                InputProps={{
                    readOnly: true,
                    style: { fontSize: "0.8rem" },
                    endAdornment: (
                        <InputAdornment position="start" style={{ position: "absolute" }}>
                            <AStyled href={link} onClick={onClick}>
                                {name}
                            </AStyled>
                        </InputAdornment>
                    ),
                }}
                InputLabelProps={{ style: { fontSize: "1rem" } }}
            />
            <FlexContainer style={{ flexDirection: "row-reverse" }}>
                <TextField
                    id="outlined-multiline-static"
                    label="다운로드 횟수"
                    style={{ marginTop: "5px", width: "20%" }}
                    variant="outlined"
                    readOnly
                    value={newCount}
                />
            </FlexContainer>
            <Button
                backgroundColor={styles.color.confirm}
                style={{ width: "100px", marginTop: "20px" }}
                onClick={onClose}
            >
                닫기
            </Button>
        </Modal>
    );
};

export default SelectChildFile;
