import {firebaseDatabase} from '../utils/FirebaseUtils';
import {firebaseAuth} from '../utils/FirebaseUtils';

export default class FirebaseService {
    static getDataList = (nodePath, order, callback) => {

        let query = firebaseDatabase.ref(nodePath).orderByChild('available');
        query.on('value', dataSnapshot => {
            let items = [];
            let unavailables = [];
            var sorted = [];
            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();

                item['key'] = childSnapshot.key;
                if(item.available)
                    items.push(item);
                else
                    unavailables.push(item);

                switch(order.by){
                    case 'title':
                        sorted = items.sort(function(a,b) {
                            var x= a['title'].toLowerCase(),
                            y = b['title'].toLowerCase();
                            return x<y ? -1 : x>y ? 1 : 0;
                        });
                        break;
                    case 'price':
                        if(order.direction == 'asc'){
                            sorted = items.sort(function(a,b){
                                var x= parseInt(a['price']),
                                y = parseInt(b['price']);
                                return x<y ? -1 : x>y ? 1 : 0 && a['available'] < b['available'];
                            });
                        }else if(order.direction == 'desc'){
                            sorted = items.sort(function (a,b){
                                var x= parseInt(a['price']),
                                y = parseInt(b['price']);
                                return x<y ? -1 : x>y ? 1 : 0;
                            });
                            sorted.reverse();
                        }
                        break;
                    default : 
                    sorted = items.sort(function(a,b) {
                        var x= a['title'].toLowerCase(),
                        y = b['title'].toLowerCase();
                        return x<y ? -1 : x>y ? 1 : 0;
                    });
                    break;    
                }
            });

            unavailables.map((value) => sorted.push(value));

            callback(sorted);
        });

        return query;
    };

    static getItemById = (nodePath,id,callback) => {
        let query = firebaseDatabase.ref(nodePath+'/'+id);
        query.on('value', dataSnapshot => {
            let item = dataSnapshot.val().parse;
            item['key'] = dataSnapshot.key;
            callback(item);
        });
        return query;
    }

    static saveData = (node, objToSubmit) => {
        const ref = firebaseDatabase.ref(node).push();
        const id = firebaseDatabase.ref(node).push().key;
        ref.set(objToSubmit);
        return id;
    };

    static confirmItemsSelecteds = (nodePath,confirmCart) => {
        console.log("Firebase: ",confirmCart);
        const ref = firebaseDatabase.ref(nodePath).push();
        const id = firebaseDatabase.ref(nodePath).push().key;
        ref.set(confirmCart);
        return id;
    };

    static updateStateItem = (node, id, state) => {
        const ref = firebaseDatabase.ref(node + '/' + id);
        ref.update({available : state})
    };

    static auth = () =>{
        return firebaseAuth;
    };

}