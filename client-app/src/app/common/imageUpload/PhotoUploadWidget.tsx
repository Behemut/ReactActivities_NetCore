import { Button, Grid, Header, Image } from "semantic-ui-react";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import { useEffect, useState } from "react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";


export default function PhotoUploadWidget(){
    const [files, setFiles] = useState<any[]>();
    const [cropper, setCropper] = useState<Cropper>();
    
    function OnCrop () {
        if(cropper){
            cropper.getCroppedCanvas().toBlob(blob => {
                console.log(blob);
            }, 'image/jpeg')
        }
    }

    useEffect(() => {
        return () => {
            files?.forEach(file => URL.revokeObjectURL(file.preview))}
        }, [files])

    return (
           <Grid>
                <Grid.Column width={4}>
                    <Header color='teal' sub content='Step 1 - Add Photo' />
                    <PhotoWidgetDropzone setFiles={setFiles}/>
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header color='teal' sub content='Step 2 - Resize image' />
                    {files && files.length > 0 && (
                        <>
                        <PhotoWidgetCropper setCropper = {setCropper}  imagePreview={files[0].preview}/>
                        </>
                    )}
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header color='teal' sub content='Step 3 - Preview & Upload' />
                    {files && files.length > 0 && 
                    <>
                    <div className='img-preview' style={{minHeight: 200, overflow: 'hidden'}}></div>
                    <Button.Group widths={2}>
                        <Button onClick={OnCrop} positive icon='check' />
                        <Button onClick={() => setFiles([])} icon='close' />
                    </Button.Group>
                    </>}
                </Grid.Column>   
           </Grid>
    )
}