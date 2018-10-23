import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import PrimaryButton from './custom/PrimaryButton';
import SecondaryButton from "./custom/SecondaryButton";
import SortButton from './custom/ButtomWithIcon';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText';
import FirebaseService from '../services/FirebaseServices';
import Image from 'material-ui-image';
import withWidth from '@material-ui/core/withWidth';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CartActions from '../actions/CartActions';


function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            items: [],
            openDialog: false,
            itemSelected: '',
        };
    }
    

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    handleClickOpenDialog = (title) => {
        this.setState({ openDialog: true, itemSelected : title });
      };
    
    handleCloseDialog = () => {
        this.setState({ openDialog: false });
    };

    getItemById(id) {
        FirebaseService.getItemById('products', id, (dataReceived) =>
            console.log(dataReceived['isSelected']))
    }

    componentDidMount() {
        FirebaseService.getDataList('products', (dataReceived) =>
            this.setState({ items: dataReceived }))
    }

    addProductToCart(item){

        var update = {
            name : 'name'
        }

        CartActions.addToCart(item,update);
        CartActions.updateCartVisible(true);
    }

    updateUi = () => {

        let itemChilds = [];
        const { width } = this.props;

        console.log(width);

        this.state.items.map((item, index) => {
            if (width == 'xs') {
                itemChilds.push(
                    <Grid item xs='12' sm='5' lg='3' md='4' key={item.key}>
                        <Card style={{
                            borderRadius: 5, display: 'flex', direction: "row",
                            alignItems: "center",
                            justify: "center"
                        }}>
                            <CardMedia style={{ width: '100%', padding: 5 }}>
                                <Image src={item.imageUrl} />
                            </CardMedia>
                            <div style={{ displa: 'flex', flexDirection: 'column' }}>
                                <CardActionArea style={{ flex: '1 0 auto' }}
                                    disableRipple='true'
                                    disableTouchRipple='true'
                                    disabled='true'>
                                    <CardContent>
                                        <Typography component="h3" variant="h7" align='left'>{item.title}</Typography>
                                        <Typography component="p" align='left' style={{ color: '#5d5d5d' }}>
                                            Preço médio: <span style={{ fontWeight: 600, color: '#ffb300' }}>{item.price}</span>
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions style={{ justifyContent: 'left' }}>
                                    <PrimaryButton variant="contained" onClick={() => this.addProductToCart(item)} label="Selecionar" />
                                    <SecondaryButton label="Loja" style={{marginRight:10}} />
                                </CardActions>
                            </div>
                        </Card>
                    </Grid>
                )
            } else {
                itemChilds.push(
                    <Grid item xs='10' sm='5' lg='3' md='4' key={item.key}>
                        <Card style={{ borderRadius: 5 }}>

                            <CardActionArea
                                disableRipple='true'
                                disableTouchRipple='true'
                                disabled='true'>

                                <CardMedia style={{ padding: 16 }}>
                                    <Image src={item.imageUrl} />
                                </CardMedia>

                                <CardContent>
                                    <Typography component="h2" variant="h6">{item.title}</Typography>
                                    <Typography component="p" style={{ color: '#5d5d5d' }}>
                                        Preço médio: <span style={{ fontWeight: 600, color: '#ffb300' }}>{item.price}</span>
                                    </Typography>
                                </CardContent>

                            </CardActionArea>

                            <CardActions style={{ justifyContent: 'center', marginBottom: '10px' }}>
                                <PrimaryButton variant="contained" onClick={() => this.addProductToCart(item)} label="Selecionar" />
                                <SecondaryButton label="Ver loja" />
                            </CardActions>
                        </Card>
                    </Grid>
                )
            }
        }
        );
        return itemChilds;
    }



    render() {

        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className="content">

                <SortButton float="right" label='Ordenar' icon='fas fa-sort-amount-up'
                    aria-haspopup="true"
                    aria-owns={open ? 'simple-popper' : null}
                    onClick={this.handleClick} />

                <Popover
                    id="simple-popper"
                    open={open}
                    anchorEl={anchorEl}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <List component="nav">
                        <ListItem button>
                            <ListItemText primary="Ordem Alfabética" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Menor Preço" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Maior Preço" />
                        </ListItem>
                    </List>
                </Popover>

                <Grid container
                    direction="row" 
                    alignItems="center"
                    justify="center"
                    style={{ paddingTop: 15}}>

                    <Grid item xs='12' lg='8'>
                        <Grid container
                        spacing={16}
                        direction="row" 
                        alignItems="center"
                        justify="center">
                            {this.updateUi()}
                        </Grid>
                    </Grid>

                </Grid>


                <Dialog
                    TransitionComponent={Transition}
                    keepMounted
                    open={this.state.openDialog}
                    onClose={this.handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Selecionar item"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Tem certeza que deseja selecionar o item <b>{this.state.itemSelected}</b>? Uma vez selecionado, o item será removido da lista.
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <PrimaryButton label="Sim, tenho certeza." />
                            <SecondaryButton label="Escolher outro." onClick={() => this.handleCloseDialog()}/>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }
}

export default withWidth()(Home);