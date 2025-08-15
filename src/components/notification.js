import { useState, useEffect } from "react";
export function NotificationBox({ message, duration = 5000, onClose }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let startTime = Date.now();

    // Update progress every 20ms
    const intervalId = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percent = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(percent);
    }, 20);

    // Auto-close after duration
    const timeoutId = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [duration, onClose]);

  return (
    <div style={styles.notification}>
      <button style={styles.closeBtn} onClick={onClose}>
        ×
      </button>
      <div style={styles.header}>
        <span>{message}</span>
      </div>
      <div style={styles.progressBar}>
        <div
          style={{
            ...styles.progress,
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}
// Inline styles
const styles = {
  notification: {
    position: "fixed",
    top: "60px",
    right: "20px",
    background: "#7c3aed",
    color: "white",
    padding: "15px 20px 5px 20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    minWidth: "250px",
    zIndex: 1000,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeBtn: {
    position: "absolute",
    top: "-15px",
    right: "-20px",
    background: "transparent",
    border: "none",
    fontSize: "30px",
    color: "white",
    cursor: "pointer",
  },
  progressBar: {
    height: "4px",
    background: "rgba(255,255,255,0.7)",
    borderRadius: "2px",
    overflow: "hidden",
    marginTop: "5px",
  },
  progress: {
    height: "100%",
    background: "white",
    transition: "width linear",
  },
};

export default NotificationBox;
