import React from 'react'

function Paragraph({text}: {text: string}) {
  return (
    <p className='text-white'>{text}</p>
  )
}

export default Paragraph