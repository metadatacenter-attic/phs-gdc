import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {GetPlaceStatistics} from "../../services/dataCommonsService";

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
  };

  function getData() {
    return GetPlaceStatistics("zip/94306", "Count_Person").then((data) => {
      return data;
    })
      .catch((error) => {
        error.json().then((json) => {
          // this.setState({
          //   errors: json,
          //   loading: false
          // });
        })
      });
  };

  function downloadDataFile() {
    getData().then(data => {
      console.log(data);
      const element = document.createElement("a");
      const file = new Blob([JSON.stringify(data)], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = "myFile.txt";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    })
  };

  return (
    <div>
      <h2>{props.title}</h2>
      <h4>Select the discovered attributes for which you want to get data from Data Commons</h4>
      <Button variant="outlined" color="primary" onClick={downloadDataFile}>
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