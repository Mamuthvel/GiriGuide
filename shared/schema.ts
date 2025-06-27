import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  decimal,
  boolean,
  time,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Hotels and Dharamshalas
export const hotels = pgTable("hotels", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  address: text("address").notNull(),
  distanceFromTemple: decimal("distance_from_temple", { precision: 5, scale: 2 }),
  pricePerNight: integer("price_per_night").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }),
  reviewCount: integer("review_count").default(0),
  imageUrl: varchar("image_url"),
  amenities: text("amenities").array(),
  isAvailable: boolean("is_available").default(true),
  contactNumber: varchar("contact_number"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Hotel bookings
export const hotelBookings = pgTable("hotel_bookings", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  hotelId: integer("hotel_id").notNull().references(() => hotels.id),
  checkInDate: timestamp("check_in_date").notNull(),
  checkOutDate: timestamp("check_out_date").notNull(),
  totalAmount: integer("total_amount").notNull(),
  status: varchar("status", { length: 50 }).default("confirmed"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Food places (Annadhanam and paid)
export const foodPlaces = pgTable("food_places", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  address: text("address").notNull(),
  type: varchar("type", { length: 50 }).notNull(), // 'annadhanam' or 'restaurant'
  isFree: boolean("is_free").default(false),
  priceRange: varchar("price_range", { length: 50 }),
  rating: decimal("rating", { precision: 2, scale: 1 }),
  cuisine: varchar("cuisine", { length: 100 }),
  openTime: time("open_time"),
  closeTime: time("close_time"),
  walkingDistance: integer("walking_distance"), // in minutes
  isOpen: boolean("is_open").default(true),
  contactNumber: varchar("contact_number"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Facilities (toilets, water points, lockers)
export const facilities = pgTable("facilities", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // 'toilet', 'water', 'locker'
  address: text("address").notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  isFree: boolean("is_free").default(true),
  price: integer("price"), // in rupees
  isAvailable: boolean("is_available").default(true),
  walkingDistance: integer("walking_distance"), // in minutes
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Locker bookings
export const lockerBookings = pgTable("locker_bookings", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  facilityId: integer("facility_id").notNull().references(() => facilities.id),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  amount: integer("amount").notNull(),
  status: varchar("status", { length: 50 }).default("active"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Girivalam checkpoints
export const girivalamCheckpoints = pgTable("girivalam_checkpoints", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  tamilName: varchar("tamil_name", { length: 255 }),
  description: text("description"),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  distanceFromStart: decimal("distance_from_start", { precision: 5, scale: 2 }),
  orderIndex: integer("order_index").notNull(),
  audioGuideUrl: varchar("audio_guide_url"),
  audioGuideTamilUrl: varchar("audio_guide_tamil_url"),
  significance: text("significance"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Temple info updates
export const templeInfo = pgTable("temple_info", {
  id: serial("id").primaryKey(),
  queueStatus: varchar("queue_status", { length: 100 }).notNull(),
  queueWaitTime: integer("queue_wait_time"), // in minutes
  nextPuja: varchar("next_puja", { length: 255 }),
  nextPujaTime: timestamp("next_puja_time"),
  bestVisitTime: varchar("best_visit_time", { length: 255 }),
  specialNotice: text("special_notice"),
  updatedBy: varchar("updated_by"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Emergency contacts
export const emergencyContacts = pgTable("emergency_contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  number: varchar("number", { length: 20 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // 'police', 'medical', 'temple'
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// SOS alerts log
export const sosAlerts = pgTable("sos_alerts", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  message: text("message"),
  status: varchar("status", { length: 50 }).default("active"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  hotelBookings: many(hotelBookings),
  lockerBookings: many(lockerBookings),
  sosAlerts: many(sosAlerts),
}));

export const hotelsRelations = relations(hotels, ({ many }) => ({
  bookings: many(hotelBookings),
}));

export const hotelBookingsRelations = relations(hotelBookings, ({ one }) => ({
  user: one(users, {
    fields: [hotelBookings.userId],
    references: [users.id],
  }),
  hotel: one(hotels, {
    fields: [hotelBookings.hotelId],
    references: [hotels.id],
  }),
}));

export const facilitiesRelations = relations(facilities, ({ many }) => ({
  lockerBookings: many(lockerBookings),
}));

export const lockerBookingsRelations = relations(lockerBookings, ({ one }) => ({
  user: one(users, {
    fields: [lockerBookings.userId],
    references: [users.id],
  }),
  facility: one(facilities, {
    fields: [lockerBookings.facilityId],
    references: [facilities.id],
  }),
}));

export const sosAlertsRelations = relations(sosAlerts, ({ one }) => ({
  user: one(users, {
    fields: [sosAlerts.userId],
    references: [users.id],
  }),
}));

// Type exports
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export type Hotel = typeof hotels.$inferSelect;
export type InsertHotel = typeof hotels.$inferInsert;
export const insertHotelSchema = createInsertSchema(hotels);

export type HotelBooking = typeof hotelBookings.$inferSelect;
export type InsertHotelBooking = typeof hotelBookings.$inferInsert;
export const insertHotelBookingSchema = createInsertSchema(hotelBookings);

export type FoodPlace = typeof foodPlaces.$inferSelect;
export type InsertFoodPlace = typeof foodPlaces.$inferInsert;
export const insertFoodPlaceSchema = createInsertSchema(foodPlaces);

export type Facility = typeof facilities.$inferSelect;
export type InsertFacility = typeof facilities.$inferInsert;
export const insertFacilitySchema = createInsertSchema(facilities);

export type LockerBooking = typeof lockerBookings.$inferSelect;
export type InsertLockerBooking = typeof lockerBookings.$inferInsert;
export const insertLockerBookingSchema = createInsertSchema(lockerBookings);

export type GirivalamCheckpoint = typeof girivalamCheckpoints.$inferSelect;
export type InsertGirivalamCheckpoint = typeof girivalamCheckpoints.$inferInsert;
export const insertGirivalamCheckpointSchema = createInsertSchema(girivalamCheckpoints);

export type TempleInfo = typeof templeInfo.$inferSelect;
export type InsertTempleInfo = typeof templeInfo.$inferInsert;
export const insertTempleInfoSchema = createInsertSchema(templeInfo);

export type EmergencyContact = typeof emergencyContacts.$inferSelect;
export type InsertEmergencyContact = typeof emergencyContacts.$inferInsert;
export const insertEmergencyContactSchema = createInsertSchema(emergencyContacts);

export type SosAlert = typeof sosAlerts.$inferSelect;
export type InsertSosAlert = typeof sosAlerts.$inferInsert;
export const insertSosAlertSchema = createInsertSchema(sosAlerts);
