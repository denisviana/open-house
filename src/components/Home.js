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
import ListSubHeader from '@material-ui/core/ListSubheader';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import Hidden from '@material-ui/core/Hidden';


const itemsInCart = [];

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false,
            anchorEl: null,
            items: [],
            openDialog: false,
            itemSelected: '',
            orderBy: {
                by: 'title',
                direction: 'asc'
            },
            itemsCart: [],
            openSnack: false,
            category : 'Todos'
        };

    }

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
      };
    

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    sortItemsBy = (orderBy, direction) => {
        let order = {
            by: orderBy,
            direction: direction
        }

        this.setState({orderBy : order});

        if(this.state.category == 'Todos'){
            FirebaseService.getDataList('products', order, (dataReceived) =>
            this.setState({ items: dataReceived }));
        }else{
            FirebaseService.getDataByCategory('products', this.state.orderBy, this.state.category, (dataReceived) =>
            this.setState({ items: dataReceived }));
        }

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
        this.setState({ openDialog: true, itemSelected: title });
    };

    handleCloseDialog = () => {
        this.setState({ openDialog: false });
    };

    onCategoryClicked = (category) => {
    
        this.setState({category : category, mobileOpen : false});

        if(category == 'Todos'){
            FirebaseService.getDataList('products', this.state.orderBy, (dataReceived) =>
            this.setState({ items: dataReceived }))
        }else{
            FirebaseService.getDataByCategory('products', this.state.orderBy, category, (dataReceived) =>
            this.setState({ items: dataReceived }))
        }

    };

    getItemById(id) {
        FirebaseService.getItemById('products', id, (dataReceived) =>
            console.log(dataReceived['isSelected']))
    }

    componentWillMount(){

        /*if(!FirebaseService.auth().currentUser){
            this.props.history.push('/notfound')
            console.log("User not logged in")
        }else
            console.log("User logged in")*/

    }

    componentDidMount() {
        let order = {
            by: 'title',
            direction: 'asc'
        }
        
        FirebaseService.getDataList('products', order, (dataReceived) =>
            this.setState({ items: dataReceived }))

        CartStore.addChangeListener(this._onChange);
        CartStore.addAlreadyExistsListener(this._onItemAlreadyExists);
        CartStore.addOnItemAddedSuccessful(this._onItemAddedSuccessful);
    }

    componentWillUnmount() {
        CartStore.removeChangeListener(this._onChange);
        CartStore.removeAlreadyExistsListener(this._onItemAlreadyExists);
        CartStore.removeOnItemAddedSuccessful(this._onItemAddedSuccessful);
    }

    _onItemAlreadyExists = () => {
        this.setState({ snackMsg: "Ops, já existe um item igual adicionado no carrinho.", openSnack: true });
    }

    _onItemAddedSuccessful = () => {
        let item = CartStore.getLastItemAdded();
        this.setState({ snackMsg: item.title + " adicionado no carrinho.", openSnack: true, itemsCart: itemsInCart });
    }

    _onChange = () => {
        let items = [];
        items = CartStore.getCartItems();
        this.setState({ itemsCart: items });
    }

    addProductToCart(item) {

        var update = {
            name: 'name'
        }

        let email = this.props.location.param1;
        let name = this.props.location.param2
        itemsInCart.push(item);
        CartActions.addToCart(item, update, email, name);
        CartActions.updateCartVisible(true);
    }

    updateUi = () => {

        let itemChilds = [];
        const { width } = this.props;

        this.state.items.map((item) => {
            if (width == 'xs') {
                itemChilds.push(
                    <Grid item xs='12' sm='5' lg='3' md='4' key={item.key} style={{ position: 'relative' }}>

                        <Typography component="h6" variant="h5" color="secondary" style={
                            item.available ? { top: '50%', position: 'absolute', zIndex: 100, left: '30%', opacity: '0' } : { top: '40%', position: 'absolute', zIndex: 100, left: '30%', opacity: '1' }
                        }><b>INDISPONÍVEL</b></Typography>

                        <Card style={item.available ? {
                            opacity: "1",
                            borderRadius: 5, display: 'flex', direction: "row",
                            alignItems: "center",
                            justify: "center"
                        } :
                            {
                                opacity: "0.2",
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
                                    <SecondaryButton label="Loja" disabled={!item.available} style={{ marginRight: 10 }} href={item.storeUrl} />
                                </CardActions>
                            </div>
                        </Card>
                    </Grid>
                )
            } else {
                itemChilds.push(
                    <Grid item xs='10' sm='5' lg='3' md='4' key={item.key} style={{ position: 'relative' }}>

                        <Typography component="h6" variant="h5" color="secondary" style={
                            item.available ? { top: '50%', position: 'absolute', zIndex: 100, left: '30%', opacity: '0' } : { top: '50%', position: 'absolute', zIndex: 100, left: '30%', opacity: '1' }
                        }><b>INDISPONÍVEL</b></Typography>

                        <Card style={item.available ? { borderRadius: 5, opacity: "1" } : { borderRadius: 5, opacity: "0.2" }}>
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
                                <SecondaryButton label="Ver loja" disabled={!item.available} href={item.storeUrl} />
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
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Navbar className={classes.appBar} onMenuClick={this.handleDrawerToggle}/>
                <Hidden smDown implementation="css">
                <Drawer className={classes.drawer}
                ModalProps={{
                    keepMounted: true,
                  }}
                    variant="temporary"
                    anchor='left'
                    open={this.state.mobileOpen}
                    onClose={this.handleDrawerToggle}
                    classes={{
                    paper: classes.drawerPaper,
                    }}>
                    <div className={classes.toolbar} />
                            <List component="nav" style={{background:"#ffffff"}}
                            subheader={<ListSubHeader component="div">Categorias</ListSubHeader>}>
                                <ListItem  button>
                                    <ListItemText primary="Todos" onClick={(e) => this.onCategoryClicked(e.target.innerText)}/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="Cozinha" onClick={(e) => this.onCategoryClicked(e.target.innerText)}/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="Banheiro" onClick={(e) => this.onCategoryClicked(e.target.innerText)}/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="Sacada" onClick={(e) => this.onCategoryClicked(e.target.innerText)}/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="Jardinagem" onClick={(e) => this.onCategoryClicked(e.target.innerText)}/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="Decoração" onClick={(e) => this.onCategoryClicked(e.target.innerText)}/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="Quarto" onClick={(e) => this.onCategoryClicked(e.target.innerText)}/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="Limpeza" onClick={(e) => this.onCategoryClicked(e.target.innerText)}/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="Utilidades" onClick={(e) => this.onCategoryClicked(e.target.innerText)}/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="Sala" onClick={(e) => this.onCategoryClicked(e.target.innerText)}/>
                                </ListItem>
                            </List>
                            </Drawer>
                </Hidden>
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
                                <ListItemText primary="Ordem Alfabética" onClick={() => this.sortItemsBy('title')} />
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="Menor Preço" onClick={() => this.sortItemsBy('price', 'asc')} />
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="Maior Preço" onClick={() => this.sortItemsBy('price', 'desc')} />
                            </ListItem>
                        </List>
                    </Popover>

                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left'
                        }}
                        open={this.state.openSnack}
                        onClose={this.handleSnackbarClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{this.state.snackMsg}</span>}
                    />

                    <Grid container spacing={16}>
                    <Grid item md="3" lg="3">
                    <Hidden smDown implementation="css">
                    <List component="nav" style={{background:"#ffffff", marginTop: 20}}
                            subheader={<ListSubHeader component="div">Categorias</ListSubHeader>}>
                                <ListItem  button>
                                    <ListItemText primary="Todos" onClick={(e) => this.onCategoryClicked(e.target.innerText)}/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="Cozinha" onClick={(e) => this.onCategoryClicked(e.target.innerText)}/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="Banheiro" onClick={(e) => this.onCategoryClicked(e.target.innerText)}/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="Sacada" onClick={(e) => this.onCategoryClicked(e.target.innerText)}/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="Jardinagem" onClick={(e) => this.onCategoryClicked(e.target.innerText)}/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="Decoração" onClick={(e) => this.onCategoryClicked(e.target.innerText)}/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="Limpeza" onClick={(e) => this.onCategoryClicked(e.target.innerText)}/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="Utilidades" onClick={(e) => this.onCategoryClicked(e.target.innerText)}/>
                                </ListItem>
                            </List>
                    </Hidden>
                        </Grid>
                    
                        <Grid item xs="12" sm="12" md="9" lg="9">
                        <Grid container
                                direction="row" 
                                alignItems="center"
                                justify="center"
                                style={{ paddingTop: 15 }}>

                                <Grid item xs='12'>
                                    <Grid container
                                        spacing={16}
                                        direction="row"
                                        alignItems="center"
                                        justify="center">
                                        {this.updateUi()}
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>

                    </Grid>

                </div>
            </div>
        )
    }
}

export default withRouter(withStyles(styles)(withWidth()(Home)));