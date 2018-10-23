import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import cart from '../img/cart.svg';
import Badge from '@material-ui/core/Badge';
import CartStore from '../stores/cart/CartStore';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    badge: {
      top: 1,
      right: -15,
      border: `2px solid ${
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
      }`,
    },
});


class Navbar extends Component{

    constructor(props){
        super(props);
        this.state = {
            anchorEl: null,
            counter : 0,
        }
    }

    openPopup = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    closePopup = () => {
        this.setState({
            anchorEl: null,
        });
    };

    componentDidMount(){
        CartStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        CartStore.removeChangeListener(this._onChange);
    }

    _onChange = () => {
        let items = [];
        items = CartStore.getCartItems();
        console.log(items.length)
        this.setState({counter : items.length});
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
                    <Badge badgeContent={this.state.counter} color="secondary" 
                    classes={{ badge: styles.badge}} style={{position: 'absolute', right:20}}
                    aria-haspopup="true"
                    aria-owns={open ? 'cart-popup' : null}
                    onClick={this.openCart}> 
                        <img src={cart} style={{height: 40}}/>
                    </Badge>
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

            </div>
        )
    }
}

export default Navbar;