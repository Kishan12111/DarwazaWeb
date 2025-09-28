"use client";
import { api } from "../convex/_generated/api.js";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import React, { useEffect } from "react";

function Provider({ children }) {
  const { user } = useUser();
  const CreateUser = useMutation(api.user.CreateUser);

  useEffect(() => {
    if (user) CreateNewUser();
  }, [user]);

  const CreateNewUser = async () => {
    try {
      const result = await CreateUser({
        name: user.fullName ?? "",
        email: user.primaryEmailAddress?.emailAddress ?? "",
        ImageUrl: user.imageUrl ?? "",
        points: 0,
        rank: 0,
        weeklyPoints: 0,
        badges: [],
        streak: 0,
        level: 0,
        lastLogin: Date.now(),
      });
      console.log("User created:", result);
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  return <div>{children}</div>;
}

export default Provider;
