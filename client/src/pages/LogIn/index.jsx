import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, SignUp } from "@components";
import styled from "@emotion/styled";
import BCLogo from "@style/image/BC_logo.png";
import styles from "@style";
import axios from "axios";
import Swal from "sweetalert2";

const image = {
    src: BCLogo,
    alt: "BC Logo",
};

const FormBox = styled.div`
    display: flex;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    margin-top: 15px;
    padding: 50px 20px;
    background-color: white;
    box-sizing: border-box;
    box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem,
        rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;

    @media ${styles.media.sm} {
        font-size: 1rem;
        margin: 10px 0;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20px;
    text-align: center;
`;

const InputContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin: 20px 0 20px 0;
`;

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const StyledDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    font-size: 1.25rem;
    font-weight: bold;
    margin: 40px 0;

    @media ${styles.media.sm} {
        font-size: 1rem;
        margin: 10px 0;
        padding: 10px;
    }
`;

const LogIn = () => {
    const navigate = useNavigate();
    const [PID, setPID] = useState("");
    const [password, setPassword] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [team, setTeam] = useState();

    const handleChangePID = (e) => {
        setPID(parseInt(e.target.value));
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        if (!team) {
            axios.get("/api/team").then((res) => {
                setTeam(res.data);
                sessionStorage.setItem("team", JSON.stringify(res.data));
            });
        }
    }, [team]);

    const handleClickLogInButton = () => {
        axios
            .post("/api/login", null, {
                params: {
                    PID,
                    password,
                },
            })
            .then((res) => {
                const info = res.data;

                if (info[0].PID === PID && info[0].password === password) {
                    sessionStorage.setItem("PID", PID);
                    navigate("/");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: res.data,
                    });
                }
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "에러가 발생했습니다!",
                });
            });
    };

    const handleClickSignUpButton = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <FormBox>
            {modalVisible && <SignUp onClick={handleCloseModal} />}
            <Container>
                <ImageContainer>
                    <img src={image.src} alt={image.alt} width="80px" height="80px" />
                </ImageContainer>
                <StyledDiv>테스트 APK 파일 이력 관리 시스템</StyledDiv>
                <InputContainer>
                    <Input
                        type="text"
                        placeholder="사번"
                        style={{
                            width: "100%",
                            marginBottom: "20px",
                            paddingLeft: "10px",
                        }}
                        onChange={handleChangePID}
                        onKeyPress={(e) => {
                            e.key === "Enter" && handleClickLogInButton();
                        }}
                    />
                    <Input
                        type="password"
                        placeholder="password"
                        password
                        style={{ paddingLeft: "10px", width: "100%" }}
                        onChange={handleChangePassword}
                        onKeyPress={(e) => {
                            e.key === "Enter" && handleClickLogInButton();
                        }}
                    />
                </InputContainer>
                <ButtonContainer>
                    <Button
                        backgroundColor={styles.color.confirm}
                        style={{ width: "100%", marginBottom: "10px" }}
                        onClick={handleClickLogInButton}
                    >
                        로그인
                    </Button>
                    <Button
                        backgroundColor={styles.color.logo}
                        color="white"
                        onClick={handleClickSignUpButton}
                    >
                        가입하기
                    </Button>
                </ButtonContainer>
            </Container>
        </FormBox>
    );
};

export default LogIn;
