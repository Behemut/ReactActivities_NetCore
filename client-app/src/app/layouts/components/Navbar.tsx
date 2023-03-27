import { Button, Container, Menu, Image, Dropdown } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";

export default observer (function Navbar() {
  const {userStore:{user,logout}} = useStore()
  
return (
    <Menu inverted fixed="top">
        <Container>    
            <Menu.Item as={NavLink} to='/' header>
                <img src={`${process.env.REACT_APP_ROUTING}assets/logo.png`} alt="logo" style={{marginRight: '10px'}} />
                Reactivities
            </Menu.Item>
            <Menu.Item name="Activities" as={NavLink} to={`${process.env.REACT_APP_ROUTING}activities`} />
            <Menu.Item>
                <Button positive content="Create Activity" as={NavLink} to={`${process.env.REACT_APP_ROUTING}createActivity`} />
            </Menu.Item>

        <Menu.Item position='right'>
            <Image avatar spaced='right' src={user?.image || `${process.env.REACT_APP_ROUTING}assets/user.png`} />
            <Dropdown pointing='top left' text={user?.displayName}>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={`${process.env.REACT_APP_ROUTING}/profiles/${user?.username}`} text='My profile' icon='user' />
                    <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Item>        
      </Container>
    </Menu>
  );
})