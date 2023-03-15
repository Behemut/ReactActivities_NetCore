import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";

interface Props {
    setCropper: (cropper: Cropper) => void;
    imagePreview: string;
}

export default function PhotoWidgetCropper({setCropper, imagePreview} : Props) {
    return (
        <Cropper
            src={imagePreview}
            style={{height: 200, width: '100%'}}
            initialAspectRatio={1}
            aspectRatio={1}
            preview='.img-preview'
            cropBoxMovable={false}
            cropBoxResizable={false}
            guides={true}
            viewMode={1}
            dragMode='move'
            scalable={true}
            onInitialized={(cropper) => setCropper(cropper)}
            />
    )
}