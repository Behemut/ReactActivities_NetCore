import { Tab } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";
import { observer } from "mobx-react-lite";
import { Profile } from "../../models/profile";
import ProfileFollowings from "./ProfileFollowings";
import { useStore } from "../../stores/store";

interface Props {
    profile : Profile
}

export default  observer(function ProfileContent({profile} : Props) {

    const {profileStore} = useStore();

    const panes =[
        {menuItem: 'About', render: () => <Tab.Pane>About content</Tab.Pane>},
        {menuItem: 'Photos', render: () => <ProfilePhotos  profile={profile} />},
        {menuItem: 'Activities', render: () => <Tab.Pane>Activities content</Tab.Pane>},
        {menuItem: 'Followers', render: () => <ProfileFollowings /> },
        {menuItem: 'Following', render: () =>  <ProfileFollowings /> },
    ]

    return (
        <Tab menu={{fluid: true, vertical: true}}        
        panes={panes} 
        onTabChange={(e, data) => profileStore.setActiveTab(data.activeIndex)}
        menuPosition='right' />
    )
})