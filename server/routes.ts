import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import {
  insertHotelBookingSchema,
  insertLockerBookingSchema,
  insertSosAlertSchema,
  insertTempleInfoSchema,
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Hotels routes
  app.get('/api/hotels', async (req, res) => {
    try {
      const hotels = await storage.getHotels();
      res.json(hotels);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      res.status(500).json({ message: "Failed to fetch hotels" });
    }
  });

  app.post('/api/hotels/:id/book', isAuthenticated, async (req: any, res) => {
    try {
      const hotelId = parseInt(req.params.id);
      const userId = req.user.claims.sub;
      
      const bookingData = insertHotelBookingSchema.parse({
        ...req.body,
        userId,
        hotelId,
      });

      const booking = await storage.createHotelBooking(bookingData);
      res.json(booking);
    } catch (error) {
      console.error("Error creating hotel booking:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create booking" });
      }
    }
  });

  app.get('/api/bookings/hotels', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const bookings = await storage.getUserHotelBookings(userId);
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching hotel bookings:", error);
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  // Food places routes
  app.get('/api/food-places', async (req, res) => {
    try {
      const type = req.query.type as string;
      let foodPlaces;
      
      if (type) {
        foodPlaces = await storage.getFoodPlacesByType(type);
      } else {
        foodPlaces = await storage.getFoodPlaces();
      }
      
      res.json(foodPlaces);
    } catch (error) {
      console.error("Error fetching food places:", error);
      res.status(500).json({ message: "Failed to fetch food places" });
    }
  });

  // Facilities routes
  app.get('/api/facilities', async (req, res) => {
    try {
      const type = req.query.type as string;
      let facilities;
      
      if (type) {
        facilities = await storage.getFacilitiesByType(type);
      } else {
        facilities = await storage.getFacilities();
      }
      
      res.json(facilities);
    } catch (error) {
      console.error("Error fetching facilities:", error);
      res.status(500).json({ message: "Failed to fetch facilities" });
    }
  });

  app.post('/api/lockers/:id/book', isAuthenticated, async (req: any, res) => {
    try {
      const facilityId = parseInt(req.params.id);
      const userId = req.user.claims.sub;
      
      const bookingData = insertLockerBookingSchema.parse({
        ...req.body,
        userId,
        facilityId,
      });

      const booking = await storage.createLockerBooking(bookingData);
      res.json(booking);
    } catch (error) {
      console.error("Error creating locker booking:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create booking" });
      }
    }
  });

  app.get('/api/bookings/lockers', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const bookings = await storage.getUserLockerBookings(userId);
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching locker bookings:", error);
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  // Girivalam routes
  app.get('/api/girivalam/checkpoints', async (req, res) => {
    try {
      const checkpoints = await storage.getGirivalamCheckpoints();
      res.json(checkpoints);
    } catch (error) {
      console.error("Error fetching checkpoints:", error);
      res.status(500).json({ message: "Failed to fetch checkpoints" });
    }
  });

  // Temple info routes
  app.get('/api/temple-info', async (req, res) => {
    try {
      const info = await storage.getLatestTempleInfo();
      res.json(info);
    } catch (error) {
      console.error("Error fetching temple info:", error);
      res.status(500).json({ message: "Failed to fetch temple info" });
    }
  });

  app.post('/api/temple-info', isAuthenticated, async (req: any, res) => {
    try {
      const infoData = insertTempleInfoSchema.parse({
        ...req.body,
        updatedBy: req.user.claims.sub,
      });

      const info = await storage.updateTempleInfo(infoData);
      res.json(info);
    } catch (error) {
      console.error("Error updating temple info:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid temple info data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update temple info" });
      }
    }
  });

  // Emergency routes
  app.get('/api/emergency-contacts', async (req, res) => {
    try {
      const contacts = await storage.getEmergencyContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching emergency contacts:", error);
      res.status(500).json({ message: "Failed to fetch emergency contacts" });
    }
  });

  app.post('/api/sos', isAuthenticated, async (req: any, res) => {
    try {
      const alertData = insertSosAlertSchema.parse({
        ...req.body,
        userId: req.user.claims.sub,
      });

      const alert = await storage.createSosAlert(alertData);
      res.json(alert);
    } catch (error) {
      console.error("Error creating SOS alert:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid SOS data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create SOS alert" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
