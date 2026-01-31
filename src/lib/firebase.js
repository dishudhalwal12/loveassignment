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

// Input sanitization helper - removes potential XSS vectors
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .slice(0, 500); // Limit length
};

// Validate phone number format
const isValidPhone = (phone) => {
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Save order to Firestore
export const saveOrder = async (orderData) => {
  try {
    // Sanitize user inputs
    const sanitizedData = {
      ...orderData,
      fullName: sanitizeInput(orderData.fullName || ''),
      whatsappNumber: sanitizeInput(orderData.whatsappNumber || ''),
      projectTopic: sanitizeInput(orderData.projectTopic || ''),
      createdAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'orders'), sanitizedData);
    return docRef.id;
  } catch (error) {
    // Log error without exposing sensitive data
    console.error("Order save failed");
    throw error;
  }
};

// Save WhatsApp checkout order to Firestore
export const saveWhatsAppOrder = async (orderData) => {
  try {
    // Validate phone format
    const phone = orderData.phone || '';
    if (phone && !isValidPhone(phone)) {
      throw new Error('Invalid phone format');
    }
    
    // Sanitize and validate all inputs
    const sanitizedData = {
      name: sanitizeInput(orderData.name || ''),
      phone: sanitizeInput(phone),
      email: sanitizeInput(orderData.email || ''),
      course: sanitizeInput(orderData.course || ''),
      projectType: sanitizeInput(orderData.projectType || ''),
      teamSize: Math.min(Math.max(parseInt(orderData.teamSize) || 1, 1), 4),
      price: Math.max(parseFloat(orderData.price) || 0, 0),
      addons: {
        hardbound: Boolean(orderData.addons?.hardbound),
        ppt: Boolean(orderData.addons?.ppt),
        viva: Boolean(orderData.addons?.viva)
      },
      source: 'website_whatsapp_checkout',
      timestamp: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'orders_whatsapp'), sanitizedData);
    return docRef.id;
  } catch (error) {
    // Log error without exposing sensitive data
    console.error("WhatsApp order save failed");
    throw error;
  }
};
