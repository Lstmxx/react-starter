import './app.css'
import { isDate } from '@utils/is'

import React from 'react'

const app: React.FC<{}> = function() {
  const result = { key: 'helosdfdsf'}
  console.log(result)
  return (
    <div>
      helo1: {result.key}
    </div>
  )
}

export default app