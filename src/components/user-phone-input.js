import React from "react";
import {
  Text,
  TextInput
} from 'react-native';
import { t } from 'Lib/i18n';

export const UserPhoneInput = ({ onChange, phoneNumber }) => {
  return (
    <>
      <Text>User Phone:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={onChange}
        value={phoneNumber}
      />
      <Text>{t('user_phone_from_store')}</Text>
      <Text>{phoneNumber}</Text>
    </>
  );
};
