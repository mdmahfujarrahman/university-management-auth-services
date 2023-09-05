// userServices
import userServices from './user.services'

export const generateUserId = async () => {
  const currentId =
    (await userServices.getLastUser()) || (0).toString().padStart(5, '0')
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  return incrementedId
}
