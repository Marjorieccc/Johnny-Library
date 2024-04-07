import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchRoomById } from "../../api/fetchRoom/fetchRoomById";
import { createBooking } from "../../api/fetchRoom/createBooking";
import { SubmitBookingDetails } from "../../types/room";

export default function RoomDetails() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, getAccessTokenSilently, loginWithPopup } = useAuth0();

  async function createBookingWithAuth0(data: SubmitBookingDetails) {
    if (isAuthenticated && user) {
      const accessToken = await getAccessTokenSilently();
      try {
        const res = await createBooking(data, accessToken)
        return res
      } catch (error) {
        console.log(error);
        throw error
      }
    }
  }


  if (id) {
    const {
      data: queryData,
      isLoading: queryIsLoading,
      isError: queryIsError,
      error: queryError,
    } = useQuery({
      queryKey: ["roomDetails", id],
      queryFn: () => fetchRoomById(id),
    });

    const {
      data: mutationData,
      isPending: mutationIsPending,
      isError: mutationIsError,
      isSuccess: mutationIsSuccess,
      error: mutationError,
      mutate,
    } = useMutation({
      mutationFn: createBookingWithAuth0,
    });

    const onSubmit = () => {
      user && mutate({
        room: id,
        timeSlot: state.timeSlot,
        userId: user.sub ? user.sub : "test",
      });
    };

    if (queryIsLoading) {
      return <h1>Loading</h1>;
    }
    if (queryIsError) {
      return <h1>{queryError.message}</h1>;
    }
    if (queryData) {
      return (
        <div className="font-roboto mx-auto w-full border-2 border-pink-900">
          <h1 className="my-4 text-center text-2xl font-bold lg:mx-6 lg:text-start">
            {queryData.room.desc} {queryData.room.name}
          </h1>
          <div className="lg:flex lg:gap-4">
            <div>
              <img
                src={queryData.room.image}
                alt={queryData.room.name}
                className="mx-auto max-h-80 max-w-80 overflow-hidden lg:ml-6 lg:max-h-96 lg:max-w-96"
              />
            </div>
            <div className="flex-col lg:ml-10">
              <div className="mx-6 pb-4 ">
                <p className="my-4 text-center text-xl font-bold text-gray-700 underline lg:text-start">
                  Room Details
                </p>
                <div className="lg:flex lg:flex-grow">
                  <div className="lg:w-72 lg:flex-col">
                    <div className="my-4 flex justify-center lg:justify-start">
                      <i className="pi pi-users text-xl text-[#E32B31]"></i>
                      <p className="px-4 text-base font-bold">Capacity</p>
                    </div>
                    <p className="mb-10 text-center text-base text-gray-500 lg:mb-6 lg:px-10 lg:text-start">
                      {queryData.size.capacity}
                    </p>
                  </div>
                  <div className="lg:flex-col">
                    <div className="my-2 flex justify-center lg:my-4 lg:justify-start">
                      <i className="pi pi-box text-xl text-[#E32B31]"></i>
                      <p className="mb-4 px-4 text-base font-bold lg:mb-2">
                        Equipments
                      </p>
                    </div>
                    {queryData.room.equipment.length ? (
                      <div className="mb-10 px-24 lg:flex lg:gap-x-4 lg:px-10 ">
                        {queryData.room.equipment.map((equipment) => (
                          <div
                            className="mb-6 rounded-md border px-2 py-1 text-center text-sm text-gray-500"
                            key={equipment}
                          >
                            {equipment}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mb-10 text-center text-base text-gray-500 lg:mb-6 lg:px-10 lg:text-start">
                        None
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mx-6 pb-4 ">
                <div className="flex flex-grow justify-center lg:justify-start">
                  <div className="my-4 text-xl font-bold text-gray-700 underline">
                    Booking Details
                  </div>
                  <i
                    className="pi pi-sync px-4 py-5 font-bold text-[#E32B31] hover:scale-150"
                    onClick={() => navigate("/services/rooms")}
                  ></i>
                </div>
                <div className="lg:flex lg:flex-grow ">
                  <div className="lg:flex-col">
                    <div className="my-4 flex justify-center lg:justify-start">
                      <i className="pi pi-calendar text-xl text-[#E32B31]"></i>
                      <p className="px-4 text-base font-bold">From</p>
                    </div>
                    <p className="mb-10 text-center text-base text-gray-500 lg:mb-6 lg:w-72 lg:px-10 lg:text-start">
                      {state.timeSlot.start.toLocaleString("en-US", {
                        timeZone: "America/Toronto",
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                        weekday: "short",
                        hour12: false,
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="lg:flex-col">
                    <div className="my-4 flex justify-center lg:justify-start">
                      <i className="pi pi-calendar text-xl text-[#E32B31]"></i>
                      <p className="px-4 text-base font-bold">To</p>
                    </div>
                    <p className="mb-10 text-center text-base text-gray-500 lg:mb-6 lg:w-72 lg:px-10 lg:text-start">
                      {state.timeSlot.end.toLocaleString("en-US", {
                        timeZone: "America/Toronto",
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                        weekday: "short",
                        hour12: false,
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-2 border-2 border-dotted border-gray-200 p-5 lg:mx-6">
            <h3 className="font-bold text-gray-500">Terms and conditions:</h3>
            <ul className="block list-none py-1 text-xs text-gray-400 lg:text-sm">
              <li className="py-1">
                Reservations will be required to use the study room.
              </li>
              <li className="py-1 text-gray-500">
                A reservation holder has the right to the room. Please always
                make a reservation before using a room, even if the start time
                is immediate so as not to lose the right to the room.
              </li>
              <li className="py-1">
                An email address is required to book a room.
              </li>
              <li className="py-1 text-gray-500">
                The name on the reservation must match the name of the person
                using the room.
              </li>
              <li className="py-1">
                Study rooms can be reserved in 30-minute increments up to a
                maximum of 3 hours per day per patron or group.
              </li>
              <li className="py-1 text-gray-500">
                Rooms can be reserved up to one week in advance.
              </li>
              <li className="py-1">
                Those who arrive more than 15 minutes late for their time slot
                may forfeit their reservation.
              </li>
              <li className="py-1 text-gray-500">
                Please leave the study room in the condition and arrangement
                that you found it in.
              </li>
              <li className="py-1">
                Please clean and pack up five minutes prior to the end of your
                session so that the room can be vacated for the next reservation
                in a timely manner.
              </li>
              <li className="py-1 text-gray-500">
                Please direct any concerns about study room use to a library
                staff member.
              </li>
              <li className="py-1">
                All persons using the room must abide by the Library&apos;s
                Rules of Conduct
              </li>
              <li className="py-1 text-gray-500">
                Study Rooms are intended for not-for-profit use only.
              </li>
              <li className="py-1">
                Reservations may be altered as needed by library staff
              </li>
              <li className="py-1 text-gray-500">
                Library operations have priority over all other reservations.
              </li>
            </ul>
          </div>
          <div className="my-10 flex justify-center">
            {isAuthenticated ? (
              <button
                className="rounded-full border-2 border-[#E32B31] px-6  py-4 font-bold text-[#E32B31]"
                onClick={onSubmit}
              >
                Confirm Booking
              </button>
            ) : (
              <button className="rounded-full border-2 border-[#E32B31] px-6  py-4 font-bold text-[#E32B31]"
              onClick={() => loginWithPopup()}>
                Please Log in
              </button>
            )}
          </div>

          {mutationIsPending && (
            <p className="mb-2 text-xl font-bold text-[#E32B31]">Processing</p>
          )}

          {mutationIsSuccess && (
            <div className="my-10 flex justify-center ">
              <div className="text-center">
                <p className="mb-2 text-xl font-bold text-[#E32B31]">
                  Booking Successful!{" "}
                </p>
                <div>
                  <p className="pi pi-hashtag mb-2 text-base text-gray-500"></p>{" "}
                  <span className="text-gray-500">{mutationData && mutationData._id}</span>
                </div>
                <button
                  className="mx-1 border p-1 text-sm text-gray-700 hover:scale-125"
                  onClick={() => navigate("/services/rooms")}
                >
                  Return
                </button>
              </div>
            </div>
          )}

          {mutationIsError && (
            <div className="my-10 flex justify-center">
              <div className="text-center">
                <p className="mb-2 text-xl font-bold text-[#E32B31]">
                  Booking not successful.
                </p>
                <div>
                  <p className="pi pi-exclamation-circle mb-2 text-base text-[#E32B31]"></p>
                  <span className="text-gray-500">
                    {mutationError.message}.
                  </span>
                </div>
                <p className="mb-4 text-gray-500">Please try again.</p>
                <button
                  className="mx-1 border p-1 text-sm text-gray-700 hover:scale-125 "
                  onClick={() => navigate("/services/rooms")}
                >
                  Return
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }
  }
  return <h1>Error</h1>;
}
