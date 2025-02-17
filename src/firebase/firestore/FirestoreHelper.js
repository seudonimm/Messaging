import firestore, { FieldValue, Timestamp } from '@react-native-firebase/firestore'


class FirestoreHelper{
    constructor(){}

    onResult(QuerySnapshot) {
        //console.log("messages" + QuerySnapshot);
    }
      
    onError(error) {
        console.error(error);
    }

    getFirestoreDataRealTime = (callback, collectionName) => {
        
        return firestore().collection(collectionName).orderBy("timeStamp", "asc").onSnapshot(docSnapshot=>{
            let messages = [];
            docSnapshot.docs.forEach(element => {
                messages.push(element.data());
                console.log("elements: "+ JSON.stringify(element.data()))
                console.log(messages.length)
            });
            callback(messages);
        });


    };

    addToCollection = async(email, message, collectionName) => {
        try {
            firestore().collection(collectionName).add({
                email: email,
                //timeStamp: FieldValue,
                message: message,
                timeStamp: FieldValue.serverTimestamp()
            })
        } catch (e) {
            console.log(e);
        }
    }
}

export default new FirestoreHelper;