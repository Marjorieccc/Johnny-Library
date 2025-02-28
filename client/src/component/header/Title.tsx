import { Link } from "react-router-dom";
import Modal from "../modal/Modal";
import SideNavBar from "../navbar/SideNavBar";

export default function Title() {
  return (
    <header className="flex ">
      <Modal
        modalContent={
          <div className="h-full my-10 overflow-x-hidden overflow-y-auto font-roboto-condensed">
            <SideNavBar />
          </div>
        }
        header={<p className="text-3xl font-bold">Navigation</p>}
        buttonContent={<span className="pi pi-bars"></span>}
        buttonCss="mx-2 text-xl lg:hidden"
      />
      <img src="/logo.webp" alt="Logo" className="w-10 mr-1 lg:mr-0 lg:w-12" />
      <h1 className="pt-1 mt-2 text-base text-gray-900 no-underline lg:text-xl lg:ml-3 font-fjalla lg:mb-1 lg:text-md ">
        <Link to="/">Johnny Library</Link>
      </h1>
    </header>
  );
}
