import React from "react";
import { Button, Form, Grid, Segment, Message } from "semantic-ui-react";
import { NavLink, Redirect } from "react-router-dom";

export default function Checkout({}) {
  return (
    <div>
      <Grid textAlign="center">
        <Grid.Column style={{ maxWidth: 850, maxHeight: 800 }}>
          <Form size="large">
            <Segment>
              <Form.Input
                fluid
                autoFocus
                name="name"
                icon="user"
                iconPosition="left"
                placeholder="Full Name"
              />
              <Form.Input
                fluid
                name="phone"
                icon="phone"
                iconPosition="left"
                placeholder="Numberphone"
                type="number"
              />
              <Form.Input
                fluid
                name="address"
                icon="address card"
                iconPosition="left"
                placeholder="Address"
              />
              <Form.Input
                fluid
                name="email"
                icon="at"
                iconPosition="left"
                placeholder="Email"
              />
              <Button color="blue" fluid size="large">
                Gửi
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
}
