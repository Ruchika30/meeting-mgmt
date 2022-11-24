import React, { Suspense, lazy } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';


const RoomDetails = lazy(() => import('./src/containers/details'));
const AddMeeting = lazy(() => import('./src/containers/addMeeting'));

const App = () => {
    return (
        <BrowserRouter>
            <Suspense>
                <Routes>
                    <Route path="/" element={<RoomDetails />} />
                    <Route path="/add" element={<AddMeeting />} />

                </Routes>
            </Suspense>
        </BrowserRouter>

    )
}

export default App