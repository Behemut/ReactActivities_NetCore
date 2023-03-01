import react from 'react';
import { Activity } from '../../../models/activity';
import { Button, Card, Icon, Image } from 'semantic-ui-react';

interface Props {
    activity: Activity 
    cancelSelectActivity: () => void
    openForm: (id: string) => void
}

export default function ActivityDetails({activity, cancelSelectActivity, openForm}: Props) {
    return (
        <Card fluid color='red'>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />      
        <Card.Content>
          <Card.Header>{activity.title}</Card.Header>
          <Card.Meta>
            <span className='date'>{activity.date}</span>
          </Card.Meta>
          <Card.Description>
            {activity.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button.Group widths={2}>
                    <Button onClick={()=> openForm(activity.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectActivity}   basic color='red' content='Cancel' />
            </Button.Group>
        </Card.Content>
      </Card>
    )
}