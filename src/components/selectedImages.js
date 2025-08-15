import { QualitySelect } from "./qualitySelect";
import { ImageBox } from "./imageBox";
import { SendImages } from "./sendImages";
import { SelectImagesPopup } from "./selectedImagesPopup";

export function ShowSelectedImages({
  selectedImages,
  setSelectedImages,
  quality,
  setQuality,
  setView,
  setLogout,
  setPreviewImages,
  setShowNotif,
  setNotifyMsg,
}) {
  return (
    <>
      {selectedImages.length > 0 ? <ImageBox selectedImages={selectedImages} setSelectedImages={setSelectedImages} /> : null}
      {selectedImages.length > 0 ? (
        <>
          <QualitySelect setQuality={setQuality} />
          <SendImages
            quality={quality}
            selectedImages={selectedImages}
            setLogout={setLogout}
            setView={setView}
            setSelectedImaages={setSelectedImages}
            setPreviewImages={setPreviewImages}
            setShowNotif={setShowNotif}
            setNotifyMsg={setNotifyMsg}
          />
        </>
      ) : (
        <SelectImagesPopup setView={setView} />
      )}
    </>
  );
}
