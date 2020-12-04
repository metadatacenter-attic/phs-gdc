import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";


export default function Step1(props) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  function SimpleDialog(props) {

    return (
      <Dialog fullWidth={true} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">R code</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Copy-paste the generated R code.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div>
      <h2>{props.title}</h2>
      <h4>Select the discovered attributes for which you want to get data from Data Commons</h4>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Download data
      </Button>
      <br/>
      <br/>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        See R code
      </Button>
      <SimpleDialog open={open} onClose={handleClose}/>
    </div>
  );
}