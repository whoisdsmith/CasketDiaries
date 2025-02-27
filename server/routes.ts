import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriberSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for subscribing to the newsletter
  app.post("/api/subscribe", async (req: Request, res: Response) => {
    try {
      // Validate the request body using the schema
      const parsedBody = insertSubscriberSchema.parse(req.body);
      
      // Check if the email already exists
      const existingSubscriber = await storage.getSubscriberByEmail(parsedBody.email);
      if (existingSubscriber) {
        return res.status(409).json({ 
          message: "Email already subscribed" 
        });
      }
      
      // Create a new subscriber
      const subscriber = await storage.createSubscriber(parsedBody);
      
      return res.status(201).json({
        message: "Subscription successful",
        subscriber
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: validationError.message 
        });
      }
      
      console.error("Error in /api/subscribe:", error);
      return res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  // API route for getting all subscribers (for admin purposes)
  app.get("/api/subscribers", async (req: Request, res: Response) => {
    try {
      const subscribers = await storage.getAllSubscribers();
      return res.status(200).json(subscribers);
    } catch (error) {
      console.error("Error in /api/subscribers:", error);
      return res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (_req: Request, res: Response) => {
    return res.status(200).json({ status: "ok" });
  });

  // Handle client-side routing - this must be AFTER API routes
  // but BEFORE the static file serving in vite.ts
  app.get(["/about", "/greg-reeves", "/sadie-gray"], (_req: Request, res: Response) => {
    res.sendFile("index.html", { root: "./client/dist" });
  });

  const httpServer = createServer(app);
  return httpServer;
}
