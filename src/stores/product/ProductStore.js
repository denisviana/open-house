import AppDispatcher from '../dispatcher/AppDispatcher';
import CartConstants from '../../constants/CartConstants';
import FirebaseService from '../../services/FirebaseServices';


var EventEmmiter = require('events').EventEmitter;
var _ = require('underscore');

var _product = {}, _selected = null;

function loadProducts(data) {

    /*FirebaseService.getDataList('products', (dataReceived) =>
            _product = dataReceived,
            _selected = dataReceived
    )*/

    _product = data[0];
    _selected = data[0].variants[0];
}

function setSelected(index){
    _selected = _product.variants[index];
}

var ProductStore = _.extend({}, EventEmmiter.prototype,{

    getProduct : function(){
        return _product;
    },

    getSelected : function(){
        return _selected;
    },

    emitChange : function(){
        this.emit('change');
    },

    addChangeListener : function(callback){
        this.on('change', callback);
    },

    removeChangeListener : function(callback){
        this.removeListener('change', callback);
    },

});

AppDispatcher.register(function(payload){
    var action = payload.action;
    var text;

    switch(action.actionType){
        case CartConstants.RECEIVE_DATA:
            loadProducts(action.data);
            break;
        case CartConstants.SELECT_PRODUCT:
            setSelected(action.data);
            break;
        default:
            return true;
    }

    ProductStore.emitChange();

    return true;

}); 


export default ProductStore;
