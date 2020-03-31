import React from "react";
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Icon,
  Title,
  Left,
  Right,
  Body,
} from "native-base";

export const NavHeader = () => {
  return (
    <Header>
      <Left>
        <Button transparent>
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body>
        <Title>Header</Title>
      </Body>
      <Right>
        <Button transparent>
          <Icon name="menu" />
        </Button>
      </Right>
    </Header>
  );
};
