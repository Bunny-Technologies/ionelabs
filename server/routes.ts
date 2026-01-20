import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertNewsletterSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json({ success: true, message: "Thank you for your message. We'll get back to you within 24 hours.", data: contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: error.errors[0].message });
      } else {
        res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
      }
    }
  });

  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      
      const existing = await storage.getNewsletterByEmail(validatedData.email);
      if (existing) {
        res.status(200).json({ success: true, message: "You're already subscribed to our newsletter!" });
        return;
      }
      
      const newsletter = await storage.createNewsletter(validatedData);
      res.status(201).json({ success: true, message: "Thanks for subscribing! You'll receive our latest updates.", data: newsletter });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: error.errors[0].message });
      } else {
        res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
      }
    }
  });

  return httpServer;
}
