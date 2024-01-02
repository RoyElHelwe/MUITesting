'use client'
import { Box, Container, CssBaseline, Paper, TableBody, TableCell, TableContainer, TableHead, Table as TableMUI, TablePagination, TableRow, Typography } from '@mui/material'
import React, { useState } from 'react'
import AppBar from '@/components/Global/appBar'

interface Column {
    id: 'name' | 'code' | 'population' | 'size' | 'density';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
];
const rows = [
    {
        code: 'AD',
        name: 'Andorra',
        population: 76098,
        size: 468,
        density: 162.4,
    },
    {
        code: 'AE',
        name: 'United Arab Emirates',
        population: 9770529,
        size: 83600,
        density: 117,
    },
    {
        code: 'AF',
        name: 'Afghanistan',
        population: 37172386,
        size: 652230,
        density: 56.9,
    },
    {
        code: 'AG',
        name: 'Antigua and Barbuda',
        population: 96286,
        size: 442,
        density: 218,
    },
    {
        code: 'AI',
        name: 'Anguilla',
        population: 13254,
        size: 91,
        density: 145.6,
    },
    {
        code: 'AL',
        name: 'Albania',
        population: 2866376,
        size: 28748,
        density: 99.9,
    },
    {
        code: 'AM',
        name: 'Armenia',
        population: 2951776,
        size: 29743,
        density: 99.3,
    },
    {
        code: 'AO',
        name: 'Angola',
        population: 30809762,
        size: 1246700,
        density: 24.7,
    },
    {
        code: 'AQ',
        name: 'Antarctica',
        population: 1106,
        size: 14000000,
        density: 0,
    },
    {
        code: 'AR',
        name: 'Argentina',
        population: 44494502,
        size: 2780400,
        density: 16,
    },
    {
        code: 'AS',
        name: 'American Samoa',
        population: 55465,
        size: 199,
        density: 278.8,
    },
    {
        code: 'AT',
        name: 'Austria',
        population: 8840521,
        size: 83879,
        density: 105.4,
    },
    {
        code: 'AU',
        name: 'Australia',
        population: 24992369,
        size: 7692024,
        density: 3.2,
    },
];

const Table = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar />
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <Typography variant="h6" component="div" sx={{ m: 2 }}>
                            Countries
                        </Typography>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <TableMUI stickyHeader aria-label="sticky table">
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
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {column.format && typeof value === 'number'
                                                                    ? column.format(value)
                                                                    : value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </TableMUI>
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
                </Container>
            </Box>
        </Box>
    )
}

export default Table
