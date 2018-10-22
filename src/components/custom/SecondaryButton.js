import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// The `withStyles()` higher-order component is injecting a `classes`
// property that is used by the `Button` component.
const StyledButton = withStyles({
  root: {
    background: 'none',
    "&:hover" : {
      background: "none"
    },
    borderRadius: 50,
    borderColor: "#ffb300",
    color: '#ffb300',
    height: 35,
    padding: '0 10px',
    fontWeight: 700,
    marginLeft: 10,
    marginRight: 10
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

export default function SecondaryButton(props) {

  return <StyledButton variant="outlined">{props.label}</StyledButton>;
}