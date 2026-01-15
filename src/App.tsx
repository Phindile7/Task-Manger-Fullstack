import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoutes';
import Login from './components/Login';
import { TaskList } from './components/TaskList';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <TaskList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
