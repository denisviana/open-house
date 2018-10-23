import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import PrimaryButton from '../components/custom/PrimaryButton';
import SecondaryButton from '../components/custom/SecondaryButton';


function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class AlertDialog extends Component{

    render(){
        return(

            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Selecionar item"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Tem certeza que certeza que deseja selecionar o item {this.props.itemName}? Uma vez selecionado, o item será removido da lista.
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <PrimaryButton label="Sim, tenho certeza."/>
                            <SecondaryButton label="Escolher outro."/>
                    </DialogActions>
                </Dialog>
            </div>

        );
    }
}

export default AlertDialog;