import { observer } from "mobx-react-lite"
import { Profile } from "../../models/profile"
import { Card, Icon, Image } from "semantic-ui-react"
import { Link } from "react-router-dom"

interface Props {
    profile : Profile
}


export default observer (function ProfileCard({profile} : Props) {

        return (
        <Card as = {Link} to={`/profiles/${profile.username}`}>
            <Image size="medium" src={profile.image || '/assets/user.png'} />
            <Card.Content>
                <Card.Header>{profile.displayName}</Card.Header>
                <Card.Description>{profile.bio}</Card.Description>
            </Card.Content>   
            <Card.Content>
                <Card.Meta extra><Icon name="user"/>0  Followers</Card.Meta>
            </Card.Content>
        </Card>
        )
})