import React, { useEffect, useState } from "react";
import { Modal, Button, DatePickers, TextArea, FileUpload } from "@components";
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

const FlexContainer = styled.div`
    display: flex;
    width: 100%;
`;

const ButtonContainer = styled.div`
    display: flex;
    width: 50%;
    justify-content: space-around;
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

const groups = {
    페이북개발팀: ["강민주", "나은찬", "윤홍찬", "이진욱", "임채은"],
    페이북회원팀: ["강나윤", "민은채", "윤은채"],
    페이북결제팀: ["주찬욱", "강진주", "김윤호"],
    페이북채널팀: ["임효린", "박동빈", "김철수"],
    마이데이터개발팀: ["권윤아", "김설아", "강하린"],
    CB사업팀: ["이채빈", "이호빈", "양예빈"],
};

const DataForm = ({ onClose, ...props }) => {
    const classes = useStyles();

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const [personName, setPersonName] = React.useState([]);

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
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

            for (let name of groups[groupName]) {
                if (names.indexOf(name) < 0) {
                    allSelected = false;
                    break;
                }
            }

            for (let name of groups[groupName]) {
                if (names.indexOf(name) >= 0) {
                    names.splice(names.indexOf(name), 1);
                }
            }

            if (!allSelected) {
                names = [...names, ...groups[groupName]];
            }

            setPersonName(names);
        } else {
            setPersonName(event.target.value);
        }
    };

    const handleClickConfirmButton = () => {
        console.log("confirm!");
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
                label="파일명"
                style={{
                    display: "flex",
                    margin: "10px 0",
                    width: "100%",
                }}
                required
                fontSize="25px"
                fontWeight="bold"
            />
            <FlexContainer>
                <TextArea
                    label="버전"
                    style={{
                        display: "flex",
                        margin: "11px 5px 10px 5px",
                    }}
                    required
                />
                <DatePickers label="마감일" style={{ margin: "10px 0" }} />
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
                        {Object.keys(groups).map((key) => {
                            let list = groups[key].map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={personName.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
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
            />
            <FileUpload
                style={{
                    width: "50px",
                    height: "100px",
                }}
            />
            <ButtonContainer>
                <Button
                    backgroundColor={styles.color.confirm}
                    style={{ width: "100px" }}
                    onClick={handleClickConfirmButton}
                >
                    업로드
                </Button>
                <Button
                    backgroundColor={styles.color.cancel}
                    style={{ width: "100px" }}
                    onClick={onClose}
                >
                    취소
                </Button>
            </ButtonContainer>
        </Modal>
    );
};

export default DataForm;
