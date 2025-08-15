export function ImageUploadSection({ setView, setSelectedImages,setShowNotif,setNotifyMsg }) {
 function uploadedImages(e) {
  const allowedTypes = [
    "jpeg",
    "jpg",
    "png",
    "webp",
    "tiff",
    "avif",
    "heif",
    "raw"
  ];

  if (e.target.files.length > 5) {
    setView("alert");
    return;
  }

  const files = Array.from(e.target.files);
  let filesLoaded = 0;
  const totalFiles = files.length;

  files.forEach((file) => {
    const fileExt = file.type.split("/")[1]?.toLowerCase();

    if (!allowedTypes.includes(fileExt)) {
      setShowNotif(true);
      setNotifyMsg(`File type not allowed: ${file.name}`);
      return; // skip this file
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64StringFile = reader.result.split(",")[1];
      setSelectedImages((prev) => [
        ...prev,
        { name: file.name, file: base64StringFile, fileType: fileExt }
      ]);

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
      <h1 class="hero-title">Shrinkify — Lightning Fast Image Compression</h1>
      <p class="hero-subtitle" style={{ color: "white" }}>
        Upload your images and get perfectly optimized files in seconds. No quality loss, just smaller sizes.
      </p>
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
        <div class="upload-features">
          <div class="upload-feature">
            <span>⚡</span>
            <p>Lightning Fast Compression</p>
          </div>
          <div class="upload-feature">
            <span>🎯</span>
            <p>No Quality Loss</p>
          </div>
          <div class="upload-feature">
            <span>🛡️</span>
            <p>Secure & Private</p>
          </div>
        </div>
      </section>
    </>
  );
}
