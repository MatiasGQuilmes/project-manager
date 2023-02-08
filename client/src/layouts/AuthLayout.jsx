import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const AuthLayout = () => {

  const { auth, loading } = useAuth()
  console.log(auth);

  {
      if (loading) {
          return (
              <p>Cargando....</p>
          )
      }
  }


  return (
    <>
      <main className="container mx-auto mt-5 md:mt-10 p-6 md:flex md:justify-center">

        <div className="md:w-2/3 lg:w-2/5">
          <Outlet />
        </div>
        
      </main>
    </>
  );
};