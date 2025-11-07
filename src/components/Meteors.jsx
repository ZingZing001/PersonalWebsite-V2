export const Meteors = ({ number = 20 }) => {
  const meteors = new Array(number).fill(true);
  
  return (
    <>
      {meteors.map((_, idx) => {
        const size = Math.random() * 4 + 1;
        const xPos = Math.random() * 100;
        const yPos = Math.random() * 40; // Keep meteors in top 40% of screen
        const delay = Math.random() * 15;
        const duration = Math.random() * 3 + 3;
        
        return (
          <div
            key={"meteor" + idx}
            className="absolute animate-meteor"
            style={{
              left: `${xPos}%`,
              top: `${yPos}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          >
            {/* Glowing head */}
            <div 
              className="meteor-head"
              style={{
                width: `${size * 1.5}px`,
                height: `${size * 1.5}px`,
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
            {/* Blurred tail */}
            <div
              className="meteor"
              style={{
                width: `${size * 50}px`,
                height: `${size * 0.3}px`,
              }}
            />
          </div>
        );
      })}
    </>
  );
};
