import React, {Component} from 'react'
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


class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            anchorEl: null,
            items: [],
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

    getItemById(id){
        FirebaseService.getItemById('products',id,(dataReceived) => 
        console.log(dataReceived))
    }

    componentDidMount(){
        FirebaseService.getDataList('products', (dataReceived) => 
        this.setState({items : dataReceived}))
    }

    updateUi = () => {

        const styles = {
            media: {
                backgroundColor : "#fff"
            }
        };
        
        let itemChilds = [];

        this.state.items.map((item, index) => 
            itemChilds.push(
            <Grid item xs='8' sm='5' lg='3' md='4' key={item.key}>
                <Card style={{borderRadius: 5}}>

                    <CardActionArea
                    disableRipple='true'
                    disableTouchRipple='true'
                    disabled='true'>

                    <CardMedia style={{padding: 16}}>
                    <Image  src={item.imageUrl}/>
                    </CardMedia>

                    <CardContent>
                        <Typography component="h2" variant="h6">{item.title}</Typography>
                        <Typography component="p" style={{color:'#5d5d5d'}}>
                            Preço médio: <span style={{fontWeight: 600, color: '#ffb300'}}>{item.price}</span>
                        </Typography>
                    </CardContent>

                    </CardActionArea>

                    <CardActions style={{justifyContent: 'center', marginBottom: '10px'}}>
                        <PrimaryButton variant="contained" onClick={ () => this.getItemById(item.key) } label="Selecionar"/>
                        <SecondaryButton label="Ver loja"/>
                    </CardActions>
                </Card>
            </Grid>
            )
        );
    
    
        return itemChilds;
    }

    render(){

        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className="content">

                <SortButton float="right" label='Ordenar' icon='fas fa-sort-amount-up' 
                aria-haspopup="true"
                aria-owns={open ? 'simple-popper' : null}
                onClick={this.handleClick}/>

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
                            <ListItemText primary="Ordem Alfabética"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Menor Preço"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Maior Preço"/>
                        </ListItem>
                    </List>
                </Popover>

                <Grid container 
                spacing={32}
                direction="row"
                alignItems="center"
                justify="center"
                style={{paddingTop:15}}>

                   {this.updateUi()}

                </Grid>
            </div>
        )
    }
}

export default Home;