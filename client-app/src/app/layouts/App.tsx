import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import Navbar from './components/Navbar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './components/LoadingComponents';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} = useStore()

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])



  if(activityStore.loadingInitial) return <LoadingComponent content='Loading App...' />

  return (
    <React.Fragment>
      <Navbar  />
      <Container style={{marginTop: '7em'}}>
      <ActivityDashboard />
      </Container>
    </React.Fragment>
  );
}

export default observer(App)