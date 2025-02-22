import React from 'react'

function Output({output}: {output: string}) {
  if(!output){
    return (
      <div className="p-4 min-h-full rounded-md text-red-500">No output.</div>
    )
  }
  return (
    <div className="p-4 min-h-full rounded-md text-green-500">{output}</div>
  )
}

export default Output