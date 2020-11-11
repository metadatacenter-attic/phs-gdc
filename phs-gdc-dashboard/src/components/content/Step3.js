import Typography from "@material-ui/core/Typography";
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";


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
      <h4>Select the discovered attributes for which you want to get data from Google Data Commons</h4>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Generate R code
      </Button>
      <SimpleDialog open={open} onClose={handleClose}/>
    </div>
  );
}