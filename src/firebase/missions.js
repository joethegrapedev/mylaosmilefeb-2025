import { collection, doc, getDocs, updateDoc, addDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage, auth } from './config';
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
// Upload a file to Firebase Storage
export const uploadMissionFile = async (file, missionId) => {
    try {
        const fileExtension = file.name.split('.').pop();
        const storageFileName = `mission-${missionId}-${Date.now()}.${fileExtension}`;
        const storageRef = ref(storage, `mission-reports/${storageFileName}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return {
            url: downloadURL,
            fileName: file.name,
            storageFileName: storageFileName // Storage filename for deletion
        };
    }
    catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};
// Delete a file from Firebase Storage
export const deleteMissionFile = async (fileName) => {
    try {
        console.log('Attempting to delete file:', fileName);
        console.log('Auth user:', auth.currentUser);
        const storageRef = ref(storage, `mission-reports/${fileName}`);
        console.log('Storage reference path:', storageRef.fullPath);
        await deleteObject(storageRef);
        console.log('File deleted successfully');
    }
    catch (error) {
        console.error('Error deleting file:', error);
        throw error;
    }
};
// Update mission with file information
export const updateMissionWithFile = async (id, fileData) => {
    try {
        const missionRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(missionRef, fileData);
    }
    catch (error) {
        console.error('Error updating mission with file:', error);
        throw error;
    }
};
