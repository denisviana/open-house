import React, { Component } from 'react';
import "font-awesome/css/font-awesome.css"
import Grid from '@material-ui/core/Grid';
import DenisImg from '../img/denis-img-2.png';
import MaluImg from '../img/malu-img-2.jpeg';
import withWidth from '@material-ui/core/withWidth';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import Icon from '@material-ui/core/Icon';

class Thanks extends Component{

    constructor(props){
        super(props);
    }

    render(){

        const { width } = this.props;

        return(
           <div>
                <div style={{position:'absolute', top:'0', left:'0', height:'100%', width:'100%', background:'#fff'}}>
                    <Grid container
                    spacing={16}
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{height:"100%"}}>
                        <Grid item xs="12" sm="4" md="4" lg="4" style={{padding:10}}>
                            <Typography  variant='display3' style={{color: "#fbc531", fontWeight:500}}>
                                TUDO CERTO!!!
                            </Typography>
                            <Typography variant="h6">
                                Sua seleção foi confirmada. Não esqueça agora de confirmar presença no envento do Facebook clicando no link abaixo.
                            </Typography>
                            <Button href="https://www.facebook.com/events/285907765241994/?ti=cl" style={{background:"#3b5998", color:"#ffffff", margin: 20}}>
                                <Icon className={classNames('fab fa-facebook-f')} style={{marginLeft:5,marginRight:5}}/>
                                Evento
                            </Button>
                        </Grid>
                        <Grid item xs="6" sm="4" md="4" lg="4">
                        <img src={MaluImg} style={
                                width == "xs" ? {maxHeight: 200} :
                                width == "sm" ? {maxHeight: 300} :
                                {maxHeight: 400} 
                            }/>
                        </Grid>
                        <Grid item xs="6" sm="4" md="4" lg="4">
                            <img src={DenisImg} style={
                                width == "xs" ? {maxHeight: 200} :
                                width == "sm" ? {maxHeight: 300} :
                                {maxHeight: 400} 
                            }/>
                        </Grid>
                        {/* <Grid item xs="12" style={{marginTop:20, marginBottom: 20}}>
                            <SecondaryButton onClick={() => this.handleOpenDialog()} label="VER PRODUTOS" 
                            style={{borderColor:"#fbc531", color:"#fbc531", fontWeight:500, width: 300, height: 70, fontSize: '20px'}}/>
                        </Grid> */}
                    </Grid>
            </div>
        
           </div>
        );
    }
}

export default withWidth()(Thanks);