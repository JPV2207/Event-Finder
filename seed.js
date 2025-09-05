// seed.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import Location from "./models/location.js";

dotenv.config();

const seedData = [
  {
    name: "Mumbai Music Night",
    description: "Live indie music",
    category: "music",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    location: {
      type: "Point",
      coordinates: [72.8777, 19.076],
      address: "Bandra, Mumbai",
    },
  },
  {
    name: "Delhi Food Festival",
    description: "Street food heaven",
    category: "food",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
    location: {
      type: "Point",
      coordinates: [77.1025, 28.7041],
      address: "Connaught Place, Delhi",
    },
  },
  {
    name: "Bengaluru Tech Meetup",
    description: "JS + Node best practices",
    category: "tech",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    location: {
      type: "Point",
      coordinates: [77.5946, 12.9716],
      address: "Koramangala, Bengaluru",
    },
  },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,
      minPoolSize: 1,
      dbName: "event-finder",
    });
    console.log("Connected. Dropping old locations…");
    await Location.deleteMany({});
    const inserted = await Location.insertMany(seedData);
    console.log(
      "Inserted:",
      inserted.map((e) => e.name)
    );
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
})();
