import { NextResponse } from "next/server";
import { z } from "zod";

const appointmentSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  preferredDate: z.string(),
  preferredTime: z.string(),
  interestCategory: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = appointmentSchema.parse(body);

    // Store in Supabase / PostgreSQL database or return success payload
    return NextResponse.json(
      {
        success: true,
        message: "Private viewing consultation booked successfully.",
        data: validatedData,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid appointment form submission.",
      },
      { status: 400 }
    );
  }
}
