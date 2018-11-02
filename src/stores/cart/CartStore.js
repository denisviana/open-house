import AppDispatcher from '../../dispatcher/AppDispatcher';
import CartConstants from '../../constants/CartConstants';
var EventEmmiter = require('events').EventEmitter;
var _ = require('underscore');

var _products = [], _cartVisibile = false;
var _userEmail = "";
var _userName = "";
var _itemKey= "";
var _lastItemAdded = null;

function add(item, update, userEmail, userName){

    if(_products.includes(item)){
        CartStore.emitItemAlreadyExists();
        return;
    }

    _lastItemAdded = item;
    _products.push(item);
    _userEmail = userEmail;
    _userName = userName;
    CartStore.emitChange();
    CartStore.emitItemAddedSuccessful();
}

function setCartVisible(cartVisibile){
    _cartVisibile = cartVisibile;
}

function removeItem(key){
    _itemKey = key;
    console.log("Removing item from cart: "+key);
    let aux = _products;
    let index = aux.findIndex(function(i){
        return i.key === key
    });

    if(index != -1) _products = aux.splice(index,1);
}

var CartStore = _.extend({}, EventEmmiter.prototype,{

    getCartItems : function() {
        let cart = { products : _products, userEmail : _userEmail, userName : _userName}
        return cart;
    },

    getCartCount : function(){
        return Object.keys(_products).length;
    },

    getLastItemAdded : function(){
        return _lastItemAdded;
    },

    getCartVisible : function(){
        return _cartVisibile;
    },

    getItemKeyRemoved : function(){
        return _itemKey;
    },

    emitChange : function(){
        this.emit('change');
    },

    emitItemRemoved : function(){
        console.log("Emiting item removed");
        this.emit('remove');
    },

    emitItemAlreadyExists : function(){
        console.log("Item already exists");
        this.emit("already_exists");
    },

    emitItemAddedSuccessful : function(){
        console.log("Item added");
        this.emit('item_added');
    },

    addOnItemAddedSuccessful : function(callback){
        this.on('item_added',callback);
    },

    removeOnItemAddedSuccessful : function(callback){
        this.removeListener('item_added',callback);
    },

    addAlreadyExistsListener : function(callback){
        this.on('already_exists',callback);
    },

    removeAlreadyExistsListener : function(callback){
        this.removeListener('already_exists',callback);
    },

    addOnRemoveItemFromCartListener : function (callback) {
        this.on('remove', callback);
    },

    removeOnRemoveItemFromCartListener : function (callback) {
        this.removeListener('remove', callback);
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
                add(action.item, action.update, action.userEmail, action.userName);
                break;
        
            case CartConstants.CART_VISIBLE:
                setCartVisible(action.cartVisible);
                break;
        
            case CartConstants.CART_REMOVE:
                removeItem(action.itemKey);
                CartStore.emitItemRemoved();
                break;
        
            default:
                return true;
        }
    
    return true;
  
  });
  
  export default CartStore;