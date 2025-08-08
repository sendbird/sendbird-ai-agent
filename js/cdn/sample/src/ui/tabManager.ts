// Tab management
export let activeTab: 'playground' | 'code' = 'playground';
export let activeExample: string = 'basic';

// Initialize tab switching functionality
export function initializeTabs() {
  const playgroundTab = document.getElementById('playgroundTab');
  const codeTab = document.getElementById('codeTab');
  const playgroundView = document.getElementById('playgroundView');
  const codeView = document.getElementById('codeView');

  if (playgroundTab && codeTab && playgroundView && codeView) {
    playgroundTab.addEventListener('click', () => {
      activeTab = 'playground';
      playgroundTab.classList.add('tab-active');
      codeTab.classList.remove('tab-active');
      playgroundView.style.display = 'block';
      codeView.style.display = 'none';
    });

    codeTab.addEventListener('click', () => {
      activeTab = 'code';
      codeTab.classList.add('tab-active');
      playgroundTab.classList.remove('tab-active');
      codeView.style.display = 'block';
      playgroundView.style.display = 'none';

      // Set default example when switching to code tab
      import('../utils/codeDisplay').then(({ setActiveExample }) => {
        setActiveExample('basic');
      });
    });
  }
}

export function setActiveTab(tab: 'playground' | 'code') {
  activeTab = tab;
}

export function setActiveExample(example: string) {
  activeExample = example;
}
