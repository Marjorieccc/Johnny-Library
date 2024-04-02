import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchRoomById } from "../../api/fetchRoom/fetchRoomById";
import { createBooking } from "../../api/fetchRoom/createBooking";

export default function RoomDetails() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

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
      mutationFn: createBooking,
    });

    const onSubmit = () => {
      mutate({
        room: id,
        timeSlot: state.timeSlot,
        // user: userId
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
        <>
          <div className="mt-40 p-4">
            <div className="flex gap-4">
              <img
                src={queryData.room.image}
                alt={queryData.room.name}
                className="max-h-96 max-w-96"
              />
              <div>
                <div className="pb-4">
                  <p className="text-xl font-bold underline">Room Details</p>
                  <p>Room Name: {queryData.room.name}</p>
                  <p>Room Capacity: {queryData.size.capacity}</p>
                  <p>Room Description: {queryData.room.desc}</p>
                  <div>
                    Equipments:{" "}
                    {queryData.room.equipment.length ? (
                      <ul className="list-disc">
                        {queryData.room.equipment.map((equipment) => (
                          <li key={equipment}>{equipment}</li>
                        ))}
                      </ul>
                    ) : (
                      "None"
                    )}
                  </div>
                  <p>Terms and conditions:</p>
                  <ul className="list-disc">
                    <li>
                      Reservations will be required to use the study room.
                    </li>
                    <li>
                      A reservation holder has the right to the room. Please
                      always make a reservation before using a room, even if the
                      start time is immediate so as not to lose the right to the
                      room.
                    </li>
                    <li>An email address is required to book a room.</li>
                    <li>
                      The name on the reservation must match the name of the
                      person using the room.
                    </li>
                    <li>
                      Study rooms can be reserved in 30-minute increments up to
                      a maximum of 3 hours per day per patron or group.
                    </li>
                    <li>Rooms can be reserved up to one week in advance.</li>
                    <li>
                      Those who arrive more than 15 minutes late for their time
                      slot may forfeit their reservation.
                    </li>
                    <li>
                      Please leave the study room in the condition and
                      arrangement that you found it in.
                    </li>
                    <li>
                      Please clean and pack up five minutes prior to the end of
                      your session so that the room can be vacated for the next
                      reservation in a timely manner.
                    </li>
                    <li>
                      Please direct any concerns about study room use to a
                      library staff member.
                    </li>
                    <li>
                      All persons using the room must abide by the
                      Library&apos;s Rules of Conduct
                    </li>
                    <li>
                      Study Rooms are intended for not-for-profit use only.
                    </li>
                    <li>
                      Reservations may be altered as needed by library staff
                    </li>
                    <li>
                      Library operations have priority over all other
                      reservations.
                    </li>
                  </ul>
                </div>
                {state && (
                  <div>
                    <p className="text-xl font-bold underline">
                      Booking Details
                    </p>
                    <p>
                      From:{" "}
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
                    <p>
                      To:{" "}
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
                    {!(
                      mutationIsError ||
                      mutationIsPending ||
                      mutationIsSuccess
                    ) && (
                      <>
                        <button
                          className="my-4 rounded-xl bg-blue-500 p-2 underline hover:bg-blue-600"
                          onClick={() => navigate("/services/rooms")}
                        >
                          Change
                        </button>
                        <button
                          className="m-4 rounded-xl bg-green-500 p-2 underline hover:bg-green-600"
                          onClick={onSubmit}
                        >
                          Confirm
                        </button>
                      </>
                    )}
                    {mutationIsPending && <p>Processing</p>}
                    {mutationIsSuccess && (
                      <>
                        <p>Booking Successful!</p>
                        <p>Reference ID: {mutationData._id}</p>
                        <button
                          className="my-4 rounded-xl bg-blue-500 p-2 underline hover:bg-blue-600"
                          onClick={() => navigate("/services/rooms")}
                        >
                          Return
                        </button>
                      </>
                    )}
                    {mutationIsError && (
                      <>
                        <p>
                          Booking not successful. {mutationError.message}.
                          Please try again.
                        </p>
                        <button
                          className="my-4 rounded-xl bg-blue-500 p-2 underline hover:bg-blue-600"
                          onClick={() => navigate("/services/rooms")}
                        >
                          Return
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      );
    }
  }

  return <h1>Error</h1>;
}
