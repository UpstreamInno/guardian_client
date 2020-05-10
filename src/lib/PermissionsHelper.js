import * as Permissions from "expo-permissions";

export const doPermissionCheck = async (permission, permissionDeniedMessage) => {

  const {status: existingStatus} = await Permissions.getAsync(permission);
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const {status} = await Permissions.askAsync(permission);
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert(`${permissionDeniedMessage}`);
    return false;
  }

  return true;
};
