import Fixer from '../fixer.js';

/**
 * This script enables uniform timestamps for linkedin.com.
 *
 * TODO: CHECKLIST:
 *  - Timestamps on posts in feed
 *  - Timestamps on comments in feed
 *  - Timestamps on maximized posts
 *  - Timestamps on profile
 *
 */
const fixer = new Fixer('LinkedIn', [
  {
    // Example: https://www.linkedin.com/feed/update/urn:li:activity:7123193054789820416/?origin=SHARED_BY_YOUR_PAGES
    name: 'Maximized post -> hover over header',
    selector: 'div[class*="update-components-text-view break-words"]',
    attachTo: node => node,
    timestamp: node => {
      return "none";
    },
    url: node => {
      return "none";
    },
  },
])

fixer.start();