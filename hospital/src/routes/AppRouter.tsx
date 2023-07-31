import { Routes, Route } from 'react-router-dom';
import { Main } from '@common/Main';
import { Mypage } from '@common/Mypage';

export const AppRouter = () =>{
    return (
    <>
        <Routes>
            <Route path='/' element={<Main />}></Route>
            <Route path='/Mypage' element={<Mypage/>}></Route>
        </Routes>
    </>
    )
}