export function Alert({ setView }) {
  function removeAlert() {
    setView("home");
  }

  return (
    <div className="alert-box">
      <img className="alert-cancel-btn" src="/close-btn.png" alt="close-button" onClick={removeAlert} />
      <div className="alert-box-text">
        <img src="/alert.png" alt="alert-icon" />
        <p>Maximum limit is 5 images.</p>
      </div>
    </div>
  );
}
