import DotLoader from "react-spinners/DotLoader";
import styled from "@emotion/styled";

const BackgroundDim = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1050;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    align-items: center;
    justify-content: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: transparent;
`;

const Spinner = () => {
    return (
        <BackgroundDim>
            <Container>
                <DotLoader size={150} />
            </Container>
        </BackgroundDim>
    );
};

export default Spinner;
