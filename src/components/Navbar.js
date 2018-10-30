import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import cart from '../img/cart.svg';
import Badge from '@material-ui/core/Badge';
import CartStore from '../stores/cart/CartStore';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton';
import SecondaryButton from "./custom/SecondaryButton";
import PrimaryButton from "./custom/PrimaryButton";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import FirebaseService from '../services/FirebaseServices';
import Slide from '@material-ui/core/Slide';
import DialogContentText from '@material-ui/core/DialogContentText';
import HtmlUtil from '../utils/HtmlUtil';
import { withRouter } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import CartActions from '../actions/CartActions';

const styles = theme => ({
    badge: {
      top: 1,
      right: -15,
      border: `2px solid ${
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
      }`,
    },
});

function Transition(props) {
    return <Slide direction="left" {...props} />;
}


class Navbar extends Component{

    constructor(props){
        super(props);
        this.state = {
            openDialog: false,
            anchorEl: null,
            counter : 0,
            itemsCart : [],
            openConfirmCartDialog: false,
            userEmail : "",
            userName : ""
        }
    }

    finalizeCart = () => {

        let items = this.state.itemsCart;

        items.map((value,index) =>
            FirebaseService.updateStateItem('products',value.key,false)
        )

        this.setState({itemsCart : [], counter : 0})
        this.setState({ openConfirmCartDialog: false });
        this.setState({ openDialog: false });

        let html = HtmlUtil.makeHtmlTemplate(items,this.state.userName);

        let confirmCart = {
            targetEmail : this.state.userEmail,
            userName : this.state.userName,
            items : items,
            html : html
        }

        FirebaseService.confirmItemsSelecteds('productsByEmail',confirmCart);
        this.setState({itemsCart : [], counter : 0});
        this.props.history.push('/thanks')

    }

    openPopup = event => {
        console.log("Clicked");
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    handleClickOpenDialog = () => {
        this.setState({ openDialog: true});
      };
    
    handleCloseDialog = () => {
        this.setState({ openDialog: false });
    };

    handleClickOpenConfirmCartDialog = () => {
        this.setState({ openConfirmCartDialog: true});
      };

    handleCloseConfirmCartDialog = () => {
        this.setState({ openConfirmCartDialog: false });
    };

    closePopup = () => {
        this.setState({
            anchorEl: null,
        });
    };

    removeItemFromCart(key){

        let itens = this.state.itemsCart;
        let index = itens.findIndex(function(i){
            return i.key === key
        });

        if(index != -1) itens.splice(index,1);
        let count = itens.length;
        this.setState({itemsCart : itens, counter : count});
        CartActions.removeItemFromCart(key);

        if(count == 0)
            this.handleCloseDialog();

    }

    componentDidMount(){
        CartStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        CartStore.removeChangeListener(this._onChange);
    }

    _onChange = () => {
        
        let items = [];
        let cart = CartStore.getCartItems();
        items = cart.products;
        this.setState({itemsCart : items, counter : items.length, userEmail : cart.userEmail, userName : cart.userName})
    }

    render(){

        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return(
            <div>
                <AppBar className={this.props.className}>
                    <Toolbar className="navbar-main">
                        <Hidden mdUp implementation="css">
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.props.onMenuClick}
                            className={{
                                marginRight: 20,
                            }} style={{zIndex: 4}}>
                            <MenuIcon style={{color:'#FFFFFF'}}/>
                        </IconButton>
                        </Hidden>
                        <Grid container alignItems="center" className="navbar-main" style={{position: 'fixed'}}>
                            <Grid item xs="12">
                                <a className="navbar-title">Open House</a>
                                <Typography style={{color: "#fff", fontFamily:'Kaushan Script', marginLeft: 80}}>
                                    By Denis e Malu
                                </Typography>                  
                            </Grid>
                            <IconButton  style={{position: 'absolute', right:25}} onClick={this.handleClickOpenDialog}
                            classes={{ badge: styles.badge}}
                            aria-haspopup="true"
                            aria-owns={open ? 'cart-popup' : null}>
                                <Badge badgeContent={this.state.counter > 0 ? this.state.counter : ""} color={this.state.counter > 0 ? "secondary" : "transparent"}> 
                                    <img src={cart} style={{height: 34}}/>
                                </Badge>
                            </IconButton>
                        </Grid>
                    </Toolbar>
                </AppBar>

                <Popover
                    id="cart-popup"
                    open={open}
                    anchorEl={anchorEl}
                    onClose={this.closePopup}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}>

                </Popover>

                <Dialog
                    TransitionComponent={Transition}
                    keepMounted
                    open={this.state.openDialog}
                    onClose={this.handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">{"Carrinho"}</DialogTitle>
                        <DialogContent>
                        <Divider/>
                            <div style={{width:"100%"}}>
                                {this.state.itemsCart.length > 0 ? 
                                <List>
                                    {
                                        this.state.itemsCart.map((value,index) => 
                                                <div>
                                                    <ListItem 
                                                    style={{paddingTop:5, paddingBottom:5, paddingLeft: 0, 
                                                    paddingRight: 0, minWidth:300, width:'100%'}}>
                                                        <img style={{height: 50, width: 50, marginRight: 15, display: 'inline-block'}} src={value.imageUrl}/>
                                                        <div style={{display: 'inline-block'}}>
                                                            <div style={{ display: 'flex', flexDirection: 'column', width: '80%'}}>
                                                                <span style={{fontSize: 13}}><b>{value.title}</b></span>
                                                                <span style={{fontSize: 13}}>R$ 200,00</span>
                                                            </div>
                                                        </div>
                                                        <ListItemSecondaryAction style={{display: 'inline-block'}}>
                                                            <IconButton onClick={() => this.removeItemFromCart(value.key)}>
                                                                <DeleteIcon color="#ccc"/>
                                                            </IconButton>
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                    <Divider/>  
                                                </div>
                                        )
                                    }
                                </List>
                                : 
                                <Typography style={{padding:20}}>Nenhum ítem no carrinho ainda.</Typography>
                                }
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <PrimaryButton label="Finalizar" onClick={() => this.handleClickOpenConfirmCartDialog()}/>
                            <SecondaryButton label="Adicionar mais" onClick={() => this.handleCloseDialog()}/>
                    </DialogActions>
                </Dialog>

                <Dialog
                    keepMounted
                    open={this.state.openConfirmCartDialog}
                    onClose={this.handleCloseConfirmCartDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">{"Atenção"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Tem certeza que deseja confirmar os itens selecionados? Uma vez confirmado, os mesmos serão removidos da lista.
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <PrimaryButton label="Sim, tenho certeza" onClick={() => this.finalizeCart()}/>
                            <SecondaryButton label="Voltar" onClick={() => this.handleCloseConfirmCartDialog()}/>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }
}

export default withRouter(Navbar);