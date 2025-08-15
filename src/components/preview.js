export function Preview({ previewImages }) {
  function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  function showMultiDownloadInstructions() {
    if (isMobileDevice()) {
      alert(
        "📱 Your mobile browser may block multiple downloads.\n\n" +
        "Tips for mobile:\n" +
        "1. Use a desktop browser for best results.\n" +
        "2. Or download files one by one.\n" +
        "3. On Chrome mobile: Long press the download link → 'Download link'."
      );
    } else {
      alert(
        "💻 Multiple downloads are blocked in your browser.\n\n" +
        "How to allow multiple downloads:\n" +
        "Chrome/Edge:\n" +
        "  1. Settings → Privacy and Security → Site Settings\n" +
        "  2. Scroll to 'Automatic Downloads'\n" +
        "  3. Allow for this site.\n\n" +
        "Firefox:\n" +
        "  1. Preferences → Privacy & Security → Permissions\n" +
        "  2. Allow Automatic Downloads."
      );
    }
  }

  function attemptDownload(file, name, fileType) {
    return new Promise((resolve, reject) => {
      const link = document.createElement("a");
      link.href = `data:${fileType};base64,${file}`;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Give browser time to trigger download; if not, reject
      setTimeout(() => {
        // On mobile, it's often blocked automatically
        if (isMobileDevice()) {
          reject();
        } else {
          // Check if tab visibility changed (sometimes happens on save dialog)
          if (document.visibilityState === "visible") {
            reject();
          } else {
            resolve();
          }
        }
      }, 500); // half a second check
    });
  }

  async function handleDownload(file, name, fileType) {
    try {
      await attemptDownload(file, name, fileType);
    } catch {
      showMultiDownloadInstructions();
    }
  }

  async function handleAllDownload(previewImages) {
    for (const image of previewImages.images) {
      try {
        await attemptDownload(image.file, image.name, image.fileType);
      } catch {
        showMultiDownloadInstructions();
        break; // stop after first fail
      }
    }
  }

  const lastIdx = previewImages.images.length - 1;

  return (
    <div className="preview-section-wrapper">
      {previewImages.images.length > 0 && (
        <div className="preview-section">
          {previewImages.images.map((image, idx) => (
            <div
              className={`preview-box ${
                idx === lastIdx && lastIdx % 2 === 0 ? "isOdd" : ""
              }`}
              key={idx}
            >
              <img
                src={`data:${image.fileType};base64,${image.file}`}
                alt={image.name}
              />
              <p className="image-name">{image.name}</p>
              <div className="button-group">
                <button
                  className="action-button download-button"
                  onClick={() => handleDownload(image.file, image.name, image.fileType)}
                >
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
