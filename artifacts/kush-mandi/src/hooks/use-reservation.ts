import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

// Validates the reservation form
export const reservationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  guests: z.coerce.number().min(1, "At least 1 guest").max(20, "Please call us for large parties"),
});

export type ReservationInput = z.infer<typeof reservationSchema>;

// Mock hook to handle the submission without a real backend
export function useCreateReservation() {
  return useMutation({
    mutationFn: async (data: ReservationInput) => {
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulate a random failure just to show we handle it, but mostly succeed
      if (Math.random() < 0.05) {
        throw new Error("Failed to connect to the reservation system. Please try again.");
      }
      
      return { success: true, data };
    },
  });
}
