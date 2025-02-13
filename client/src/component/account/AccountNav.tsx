import { NavLink } from "react-router-dom";
const tabStyle = `text-red-800 py-2 px-4 rounded-t-md lg:text-base text-sm font-bold border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300`;
const listStyle = `flex list-none gap-4 pt-10 lg:pt-0`;

export default function AccountNav() {
  return (
    <div >
      <ul className={listStyle}>
        <li className={tabStyle}>
          <NavLink to="reservation"> Reservation</NavLink>
        </li>
        <li className={tabStyle}>
          <NavLink to="roomBooking"> Room Booking Record</NavLink>
        </li>
      </ul>
      <br />
    </div>
  );
}
