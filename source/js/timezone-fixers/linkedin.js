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
    selector: 'div[class*="update-components-text-view break-words"] > span:first-child',
    attachTo: node => node,
    timestamp: _ => extractDateFromPostId(getLIPostId()),
    url: _ => window.location.href
  },
])

fixer.start();

function getLIPostId(url) {
  const liUrl = url || window.location.href;
  const regex = /([0-9]{19})/;
  const postId = regex.exec(liUrl)[0];
  return postId;
}

function extractTimestampFromId(postId) {
  // BigInt needed as we need to treat postId as 64 bit decimal. This reduces browser support.
  const asBinary = BigInt(postId).toString(2);
  const first41Chars = asBinary.slice(0, 41);
  const timestamp = parseInt(first41Chars, 2);
  return new Date(timestamp);
}

function extractDateFromPostId(postId) {
  return extractTimestampFromId(postId);
}

