import pfp from "@/assets/Profile_Pic.jpg";

/**
 * Animated "virtual Johnson" avatar for the Ask Me page.
 *
 * Driven purely by the `state` prop and CSS (no animation deps):
 *   - "idle"     → gentle float + soft glow ring
 *   - "thinking" → pulsing ring + bouncing dots (before the first token)
 *   - "speaking" → glow pulse + mouth flap while the reply streams
 *
 * Works today with the existing profile photo (idleSrc === talkingSrc, so the
 * mouth flap is a no-op). Drop in two matching character frames and pass
 * `idleSrc`/`talkingSrc` to get the talking-mouth effect — nothing else changes.
 */
export const VirtualAvatar = ({
  state = "idle",
  idleSrc = pfp,
  talkingSrc = pfp,
  size = 120,
  imgScale = 1.7,
  imgFocus = "50% 18%",
}) => {
  const isSpeaking = state === "speaking";
  const isThinking = state === "thinking";
  const hasTalkingFrame = talkingSrc !== idleSrc;
  const inner = size - 16;

  const ringClass = isSpeaking
    ? "avatar-ring-speaking"
    : isThinking
      ? "avatar-ring-thinking"
      : "avatar-ring-idle";

  // Frame the face within the circle. Tuned for the presentation photo
  // (face upper-centre); pass scale=1 + focus="50% 50%" for a head-shot frame.
  const imgStyle = {
    transform: `scale(${imgScale})`,
    transformOrigin: imgFocus,
  };

  return (
    <div
      className={`relative flex items-center justify-center select-none ${
        state === "idle" ? "avatar-breath" : ""
      }`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Virtual Johnson avatar"
    >
      {/* Glow / state ring */}
      <div className={`absolute inset-0 rounded-full ${ringClass}`} />

      {/* Avatar image(s) */}
      <div
        className="relative rounded-full overflow-hidden border-2 border-primary/40 shadow-lg"
        style={{ width: inner, height: inner }}
      >
        <img
          src={idleSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={imgStyle}
          draggable="false"
        />
        {hasTalkingFrame && (
          <img
            src={talkingSrc}
            alt=""
            draggable="false"
            style={imgStyle}
            className={`absolute inset-0 w-full h-full object-cover ${
              isSpeaking ? "avatar-mouth" : "opacity-0"
            }`}
          />
        )}
      </div>

      {/* Thinking dots */}
      {isThinking && (
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2.5 py-1 rounded-full bg-card/90 border border-primary/30 shadow-md">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="avatar-dot w-1.5 h-1.5 rounded-full bg-primary"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
