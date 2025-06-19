// Initialize default statistics data in Firebase
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

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

const defaultStatistics = [
  {
    id: 'surgeries',
    label: 'Surgeries Delivered',
    value: 109,
    order: 1
  },
  {
    id: 'volunteers', 
    label: 'Active Volunteers',
    value: 40,
    order: 2
  },
  {
    id: 'missions',
    label: 'Medical Missions',
    value: 5,
    order: 3
  }
];

async function initializeStatistics() {
  try {
    console.log('Initializing statistics data...');
    
    for (const stat of defaultStatistics) {
      const docRef = await addDoc(collection(db, 'statistics'), {
        label: stat.label,
        value: stat.value,
        order: stat.order
      });
      console.log(`Added statistic: ${stat.label} (${stat.value}) - Document ID: ${docRef.id}`);
    }
    
    console.log('All statistics initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing statistics:', error);
    process.exit(1);
  }
}

initializeStatistics();
