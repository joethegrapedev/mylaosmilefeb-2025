// Initialize default missions data in Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsKgwt6Oa5Rj4MIZQsyLCsaHFJthzfaLA",
  authDomain: "mylaosmile-7642e.firebaseapp.com",
  projectId: "mylaosmile-7642e",
  storageBucket: "mylaosmile-7642e.firebasestorage.app",
  messagingSenderId: "767458624764",
  appId: "1:767458624764:web:a4a8b9e1c2d3e4f5g6h7i8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const defaultMissions = [
  {
    date: "February 2025",
    location: "Vientiane, Laos",
    description: "Completed 33 life-changing cleft lip and palate surgeries for children and adults, transforming lives and bringing smiles to families across the capital.",
    order: 1
  },
  {
    date: "June 2024",
    location: "Luang Prabang, Laos",
    description: "Successfully performed 8 complex reconstructive surgeries in the UNESCO World Heritage city, providing hope to rural communities.",
    order: 2
  },
  {
    date: "March 2024", 
    location: "Savannakhet, Laos",
    description: "Delivered 23 surgeries in southern Laos, including training local medical staff in cleft care techniques and post-operative care.",
    order: 3
  },
  {
    date: "October 2023",
    location: "Pakse, Laos", 
    description: "Conducted 28 surgeries during our largest mission to date, establishing partnerships with local hospitals for ongoing patient care.",
    order: 4
  },
  {
    date: "February 2023",
    location: "Vientiane, Laos",
    description: "Performed 17 surgeries while launching our community outreach program to identify and support more children in need of care.",
    order: 5
  }
];

async function initializeMissions() {
  console.log('Starting missions initialization...');
  
  try {
    console.log('Initializing missions data...');
    
    for (let i = 0; i < defaultMissions.length; i++) {
      const mission = defaultMissions[i];
      console.log(`Adding mission ${i + 1}/${defaultMissions.length}: ${mission.location} (${mission.date})`);
      
      const docRef = await addDoc(collection(db, 'missions'), mission);
      console.log(`✓ Added mission: ${mission.location} - Document ID: ${docRef.id}`);
    }
    
    console.log('✅ All missions initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing missions:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  }
}

console.log('Firebase app initialized');
console.log('Starting mission initialization...');
initializeMissions();
