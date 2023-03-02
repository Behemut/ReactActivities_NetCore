import react from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { useStore } from '../../../stores/store';
import LoadingComponent from '../../../layouts/components/LoadingComponents';
import { observer } from 'mobx-react-lite';


export default observer(function ActivityDetails() {
  const {activityStore} = useStore();

  const {selectedActivity: activity, openForm, cancelSelectedActivity} = activityStore

if (!activity) return <LoadingComponent />

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
                    <Button onClick={()=>openForm(activity.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectedActivity}   basic color='red' content='Cancel' />
            </Button.Group>
        </Card.Content>
      </Card>
    )
})