import React, { useEffect } from 'react';
import { ProjectPreview } from '../../components/ProjectPreview/ProjectPreview';
import { useProjects } from '../../hooks/useProjects';


export const Projects = () => {
  
  const {loading, alert, projects, getProjects} = useProjects();

  useEffect(()=>{
    getProjects()
  }, []);

  return (
    <>
      <div className='bg-cyan-600flex flex-col items-center mt-10 w-full p-4 '>
        <h1 className=' text-white font-bold text-3xl'>
          Proyectos
        </h1>
        {/* <div>
        <ProjectPreview />
        </div> */}
        <div className='w-full mt-7'>
          {
            loading 
            ? 
            <p>Cargando....</p>
            : 
            projects.length
            ?
            projects.map(project => <ProjectPreview key={project._id} {...project}/>)
            :
            <p className='bg-white mt-10 rounded uppercase font-bold text-red-600 p-2'>No hay proyectos agregados</p>       
          }
        </div>
      </div>
    </>
  )
}


