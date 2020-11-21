import firebase from '../config'
const db = firebase.firestore();

export const handleUserData = async (user:any) => {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('uid', '==', user.uid).get();
    if (snapshot.empty) {
        db.collection('users').add(user);
        console.log('User Created!');
        return;
    } else {
        let returnedUser;
         snapshot.forEach(doc => {
            returnedUser = doc.data()
        });
        return returnedUser;
    }
}

