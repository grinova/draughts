export const USER_NAME_CHANGE = 'user_name_change'

export function userNameChange(username) {
  return { type: USER_NAME_CHANGE, username }
}
