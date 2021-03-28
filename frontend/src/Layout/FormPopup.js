import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import RequestForm from './RequestForm';
import UploadPhotoForm from './uploadPhotoForm';



export default function FormPopup(props) {
    const [open, setOpen] = React.useState(false);
    const [lable, setLable] = React.useState(props.x);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

   
    return (
        <div className="pb-4">
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                {lable}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{lable=="myLeves" ? "Apply Leave" : "Update Your Photo"}</DialogTitle>
                <DialogContent>
                   {lable == "myLeves" ? <RequestForm handleClose={handleClose} /> : <UploadPhotoForm handleClose={handleClose} />} 
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}