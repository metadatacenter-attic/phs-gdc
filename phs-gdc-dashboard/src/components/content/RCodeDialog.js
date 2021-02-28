import React from 'react';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {generateRCodeForInstallation} from "../../services/codeGenerationService";
import {generateRCodeForRetrieval} from "../../services/codeGenerationService";
import IconButton from "@material-ui/core/IconButton";
import FileCopyIcon from '@material-ui/icons/FileCopy';
//import {SNIPPET_1_URL} from "../../constants";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/default-highlight";
import {stackoverflowLight} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
//import GitHubIcon from '@material-ui/icons/GitHub';

export default function RCodeDialog(props) {

  const useStyles = makeStyles((theme) => ({
    codeDescription: {
      textAlign: 'left',
      width: 700,
      fontSize: 15,
      color: '#313131',
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(-4)
    },
    codeOptions: {
      textAlign: 'right',
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(-1),
    },
    codeContent: {
      minHeight: 50,
      width: 750
    }
  }));
  const classes = useStyles();

  const [snippetOption, setSnippetOption] = React.useState(0);
  const handleSnippetOptionChange = (event, newValue) => {
    setSnippetOption(newValue);
  };

  return (
    <Dialog
      maxWidth={"md"}
      fullWidth={false}
      onClose={props.handleCloseCodeDialog}
      aria-labelledby="r-dialog-title"
      open={props.openCodeDialog}>
      <DialogTitle id="r-dialog-title">R code</DialogTitle>
      <DialogContent>
        <DialogContentText>Use one of the following methods to retrieve and merge DataCommons.org data into your data frame.
        </DialogContentText>
        <Tabs
          value={snippetOption}
          onChange={handleSnippetOptionChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="File-based Data Retrieval"/>
          <Tab label="API-based Data Retrieval"/>
        </Tabs>
        <div className={classes.codeOptions}>
          <p className={classes.codeDescription}><b>Installation</b>: Run the code below to set up the required libraries (only once).</p>
          <CopyToClipboard
            text={generateRCodeForInstallation(snippetOption)}>
            <Tooltip title="Copy to clipboard">
              <IconButton><FileCopyIcon fontSize={"small"}/></IconButton>
            </Tooltip>
          </CopyToClipboard>
        </div>
        <div className={classes.codeContent}>
          <SyntaxHighlighter language="r" style={stackoverflowLight}>
            {generateRCodeForInstallation(snippetOption)}
          </SyntaxHighlighter>
        </div>
        <div className={classes.codeOptions}>
          <p class={classes.codeDescription}>Run the code below to retrieve the DataCommons.org data and to merge it with your existing data frame. Replace the <tt>&#60;YOUR_DATA_FRAME&#62;</tt> and <tt>&#60;YOUR_COLUMN_NAME&#62;</tt> placeholders accordingly.</p>
          <CopyToClipboard
            text={generateRCodeForRetrieval(snippetOption, props.phsVariableName, props.phsVariableValues, props.dcVariableNames,
              props.settingsState.includeDates)}>
            <Tooltip title="Copy to clipboard">
              <IconButton><FileCopyIcon fontSize={"small"}/></IconButton>
            </Tooltip>
          </CopyToClipboard>
          {/*<Tooltip title="Show GitHub source">*/}
          {/*  <IconButton onClick={() => window.open(SNIPPET_1_URL)}><GitHubIcon fontSize={"small"}/></IconButton>*/}
          {/*</Tooltip>*/}
        </div>
        <div className={classes.codeContent}>
          <SyntaxHighlighter language="r" style={stackoverflowLight}>
            {generateRCodeForRetrieval(snippetOption, props.phsVariableName, props.phsVariableValues, props.dcVariableNames,
              props.settingsState.includeDates)}
          </SyntaxHighlighter>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleCloseCodeDialog} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );


}
