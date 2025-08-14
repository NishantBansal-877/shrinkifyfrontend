export function ImageUploadSection({ setView, setSelectedImages }) {
  function uploadedImages(e) {
    if (e.target.files.length > 5) {
      setView("alert");
      return;
    }
    const files = Array.from(e.target.files);
    let filesLoaded = 0;
    const totalFiles = files.length;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64StringFile = reader.result.split(",")[1];
        setSelectedImages((prev) => [...prev, { name: file.name, file: base64StringFile, fileType: file.type.split("/")[1] }]);

        filesLoaded++;
        if (filesLoaded === totalFiles) {
          setView("loading");
          setTimeout(() => {
            setView("selectedImages");
          }, 3000);
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = null;
  }

  return (
    <>
      <section className="upload-section">
        <h1>Compress Your Images Instantly</h1>
        <p>Smart, fast & free image compression without losing quality.</p>
        <label className="upload-btn" htmlFor="fileElem" contentEditable={false}>
          Upload Image
        </label>
        <label className="drop-area" id="drop-area" htmlFor="fileElem">
          <p>
            Drag & drop image here or <span className="browse">browse</span>
          </p>
          <input type="file" id="fileElem" accept="image/*" onChange={uploadedImages} multiple />
        </label>
        <p>Upload only 5 images at a time.</p>
      </section>
    </>
  );
}
