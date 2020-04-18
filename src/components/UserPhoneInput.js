import React from "react";
import {
  Text,
  TextInput
} from 'react-native';

import { t } from 'Lib/i18n';

export const UserPhoneInput = ({ onChange, phoneNumber }) => {
  return (
    <>
      <Text>{t('phone_number')}</Text>
      <TextInput
        style={{
          width: 200,
          height: 35,
          borderColor: "#696969",
          borderWidth: 1,
          margin: 5
        }}
        onChangeText={onChange}
        value={phoneNumber}
      />
    </>
  );
};
export default UserPhoneInput;
