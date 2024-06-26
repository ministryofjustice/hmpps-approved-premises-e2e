import { test } from '../../test'
import { createApplication } from '../../steps/apply'
import { assessApplication } from '../../steps/assess'

import { setRoles } from '../../steps/admin'

test('Apply, assess, match and book an emergency application for an Approved Premises', async ({
  page,
  user,
  person,
  oasysSections,
  emergencyApplicationUser,
}) => {
  await setRoles(page, user.name, ['Emergency APs'])

  const id = await createApplication({ page, person, oasysSections, applicationType: 'emergency' }, true)
  await assessApplication({ page, user, person }, id, {
    applicationType: 'emergency',
    allocatedUser: emergencyApplicationUser,
  })
  // Skip match until it's back
  // await matchAndBookApplication({ page, user, person }, id)
})
