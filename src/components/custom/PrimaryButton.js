import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    background: '#ffb300',
    "&:hover" : {
      background: "#d69600"
    },
    borderRadius: 0,
    border: 0,
    color: 'white',
    height: 35,
    padding: '0 10px',
    fontWeight: 700,
    marginLeft: 10,
    marginRight: 10
  },
  label: {
    textTransform: 'capitalize',
  },
});

class PrimaryButton extends Component {

  render(){
    const { classes } = this.props;
    return <Button 
      type={this.props.type} 
      raised={true} 
      style={this.props.style} 
      onClick={this.props.onClick}
      classes={{ root: classes.root, label: classes.label }}
      >{this.props.label}
    </Button>; 
  }
}

export default withStyles(styles)(PrimaryButton);
