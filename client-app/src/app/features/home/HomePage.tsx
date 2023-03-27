import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import React from "react";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export default observer (function HomePage() {
    const {userStore, modalStore} = useStore();
    
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as='h1' inverted>
          <Image size='massive' src={`${process.env.REACT_APP_ROUTING}assets/logo.png`} alt='logo' style={{ marginBottom: 12 }} />
          Reactivities
        </Header>

       {userStore.isLoggedIn ? ( 
          <>
        <Header as='h2' inverted content='Welcome to Reactivities' />
        <Button as={Link} to={`${process.env.REACT_APP_ROUTING}activities`} size='huge' inverted>
          Take me to the activities!
        </Button>
          </>
        ) : (
          <React.Fragment>
          <Button onClick={()=> modalStore.openModal(<LoginForm />)} size='huge' inverted  content="Login"/>
          <Button onClick={()=> modalStore.openModal(<RegisterForm />)} size='huge' inverted  content="Register"/>
          </React.Fragment>
        )}
      </Container>
    </Segment>
  );
})