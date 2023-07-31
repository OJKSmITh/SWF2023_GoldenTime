import { AmbSection } from '@common/Ambsection'
import { AppRouter } from 'routes/AppRouter'
declare global {
    interface Window {
    ethereum: any
    }
    }

const App = () => {
    return (
    <>
        <AppRouter/>
    </>
    )
}
export default App
