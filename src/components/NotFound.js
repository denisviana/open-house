import React, { Component } from 'react';
import "font-awesome/css/font-awesome.css"
import Grid from '@material-ui/core/Grid';
import DenisImg from '../img/denis-img-2.png';
import NotFoundImg from '../img/not-found.png';
import withWidth from '@material-ui/core/withWidth';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import Icon from '@material-ui/core/Icon';

class NotFound extends Component{

    constructor(props){
        super(props);
    }

    render(){

        const { width } = this.props;

        return(
           <div>
                <div style={{position:'relative', width:'100%'}}>
                    <Grid container
                    spacing={16}
                    direction="row"
                    style={{height:"100%"}}>
                        <Grid item xs="12">
                            <img src={NotFoundImg} style={
                                width == "xs" ? {maxHeight: 60} :
                                width == "sm" ? {maxHeight: 100} :
                                {maxHeight: 200} 
                            }/>
                        </Grid>
                        <Grid item xs="12"style={{padding:10}}>
                            <Typography  variant='display3' style={{color: "#fbc531", fontWeight:500}}>
                                Ops! Página não encontrada
                            </Typography>
                        </Grid>
                        <Grid item xs="12">
                            <Typography variant="display4">
                                404
                            </Typography>
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

export default withWidth()(NotFound);