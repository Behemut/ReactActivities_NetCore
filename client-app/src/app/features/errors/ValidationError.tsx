import { Message } from "semantic-ui-react";

interface Props {
    errors: string[];
}

export default function ValidationError({errors}: Props) {
  return (
    <Message error>
      <Message.Header>Oops - we have some errors</Message.Header>
      <Message.List>
        {errors.map((err, i) => (
          <Message.Item key={i}>{err}</Message.Item>
        ))}
      </Message.List>
    </Message>
  );
}