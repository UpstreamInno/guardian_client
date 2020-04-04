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
import { t } from 'Lib/i18n';

export const NavHeader = () => {
  return (
    <Header>
      <Left>
        <Button transparent>
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body>
        <Title>{t('header')}</Title>
      </Body>
      <Right>
        <Button transparent>
          <Icon name="menu" />
        </Button>
      </Right>
    </Header>
  );
};
