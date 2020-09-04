import { Express, Request, Response } from "express";
import express from 'express';
import path from 'path';

export class Server {

  private app: Express;

  constructor(app: Express) {


    this.app = app;

    this.app.use(express.static(path.resolve("./") + "/public"));

    this.app.get("*", (req: Request, res: Response): void => {
      res.sendFile(path.resolve("./") + "/public/index.html");
    });

    this.app.get("/api", (req: Request, res: Response): void => {
      res.send("You have reached the API!");
    });



  }
  public start(port: number): void {
    this.app.listen(port, () => console.log(`Server listening on port ${port}!`));
  }

}
