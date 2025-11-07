export const Meteors = ({ number = 20 }) => {
  const meteors = new Array(number).fill(true);
  
  return (
    <>
      {meteors.map((_, idx) => {
        const size = Math.random() * 4 + 1;
        const xPos = Math.random() * 100;
        const yPos = Math.random() * 80; // Spread meteors across 80% of screen height
        const delay = Math.random() * 20; // Increased delay spread (0-20s)
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
              opacity: 0,
            }}
          >
            {/* Glowing head */}
            <div 
              className="meteor-head"
              style={{
                width: `${size * 0.8}px`,
                height: `${size * 0.8}px`,
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
