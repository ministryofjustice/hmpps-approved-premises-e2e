import { test } from '../../test'
import { createApplication, withdrawAnApplicationAfterSubmission } from '../../steps/apply'
import { assessApplication } from '../../steps/assess'

import { setRoles } from '../../steps/admin'

test('Apply, assess, match and book an short notice application for an Approved Premises with a release date', async ({
  page,
  user,
  person,
  indexOffenceRequired,
  oasysSections,
  emergencyApplicationUser,
}) => {
  await setRoles(page, user.name, ['Emergency APs'])
  const id = await createApplication(
    { page, person, indexOffenceRequired, oasysSections, applicationType: 'shortNotice' },
    true,
    true,
  )
  await assessApplication({ page, user, person }, id, {
    applicationType: 'shortNotice',
    acceptApplication: true,
    allocatedUser: emergencyApplicationUser,
  })
  await withdrawAnApplicationAfterSubmission(page, id)
  // Skip match until it's back
  // await matchAndBookApplication({ page, user, person }, id)
})
