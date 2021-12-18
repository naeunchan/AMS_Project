import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import styles from "@style";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import SelectChildFile from "../SelectChildFile";
import axios from "axios";

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: 440,
    },
});

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    margin-top: 85px;
    margin-bottom: 20px;
    background: white;
    height: 100%;
    padding: 20px 0;
    width: 70%;
    border-radius: 0.75rem;
    box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem,
        rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;

    @media ${styles.media.sm} {
        position: fixed;
        left: 0;
        top: 65px;
        width: 100vw;
        margin-top: 60px;
    }
`;

const TitleContainer = styled.div`
    margin-top: 15px;
    min-width: 300px;
    width: 80%;
    height: 60px;
    display: flex;
    justify-content: center;

    @media ${styles.media.sm} {
        margin-top: 5px;
    }
`;

const Title = styled.div`
    display: flex;
    color: white;
    justify-content: center;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    box-shadow: rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem,
        rgb(0 187 212 / 40%) 0rem 0.4375rem 0.625rem -0.3125rem;
    border-radius: 8px;
    font-size: 20px;
    font-weight: 700;
    background: linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232));
`;

const BodyContainer = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem,
        rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
`;

const columns = [
    { id: "version", label: "버전", minWidth: 100 },
    { id: "uploader", label: "업로더", minWidth: 100 },
    {
        id: "createdAt",
        label: "업로드일",
        minWidth: 100,
        align: "right",
    },
];

const createData = (version, uploader, createdAt) => {
    return { version, uploader, createdAt: createdAt.slice(0, 10) };
};

const FileInfo = ({ fileName, FID, ...props }) => {
    const users = JSON.parse(sessionStorage.getItem("users"));
    const team = JSON.parse(sessionStorage.getItem("team"));
    const PID = JSON.parse(sessionStorage.getItem("PID"));
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedChildFile, setSelectedChildFile] = useState(false);
    const [childInfo, setChildInfo] = useState({});
    const [files, setFiles] = useState({});
    const [child, setChild] = useState([]);

    useEffect(() => {
        axios
            .get("/api/files", {
                params: { PID },
            })
            .then((res) => {
                if (res.data) {
                    setFiles(res.data);
                    setChild(res.data[FID].child);
                }
            });
    }, [FID, PID, selectedChildFile]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClickRow = (index) => {
        setChildInfo({
            FID: child[index].FID,
            fileInfo: files[child[index].FID],
        });
        setSelectedChildFile(true);
    };

    const handleClose = () => {
        setSelectedChildFile(false);
    };

    const rows = child?.map((file) =>
        createData(
            file.version,
            `${users[file.PID].name}(${team[users[file.PID].TID].name})`,
            file.created_at
        )
    );

    return (
        <Container>
            {selectedChildFile && <SelectChildFile fileInfo={childInfo} onClose={handleClose} />}
            <TitleContainer>
                <Title>{fileName}</Title>
            </TitleContainer>
            <BodyContainer>
                {rows && (
                    <Paper className={classes.root}>
                        <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    tabIndex={-1}
                                                    key={index}
                                                    onClick={() => handleClickRow(index)}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell
                                                                key={column.id}
                                                                align={column.align}
                                                            >
                                                                {column.format &&
                                                                typeof value === "number"
                                                                    ? column.format(value)
                                                                    : value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                )}
            </BodyContainer>
        </Container>
    );
};

export default FileInfo;
