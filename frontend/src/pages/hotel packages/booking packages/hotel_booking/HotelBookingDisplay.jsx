import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const HotelBookingDisplay = () => {
  const [bookings, setBookings] = useState([]);
  const { userInfo } = useSelector(state => state.auth);
  const userID = userInfo._id

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/hotelbooking');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error.response ? error.response.data : error.message);
      }
    };
    fetchBookings();
  }, []);

  // Filter customPackages based on userID
  const filteredBookings = bookings.filter(customPackage => userID === customPackage.user_id );


  const handleCancelBooking = async (id) => {
    try {
      await axios.delete(`/hotelbooking/delete/${id}`);
      setBookings(bookings.filter(booking => booking._id !== id));
    } catch (error) {
      console.error('Error canceling booking:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Hotel Packages Bookings</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredBookings.map((booking) => (
          <div key={booking._id} className="p-6 bg-white rounded-lg shadow-md">
            <p>User ID: {booking.user_id}</p>
            <p>Package ID: {booking.package_id}</p>
            <p>Check-in Date: {new Date(booking.checkin_date).toLocaleDateString()}</p>
            <p>Check-out Date: {new Date(booking.checkout_date).toLocaleDateString()}</p>
            <p>Credit Card No: {booking.credit_card_no}</p>
            <p>Name on Card: {booking.name_on_card}</p>
            <p>Price: {booking.price}</p>
            <p>Expiry Date: {new Date(booking.exp_date).toLocaleDateString()}</p>
            <button onClick={() => handleCancelBooking(booking._id)} className="px-4 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600">Cancel</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelBookingDisplay;
