import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, Users, User, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useCreateReservation, reservationSchema, type ReservationInput } from "@/hooks/use-reservation";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const { toast } = useToast();
  const createReservation = useCreateReservation();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ReservationInput>({
    resolver: zodResolver(reservationSchema),
    defaultValues: { guests: 2 }
  });

  const onSubmit = (data: ReservationInput) => {
    createReservation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Reservation Confirmed!",
          description: `We'll see you on ${data.date} at ${data.time} for ${data.guests} guests.`,
        });
        reset();
        onClose();
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Oops!",
          description: error.message,
        });
      }
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
            >
              <div className="flex justify-between items-center p-6 border-b border-border/50 bg-background/50">
                <h2 className="font-display text-2xl font-bold text-primary">Reserve a Table</h2>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-primary" /> Name
                    </Label>
                    <Input id="name" placeholder="John Doe" {...register("name")} />
                    {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-primary" /> Phone Number
                    </Label>
                    <Input id="phone" type="tel" placeholder="+91 90000 00000" {...register("phone")} />
                    {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date" className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-primary" /> Date
                      </Label>
                      <Input id="date" type="date" {...register("date")} className="text-foreground [&::-webkit-calendar-picker-indicator]:filter-invert" />
                      {errors.date && <p className="text-destructive text-sm mt-1">{errors.date.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="time" className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-primary" /> Time
                      </Label>
                      <Input id="time" type="time" {...register("time")} className="text-foreground [&::-webkit-calendar-picker-indicator]:filter-invert" />
                      {errors.time && <p className="text-destructive text-sm mt-1">{errors.time.message}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="guests" className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-primary" /> Number of Guests
                    </Label>
                    <Input id="guests" type="number" min="1" max="20" {...register("guests")} />
                    {errors.guests && <p className="text-destructive text-sm mt-1">{errors.guests.message}</p>}
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg" 
                    disabled={createReservation.isPending}
                  >
                    {createReservation.isPending ? "Confirming..." : "Confirm Reservation"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
