import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  footer: {
    textAlign: "center",
    fontSize: "0.8em",
    lineHeight: "1.5em",
  },
}));

export default function AppFooter() {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <div>
        <a href="https://bmir.stanford.edu/">Stanford Center for Biomedical Informatics Research (BMIR)</a>
      </div>
      <div className="ml-auto">
        <span>&copy; 2021 </span>
        The Board of Trustees of Leland Stanford Junior University
      </div>
    </div>
  );
}