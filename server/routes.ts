import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriberSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

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

  // API route for fetching chapter content by character and chapter ID
  app.get("/api/chapters/:character/:chapterId", (req: Request, res: Response) => {
    try {
      const { character, chapterId } = req.params;
      let characterFolder = '';
      
      // Determine the correct folder based on character parameter
      if (character === 'greg') {
        characterFolder = 'The Chapters of Greg';
      } else if (character === 'sadie') {
        characterFolder = 'The Chapters of Sadie';
      } else {
        return res.status(404).json({ message: "Character not found" });
      }
      
      // Map chapter ID to markdown file names
      const chaptersMap: Record<string, string> = {
        // Greg's chapters
        'cemetery-souls': 'Cemetery Souls.md',
        'cemetery-weather': 'Cemetery Weather.md',
        'gray-yellowcard-shirt': 'Gray Yellowcard Shirt.md',
        'embers-of-us': 'Embers of Us.md',
        'side-by-side': 'Side By Side, Hand In Hand.md',
        'a-love-that-burns': 'A Love That Burns Forever.md',
        'until-the-last-light': 'Until The Last Light Fades.md',
        '816': '816.md',
        
        // Sadie's chapters - add these as needed
        'ghost-in-the-sun': 'Ghost in the Sun.md',
        'graveyard-anthem': 'Graveyard Anthem.md',
        'fading-blue-paint': 'Fading Blue Paint.md',
        'beneath-a-broken-roof': 'Beneath a Broken Roof.md',
        'empty-womb-empty-tomb': 'Empty Womb, Empty Tomb.md',
        'rearview-reflections': 'Rearview Reflections.md',
        'the-aftermath': 'The Aftermath.md',
        'the-empty-space': 'The Empty Space Between You and Me.md'
      };
      
      // Get the corresponding markdown file name
      const markdownFileName = chaptersMap[chapterId];
      if (!markdownFileName) {
        return res.status(404).json({ message: "Chapter not found" });
      }
      
      // Construct the file path
      const filePath = path.join('attached_assets', characterFolder, markdownFileName);
      
      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Chapter file not found" });
      }
      
      // Read the markdown file
      const markdownContent = fs.readFileSync(filePath, 'utf-8');
      
      // Convert markdown to HTML
      const htmlContent = marked(markdownContent);
      
      return res.status(200).json({
        html: htmlContent,
        markdown: markdownContent,
        title: markdownFileName.replace('.md', '')
      });
    } catch (error) {
      console.error("Error in /api/chapters:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Health check endpoint
  app.get("/api/health", (_req: Request, res: Response) => {
    return res.status(200).json({ status: "ok" });
  });

  // In development, the Vite middleware handles client routing
  // This is here for production builds
  if (process.env.NODE_ENV === 'production') {
    app.get(["/about", "/greg-reeves", "/sadie-gray"], (_req: Request, res: Response) => {
      res.sendFile("index.html", { root: "./client/dist" });
    });
  }

  const httpServer = createServer(app);
  return httpServer;
}
