import {
  BrowserRouter
  as
  Router,
  Route,
  Routes
} from 'react-router-dom';
import { lazy } from 'react';

const Rooms = lazy(() => import('../src/pages/Rooms'));
const Signin = lazy(() => import('../src/pages/SignIn'));
const Dashboard = lazy(() => import('../src/pages/Dashboard'));
const ManageTurn = lazy(() => import('../src/pages/ManageTurn'));
const ManageRooms = lazy(() => import('../src/pages/ManageRooms'));
const SalesReports = lazy(() => import('../src/pages/SalesReports'));
const Reservations = lazy(() => import('../src/pages/Reservations'));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path="*" element={<Rooms />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="manage-rooms" element={<ManageRooms />} />
          <Route path="sales-reports" element={<SalesReports />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="turn" element={<ManageTurn />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;