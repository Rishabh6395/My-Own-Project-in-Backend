import React from 'react'
import { useParams } from 'react-router-dom'



export default function DeveloperProfile() {
    const { id } = useParams()

    return (
        <div className='p-8'>
            <h2 className='text-2xl font-semibold'>Developer Profile -ID: {id}</h2>
        </div>
    )
}
