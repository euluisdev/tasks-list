import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TextField } from '@mui/material';

//  declaration of the Transition component  using React.forwardRef
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//  get the {props} exports in EditeDialog
export default function EditeDialog({ openDialog, dialogHandler, item, editeTask }) {
  const [editedText, setEditedText] = React.useState(item.text); // creates a state to store edited text

  const textHandler = () => {
    editeTask(item.id, editedText); //calls  the function passing the edited object

    //calls the function and closes the   dialog
    dialogHandler();
  };

  return (
      <Dialog 
        open={openDialog}
        onClose={dialogHandler}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        fullWidth
      >
        <DialogTitle className='dialogTxt'>{"Edite sua tarefa"}</DialogTitle>
        <DialogContent className='dialogContainer'>
          <TextField 
          fullWidth 
          defaultValue={editedText} 
          onChange={(e) => setEditedText(e.target.value.trim())} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogHandler}>Cancelar</Button>
          <Button onClick={textHandler}>Ok</Button>
        </DialogActions>
      </Dialog>
  )
};