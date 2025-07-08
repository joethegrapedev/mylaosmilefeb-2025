// Test missions service
import { getMissions, addMission } from '../firebase/missions';
// Test function to verify missions service
export const testMissionsService = async () => {
    console.log('Testing missions service...');
    try {
        // Test fetching missions
        console.log('Fetching missions...');
        const missions = await getMissions();
        console.log('Missions fetched:', missions);
        // Test adding a mission
        console.log('Adding test mission...');
        const testMission = {
            title: "Test Mission",
            description: "Test mission description",
            order: 999
        };
        const newMission = await addMission(testMission);
        console.log('Mission added:', newMission);
        // Fetch again to verify
        const updatedMissions = await getMissions();
        console.log('Updated missions:', updatedMissions);
        return { success: true, missions: updatedMissions };
    }
    catch (error) {
        console.error('Error testing missions service:', error);
        return { success: false, error };
    }
};
// Export for use in browser console
window.testMissionsService = testMissionsService;
