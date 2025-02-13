import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import HomePage from './pages/Home';
import HomeContent from './pages/HomeContent';
import ExplorePage from './pages/Explore';
import ResourceDetailPage from './pages/ResourceDetail';
import AccountPage from './pages/Account';
import NotFoundPage from './pages/NotFound';
import RoomFilter from './pages/service/Room';
import RoomDetails from './pages/service/RoomDetails';
import AccountReservation from './component/account/AccountReservation';
import AccountRoomBooking from './component/account/AccountRoomBooking';
import Auth0ProviderWithHistory from './component/auth0/Auth0Provider';
import AccountDetailsProvider from './context/AccountDetailsProvider';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={
        <Auth0ProviderWithHistory>
          <AccountDetailsProvider>
            <HomePage />
          </AccountDetailsProvider>
        </Auth0ProviderWithHistory>
      }
    >
      <Route index element={<HomeContent />} />
      <Route path='explore' element={<ExplorePage />} />
      <Route path='services/rooms' element={<RoomFilter />} />
      <Route path='services/rooms/:id' element={<RoomDetails />} />
      <Route path='resource/:resource_id' element={<ResourceDetailPage />} />

      <Route path='account' element={<AccountPage />}>
        <Route index element={<Navigate replace to='reservation' />} />
        <Route path='reservation' element={<AccountReservation />} />
        <Route path='roomBooking' element={<AccountRoomBooking />} />
      </Route>

      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
);

export default function Index() {
  return <RouterProvider router={router} />;
}
