import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./config";
// Get all statistics
export const getStatistics = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'statistics'));
        const stats = [];
        querySnapshot.forEach((doc) => {
            stats.push({ id: doc.id, ...doc.data() });
        });
        // Sort by order
        stats.sort((a, b) => a.order - b.order);
        // Return default stats if none exist in Firestore
        if (stats.length === 0) {
            return [
                { id: 'surgeries', label: 'Surgeries Delivered', value: 109, order: 1 },
                { id: 'volunteers', label: 'Active Volunteers', value: 40, order: 2 },
                { id: 'missions', label: 'Medical Missions', value: 5, order: 3 },
            ];
        }
        return stats;
    }
    catch (error) {
        console.error('Error fetching statistics:', error);
        // Return default stats on error
        return [
            { id: 'surgeries', label: 'Surgeries Delivered', value: 109, order: 1 },
            { id: 'volunteers', label: 'Active Volunteers', value: 40, order: 2 },
            { id: 'missions', label: 'Medical Missions', value: 5, order: 3 },
        ];
    }
};
// Update a statistic
export const updateStatistic = async (stat) => {
    try {
        await setDoc(doc(db, 'statistics', stat.id), {
            label: stat.label,
            value: stat.value,
            order: stat.order
        });
        return { success: true };
    }
    catch (error) {
        console.error('Error updating statistic:', error);
        return { success: false, error: error.message };
    }
};
// Initialize default statistics (call this once to set up the database)
export const initializeDefaultStatistics = async () => {
    try {
        const defaultStats = [
            { id: 'surgeries', label: 'Surgeries Delivered', value: 109, order: 1 },
            { id: 'volunteers', label: 'Active Volunteers', value: 40, order: 2 },
            { id: 'missions', label: 'Medical Missions', value: 5, order: 3 },
        ];
        for (const stat of defaultStats) {
            await setDoc(doc(db, 'statistics', stat.id), {
                label: stat.label,
                value: stat.value,
                order: stat.order
            });
        }
        return { success: true };
    }
    catch (error) {
        console.error('Error initializing statistics:', error);
        return { success: false, error: error.message };
    }
};
