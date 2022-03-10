import React, { useEffect } from 'react'
import './About.css'

export default function About() {

  useEffect(() => {
    window.scrollTo({ behavior: 'auto', top: '0px' });
  }, [])

  return (
    <div>About</div>
  )
}
