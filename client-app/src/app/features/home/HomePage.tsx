import { Container } from "semantic-ui-react";

export default function HomePage() {
  return (
    <Container style={{ marginTop: "7em" }}>
        <h1>Home Page</h1>

        <h3>Go to <a href="/activities">Activities</a></h3>
    </Container>
  );
}