import { child, get, getDatabase, ref } from "firebase/database"
import { getFireBaseApp } from "../firebaseHelper";

//function to get user data from database
export const getUserData = async (userId) => {
    try {
        const app = getFireBaseApp();
        const dbRef = ref(getDatabase(app));
        const userRef = child(dbRef, `users/${userId}`);
        //get data from firebase
        const snapshot = await get(userRef);
        return snapshot.val();
    } catch (error) {
        console.log(error);
    }
}