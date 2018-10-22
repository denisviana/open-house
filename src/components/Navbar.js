import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';


class Navbar extends Component{
    render(){
        return(
            <div>
                <Grid container alignItems="center" className="navbar-main">
                    <Grid item xs="12">
                        <a className="navbar-title">Open House</a>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Navbar;