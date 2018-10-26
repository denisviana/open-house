import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Image from 'material-ui-image';
import DenisImg from '../img/denis-img-1.png';
import MaluImg from '../img/malu-img-1.png';
import withWidth from '@material-ui/core/withWidth';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import SecondaryButton from "./custom/SecondaryButton";
import PrimaryButton from "./custom/PrimaryButton";
import Slide from '@material-ui/core/Slide';
import FirebaseService from '../services/FirebaseServices';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'


function Transition(props) {
    return <Slide direction="left" {...props} />;
}

class Welcome extends Component{

    constructor(props){
        super(props);
        this.state = {
            openDialog : false,
            email : ""
        }
    }

    navigateToHome = () => {
        
        const email = this.state.email;

        const newTo = { 
            pathname: "/email/"+email 
        };

    }

    handleCloseDialog = () => {
        this.setState({openDialog : false});
    };

    handleChange = name => event => {
        this.setState({
          email: event.target.value,
        });
    };

    handleOpenDialog = () => {
        console.log('Open dialog');
        this.setState({openDialog : true});
    };

    render(){

        const { width } = this.props;

        return(
           <div>
                <div style={{position:'absolute', top:'0', left:'left', height:'100%', width:'100%', background:'#fbc531'}}>
                    <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{height:"100%"}}>
                        <Grid item xs="12" style={{paddingTop:20,paddingBottom:20}}>
                            <Typography component="h2" variant='display3' style={{color: "#fff"}}>
                                Open House
                            </Typography>
                        </Grid>
                        <Grid item xs="6">
                            <img src={DenisImg} style={
                                width == "xs" ? {maxHeight: 200} :
                                width == "sm" ? {maxHeight: 300} :
                                {maxHeight: 400} 
                            }/>
                        </Grid>
                        <Grid item xs="6">
                        <img src={MaluImg} style={
                                width == "xs" ? {maxHeight: 200} :
                                width == "sm" ? {maxHeight: 300} :
                                {maxHeight: 400} 
                            }/>
                        </Grid>
                        <Grid item xs="12" style={{marginTop:20, marginBottom: 20}}>
                            <SecondaryButton onClick={() => this.handleOpenDialog()} label="VER PRODUTOS" 
                            style={{borderColor:"#ffffff", color:"#ffffff", fontWeight:500, width: 300, height: 70, fontSize: '20px'}}/>
                        </Grid>
                    </Grid>
            </div>
            <Dialog
            keepMounted
            minWidth="md"
            open={this.state.openDialog}
            onClose={this.handleDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Para visualizar os produtos, por favor informe seu e-mail.
                    </DialogContentText>
                <div>
                        <TextField
                            onChange={this.handleChange('name')}
                            margin="normal"
                            variant="outlined"
                            className='input-field' 
                            type='email' 
                            label='E-mail'
                            required
                        ></TextField>
                </div>
                </DialogContent>
                <DialogActions>
                    <SecondaryButton label="Voltar" onClick={() => this.handleCloseDialog()}/>
                    <PrimaryButton label="Pronto"  component={Link} to={{pathname : "/home", 
                    param1 : this.state.email}}/>
            </DialogActions>
            </Dialog>
           </div>
        );
    }
}

export default withWidth()(Welcome);