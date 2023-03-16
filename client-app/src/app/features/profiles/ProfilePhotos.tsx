import { observer } from "mobx-react-lite"
import { Card, Header, Tab, Image, Grid, Button } from "semantic-ui-react"
import { Photo, Profile } from "../../models/profile"
import { useStore } from "../../stores/store"
import { SyntheticEvent, useState } from "react"
import PhotoUploadWidget from "../../common/imageUpload/PhotoUploadWidget"

interface Props {
    profile : Profile
}


export default observer (function ProfilePhotos({profile} : Props) {
    const {profileStore : {isCurrentUser, uploadPhoto, uploading, setMainPhoto, deletePhoto, loading}} = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState('');


    function handleUploadImage (photo : Blob) {
        uploadPhoto(photo).then(() => setAddPhotoMode(false));
    }

    function handleSetMainPhoto (photo : Photo, e:SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);
    }

    function handleDeletePhoto (photo : Photo, e:SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
    }
    
    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16} style={{paddingBottom: 0}}>
                     <Header floated="left" icon='image' content='Photos' />
                     {isCurrentUser && (
                        <Button floated="right" basic 
                                content={addPhotoMode ? 'Cancel' : 'Add Photo'} 
                                onClick={() => setAddPhotoMode(!addPhotoMode)} /> 
                    )}
                 </Grid.Column>
                 <Grid.Column width={16}>
                        {addPhotoMode ? (
                            <PhotoUploadWidget uploadPhoto={handleUploadImage}  loading={uploading} />
                        ) : (
                            <Card.Group itemsPerRow={5}>
                            {profile.photos?.map(photo => (
                                <Card key={photo.id}>
                                    <Image key={photo.id} src={photo.url} />
                                    {isCurrentUser && (
                                        <Button.Group fluid widths={2}>
                                            <Button basic 
                                                    name={'main'+photo.id}
                                                    color="green"
                                                    icon='user'
                                                    content='Main' 
                                                    onClick={e => handleSetMainPhoto(photo, e)}
                                                    loading={target === 'main' + photo.id && loading}
                                                    disabled={photo.isMain}/>
                                            <Button basic
                                                    name={photo.id}
                                                    color="red"
                                                    icon='trash' 
                                                    loading={target === photo.id && loading}
                                                    onClick={e => handleDeletePhoto(photo, e)}
                                                    disabled={photo.isMain}/>
                                        </Button.Group>
                                    )}
                                </Card>
                            ))}
                            </Card.Group>
                        )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )

})