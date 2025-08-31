import React, { useContext } from "react";
import { GiConfirmed } from "react-icons/gi";
import { BookingDataContext } from "../context/BookingContext";
import { useComments } from "../context/comment";
import CommentsList from "./Comment";
import CommentForm from "./CommentForm";

const Booked = () => {
  const { bookingData } = useContext(BookingDataContext);  // ✅ array of bookings
  const { addComment, fetchComments, comments } = useComments();

  console.log(bookingData, "All bookings array");

  return (
    <div className="h-full w-full gap-5 bg-gray-400 flex items-center justify-center flex-col">
      {bookingData?.map((booking) => (
        <div
          key={booking._id}
          className="h-[50%] w-[30%] bg-white flex flex-col items-center justify-center mb-5"
        >
          <GiConfirmed className="flex items-center text-8xl justify-center text-green-700" />
          <h1 className="text-green-700 bg-white p-1 text-2xl font-semibold rounded-lg">
            Booking Confirmed
          </h1>

          <div className="w-full mt-10">
            <div className="flex justify-between pl-5 mt-2 pr-5 w-full">
              <h1>Booking Id:</h1>
              <h1>{booking._id}</h1>
            </div>
            <div className="flex justify-between pl-5 pr-5 mt-2 w-full">
              <h1>Owner Details:</h1>
              <h1>{booking.host?.email}</h1>
            </div>
            <div className="flex justify-between pl-5 pr-5 mt-2 w-full">
              <h1>Total Rent:</h1>
              <h1>{booking.totalRent}</h1>
            </div>
          </div>

          {/* Reviews */}
          <div className="h-[30%] w-[90%] bg-gray-100 mt-5 p-2">
            <h1 className="text-2xl w-full flex justify-center">
              Out Of 5 Rating
            </h1>
            <CommentForm postId={booking?.listing?._id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Booked;
