import React, { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropImage";

export default function CropImageModal({ image, onClose, onCropComplete }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.8)",
      zIndex: 2000,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{ width: 300, height: 300, background: "#000", position: "relative" }}>
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={(area, areaPixels) => setCroppedAreaPixels(areaPixels)}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={onClose}>Cancel</button>
        <button
          onClick={async () => {
            const blob = await getCroppedImg(image, croppedAreaPixels);
            onCropComplete(blob);
          }}
          style={{ marginLeft: 10 }}
        >
          Crop & Upload
        </button>
      </div>
    </div>
  );
}
