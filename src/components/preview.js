export function Preview({ previewImages }) {
  function handleDownload(file, name, fileType) {
    // e.preventDefault();
    const link = document.createElement("a");
    link.href = `data:${fileType};base64,${file}`;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  function handleAllDownload(previewImages) {
    previewImages.images.forEach((image) => {
      const link = document.createElement("a");
      link.href = `data:${image.fileType};base64,${image.file}`;
      link.download = image.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
  const lastIdx = previewImages.images.length - 1;
  return (
    <div className="preview-section-wrapper">
      {previewImages.images.length > 0 && (
        <div className="preview-section">
          {previewImages.images.map((image, idx) => (
            <div className={`preview-box ${idx === lastIdx && lastIdx % 2 === 0 ? "isOdd" : ""}`} key={idx}>
              <img src={`data:${image.fileType};base64,${image.file}`} alt={image.name} />
              <p className="image-name">{image.name}</p>
              <div className="button-group">
                <button className="action-button download-button" onClick={() => handleDownload(image.file, image.name, image.fileType)}>
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button
        className="action-button download-button"
        style={{ alignSelf: "center", marginBottom: "10px" }}
        onClick={() => handleAllDownload(previewImages)}
      >
        Download All
      </button>
    </div>
  );
}
