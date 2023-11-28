import { AppRouter } from './router/AppRouter'
import { AuthProvider } from './Context/Authcontext'
export default function WebDossier(){
    return(
        <>
        <AuthProvider>
        <AppRouter />   
        </AuthProvider>
        </>
    )
}