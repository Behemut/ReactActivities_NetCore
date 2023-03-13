import { observer } from "mobx-react-lite";
import { Button, Header, Item, Segment, Image, Label } from "semantic-ui-react";
import { Activity } from "../../../models/activity";
import { Link } from "react-router-dom";
import {format } from 'date-fns';
import { useStore } from "../../../stores/store";
import React from "react";

interface Props {
    activity: Activity
}

const activityImageStyle = {
    filter: 'brightness(30%)'
}

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
}

export default observer(function ActivityDetailsHeader({activity}: Props) {
    const {activityStore:{updateAttendee, loading, cancelActivityToggle}} = useStore();

    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                {activity.isCancelled &&(
                    <Label style={{position: 'absolute', zIndex: 1000, left: -14, top: 20}} 
                    color='red' ribbon content='This activity has been cancelled' />
                    )
                }
               
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle} />
                <Segment basic style={activityImageTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={activity.title}
                                    style={{color: 'white'}}
                                />
                                <p>{format(activity.date!, 'dd MMM yyyy')}</p>
                                <p>
                                    Hosted by <strong><Link to={`/profiles/${activity.host?.username}`}>{activity.host?.displayName}</Link></strong>
                                </p>
                                </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {activity.isHost ? (
                       <React.Fragment>
                            <Button onClick={cancelActivityToggle} 
                                    color={activity.isCancelled ? 'green' : 'red'} 
                                    loading={loading}
                                    content= {activity.isCancelled ? 'Reactivate Activity' : 'Cancel Activity'}
                                    floated='left' />
                            <Button color='orange' 
                                    floated='right' 
                                    as={Link} to={`/manageActivity/${activity.id}`}
                                    disabled={activity.isCancelled}
                                    >
                                Manage Event
                            </Button>
                       
                       </React.Fragment>
                       ) 
                : activity.isGoing ? 
                  ( <Button loading={loading}  onClick={updateAttendee} >Cancel attendance</Button>)
                : ( <Button loading={loading} disabled={activity.isCancelled}  onClick={updateAttendee} color='teal'>Join Activity</Button> ) 
                }                        
            </Segment>   
        </Segment.Group>
    )
})