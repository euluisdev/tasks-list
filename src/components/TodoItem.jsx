import React, { useEffect } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Paper } from '@mui/material'
import EditeDialog from './EditeDialog';

const TodoItem = ({ item, deleteTask, editeTask }) => { //inport props unstructured
  const [openDialog, setOpenDialog] = React.useState(false); //  create state using useState
  const [isChecked, setIsChecked] = React.useState(false);

  const dialogHandler = () => { // inverts the state value when called
    setOpenDialog(!openDialog);
  };

  // effect for saving and loading data from localStorage
  useEffect(() => {
    const storedChecked = JSON.parse(localStorage.getItem(`isChecked-${item.id}`)) || false;
    setIsChecked(storedChecked);
  }, [item.id]);

  const handleCheckboxChange = () => {
    const newChecked = !isChecked; // invert the checkbox state
    setIsChecked(newChecked);
    localStorage.setItem(`isChecked-${item.id}`, JSON.stringify(newChecked));
  };

  return (
    <>
      <EditeDialog editeTask={editeTask} openDialog={openDialog} dialogHandler={dialogHandler} item={item} /> {/* export the props here */}
      <Paper className='itemBtn'>
        <ListItem
          secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(item.id)}>
              <DeleteIcon />
            </IconButton>
          }
          disablePadding
        >
          <ListItemButton role={undefined} dense>
            <ListItemIcon>
              <Checkbox
                edge="start"
                tabIndex={-1}
                disableRipple
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </ListItemIcon>
            <ListItemText
              className='itemText'
              primary={item.text}
              onClick={() => setOpenDialog(true)} 
              style={{ textDecoration: isChecked ? 'line-through' : 'none' }} 
            />
          </ListItemButton>
        </ListItem>
      </Paper>
    </>
  );
};

export default TodoItem;