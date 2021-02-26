import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {VariableSizeList} from 'react-window';
import statVars from './../../resources/dc_statvars_list.json';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from "@material-ui/core/Checkbox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;

const useStyles = makeStyles({
  listbox: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const {data, index, style} = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
      fontSize: '0.8em',
    },
  });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const {children, ...other} = props;
  const itemData = React.Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), {noSsr: true});
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 10 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};

const renderGroup = (params) => [
  <ListSubheader key={params.key} component="div">
    {params.group}
  </ListSubheader>,
  params.children,
];

function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function TopicsSelectorVirtualized(props) {
  const classes = useStyles();

  const handleChange = (values) => {
    props.setDcVariableNames(values.map(value => value.name));
  };

  return (
    <Autocomplete
      multiple
      id="statvars-autocomplete"
      disableCloseOnSelect
      classes={classes}
      ListboxComponent={ListboxComponent}
      renderGroup={renderGroup}
      options={statVars}
      getOptionLabel={(option) => option.label}
      groupBy={(option) => option.category}
      onChange={(event, values) => handleChange(values)}
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
          {/*<Tooltip title="Show in Data Commons Graph Browser">*/}
          {/*  <IconButton onClick={() => window.open(DC_GRAPH_BROWSER_BASE_URL + option.name)}><OpenInNewIcon*/}
          {/*    fontSize={"small"}/></IconButton>*/}
          {/*</Tooltip>*/}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField {...params}
                   error={props.showDcVariableNamesError}
                   helperText={"Select Data Commons variables (" + formatNumber(statVars.length) + ")"}
                   variant="outlined"
                   label="DC variables"
                   placeholder=""/>
      )}
    />
  );
}
