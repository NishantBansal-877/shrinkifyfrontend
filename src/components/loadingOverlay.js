const LoadingOverlay = ({ text = "loading..." }) => {
  return (
    <div id="loading-overlay">
      <div className="dots-loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p>{text}</p>
    </div>
  );
};

export default LoadingOverlay;
