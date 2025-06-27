import { db } from "./db";
import { 
  hotels, 
  foodPlaces, 
  facilities, 
  girivalamCheckpoints, 
  templeInfo, 
  emergencyContacts 
} from "@shared/schema";

export async function seedDatabase() {
  try {
    // Seed hotels with correct schema
    await db.insert(hotels).values([
      {
        name: "Sri Ramanashramam Guest House",
        description: "Peaceful ashram accommodation near the holy mountain",
        address: "Tiruvannamalai, Tamil Nadu 606601",
        pricePerNight: 800,
        rating: "4.5",
        amenities: ["Free WiFi", "Meditation Hall", "Vegetarian Meals", "Garden"],
        distanceFromTemple: "0.5",
        contactNumber: "+91 4175 237292"
      },
      {
        name: "Hotel Arunachala",
        description: "Comfortable hotel with modern amenities and temple views",
        address: "Car Street, Tiruvannamalai 606601",
        pricePerNight: 2500,
        rating: "4.2",
        amenities: ["AC Rooms", "Restaurant", "Parking", "Room Service"],
        distanceFromTemple: "1.2",
        contactNumber: "+91 4175 223456"
      },
      {
        name: "Free Dharamshala",
        description: "Traditional free accommodation for pilgrims",
        address: "Temple Street, Tiruvannamalai 606601",
        pricePerNight: 0,
        rating: "3.8",
        amenities: ["Basic Rooms", "Shared Bathroom", "Free Meals"],
        distanceFromTemple: "0.8",
        contactNumber: "+91 4175 234567"
      }
    ]).onConflictDoNothing();

    // Seed food places
    await db.insert(foodPlaces).values([
      {
        name: "Annadhanam - Free Meals",
        description: "Free traditional South Indian meals for pilgrims",
        foodType: "annadhanam",
        rating: 4.8,
        imageUrl: "/images/annadhanam1.jpg",
        priceRange: "free",
        latitude: 12.2258,
        longitude: 79.0745,
        address: "Arunachaleswarar Temple Complex",
        timings: "11:00 AM - 2:00 PM, 7:00 PM - 9:00 PM",
        contactPhone: "+91 4175 222333"
      },
      {
        name: "Sri Seshadri Ashram Annadhanam",
        description: "Blessed food served with devotion and love",
        foodType: "annadhanam",
        rating: 4.7,
        imageUrl: "/images/annadhanam2.jpg",
        priceRange: "free",
        latitude: 12.2270,
        longitude: 79.0742,
        address: "Seshadri Ashram Road",
        timings: "12:00 PM - 2:00 PM, 7:30 PM - 9:00 PM",
        contactPhone: "+91 4175 233444"
      },
      {
        name: "Saravana Bhavan",
        description: "Authentic South Indian vegetarian restaurant",
        foodType: "restaurant",
        rating: 4.3,
        imageUrl: "/images/restaurant1.jpg",
        priceRange: "budget",
        latitude: 12.2275,
        longitude: 79.0748,
        address: "Car Street, Near Temple",
        timings: "6:00 AM - 10:00 PM",
        contactPhone: "+91 4175 234555"
      },
      {
        name: "Ramana Cafe",
        description: "Simple vegetarian meals and snacks",
        foodType: "cafe",
        rating: 4.1,
        imageUrl: "/images/cafe1.jpg",
        priceRange: "budget",
        latitude: 12.2252,
        longitude: 79.0749,
        address: "Ramana Nagar",
        timings: "7:00 AM - 9:00 PM",
        contactPhone: "+91 4175 245666"
      }
    ]).onConflictDoNothing();

    // Seed facilities
    await db.insert(facilities).values([
      {
        name: "Temple Complex Restrooms",
        type: "toilet",
        description: "Clean public restrooms near the main temple",
        latitude: 12.2260,
        longitude: 79.0746,
        address: "Arunachaleswarar Temple",
        timings: "5:00 AM - 10:00 PM",
        isAccessible: true
      },
      {
        name: "Girivalam Path Water Point 1",
        type: "water",
        description: "Free drinking water station on the circumambulation path",
        latitude: 12.2300,
        longitude: 79.0800,
        address: "Girivalam Path - East Gate",
        timings: "24 hours",
        isAccessible: true
      },
      {
        name: "Secure Locker Service",
        type: "locker",
        description: "Safe storage for belongings during Girivalam",
        latitude: 12.2255,
        longitude: 79.0750,
        address: "Near Temple Entrance",
        timings: "5:00 AM - 11:00 PM",
        isAccessible: true,
        pricePerHour: 20
      },
      {
        name: "Rest Shelter - North Gate",
        type: "shelter",
        description: "Covered rest area with seating for pilgrims",
        latitude: 12.2400,
        longitude: 79.0750,
        address: "Girivalam Path - North Gate",
        timings: "24 hours",
        isAccessible: true
      }
    ]).onConflictDoNothing();

    // Seed Girivalam checkpoints
    await db.insert(girivalamCheckpoints).values([
      {
        name: "Indra Lingam",
        description: "First temple on the Girivalam path - East direction",
        latitude: 12.2300,
        longitude: 79.0800,
        checkpointNumber: 1,
        direction: "East",
        significance: "Represents the element of Air and Lord Indra",
        audioGuideUrl: "/audio/checkpoint1_tamil.mp3",
        audioGuideUrlEn: "/audio/checkpoint1_english.mp3"
      },
      {
        name: "Agni Lingam",
        description: "Sacred fire temple - Southeast direction",
        latitude: 12.2200,
        longitude: 79.0850,
        checkpointNumber: 2,
        direction: "Southeast",
        significance: "Represents the element of Fire and Lord Agni",
        audioGuideUrl: "/audio/checkpoint2_tamil.mp3",
        audioGuideUrlEn: "/audio/checkpoint2_english.mp3"
      },
      {
        name: "Yama Lingam",
        description: "Temple of the Lord of Death - South direction",
        latitude: 12.2150,
        longitude: 79.0750,
        checkpointNumber: 3,
        direction: "South",
        significance: "Represents transformation and Lord Yama",
        audioGuideUrl: "/audio/checkpoint3_tamil.mp3",
        audioGuideUrlEn: "/audio/checkpoint3_english.mp3"
      },
      {
        name: "Niruthi Lingam",
        description: "Southwest temple for protection",
        latitude: 12.2200,
        longitude: 79.0650,
        checkpointNumber: 4,
        direction: "Southwest",
        significance: "Represents protection and Lord Niruthi",
        audioGuideUrl: "/audio/checkpoint4_tamil.mp3",
        audioGuideUrlEn: "/audio/checkpoint4_english.mp3"
      },
      {
        name: "Varuna Lingam",
        description: "Water element temple - West direction",
        latitude: 12.2250,
        longitude: 79.0600,
        checkpointNumber: 5,
        direction: "West",
        significance: "Represents the element of Water and Lord Varuna",
        audioGuideUrl: "/audio/checkpoint5_tamil.mp3",
        audioGuideUrlEn: "/audio/checkpoint5_english.mp3"
      },
      {
        name: "Vayu Lingam",
        description: "Wind element temple - Northwest direction",
        latitude: 12.2350,
        longitude: 79.0650,
        checkpointNumber: 6,
        direction: "Northwest",
        significance: "Represents the element of Wind and Lord Vayu",
        audioGuideUrl: "/audio/checkpoint6_tamil.mp3",
        audioGuideUrlEn: "/audio/checkpoint6_english.mp3"
      },
      {
        name: "Kubera Lingam",
        description: "Wealth and prosperity temple - North direction",
        latitude: 12.2400,
        longitude: 79.0750,
        checkpointNumber: 7,
        direction: "North",
        significance: "Represents wealth and Lord Kubera",
        audioGuideUrl: "/audio/checkpoint7_tamil.mp3",
        audioGuideUrlEn: "/audio/checkpoint7_english.mp3"
      },
      {
        name: "Isanya Lingam",
        description: "Final temple completing the sacred circle",
        latitude: 12.2350,
        longitude: 79.0800,
        checkpointNumber: 8,
        direction: "Northeast",
        significance: "Represents completion and Lord Isanya",
        audioGuideUrl: "/audio/checkpoint8_tamil.mp3",
        audioGuideUrlEn: "/audio/checkpoint8_english.mp3"
      }
    ]).onConflictDoNothing();

    // Seed temple info
    await db.insert(templeInfo).values([
      {
        title: "Today's Temple Timings",
        content: "Morning: 5:30 AM - 12:30 PM\nEvening: 3:30 PM - 9:30 PM\n\nSpecial Puja: 6:00 AM, 12:00 PM, 6:00 PM, 8:00 PM",
        type: "timing",
        isActive: true
      },
      {
        title: "Full Moon Girivalam",
        content: "Next Pournami (Full Moon) Girivalam: January 13, 2025\n\nExpected crowd: Very High\nBest time to start: 10:00 PM - 4:00 AM\n\nFree transport and water will be provided by the temple administration.",
        type: "event",
        isActive: true
      },
      {
        title: "Weather Update",
        content: "Today: Partly cloudy, 28°C\nEvening: Clear skies, 22°C\n\nIdeal weather for Girivalam walking. Carry water and wear comfortable footwear.",
        type: "weather",
        isActive: true
      }
    ]).onConflictDoNothing();

    // Seed emergency contacts
    await db.insert(emergencyContacts).values([
      {
        name: "Police Station",
        phoneNumber: "100",
        type: "police",
        address: "Tiruvannamalai Police Station, Car Street",
        isActive: true
      },
      {
        name: "Government Hospital",
        phoneNumber: "+91 4175 222108",
        type: "medical",
        address: "Government Hospital, Tiruvannamalai",
        isActive: true
      },
      {
        name: "Fire Station",
        phoneNumber: "101",
        type: "fire",
        address: "Fire Station, Polur Road",
        isActive: true
      },
      {
        name: "Temple Security",
        phoneNumber: "+91 4175 222456",
        type: "temple",
        address: "Arunachaleswarar Temple Office",
        isActive: true
      },
      {
        name: "Tourist Helpline",
        phoneNumber: "+91 4175 233789",
        type: "tourist",
        address: "Tourist Information Center",
        isActive: true
      }
    ]).onConflictDoNothing();

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}