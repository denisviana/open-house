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
            openConfirmCartDialog: false
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

        let confirmCart = {
            targetEmail : "denis.costa@snowmanlabs.com"
        }

        FirebaseService.confirmItemsSelecteds('productsByEmail',confirmCart);

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
        this.setState({itemsCart : items})
        console.log(items.length)
        this.setState({counter : items.length});
        console.log(cart.email);
    }

    render(){

        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return(
            <div>
                <Grid container alignItems="center" className="navbar-main">
                    <Grid item xs="12">
                        <a className="navbar-title">Open House</a>                    
                    </Grid>
                    <IconButton  style={{position: 'absolute', right:20}} onClick={this.handleClickOpenDialog}
                    classes={{ badge: styles.badge}}
                    aria-haspopup="true"
                    aria-owns={open ? 'cart-popup' : null}>
                        <Badge badgeContent={this.state.counter > 0 ? this.state.counter : ""} color={this.state.counter > 0 ? "secondary" : "transparent"}> 
                            <img src={cart} style={{height: 34}}/>
                        </Badge>
                    </IconButton>
                </Grid>

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
                    maxWidth="sm"
                    open={this.state.openDialog}
                    onClose={this.handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">{"Carrinho"}</DialogTitle>
                        <DialogContent>
                        <Divider/>
                            <div style={{width:"100%", maxWidth:400}}>
                                <List>
                                    {
                                        this.state.itemsCart.map((value,index) => 
                                                <div>
                                                    <ListItem style={{paddingTop:5, paddingBottom:5, paddingLeft: 0, paddingRight: 0, minWidth:300, width:'100%'}}>
                                                        <img style={{height: 50, width: 50, marginRight: 15}} src={value.imageUrl}/>
                                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                            <span style={{fontSize: 13, display: 'block'}}><b>{value.title}</b></span>
                                                            <span style={{fontSize: 13}}>R$ 200,00</span>
                                                        </div>
                                                        <ListItemSecondaryAction>
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

export default Navbar;