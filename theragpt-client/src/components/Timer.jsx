import React, { useState, useEffect } from 'react';

export default function TimerExample() {
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const currentTime = new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000;

      // Retrieve lastTime dynamically from localStorage each time
      const lastTime =
        parseInt(localStorage.getItem('lastAccessTime'), 10) || currentTime;

      const timePassed = currentTime - lastTime;
      const remaining = oneDay - timePassed;

      if (remaining > 0) {
        setTimeRemaining(remaining);
      }
    };

    calculateTimeRemaining();

    const timer = setInterval(() => {
      calculateTimeRemaining();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div>
      {timeRemaining !== null && (
        <div>
          Time remaining until you can chat again: {formatTime(timeRemaining)}
        </div>
      )}
    </div>
  );
}
