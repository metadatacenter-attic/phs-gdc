import React from 'react';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {generateRCode} from "../../services/codeGenerationService";
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
    codeOptions: {
      textAlign: "right",
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(-2),
    },
    codeContent: {
      minHeight: 450,
      maxWidth: 700
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
        <DialogContentText>Use one of the following code snippets to retrieve and merge Data Commons data into your data
        </DialogContentText>
        <Tabs
          value={snippetOption}
          onChange={handleSnippetOptionChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Option 1"/>
          <Tab label="Option 2"/>
        </Tabs>
        <div className={classes.codeOptions}>
          <CopyToClipboard
            text={generateRCode(snippetOption, props.phsVariableName, props.phsVariableValues, props.dcVariableNames,
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
            {generateRCode(snippetOption, props.phsVariableName, props.phsVariableValues, props.dcVariableNames,
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
