import express, { Request, Response } from "express";

// register
export const register = (req: Request, res: Response) => {
  res.json({
    message: "Registeration successful",
  });
};

// login
export const login = (req: Request, res: Response) => {
  const id = req.params.id;
  res.json({
    message: `Login successful`,
  });
};

// activate account -> mail
