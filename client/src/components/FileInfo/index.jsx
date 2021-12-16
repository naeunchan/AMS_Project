import React, { useEffect, useState } from "react";
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
    margin-top: 65px;
    width: 100%;

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
    justify-content: center;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    border: 3px solid rgb(80, 80, 80);
    box-shadow: "7px 14px 20px rgba(0,0,0,1.2)";
    border-radius: 8px;
    font-size: 20px;
`;

const BodyContainer = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    margin-top: 15px;
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
    const selectedFile = JSON.parse(sessionStorage.getItem("files"))[FID];
    const users = JSON.parse(sessionStorage.getItem("users"));
    const team = JSON.parse(sessionStorage.getItem("team"));
    const child = selectedFile.child;
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const rows = child.map((file) =>
        createData(
            file.version,
            `${users[file.PID].name}(${team[users[file.PID].TID].name})`,
            file.created_at
        )
    );

    return (
        <Container>
            <TitleContainer>
                <Title>{fileName}</Title>
            </TitleContainer>
            <BodyContainer>
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
                                    .map((row) => {
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row.code}
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
            </BodyContainer>
        </Container>
    );
};

export default FileInfo;
