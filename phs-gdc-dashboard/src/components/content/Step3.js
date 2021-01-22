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
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import HelpOutline from '@material-ui/icons/HelpOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import Tooltip from "@material-ui/core/Tooltip";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";

export default function Step3(props) {

  const useStyles = makeStyles((theme) => ({
    settings: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(4),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    buttons: {
      marginTop: '4vh',
      //backgroundColor: 'yellow'
    }
  }));

  const classes = useStyles();

  const [optionsState, setOptionsState] = React.useState({
    includeDates: true
  });

  const [openCodeDialog, setOpenCodeDialog] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null); // popover anchor
  const openSettingsPopOver = Boolean(anchorEl);

  const handleClickOpenSettingsPopOver = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSettingsPopOver = () => {
    setAnchorEl(null);
  };

  const handleClickOpenCodeDialog = () => {
    setOpenCodeDialog(true);
  };

  const handleCloseCodeDialog = (value) => {
    setOpenCodeDialog(false);
  };

  const handleOptionsChange = (event) => {
    setOptionsState({...optionsState, [event.target.name]: event.target.checked});
  };

  function SettingsPopOver(props) {
    return (
      <div className={classes.settings}>
        <h4>Export settings</h4>
        <FormControl component="fieldset" fullWidth>
          <FormGroup row>
            <FormControlLabel
              labelPlacement="start"
              color
              control={<Switch checked={optionsState.includeDates} onChange={handleOptionsChange} name="includeDates"/>}
              label="Include dates"
            />
            <Tooltip
              title="For each selected variable, it includes an additional column with the date (e.g., year) the data was collected.">
              <HelpOutline/>
            </Tooltip>
          </FormGroup>
        </FormControl>
      </div>
    );
  };

  function CodeDialog(props) {
    return (
      <Dialog fullWidth={true} onClose={handleCloseCodeDialog} aria-labelledby="simple-dialog-title"
              open={openCodeDialog}>
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
    let phsVariableDcids = props.phsVariableValues.map(v => indexVariableValueToDcid(props.phsVariableName, v));
    let uniquePhsVariableValueDcids = [...new Set(phsVariableDcids)];
    return getPlaceStatistics(props.phsVariableName, uniquePhsVariableValueDcids, props.dcVariableNames).then((data) => {
      let tabJsonData = toTabularJsonData(data, props.phsVariableName, props.phsVariableValues, optionsState.includeDates);
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
      <IconButton aria-describedby={'settings-popover'}
                  onClick={handleClickOpenSettingsPopOver}><SettingsIcon/></IconButton>
      <Popover
        id={'settings-popover'}
        open={openSettingsPopOver}
        anchorEl={anchorEl}
        onClose={handleCloseSettingsPopOver}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <SettingsPopOver/>
      </Popover>
      <h4>Download the Data Commons data and use them in your project</h4>

      <div className={classes.buttons}>
        <Button variant="outlined" color="primary" onClick={downloadDataFile}>
          Download data
        </Button>
        <br/>
        <br/>
        <br/>
        <Button variant="outlined" color="primary" onClick={handleClickOpenCodeDialog} disabled={false}>
          Generate R code
        </Button>
        <CodeDialog open={openCodeDialog} onClose={handleCloseCodeDialog}/>
      </div>
    </div>
  );
}