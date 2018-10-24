import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    background: 'none',
    "&:hover" : {
      background: "none"
    },
    borderRadius: 0,
    borderColor: "#ffb300",
    color: '#ffb300',
    height: 35,
    padding: '0 10px',
    fontWeight: 700,
  },
  label: {
    textTransform: 'capitalize',
  },
});

class SecondaryButton extends Component{

  render(){
    const { classes } = this.props;
    return <Button disabled={this.props.disabled} classes={{ root: classes.root, label: classes.label }} onClick={this.props.onClick} href={this.props.href} style={this.props.style} target="_blank" variant="outlined">{this.props.label}</Button>;
  }
}

export default withStyles(styles)(SecondaryButton);