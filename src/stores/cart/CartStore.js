import AppDispatcher from '../../dispatcher/AppDispatcher';
import CartConstants from '../../constants/CartConstants';
import FirebaseService from '../../services/FirebaseServices';
var EventEmmiter = require('events').EventEmitter;
var _ = require('underscore');

var _products = [], _cartVisibile = false;

function add(item, update){
    _products.push(item);
}

function setCartVisible(cartVisibile){
    _cartVisibile = cartVisibile;
}

function removeItem(item){
    delete _products[item];
}

var CartStore = _.extend({}, EventEmmiter.prototype,{

    getCartItems : function() {
        return _products;
    },

    getCartCount : function(){
        return Object.keys(_products).length;
    },

    getCartVisible : function(){
        return _cartVisibile;
    },

    emitChange : function(){
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    }, 

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }

});

AppDispatcher.register(function(payload) {
    var action = payload.action;
    var text;
  
        switch(action.actionType) {
    
            case CartConstants.CART_ADD:
                add(action.item, action.update);
                break;
        
            case CartConstants.CART_VISIBLE:
                setCartVisible(action.cartVisible);
                break;
        
            case CartConstants.CART_REMOVE:
                removeItem(action.item);
                break;
        
            default:
                return true;
        }
  
    CartStore.emitChange();
  
    return true;
  
  });
  
  export default CartStore;