import React from 'react';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

export default function AboutDialog(props) {

  const useStyles = makeStyles((theme) => ({}));
  const classes = useStyles();

  return (
    <Dialog
      maxWidth={"md"}
      fullWidth={false}
      onClose={props.handleCloseAboutDialog}
      aria-labelledby="about-dialog-title"
      open={props.openAboutDialog}>
      <DialogTitle id="about-dialog-title">About this project</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <p>This prototype blends the talents of the Google Data Commons team, the Stanford Center for Population
            Health Sciences (PHS) team, and the Stanford Center for Biomedical Informatics Research (BMIR) team to
            create a low-friction tool to discover and use freely available research data.</p>
          <h2>Opportunity</h2>
          <h3>The data</h3>
          <p>The Google-provided <a href="https://datacommons.org/">Data Commons repository</a> provides access to many
            public data sets for research in many domains. The Data Commons Graph aggregates data from many different
            data sources into a single graph database, so that it can be accessed in a consistent way. This data is
            browseable by <a href="https://datacommons.org/place/">place</a> or <a
              href="https://datacommons.org/browser/">entity</a>, and publicly accessible via APIs, with numerous <a
              href="http://docs.datacommons.org/api/">python libraries</a> and <a
              href="http://docs.datacommons.org/tutorials">Python workbook examples</a>.</p>
          <h3>The researchers</h3>
          <p>Researchers in the Stanford PHS team, like all biomedical data researchers, must find, obtain, and
            integrate useful data quickly. At PHS, the goal is to improve the health of populations by bringing together
            diverse disciplines and data to understand and address social, environmental, behavioral, and biological
            factors on both a domestic and global scale. PHS takes a data management approach that openly seeks more
            advanced ways to access and integrate related data sets, and with BMIR provides research-centric leadership
            of the PHS-Data Commons project.</p>
          <h3>The developers</h3>
          <p>The BMIR team brings its experience with research data and <a
            href="https://metadatacenter.org">metadata</a>, <a href="https://bioontology.org">semantic technologies</a>,
            and highly usable and scalable research software to make Data Commons resources readily accessible to PHS
            researchers and the larger research community. Through analysis of the data models and availability in the
            Data Commons, the BMIR team finds and implements highly efficient ways for researchers to find any relevant
            data and bring it into their own data sets.</p>
          <h2>The Data Commons Wizard</h2>
          <p>The <a href="https://dcw.metadatacenter.org">Data Commons Wizard prototype</a> provides a simple interface
            through which researchers can specify the locations and topics for which they want data. Researchers can
            select whether they want to receive the timestamp and/or other provenance for the data. The Wizard can
            download the latest data for those locations and topics, as they are available in the Data Commons, or
            provide R code that will query the Data Commons directly for the data. (Code is also available to integrate
            the resulting values into the researcher's data table, using the chosen location type (zip codes, city name,
            etc.) as the lookup index for the retrieved values.</p>
          <p>The result is a simple web interface that can provide data for most <a
            href="https://docs.datacommons.org/statistical_variables.html">Data Commons statistical variables</a> to
            researchers at any level, including non-technical users.</p>
        </DialogContentText>
        <DialogActions>
          <Button onClick={props.handleCloseAboutDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );


}
