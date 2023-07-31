import { Route, Routes } from "react-router-dom"
import { List, Main } from "./common"
import { FullWrap } from "./styled"

const App = () => {
    return (
        <FullWrap>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/list" element={<List />} />
            </Routes>
        </FullWrap>
    )
}
export default App
