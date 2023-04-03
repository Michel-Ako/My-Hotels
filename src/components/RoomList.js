import React from "react";
import { Link } from "react-router-dom";

const dummyRooms = [
    {
        id: 1,
        name: "Luxury Suite",
        description: "A spacious suite with stunning views of the city.",
        price: 250,
        location: "New York",
        chain: "Hilton",
    },
    {
        id: 2,
        name: "Standard Room",
        description: "A comfortable room with all the amenities you need.",
        price: 100,
        location: "Miami",
        chain: "Marriott",
        },
    {
        id: 3,
        name: "Executive Suite",
        description:
            "A luxurious suite with a separate living area and stunning views.",
        price: 350,
        location: "Los Angeles",
        chain: "Hyatt",
        },
];

const RoomList = ({ filters }) => {
    const filteredRooms = dummyRooms.filter((room) => {
        if (filters.date && filters.date !== room.date) {
            return false;
        }
        if (filters.chain && filters.chain !== room.chain) {
            return false;
        }
        if (filters.location && filters.location !== room.location) {
            return false;
        }
        return true;
    });

    return (
        <div className="row">
            {filteredRooms.map((room) => (
                <div key={room.id} className="col-md-4 mb-4">
                    <div className="card">
                        <img src={room.imageUrl} className="card-img-top" alt={room.name} />
                        <div className="card-body">
                            <h5 className="card-title">{room.name}</h5>
                            <p className="card-text">{room.description}</p>
                            <p className="card-text">${room.price}/night</p>
                            <Link to={`/rooms/${room.id}`} className="btn btn-primary">
                                View Details
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RoomList;
