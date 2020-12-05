import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {getPlaceStatistics} from "../../services/dataCommonsService";
import {toTabularJsonData} from "../../utils/dataCommonsUtils";
import {jsonToCsv} from "../../utils/utils";

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

  function getCsvData() {
    return getPlaceStatistics(["zip/94306", "zip/45202"], ["Count_Person", "Median_Income_Person"]).then((data) => {
      let tabJsonData = toTabularJsonData(data, "zip code");
      return jsonToCsv(tabJsonData);
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
    getCsvData().then(data => {
      console.log(data);
      const element = document.createElement("a");
      const file = new Blob([data], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = "myFile.csv";
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
        Generate R code
      </Button>
      <SimpleDialog open={open} onClose={handleClose}/>
    </div>
  );
}