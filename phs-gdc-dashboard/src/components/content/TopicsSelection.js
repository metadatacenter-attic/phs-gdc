/* eslint-disable no-use-before-define */

import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import myData from './../../resources/data2.json';
import makeStyles from "@material-ui/core/styles/makeStyles";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function TopicsSelection() {

  const useStyles = makeStyles((theme) => ({
    autoComplete: {
      maxWidth: '100%',
    },
  }));

  const classes = useStyles();

  return (
    <Autocomplete className={classes.autoComplete}
      multiple
      id="checkboxes-tags-demo"
      options={myData}
      disableCloseOnSelect
      groupBy={(option) => option.category}
      getOptionLabel={(option) => option.name}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField {...params}  variant="outlined" label="Variables" placeholder="" />
      )}
    />
  );
}
