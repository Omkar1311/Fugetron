import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import DeletePopup from './DeletePopup';
import { useHistory } from 'react-router-dom';
import { getMethod } from '../utils/apimethods.js'



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '25ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const TableData = () => {

    const history = useHistory()
    const [open, setOpen] = useState(false);
    const [fetchdata, setfetchdata] = useState([]);
    const [delName, setdelName] = useState('');
    const [filter, setfilter] = useState([])
    const [setshowshearch, setsetshowshearch] = useState(false)
    const [show, setshow] = useState(true)

    const handleOpen = (deluser) => {
        setOpen(true);
        setdelName(deluser)
    };

    const edituser = (editdata) => {

        const params = { data: editdata };
        history.push('/AddRecordsform', params)

    }

    const getData = async () => {
        const fetchurl = `https://j5ej5u32gg.execute-api.us-east-1.amazonaws.com/v1/fetch`;
        const resp = await getMethod(fetchurl);
        setfetchdata(resp.data.data);
    }

    useEffect(() => {
        getData();
    }, [])

    const searchdata = (e) => {
        const value = e.target.value;
        var filteredData = fetchdata.filter((val) => {
            if (val.first_name.toLowerCase().includes(value.toLowerCase())) {
                return val
            }
        })
        setfilter(filteredData)
        value.length > 0 ? setshow(false) : setshow(true)

        if (filteredData.length > 0) {
            setsetshowshearch(true)

        } else {
            setsetshowshearch(false)
        }

    }
    return (
        <>

            <Box sx={{ flexGrow: 1 }}>
                <Toolbar>

                    <Typography sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block', md: 'block' } }} >
                        <Link to='/AddRecordsform'> <Button > <AddIcon /> Add record </Button> </Link>
                    </Typography>

                    <Search onChange={(val) => { searchdata(val) }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search first name …" inputProps={{ 'aria-label': 'search' }} />
                    </Search>

                </Toolbar>
            </Box>

            <div style={{ marginRight: 30, marginLeft: 30 }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">#</StyledTableCell>
                                <StyledTableCell align="center">First Name</StyledTableCell>
                                <StyledTableCell align="center">Last Name</StyledTableCell>
                                <StyledTableCell align="center">Email</StyledTableCell>
                                <StyledTableCell align="center">State</StyledTableCell>
                                <StyledTableCell align="center">City</StyledTableCell>
                                <StyledTableCell align="center">Pincode</StyledTableCell>
                                <StyledTableCell align="center">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {(show) ? !setshowshearch && fetchdata.map((row, inx) => (
                                <StyledTableRow key={inx}>
                                    <StyledTableCell component="th" scope="row" align="center">{inx + 1}</StyledTableCell>
                                    <StyledTableCell align="center">{row.first_name}</StyledTableCell>
                                    <StyledTableCell align="center">{row.last_name}</StyledTableCell>
                                    <StyledTableCell align="center">{row.email}</StyledTableCell>
                                    <StyledTableCell align="center">{row.states}</StyledTableCell>
                                    <StyledTableCell align="center">{row.city}</StyledTableCell>
                                    <StyledTableCell align="center">{row.pincode}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button style={{ backgroundColor: 'blue', color: 'white', borderRadius: 30, padding: 3, }} onClick={() => edituser(row)}>Edit</Button >
                                        <Button style={{ backgroundColor: 'red', color: 'white', borderRadius: 30, padding: 3, marginLeft: 8 }} onClick={() => { handleOpen(row) }}>Delete</Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )) : <>
                                {!(filter.length > 0) && <h1>Search not found</h1>}
                            </>
                            }

                            {setshowshearch && filter && filter.map((row, inx) => (
                                <StyledTableRow key={inx}>
                                    <StyledTableCell component="th" scope="row" align="center">{inx + 1}</StyledTableCell>
                                    <StyledTableCell align="center">{row.first_name}</StyledTableCell>
                                    <StyledTableCell align="center">{row.last_name}</StyledTableCell>
                                    <StyledTableCell align="center">{row.email}</StyledTableCell>
                                    <StyledTableCell align="center">{row.states}</StyledTableCell>
                                    <StyledTableCell align="center">{row.city}</StyledTableCell>
                                    <StyledTableCell align="center">{row.pincode}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button style={{ backgroundColor: 'blue', color: 'white', borderRadius: 30, padding: 3, }} onClick={() => edituser(row)}>Edit</Button >
                                        <Button style={{ backgroundColor: 'red', color: 'white', borderRadius: 30, padding: 3, marginLeft: 8 }} onClick={() => { handleOpen(row) }}>Delete</Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            {delName && <DeletePopup setOpen={setOpen} open={open} delName={delName} getData={getData} />}
        </>
    );
}


export default TableData;