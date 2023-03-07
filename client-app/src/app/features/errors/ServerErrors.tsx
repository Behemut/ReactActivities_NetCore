import { Container, Header, Message, Segment } from "semantic-ui-react";
import { ServerError } from "../../models/ServerError";
import { useStore } from "../../stores/store";

export default function ServerErrors(){

    const {commonStore} = useStore();


    return (
        <Container>
            <Header as='h1' content='Server Error'   />
            <Header sub as='h5' color='red' content={commonStore.error?.message} />
            {commonStore.error?.details && (
                <Segment>
                    <Header as='h4' content='Stack Trace' color='teal' />
                    <code style={{marginTop: '10px'}}>{commonStore.error.details}</code>
                </Segment>
            )}
        </Container>        
    )

}