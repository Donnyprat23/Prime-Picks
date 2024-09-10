import ProtectedRoute from "@/app/components/ProtectedRoute";


export default function AuthLayout({children}: Readonly<{children:React.ReactNode}>){
  return(
    <ProtectedRoute>
      
      {children}
    </ProtectedRoute>
  )
}
