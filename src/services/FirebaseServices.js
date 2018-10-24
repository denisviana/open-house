import {firebaseDatabase} from '../utils/FirebaseUtils'

export default class FirebaseService {
    static getDataList = (nodePath, callback) => {

        let query = firebaseDatabase.ref(nodePath);
        query.on('value', dataSnapshot => {
            let items = [];
            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                item['key'] = childSnapshot.key;
                items.push(item);
            });
            callback(items);
        });

        return query;
    };

    static getItemById = (nodePath,id,callback) => {
        let query = firebaseDatabase.ref(nodePath+'/'+id);
        query.on('value', dataSnapshot => {
            let item = dataSnapshot.val();
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

    static updateStateItem = (node, id, state) => {
        const ref = firebaseDatabase.ref(node + '/' + id);
        ref.update({isSelected : state})
    }

}