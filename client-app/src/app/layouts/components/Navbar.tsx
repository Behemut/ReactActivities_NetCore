import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../../stores/store";


export default function Navbar() {

  const {activityStore} = useStore();
  const {openForm} = activityStore;

  return (
    <Menu inverted fixed="top">
        <Container>
            
            <Menu.Item header>
                <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}} />
                Reactivities
            </Menu.Item>
            <Menu.Item name="Activities" />
            <Menu.Item>
                <Button onClick={()=> openForm()} positive content="Create Activity" />
            </Menu.Item>
        </Container>
    </Menu>
  );
}