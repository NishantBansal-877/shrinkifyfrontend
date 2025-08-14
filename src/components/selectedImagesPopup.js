export function SelectImagesPopup({ setView }) {
  function backToUpload(e) {
    e.preventDefault();
    setView("home");
  }
  return (
    <div>
      <img src="/alert.png" alt="alert"></img>
      <p>Please select some images!!!</p>
      <button className="upload-btn" onClick={backToUpload}>
        Back to Upload Images
      </button>
    </div>
  );
}
