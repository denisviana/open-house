import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import DenisImg from '../img/denis-img-1.png';
import MaluImg from '../img/malu-img-1.png';
import withWidth from '@material-ui/core/withWidth';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
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
            email : "",
            name : "",
            uid : ""
        }
    }

    submit = (event) => {
        event.preventDefault();


    }

    componentWillMount(){

        FirebaseService.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({uid : user.uid});
            }else{
                this.setState({uid : ""});
            }
        });

        FirebaseService.auth().signInAnonymously().catch(function(error){
            console.log(error.message);
        });
    }

    navigateToHome = () => {
        
        const email = this.state.email;
        const name = this.state.name;

        const newTo = { 
            pathname: "/email/"+email 
        };

    }

    handleCloseDialog = () => {
        this.setState({openDialog : false});
    };

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
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
                <div style={{background:'#fbc531'}}>
                    <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{minHeight: '100vh', overflow: 'hidden'}}>
                        <Grid item xs="12" container
                    direction="row"
                    justify="center"
                    alignItems="center">
                            <Grid item xs="10" sm="7" md="4" lg="4" style={{paddingTop:20,paddingBottom:20}}>
                                <Typography variant='h2' style={{color: "#fff", fontFamily:'QuickSand'}}>
                                    Open House
                                </Typography>
                                <Typography variant="h6" style={{color: "#fff", fontFamily:'Kaushan Script', textAlign : 'right'}}>
                                    By Denis e Malu
                                </Typography>
                            </Grid>
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
            <form onSubmit={this.submit}>
            <Dialog
            TransitionComponent={Transition}
            keepMounted
            minWidth="md"
            open={this.state.openDialog}
            onClose={this.handleDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Para visualizar os produtos, por favor informe seu nome e e-mail.
                    </DialogContentText>
                <div>
                        <TextField
                            onChange={this.handleChange('name')}
                            margin="normal"
                            variant="outlined"
                            className='input-field' 
                            type='text' 
                            label='Nome'
                            autoCapitalize="true"
                        ></TextField>
                        <TextField
                            onChange={this.handleChange('email')}
                            margin="normal"
                            variant="outlined"
                            className='input-field' 
                            type='email' 
                            label='E-mail'
                            required
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                        ></TextField>
                </div>
                </DialogContent>
                <DialogActions>
                    <SecondaryButton label="Voltar" onClick={() => this.handleCloseDialog()}/>
                    <PrimaryButton label="Pronto" disabled={!(this.state.email.match("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"))} component={Link} to={{pathname : "/home/"+this.state.uid, 
                    param1 : this.state.email,
                    param2 : this.state.name}}/>
            </DialogActions>
            </Dialog>
            </form>
           </div>
        );
    }
}

export default withWidth()(Welcome);