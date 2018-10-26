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

    addToCart : function(item, update, userEmail, userName){
       AppDispatcher.handleAction({
            actionType : CartConstants.CART_ADD,
            item : item,
            update : update,
            userEmail : userEmail,
            userName : userName
       }) ;
    },

    updateCartVisible : function(cartVisible){
        AppDispatcher.handleAction({
            actionType : CartConstants.CART_VISIBLE,
            cartVisible : cartVisible
        });
    },

    removeItemFromCart : function(item){
        AppDispatcher.handleAction({
            actionType : CartConstants.CART_REMOVE,
            item : item
        });
    }

};

export default CartActions;