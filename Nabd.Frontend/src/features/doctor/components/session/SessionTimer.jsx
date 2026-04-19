import { FaClock, FaExclamationTriangle } from 'react-icons/fa';

/**
 * Session Timer Component
 * Displays countdown timer for active session
 */
const SessionTimer = ({ timeRemaining, isExpiring, compact = false }) => {
  // Format time safely handles null, undefined, or NaN
  const formatTime = () => {
    if (timeRemaining === null || timeRemaining === undefined || isNaN(timeRemaining)) {
      return '--:--';
    }

    // Ensure we're working with an integer
    const totalSeconds = Math.floor(Number(timeRemaining));

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (compact) {
    return (
      <div className={`flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 rounded-lg transition-colors ${isExpiring ? 'bg-red-500/20 text-red-100 animate-pulse' : 'bg-[#14666A]/30 text-teal-50'
        }`}>
        {isExpiring ? (
          <FaExclamationTriangle className="text-red-300 text-xs md:text-sm" />
        ) : (
          <FaClock className="text-teal-200 text-xs md:text-sm" />
        )}
        <span className="text-[10px] md:text-xs font-medium opacity-80 hidden md:inline">المتبقي من الجلسة:</span>
        <span className="text-[10px] md:hidden font-medium opacity-80">الوقت:</span>
        <span className={`text-sm md:text-lg font-bold font-mono tracking-wider ${isExpiring ? 'text-red-200' : 'text-white'
          }`}>
          {formatTime()}
        </span>
      </div>
    );
  }

  // Default Large Display (not currently used in header but kept for fallback)
  return (
    <div
      className={`flex items-center gap-3 px-6 py-4 rounded-xl border-2 transition-all ${isExpiring
        ? 'bg-red-50 border-red-300 animate-pulse'
        : 'bg-gradient-to-br from-[#1C8B8F]/5 to-[#1C8B8F]/10 border-[#1C8B8F]/20'
        }`}
    >
      {isExpiring ? (
        <FaExclamationTriangle className="text-2xl text-red-500" />
      ) : (
        <FaClock className="text-2xl text-[#1C8B8F]" />
      )}

      <div className="flex-1">
        <p className="text-xs text-slate-600 font-semibold mb-1">
          {isExpiring ? '⚠️ الوقت المتبقي' : 'الوقت المتبقي'}
        </p>
        <p
          className={`text-3xl font-black ${isExpiring ? 'text-red-600' : 'text-[#1C8B8F]'
            }`}
          dir="ltr"
        >
          {formatTime()}
        </p>
      </div>
    </div>
  );
};

export default SessionTimer;
