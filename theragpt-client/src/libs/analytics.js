import { getAnalytics, logEvent } from 'firebase/analytics';
import { app } from './firebase';

let logPageView;

(function () {
  if (typeof window === 'undefined') {
    return;
  }

  const analytics = getAnalytics(app);
  logEvent(analytics, 'notification_received');

  let pageEnterTime = new Date().getTime();
  let currentPagePath = ''; // Define it outside the function to make it accessible

  logPageView = (pageName) => {
    const currentTime = new Date().getTime();

    if (pageEnterTime) {
      const timeSpentOnPage = (currentTime - pageEnterTime) / 1000;
      logEvent(analytics, 'time_spent_on_page', {
        page_path: pageName,
        time_spent: timeSpentOnPage,
      });
    }

    logEvent(analytics, 'page_view', {
      page_path: pageName,
      page_title: pageName,
    });

    pageEnterTime = currentTime;
    currentPagePath = pageName; // Store the current page path here
  };

  // Optionally log the time spent on the last page before the user leaves
  window.addEventListener('beforeunload', () => {
    const currentTime = new Date().getTime();
    const timeSpentOnPage = (currentTime - pageEnterTime) / 1000; // Converting to seconds
    logEvent(analytics, 'time_spent_on_page', {
      page_path: currentPagePath, // Now it can be accessed here
      time_spent: timeSpentOnPage,
    });
  });
})();

export { logPageView };
