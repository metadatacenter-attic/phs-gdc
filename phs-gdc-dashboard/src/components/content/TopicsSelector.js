/* eslint-disable no-use-before-define */

import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import myData from './../../resources/data2.json';

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;

export default function TopicsSelector(props) {

  const handleChange = (values) => {
    props.setDcVariableNames(values.map(value => value.name));
  };

  return (
    <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  options={myData}
                  disableCloseOnSelect
                  groupBy={(option) => option.category}
                  onChange={(event, values) => handleChange(values)}
                  onBlur={props.validateStep2DcVariableNames}
                  getOptionLabel={(option) => option.label}
                  renderOption={(option, {selected}) => (
                    <React.Fragment>
                      <Checkbox
                        color={"primary"}
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{marginRight: 8}}
                        checked={selected}
                      />
                      {option.label}
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField {...params}
                               error={props.showDcVariableNamesError}
                               helperText={"Select Data Commons variables"}
                               variant="outlined"
                               label="DC variables"
                               placeholder=""/>
                  )}
    />
  );
}
