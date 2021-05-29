import { db, firebase } from "./firebase";

export const setOnboardingDetails = (userId: string, data:any) => db
  .collection("onboardingDetails")
  .doc(`${userId}`)
  .set({
   ...data
  }, {merge: true});;

export const signUp = async (email: string, password: string) => {
  try {
    const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
    return user;
  } catch (error) {
    return error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
    return user;   
  } catch (error) {
    return error;
  }
};
  
