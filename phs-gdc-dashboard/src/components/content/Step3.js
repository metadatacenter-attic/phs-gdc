import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {getPlaceStatistics} from "../../services/dataCommonsService";
import {indexVariableValueToDcid, toTabularJsonData} from "../../utils/dataCommonsUtils";
import {jsonToCsv} from "../../utils/utils";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import HelpOutline from '@material-ui/icons/HelpOutline';
import Tooltip from "@material-ui/core/Tooltip";

export default function Step3(props) {

  const [open, setOpen] = React.useState(false);

  const [optionsState, setOptionsState] = React.useState({
    includeDates: true
  });


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleOptionsChange = (event) => {
    setOptionsState({...optionsState, [event.target.name]: event.target.checked});
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
    console.log('dcVariableNames', props.dcVariableNames);
    let phsVariableDcids = props.phsVariableValues.map(v => indexVariableValueToDcid(v, props.phsVariableName))
    let uniquePhsVariableDcids = [...new Set(phsVariableDcids)];
    return getPlaceStatistics(uniquePhsVariableDcids, props.dcVariableNames).then((data) => {
      console.log(data);
      let tabJsonData = toTabularJsonData(data, props.phsVariableName, props.phsVariableValues, true);
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
      <h4>Download the Data Commons data and use them in your project</h4>

      <div>
        <FormControl component="fieldset">
          <FormLabel component="legend">Export settings</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={optionsState.includeDates} onChange={handleOptionsChange} name="includeDates"/>}
              label="Include dates"
            />
            <Tooltip title="For each selected variable, it includes an additional column with the date (e.g., year) the data was collected.">
              <HelpOutline />
            </Tooltip>
          </FormGroup>
        </FormControl>
      </div>

      <div>
        <Button variant="outlined" color="primary" onClick={downloadDataFile}>
          Download data
        </Button>
        <br/>
        <br/>
        <br/>
        <Button variant="outlined" color="primary" onClick={handleClickOpen} disabled={true}>
          Generate R code
        </Button>
        <SimpleDialog open={open} onClose={handleClose}/>
      </div>
    </div>
  );
}