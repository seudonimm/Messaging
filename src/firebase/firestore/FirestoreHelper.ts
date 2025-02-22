import firestore, {  serverTimestamp } from '@react-native-firebase/firestore'


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
                messages.push({...element.data(), id:element.id});

            });
            callback(messages);
        });


    };

    addToCollection = async(email:string, message:string, collectionName:string) => {
        try {
            firestore().collection(collectionName).add({
                email: email,
                message: message,
                timeStamp: serverTimestamp()
            })
        } catch (e) {
            console.log(e);
        }
    }
}

export default new FirestoreHelper;