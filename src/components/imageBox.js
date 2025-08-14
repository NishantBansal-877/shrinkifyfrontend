export function ImageBox({ setSelectedImages = null, selectedImages }) {
  function removeImage(name) {
    setSelectedImages((prev) => [
      ...prev.filter((image) => {
        return image.name !== name;
      }),
    ]);
  }
  const lastIdx = selectedImages.length - 1;
  return (
    <div className="preview-section-wrapper">
      {selectedImages.length > 0 && (
        <div className="preview-section">
          {selectedImages.map((image, idx) => (
            <div className={`preview-box ${idx === lastIdx && lastIdx % 2 === 0 ? "isOdd" : ""}`} key={idx}>
              <img src={`data:${image.fileType};base64,${image.file}`} alt={image.name} />
              <p className="image-name">{image.name}</p>
              <div className="button-group">
                <button className="action-button download-button" onClick={() => removeImage(image.name)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
