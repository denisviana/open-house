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
import CartActions from '../actions/CartActions';
import CartStore from '../stores/cart/CartStore';
import Snackbar from '@material-ui/core/Snackbar';
import Navbar from '../components/Navbar';

const itemsInCart = [];

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            items: [],
            openDialog: false,
            itemSelected: '',
            orderBy : 'title',
            itemsCart : [],
            openSnack: false,
        };
        
    }
    

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    sortItemsBy = (orderBy, direction) => {
        let order = {
            by : orderBy,
            direction : direction
        }
        FirebaseService.getDataList('products', order, (dataReceived) =>
        this.setState({ items: dataReceived }))
        this.handleClose();
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    handleSnackbarClose = () => {
        this.setState({ openSnack: false });
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
        let order = {
            by : 'title',
            direction : 'asc'
        }
        FirebaseService.getDataList('products', order, (dataReceived) =>
            this.setState({ items: dataReceived }))
               
     CartStore.addChangeListener(this._onChange);
        
    }

    _onChange = () => {
        let items = [];
        items = CartStore.getCartItems();
        this.setState({itemsCart : items})
    }

    componentWillUnmount(){
        CartStore.removeChangeListener(this._onChange);
    }

    addProductToCart(item){

        if(this.state.itemsCart.includes(item)){
            this.setState({snackMsg : "Ops, já existe um item igual adicionado no carrinho.",  openSnack : true});
            return;
        }

        var update = {
            name : 'name'
        }
        
        let email = this.props.location.param1;
        let name = this.props.location.param2
        itemsInCart.push(item);
        CartActions.addToCart(item,update,email,name);
        CartActions.updateCartVisible(true);
        this.setState({snackMsg : item.title+" adicionado no carrinho.",  openSnack : true, itemsCart : itemsInCart});    }

    updateUi = () => {

        let itemChilds = [];
        const { width } = this.props;

        this.state.items.map((item) => {
                if (width == 'xs') {
                    itemChilds.push(
                        <Grid item xs='12' sm='5' lg='3' md='4' key={item.key} style={{position:'relative'}}>

                            <Typography component="h6" variant="h5" color="secondary" style={
                                item.available ? {top:'50%', position: 'absolute', zIndex: 100, left: '30%', opacity: '0'} : {top:'40%', position: 'absolute', zIndex: 100, left: '30%', opacity: '1'}
                            }><b>INDISPONÍVEL</b></Typography>

                            <Card style={item.available ?{
                                opacity:"1",
                                borderRadius: 5, display: 'flex', direction: "row",
                                alignItems: "center",
                                justify: "center"
                            } : 
                            {
                                opacity:"0.2",
                                borderRadius: 5, display: 'flex', direction: "row",
                                alignItems: "center",
                                justify: "center"
                            }}>
                                <CardMedia style={{ width: '100%', padding: 5 }}>
                                    <Image src={item.imageUrl} />
                                </CardMedia>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardActionArea style={{ flex: '1 0 auto' }}
                                        disableRipple='true'
                                        disableTouchRipple='true'
                                        disabled='true'>
                                        <CardContent>
                                            <Typography component="h6" align='left'><b>{item.title}</b></Typography>
                                            <Typography component="p" align='left' style={{ color: '#5d5d5d' }}>
                                                Preço médio: <span style={{ fontWeight: 600, color: '#ffb300' }}>R$ {item.price}</span>
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions style={{ justifyContent: 'left' }}>
                                        <PrimaryButton variant="contained" disabled={!item.available} onClick={() => this.addProductToCart(item)} label="Selecionar" />
                                        <SecondaryButton label="Loja" disabled={!item.available} style={{marginRight:10}} />
                                    </CardActions>
                                </div>
                            </Card>
                        </Grid>
                    )
                } else {
                    itemChilds.push(
                        <Grid item xs='10' sm='5' lg='3' md='4' key={item.key} style={{position:'relative'}}>

                            <Typography component="h6" variant="h5" color="secondary" style={
                                item.available ? {top:'50%', position: 'absolute', zIndex: 100, left: '30%', opacity: '0'} : {top:'50%', position: 'absolute', zIndex: 100, left: '30%', opacity: '1'}
                            }><b>INDISPONÍVEL</b></Typography>

                            <Card style={ item.available ? { borderRadius: 5, opacity:"1"} : { borderRadius: 5, opacity:"0.2"}}>
                                <CardActionArea
                                    disableRipple='true'
                                    disableTouchRipple='true'
                                    disabled='true'>
                                    <CardMedia style={{ padding: 16 }}>
                                        <Image src={item.imageUrl} />
                                    </CardMedia>

                                    <CardContent>
                                        <Typography component="h6"><b>{item.title}</b></Typography>
                                        <Typography component="p" style={{ color: '#5d5d5d' }}>
                                            Preço médio: <span style={{ fontWeight: 600, color: '#ffb300' }}>R$ {item.price}</span>
                                        </Typography>
                                    </CardContent>
    
                                </CardActionArea>
    
                                <CardActions style={{ justifyContent: 'center', marginBottom: '10px' }}>
                                    <PrimaryButton variant="contained" disabled={!item.available} onClick={() => this.addProductToCart(item)} label="Selecionar" />
                                    <SecondaryButton label="Ver loja" disabled={!item.available} href={item.storeUrl}/>
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
            <div>
              <Navbar/>
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
    }}>

    <List component="nav">
        <ListItem button>
            <ListItemText primary="Ordem Alfabética" onClick={() => this.sortItemsBy('title')}/>
        </ListItem>
        <ListItem button>
            <ListItemText primary="Menor Preço" onClick={() => this.sortItemsBy('price', 'asc')}/>
        </ListItem>
        <ListItem button>
            <ListItemText primary="Maior Preço" onClick={() => this.sortItemsBy('price', 'desc')}/>
        </ListItem>
    </List>
</Popover>

<Snackbar
    anchorOrigin={{ 
        vertical : 'top', 
        horizontal: 'left' }}
    open={this.state.openSnack}
    onClose={this.handleSnackbarClose}
    ContentProps={{
        'aria-describedby': 'message-id',
    }}
    message={<span id="message-id">{this.state.snackMsg}</span>}
/>

<Grid container
    direction="row" 
    alignItems="center"
    justify="center"
    style={{ paddingTop: 15}}>

    <Grid item xs='12' lg='10'>
        <Grid container
        spacing={16}
        direction="row" 
        alignItems="center"
        justify="center">
            {this.updateUi()}
        </Grid>
    </Grid>

</Grid>

</div>
            </div>
        )
    }
}

export default withWidth()(Home);