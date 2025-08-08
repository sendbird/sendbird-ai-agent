// Import styles
import './messenger/messenger.css';
// Import modules
import { initializeMessenger } from './messenger/messengerManager';
import { initializeControlPanel } from './ui/controlPanel';
import './ui/controls.css';
import './ui/layout.css';
import { initializeTabs } from './ui/tabManager';
import './ui/tabs.css';
import { initializeCodeExamples, setActiveExample, updateLiveCode } from './utils/codeDisplay';
import './utils/codeDisplay.css';

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Initialize all modules
    initializeTabs();
    initializeControlPanel();
    initializeCodeExamples();

    // Initialize messenger
    await initializeMessenger();

    // Update initial code display
    updateLiveCode();
    setActiveExample('basic');

    console.log('CDN sample initialized successfully');
  } catch (error) {
    console.error('Failed to initialize CDN sample:', error);
  }
});
