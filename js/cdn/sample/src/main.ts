// Import styles
// Import main app module
import { initializeApp } from './app';
import './style.css';

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await initializeApp();
    console.log('CDN sample initialized successfully');
  } catch (error) {
    console.error('Failed to initialize CDN sample:', error);
  }
});
