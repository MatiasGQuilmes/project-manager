import React from 'react'
import { FormProject } from '../../components/FormProject/FormProject'
export const ProjectAdd = () => {
    return (
        <>
            <div className='flex flex-col items-center my-16'>
                <h1 className='text-white uppercase text-2xl font-bold'>
                    Crear proyecto 
                </h1>
                <div>
                    <FormProject />
                </div>
            </div>
        </>
    )
}
