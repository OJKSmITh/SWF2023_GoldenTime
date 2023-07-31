import { Route, Routes } from "react-router-dom"
import { List, Main } from "./common"
import { FullWrap } from "./styled"
import { TransferPage } from "@common/transfer"

const App = () => {
    return (
        <FullWrap>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/list" element={<List />} />
                <Route path="/transfer" element={<TransferPage/>} />
            </Routes>
        </FullWrap>
    )
}
export default App
