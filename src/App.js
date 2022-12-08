import {
  BrowserRouter
  as
  Router,
  Route,
  Routes
  } from 'react-router-dom';
  import Rooms from '../src/pages/Rooms';
import Signin from '../src/pages/SignIn';
import Dashboard from '../src/pages/Dashboard';
import ManageRooms from '../src/pages/ManageRooms';
import SalesReports from '../src/pages/SalesReports';
import Reservations from './pages/Reservations';
import ManageTurn from './pages/ManageTurn';

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