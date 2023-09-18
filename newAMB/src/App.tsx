import { Route, Routes } from "react-router-dom"
import { FullWrap } from "./styled"
import { Main, Login, Signin, Search, Maps } from "./pages"
// import { TransferPage } from "@common/transfer"

const App = () => (
    <FullWrap>
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/search" element={<Search />} />
            {/* <Route path="/list" element={<List />} /> */}
            {/* <Route path="/transfer" element={<TransferPage />} /> */}
        </Routes>
    </FullWrap>
)
export default App
