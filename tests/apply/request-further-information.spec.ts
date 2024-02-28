import { test } from '../../test'
import { createApplication } from '../../steps/apply'
import { requestAndAddAdditionalInformation } from '../../steps/assess'

import { setRoles } from '../../steps/admin'

test('Request further information on an Application, adds it and proceeds with the assessment', async ({
  page,
  user,
  person,
  indexOffenceRequired,
  oasysSections,
}) => {
  await setRoles(page, [])

  const id = await createApplication({ page, person, indexOffenceRequired, oasysSections }, true, false)
  await requestAndAddAdditionalInformation({ page, user, person }, id)
})