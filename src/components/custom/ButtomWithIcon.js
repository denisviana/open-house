import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';


const StyledButton = withStyles({
  root: {
    background: 'none',
    "&:hover" : {
      background: "none"
    },
    color: '#9e9a9a',
    padding: '0 10px',
    fontSize: 14,
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

export default function ButtomWithIcon(props) {

  return <StyledButton 
  onClick={props.onClick}
  style={{float:props.float}} 
  disableRipple="true" 
  disableTouchRipple="true" >
  {props.label}
  <Icon className={props.icon} style={{marginLeft: 10, fontSize: 17}}/></StyledButton>;
}