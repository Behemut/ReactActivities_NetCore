import { observer } from 'mobx-react-lite'
import {Segment, Header, Comment, Form, Button} from 'semantic-ui-react'
import { useStore } from '../../../stores/store'
import { useEffect } from 'react'
import CommentStore from '../../../stores/commentStore'
import commentStore from '../../../stores/commentStore'
import { Link } from 'react-router-dom'

interface Props {
    activityId: string
}



export default  observer(function ActivityDetailsChat({activityId}: Props) {
    const {commentStore :{createHubConnection, clearComments, comments}} = useStore()

    useEffect (() => {
        if (activityId)  createHubConnection(activityId)

        return () => {clearComments()}
    },[CommentStore, activityId])

    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{border: 'none'}}
            >
                <Header>Chat about this event</Header>
            </Segment>
            <Segment attached>
                <Comment.Group>

                    {comments?.map(comment => ( 
                          <Comment key={comment.id}>
                          <Comment.Avatar src={comment.image ||'/assets/user.png' } />
                          <Comment.Content>
                              <Comment.Author as='a'>{<Link to={`/profiles/${comment.username}`}>{comment.displayName}</Link>}</Comment.Author>
                              <Comment.Metadata>
                                  <div>Today at 5:42PM</div>
                              </Comment.Metadata>
                              <Comment.Text>{comment.body}</Comment.Text>       
                          </Comment.Content>
                      </Comment>
                    ))}
                
                    <Form reply>
                        <Form.TextArea/>
                        <Button
                            content='Add Reply'
                            labelPosition='left'
                            icon='edit'
                            primary
                        />
                    </Form>
                </Comment.Group>
            </Segment>
        </>
    )
})