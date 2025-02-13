import { useContext } from "react";
import { Link } from "react-router-dom";
import { ModalCloseContext } from "../modal/Modal";

export default function SideNavBar() {
  const closeModal = useContext(ModalCloseContext);

  function handleLinkClick() {
    if (closeModal) closeModal();
  }

  return (
    <>
      <ul className="list-none ">
        <li className="block px-4 py-2 font-extrabold">Explore!</li>
        <li>
          <Link
            to="/explore"
            onClick={handleLinkClick}
            className="block px-8 py-2 hover:bg-gray-200"
          >
            Fiction
          </Link>
        </li>
        <li>
          <Link
            to="/explore"
            onClick={handleLinkClick}
            className="block px-8 py-2 hover:bg-gray-200"
          >
            Non-Fiction
          </Link>
        </li>
        <li>
          <Link
            to="/explore"
            onClick={handleLinkClick}
            className="block px-8 py-2 hover:bg-gray-200"
          >
            Books
          </Link>
        </li>
        <li>
          <Link
            to="/explore"
            onClick={handleLinkClick}
            className="block px-8 py-2 hover:bg-gray-200"
          >
            Movies & TV
          </Link>
        </li>
      </ul>
      <ul className="list-none">
        <li className="block px-4 pt-10 font-extrabold">Service</li>
        <li>
          <Link
            to="/services/rooms"
            onClick={handleLinkClick}
            className="block px-8 py-2 hover:bg-gray-200"
          >
            Book Study Room
          </Link>
        </li>
        <li>
          <Link
            to="/services"
            onClick={handleLinkClick}
            className="block px-8 py-2 hover:bg-gray-200"
          >
            Book a Computer
          </Link>
        </li>
      </ul>
    </>
  );
}
