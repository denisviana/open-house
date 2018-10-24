import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import PrimaryButton from './custom/PrimaryButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText';
import FirebaseService from '../services/FirebaseServices';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';

import '../css/add.css'

class Add extends Component{

    submit = (event) => {
        event.preventDefault();

        const newItem = {
            title : this.state.name,
            imageUrl: this.state.imageUrl,
            storeUrl: this.state.storeUrl,
            price: this.state.price,
            environment: this.state.environment,
            isSelected: false
        }

        FirebaseService.saveData('products',newItem);
        this.setState({openSnack:true})

    }

    state = {
        name: '',
        imageUrl: '',
        storeUrl: '',
        price: '',
        environment: '',
        openSnack: false,
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

      handleSnackbarClose = () => {
        this.setState({ openSnack: false });
      };

    render(){

        const { openSnack } = this.state;

        const environments = [
            {
                label: 'Sala',
            },
            {
                label: 'Cozinha',
            },
            {
                label: 'Banheiro',
            },
            {
                label: 'Sacada',
            },
            {
                label: 'Jardinagem',
            },
            {
                label: 'Decoração',
            },
            {
                label: 'Quarto',
            }
          ];

        return(
            <div>
                <form onSubmit={this.submit}>
                    <Grid 
                    container 
                    direction="row"
                    alignItems="center"
                    justify="center"
                    spacing={6}
                    style={{paddingTop:30}}>
                        <Grid  item xs='12' sm='12' md='6' lg='5'>
                            <Card>
                                <CardContent>
                                    <Grid container spacing={16}>
                                        <Grid item xs='12' sm='6' md='6' lg='6'>
                                            <TextField
                                            onChange={this.handleChange('name')}
                                            margin="normal"
                                            variant="outlined"
                                            className='input-field' 
                                            type='text' 
                                            label='Nome do produto'
                                            required
                                            ></TextField>
                                        </Grid>
                                        <Grid item xs='12' sm='6' md='6' lg='6'>
                                            <TextField
                                            onChange={this.handleChange('price')}
                                            margin="normal"
                                            variant="outlined"
                                            className='input-field' 
                                            type='number'
                                            step="0.01"
                                            min="0"
                                            label='Valor médio'
                                            required
                                            ></TextField>
                                        </Grid>
                                        <Grid item xs='12' lg='12'>
                                            <TextField 
                                            onChange={this.handleChange('imageUrl')}
                                            margin="normal"
                                            variant="outlined"
                                            className='input-field' 
                                            type='text' 
                                            label='Url da imagem'
                                            required
                                            ></TextField> 
                                        </Grid>
                                        <Grid item xs='12' sm='6' md='6' lg='6'>
                                            <TextField 
                                            onChange={this.handleChange('storeUrl')}
                                            margin="normal"
                                            variant="outlined"
                                            className='input-field' 
                                            type='text' 
                                            label='Link da loja'
                                            required
                                            ></TextField> 
                                        </Grid>   
                                        <Grid item xs='12' sm='6' md='6' lg='6'>
                                            <TextField
                                                required
                                                id="outlined-select-currency"
                                                select
                                                onChange={this.handleChange('environment')}
                                                className='input-field'
                                                label="Ambiente"
                                                value={this.state.environment}
                                                variant="outlined"
                                                >
                                                {environments.map(option => (
                                                    <MenuItem key={option.label} value={option.label}>
                                                    {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid> 

                                    </Grid>
                                </CardContent>
                                <CardActions>
                                    <PrimaryButton type='submit' label='Salvar' style={{width:'30%', margin: 10}}/>
                                </CardActions>                    
                            </Card>
                        </Grid>
                    </Grid> 
                </form>
                <Snackbar
                    anchorOrigin={{ 
                        vertical : 'top', 
                        horizontal: 'right' }}
                    open={openSnack}
                    onClose={this.handleSnackbarClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Item {this.state.name} Cadastrado com sucesso</span>}
                />
            </div>
        );
    }

}

export default Add;