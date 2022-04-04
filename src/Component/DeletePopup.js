import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@material-ui/core';

import { getMethod } from '../utils/apimethods.js'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 300,
    bgcolor: 'background.paper',
    boxShadoyw: 240,
    textAlign: 'center',
    borderRadius: 3
};

const DeletePopup = ({ setOpen, open, delName, getData }) => {

    const handleClose = () => setOpen(false);

    const delectuser = async (email) => {
        const delUrl = (`https://k6j938wg66.execute-api.us-east-1.amazonaws.com/v1/delete?param1=${email}`);
        const resp = await getMethod(delUrl);

        if (resp.data.Success) {
            getData()
            setOpen(false);
            alert(resp.data.Message);

        } else {
            setOpen(false);
            alert(resp.data.Message);
        }

    }



    return (
        <div>
            <Modal open={open}>
                <Box sx={style} >
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mt: 6 }}>
                        Are you sure want to delete <b>{delName.first_name} {delName.last_name} </b>

                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Button style={{ backgroundColor: 'red', color: 'white', margin: '2rem 1rem', borderRadius: 10, padding: "0px 2rem" }} onClick={() => { delectuser(delName.email) }}>Delete</Button>
                        <Button style={{ backgroundColor: 'blue', color: 'white', margin: '2rem 1rem', borderRadius: 10, padding: "0px 2rem" }} onClick={handleClose} >Cancel</Button >
                    </Typography>
                </Box>
            </Modal>

        </div>
    );
}

export default DeletePopup