import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { Grid } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../layouts/components/LoadingComponents";
import ProfileContent from "./ProfileContent";


export default observer(function ProfilePage(){
    const {username} = useParams<{username: string}>();
    const {profileStore} = useStore();
    const {loadProfile, profile, loadingProfile, setActiveTab} = profileStore;

    useEffect (() => {
        loadProfile(username!);
        return () => setActiveTab(0);
    }, [loadProfile, username, setActiveTab])

    if (loadingProfile) return <LoadingComponent content='Loading profile...' />

    return(
        <Grid>
            <Grid.Column width={16}>
            {profile && (
                <>
                <ProfileHeader profile={profile}/>
                <ProfileContent profile={profile}/>
                </>
            )}
            </Grid.Column>
        </Grid>
    )
})