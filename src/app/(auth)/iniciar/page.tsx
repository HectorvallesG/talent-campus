import { LoginForm } from "./_components/LoginForm";

export default async function Iniciar() {
  return (
    <main className="min-h-screen flex flex-col justify-center p-8">
      <h1 className="text-2xl font-semibold mb-4">
        Inica sesión en Talent Campus
      </h1>
      <LoginForm/>
    </main>
  )
}
