import React, { forwardRef, useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { BoldText } from '../../utils/text';
import { bold } from '../../constants/Font';
import { Autocomplete } from '@material-ui/lab';
import { TextField, withStyles, Paper } from '@material-ui/core';
import { TextInput } from '../../utils/textInput';
import { primary } from '../../constants/Colors';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const CustomTextField = withStyles({
  root: {
    '& label': {
      color: primary,
      fontFamily: bold
    },
    '& label.Mui-focused': {
      color: primary,
      fontFamily: bold
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: primary,
      },
      '&:hover fieldset': {
        borderColor: primary,
      },
      '&.Mui-focused fieldset': {
        borderColor: primary,
      },
    },
  },
})(TextField);

export const Ingredients = (props) => {
    const {
        ingredientsData,
        setIngredientsData,
        data
    } = props;
    const [ingredientsName, setIngredientsName] = useState([]);
    useEffect(() => {
      let ingArr = [];
      ingredientsData.map((ingredient) => {
        return ingArr.push(ingredient.name);
      })
      setIngredientsName(ingArr);
    }, [ingredientsData]);
    const columns = [
      { title: 'Ingredient Name', field: 'name', editComponent: props => (
        <Autocomplete
          id="Ingredients"
          options={data}
          getOptionDisabled={option => ingredientsName.includes(option.name)}
          getOptionLabel={option => option.name}
          renderOption={(option) => (
            <React.Fragment>
              <img src={option.icon} width={50} height={50} alt={option.name} />
              {option.name}
            </React.Fragment>
          )}
          renderInput={params => {
            return (
              <CustomTextField
                {...params}
                variant="outlined"
                label="Ingredients"
              />
            );
          }}
          onChange={e => props.onChange(e.target.innerText)}
        />
      ) },
      { title: 'Quantity', field: 'quantity', editComponent: props => (
        <TextInput noClassName value={props.value} onChange={(e) => props.onChange(e.target.value)} labelName="Quantity" labelWidth={67}/>
      ) },
      { title: 'Measurement', field: 'measurement', editComponent: props => (
        <TextInput noClassName value={props.value} onChange={(e) => props.onChange(e.target.value)} labelName="Measurement" labelWidth={105}/>
      ) },
    ];
    return (
      <MaterialTable
        title={<BoldText>Ingredients</BoldText>}
        columns={columns}
        data={ingredientsData}
        icons={tableIcons}
        components={{
          Container: props => <Paper {...props} elevation={0}/>
        }}
        localization={{body: {editRow: {deleteText: <BoldText style={{textTransform: 'none'}}>Are you sure you want to delete this row?</BoldText>}}}}
        options={{
            actionsColumnIndex: -1,
            sorting: true,
            rowStyle: { fontFamily: bold },
            headerStyle: { fontFamily: bold },
            search: false
          }}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setIngredientsData([...ingredientsData, newData]);
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...ingredientsData];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setIngredientsData([...dataUpdate]);
  
                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...ingredientsData];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setIngredientsData([...dataDelete]);
                
                resolve()
              }, 1000)
            }),
        }}
      />
    )
  }
  