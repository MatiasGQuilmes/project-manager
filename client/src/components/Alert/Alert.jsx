import React from 'react'
import clasesAlert from './alert.module.css'


export const Alert = ({msg}) => {
  return (
    <div className=" text-red-700 p-3 text-center rounded-md font-bold text-lg">{msg}</div>
  )
}