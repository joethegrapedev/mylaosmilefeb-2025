import { collection, doc, getDocs, updateDoc, addDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from './config';
const COLLECTION_NAME = 'missions';
export const getMissions = async () => {
    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy('order', 'asc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }
    catch (error) {
        console.error('Error fetching missions:', error);
        throw error;
    }
};
export const updateMission = async (id, missionData) => {
    try {
        const missionRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(missionRef, missionData);
    }
    catch (error) {
        console.error('Error updating mission:', error);
        throw error;
    }
};
export const addMission = async (missionData) => {
    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), missionData);
        return docRef.id;
    }
    catch (error) {
        console.error('Error adding mission:', error);
        throw error;
    }
};
export const deleteMission = async (id) => {
    try {
        await deleteDoc(doc(db, COLLECTION_NAME, id));
    }
    catch (error) {
        console.error('Error deleting mission:', error);
        throw error;
    }
};
