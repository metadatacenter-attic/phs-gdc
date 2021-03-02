import React from 'react';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button";

export default function ContactUsDialog(props) {

  return (
    <Dialog
      maxWidth={"sm"}
      fullWidth={false}
      onClose={props.handleCloseContactUsDialog}
      aria-labelledby="contact-dialog-title"
      open={props.openContactUsDialog}>
      <DialogTitle id="contact-dialog-title">Contact us</DialogTitle>
      <DialogContent>
        <DialogContentText> If you have general feedback, use the 'Feedback' widget on the right hand side of the screen
          or enter a ticket to the <a href="https://github.com/metadatacenter/phs-gdc/issues">Data Commons Wizard GitHub
            repository</a>.</DialogContentText>
        <DialogContentText>For other inquiries, send an email to jgraybeal (at) stanford.edu.</DialogContentText>
        <DialogActions>
          <Button onClick={props.handleCloseContactUsDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );


}
