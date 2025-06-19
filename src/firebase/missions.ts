import { 
  collection, 
  doc, 
  getDocs, 
  updateDoc, 
  addDoc, 
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage, auth } from './config';

export interface Mission {
  id?: string;
  title: string;
  description: string;
  order?: number;
  reportUrl?: string;
  reportFileName?: string;
  storageFileName?: string; // The actual filename in storage
}

const COLLECTION_NAME = 'missions';

export const getMissions = async (): Promise<Mission[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Mission));
  } catch (error) {
    console.error('Error fetching missions:', error);
    throw error;
  }
};

export const updateMission = async (id: string, missionData: Partial<Mission>): Promise<void> => {
  try {
    const missionRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(missionRef, missionData);
  } catch (error) {
    console.error('Error updating mission:', error);
    throw error;
  }
};

export const addMission = async (missionData: Omit<Mission, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), missionData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding mission:', error);
    throw error;
  }
};

export const deleteMission = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error('Error deleting mission:', error);
    throw error;
  }
};

// Upload a file to Firebase Storage
export const uploadMissionFile = async (file: File, missionId: string): Promise<{ url: string; fileName: string; storageFileName: string }> => {
  try {
    const fileExtension = file.name.split('.').pop();
    const storageFileName = `mission-${missionId}-${Date.now()}.${fileExtension}`;
    const storageRef = ref(storage, `mission-reports/${storageFileName}`);
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return {
      url: downloadURL,
      fileName: file.name, // Original filename for display
      storageFileName: storageFileName // Storage filename for deletion
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// Delete a file from Firebase Storage
export const deleteMissionFile = async (fileName: string): Promise<void> => {
  try {
    console.log('Attempting to delete file:', fileName);
    console.log('Auth user:', auth.currentUser);
    
    const storageRef = ref(storage, `mission-reports/${fileName}`);
    console.log('Storage reference path:', storageRef.fullPath);
    
    await deleteObject(storageRef);
    console.log('File deleted successfully');
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

// Update mission with file information
export const updateMissionWithFile = async (
  id: string, 
  fileData: { reportUrl: string; reportFileName: string; storageFileName?: string }
): Promise<void> => {
  try {
    const missionRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(missionRef, fileData);
  } catch (error) {
    console.error('Error updating mission with file:', error);
    throw error;
  }
};
