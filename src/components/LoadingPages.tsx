export const LoadingPages = () => {
  return (
    <div className="flex justify-center gap-3 items-center h-[70vh]">
      <span className="font-bold text-3xl ">
        Cargando
      </span>
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
      </div>
    </div>
  )
}
