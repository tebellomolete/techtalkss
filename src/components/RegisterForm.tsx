"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRegistration } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// 3.1 Zod Schema defined at the top
const formSchema = z.object({
  attendeeName: z.string().min(2, "Name must be at least 2 characters"),
  attendeeEmail: z.string().email("Invalid email address"),
  talkId: z.number(),
});

// Infer TypeScript type directly from the schema
type FormData = z.infer<typeof formSchema>;

export function RegisterForm({ talkId }: { talkId: number }) {
  const queryClient = useQueryClient();

  // Initialize React Hook Form with the Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attendeeName: "",
      attendeeEmail: "",
      talkId: talkId,
    },
  });

  // 3.2 useMutation setup for submitting the registration
  const mutation = useMutation({
    mutationFn: createRegistration,
    onSuccess: () => {
      // Invalidate the talks cache to update the registration count everywhere
      queryClient.invalidateQueries({ queryKey: ["talks"] });
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  // Render a success banner if the mutation completes successfully
  if (mutation.isSuccess) {
    return (
      <div className="bg-green-100 text-green-800 p-4 rounded-md border border-green-200 mt-6">
        <p className="font-semibold">Success!</p>
        <p>You are officially registered for this talk.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6 p-6 border rounded-lg bg-card">
      <h3 className="text-xl font-bold tracking-tight">Register for this Talk</h3>

      {/* Form-level error banner for API rejections (e.g. duplicate email) */}
      {mutation.isError && (
        <div className="bg-red-100 text-red-800 p-3 rounded border border-red-200 text-sm">
          {mutation.error instanceof Error ? mutation.error.message : "An error occurred."}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="attendeeName">Full Name</Label>
        <Input
          id="attendeeName"
          placeholder="e.g., Jane Doe"
          {...register("attendeeName")}
        />
        {/* Field-level error message */}
        {errors.attendeeName && (
          <p className="text-sm text-red-600 font-medium">{errors.attendeeName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="attendeeEmail">Email Address</Label>
        <Input
          id="attendeeEmail"
          type="email"
          placeholder="jane@example.com"
          {...register("attendeeEmail")}
        />
        {/* Field-level error message */}
        {errors.attendeeEmail && (
          <p className="text-sm text-red-600 font-medium">{errors.attendeeEmail.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || mutation.isPending}
      >
        {isSubmitting || mutation.isPending ? "Registering..." : "Complete Registration"}
      </Button>
    </form>
  );
}