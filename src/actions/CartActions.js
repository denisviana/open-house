import AppDispatcher from '../dispatcher/AppDispatcher';
import CartConstants from '../constants/CartConstants';

var CartActions = {

    receiveProduct : function(data){
        AppDispatcher.handleAction({
            actionType : CartConstants.RECEIVE_DATA,
            data : data
        });
    },

    selectProduct : function(index){
        AppDispatcher.handleAction({
            actionType : CartConstants.SELECT_PRODUCT,
            data: index
        });
    },

    addToCart : function(item, update){
       AppDispatcher.handleAction({
            actionType : CartConstants.CART_ADD,
            item : item,
            update : update
       }) ;
    },

    updateCartVisible : function(cartVisible){
        AppDispatcher.handleAction({
            actionType : CartConstants.CART_VISIBLE,
            cartVisible : cartVisible
        });
    }

};

export default CartActions;