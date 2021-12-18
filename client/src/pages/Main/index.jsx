import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Sidebar, FileInfo } from "@components";
import styled from "@emotion/styled";

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`;

const Main = () => {
    const navigate = useNavigate();
    const [fileName, setFileName] = useState();
    const [selectedFID, setSelectedFID] = useState();

    useEffect(() => {
        if (!sessionStorage.getItem("PID")) {
            navigate("/login");
        }
    }, [navigate]);

    const handleChangeFileName = (nodeIds) => {
        const selectedFile = JSON.parse(sessionStorage.getItem("files"))[nodeIds];

        sessionStorage.setItem(
            "selected",
            JSON.stringify({
                FID: nodeIds,
                fileName: selectedFile.name,
            })
        );
        setFileName(selectedFile.name);
        setSelectedFID(nodeIds);
    };

    return (
        <Wrapper>
            <Navbar />
            <Sidebar onChange={handleChangeFileName} />
            {fileName && <FileInfo fileName={fileName} FID={parseInt(selectedFID)} />}
        </Wrapper>
    );
};

export default Main;
