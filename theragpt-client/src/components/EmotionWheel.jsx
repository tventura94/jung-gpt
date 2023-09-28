import React from 'react';

const emotions = ['Happy', 'Sad', 'Angry', 'Surprised', 'Neutral', 'Excited'];

const EmotionWheel = ({ onEmotionClick, onClose, onNext }) => {
  const radius = 150; // Define the radius of the circle
  const diameter = radius * 2;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(30, 74, 102, 0.65)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <svg
        width={diameter}
        height={diameter}
        viewBox={`0 0 ${diameter} ${diameter}`}
        onClick={(e) => e.stopPropagation()} // Prevents the overlay from closing when the SVG is clicked
      >
        {emotions.map((emotion, index) => {
          const startAngle = (index / emotions.length) * 360;
          const endAngle = ((index + 1) / emotions.length) * 360;
          const startX =
            radius + radius * Math.sin((startAngle * Math.PI) / 180);
          const startY =
            radius - radius * Math.cos((startAngle * Math.PI) / 180);
          const endX = radius + radius * Math.sin((endAngle * Math.PI) / 180);
          const endY = radius - radius * Math.cos((endAngle * Math.PI) / 180);

          const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

          return (
            <g key={emotion} onClick={() => onEmotionClick(emotion)}>
              <path
                d={`M ${radius} ${radius} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                fill={
                  [
                    '#FAD02E',
                    '#F28D35',
                    '#D83367',
                    '#635DFF',
                    '#508BF9',
                    '#FF6AC1',
                  ][index]
                }
              />
              <text
                x={(startX + endX) / 2}
                y={(startY + endY) / 2}
                fill="white"
                fontSize="12"
                dominantBaseline="middle"
                textAnchor="middle"
              >
                {emotion}
              </text>
            </g>
          );
        })}
      </svg>
      <button
        style={
          {
            // ... styles from before ...
          }
        }
        onClick={() => {
          onNext();
          onClose();
        }}
      >
        Next
      </button>
    </div>
  );
};

export default EmotionWheel;
