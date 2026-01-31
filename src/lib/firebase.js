import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD1k4ONIqwgUC_g0OLgwFlOmM1uSX7yenM",
  authDomain: "vistara-luxury-leads.firebaseapp.com",
  projectId: "vistara-luxury-leads",
  storageBucket: "vistara-luxury-leads.firebasestorage.app",
  messagingSenderId: "181820083590",
  appId: "1:181820083590:web:95e1bfbb99238ccf0bf007"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Save order to Firestore
export const saveOrder = async (orderData) => {
  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      createdAt: serverTimestamp()
    });
    console.log("Order saved with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error saving order: ", error);
    throw error;
  }
};

// Save WhatsApp checkout order to Firestore
export const saveWhatsAppOrder = async (orderData) => {
  try {
    const docRef = await addDoc(collection(db, 'orders_whatsapp'), {
      name: orderData.name || '',
      phone: orderData.phone || '',
      email: orderData.email || '',
      course: orderData.course || '',
      projectType: orderData.projectType || '',
      teamSize: orderData.teamSize || 1,
      price: orderData.price || 0,
      addons: {
        hardbound: orderData.addons?.hardbound || false,
        ppt: orderData.addons?.ppt || false,
        viva: orderData.addons?.viva || false
      },
      source: 'website_whatsapp_checkout',
      timestamp: serverTimestamp()
    });
    console.log("WhatsApp order saved with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error saving WhatsApp order: ", error);
    throw error;
  }
};
