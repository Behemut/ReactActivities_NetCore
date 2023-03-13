import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../stores/store';
import LoadingComponent from '../../../layouts/components/LoadingComponents';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import ActivityDetailsHeader from './ActivityDetailsHeader';
import ActivityDetailsInfo from './ActivityDetailsInfo';
import ActivityDetailsChat from './ActivityDetailsChat';
import ActivityDetailsSideBar from './ActivityDetailsSideBar';

export default observer(function ActivityDetails() {
  const {activityStore} = useStore();
  const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore
  const {id} = useParams()

  useEffect(() => {
    if (id) loadActivity(id)
  }, [id, loadActivity])



if (loadingInitial ||  !activity) return <LoadingComponent />

    return (
      <Grid>
        <Grid.Column width={10}>
          <ActivityDetailsHeader activity={activity} />
          <ActivityDetailsInfo activity={activity} />
          <ActivityDetailsChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <ActivityDetailsSideBar activity={activity} />
        </Grid.Column>
      </Grid>
    )
})