import { useMemo } from "react";

export const Meteors = ({ number = 20 }) => {
  // Generate the random meteor parameters once per `number`, not on every
  // render. Otherwise any parent re-render (e.g. chat streaming updates)
  // regenerates positions and restarts the animation, making the meteors jump.
  const meteors = useMemo(
    () =>
      new Array(number).fill(true).map(() => ({
        size: Math.random() * 4 + 1,
        xPos: Math.random() * 100,
        yPos: Math.random() * 80, // Spread meteors across 80% of screen height
        delay: Math.random() * 20, // Delay spread (0-20s)
        duration: Math.random() * 3 + 3,
      })),
    [number],
  );

  return (
    <>
      {meteors.map((meteor, idx) => {
        const { size, xPos, yPos, delay, duration } = meteor;

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
