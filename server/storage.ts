import {
  users,
  hotels,
  hotelBookings,
  foodPlaces,
  facilities,
  lockerBookings,
  girivalamCheckpoints,
  templeInfo,
  emergencyContacts,
  sosAlerts,
  type User,
  type UpsertUser,
  type Hotel,
  type InsertHotel,
  type HotelBooking,
  type InsertHotelBooking,
  type FoodPlace,
  type InsertFoodPlace,
  type Facility,
  type InsertFacility,
  type LockerBooking,
  type InsertLockerBooking,
  type GirivalamCheckpoint,
  type InsertGirivalamCheckpoint,
  type TempleInfo,
  type InsertTempleInfo,
  type EmergencyContact,
  type InsertEmergencyContact,
  type SosAlert,
  type InsertSosAlert,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, gte, lte } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Hotels
  getHotels(): Promise<Hotel[]>;
  getHotel(id: number): Promise<Hotel | undefined>;
  createHotelBooking(booking: InsertHotelBooking): Promise<HotelBooking>;
  getUserHotelBookings(userId: string): Promise<HotelBooking[]>;

  // Food places
  getFoodPlaces(): Promise<FoodPlace[]>;
  getFoodPlacesByType(type: string): Promise<FoodPlace[]>;

  // Facilities
  getFacilities(): Promise<Facility[]>;
  getFacilitiesByType(type: string): Promise<Facility[]>;
  createLockerBooking(booking: InsertLockerBooking): Promise<LockerBooking>;
  getUserLockerBookings(userId: string): Promise<LockerBooking[]>;

  // Girivalam
  getGirivalamCheckpoints(): Promise<GirivalamCheckpoint[]>;

  // Temple info
  getLatestTempleInfo(): Promise<TempleInfo | undefined>;
  updateTempleInfo(info: InsertTempleInfo): Promise<TempleInfo>;

  // Emergency
  getEmergencyContacts(): Promise<EmergencyContact[]>;
  createSosAlert(alert: InsertSosAlert): Promise<SosAlert>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Hotels
  async getHotels(): Promise<Hotel[]> {
    return await db.select().from(hotels).where(eq(hotels.isAvailable, true));
  }

  async getHotel(id: number): Promise<Hotel | undefined> {
    const [hotel] = await db.select().from(hotels).where(eq(hotels.id, id));
    return hotel;
  }

  async createHotelBooking(booking: InsertHotelBooking): Promise<HotelBooking> {
    const [newBooking] = await db
      .insert(hotelBookings)
      .values(booking)
      .returning();
    return newBooking;
  }

  async getUserHotelBookings(userId: string): Promise<HotelBooking[]> {
    return await db
      .select()
      .from(hotelBookings)
      .where(eq(hotelBookings.userId, userId))
      .orderBy(desc(hotelBookings.createdAt));
  }

  // Food places
  async getFoodPlaces(): Promise<FoodPlace[]> {
    return await db.select().from(foodPlaces).where(eq(foodPlaces.isOpen, true));
  }

  async getFoodPlacesByType(type: string): Promise<FoodPlace[]> {
    return await db
      .select()
      .from(foodPlaces)
      .where(and(eq(foodPlaces.type, type), eq(foodPlaces.isOpen, true)));
  }

  // Facilities
  async getFacilities(): Promise<Facility[]> {
    return await db.select().from(facilities).where(eq(facilities.isAvailable, true));
  }

  async getFacilitiesByType(type: string): Promise<Facility[]> {
    return await db
      .select()
      .from(facilities)
      .where(and(eq(facilities.type, type), eq(facilities.isAvailable, true)));
  }

  async createLockerBooking(booking: InsertLockerBooking): Promise<LockerBooking> {
    const [newBooking] = await db
      .insert(lockerBookings)
      .values(booking)
      .returning();
    return newBooking;
  }

  async getUserLockerBookings(userId: string): Promise<LockerBooking[]> {
    return await db
      .select()
      .from(lockerBookings)
      .where(eq(lockerBookings.userId, userId))
      .orderBy(desc(lockerBookings.createdAt));
  }

  // Girivalam
  async getGirivalamCheckpoints(): Promise<GirivalamCheckpoint[]> {
    return await db
      .select()
      .from(girivalamCheckpoints)
      .orderBy(girivalamCheckpoints.orderIndex);
  }

  // Temple info
  async getLatestTempleInfo(): Promise<TempleInfo | undefined> {
    const [info] = await db
      .select()
      .from(templeInfo)
      .orderBy(desc(templeInfo.createdAt))
      .limit(1);
    return info;
  }

  async updateTempleInfo(info: InsertTempleInfo): Promise<TempleInfo> {
    const [newInfo] = await db.insert(templeInfo).values(info).returning();
    return newInfo;
  }

  // Emergency
  async getEmergencyContacts(): Promise<EmergencyContact[]> {
    return await db
      .select()
      .from(emergencyContacts)
      .where(eq(emergencyContacts.isActive, true));
  }

  async createSosAlert(alert: InsertSosAlert): Promise<SosAlert> {
    const [newAlert] = await db.insert(sosAlerts).values(alert).returning();
    return newAlert;
  }
}

export const storage = new DatabaseStorage();
