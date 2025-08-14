import { ImageBox } from "./imageBox";
import { QualitySelect } from "./qualitySelect";
import { SelectImagesPopup } from "./selectedImagesPopup";
import { SendImages } from "./sendImages";

export function ShowSelectedImages({ selectedImages, setShowSelectedImages, setSelectedImages, setImageUpload, quality, setQuality }) {
  return (
    <div className={`showSelectedImages ${selectedImages.length > 0 ? "" : "flex-column"}`}>
      {selectedImages.length > 0 ? <ImageBox selectedImages={selectedImages} setSelectedImages={setSelectedImages} /> : null}
      {selectedImages.length > 0 ? (
        <>
          <QualitySelect setQuality={setQuality} />
          <SendImages quality={quality} selectedImages={selectedImages} />
        </>
      ) : (
        <SelectImagesPopup setImageUpload={setImageUpload} setShowSelectedImages={setShowSelectedImages} />
      )}
    </div>
  );
}
