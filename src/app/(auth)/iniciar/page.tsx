import { getServerSession } from "next-auth";
import { LoginForm } from "./_components/LoginForm";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { Role } from "@/model/Role";

export default async function Iniciar() {

  const session = await getServerSession(options);

  if(session) {
    const currentRol = session.user.rol; 
    console.log(currentRol);

    if(currentRol === Role.Admin || currentRol === Role.Recruiter){
      redirect('/dashboard');
    }

    if (currentRol === Role.Student) {
      redirect('/');
    }
  }
  
  return (
    <main className="min-h-screen flex flex-col justify-center p-8">
      <h1 className="text-2xl font-semibold mb-4">
        Inica sesión en Talent Campus
      </h1>
      {
        JSON.stringify(session)
      }
      <LoginForm/>
    </main>
  )
}
