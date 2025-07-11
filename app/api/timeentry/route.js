import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(request) {
  // 1. Session check (nur eingeloggte User dürfen stempeln)
  const session = await getServerSession(authOptions);
  console.log("SESSION:", session);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // 2. Payload auslesen (kommt vom Formular)
  const body = await request.json();
  const { workLocation, startTime } = body;

  if (!workLocation || !startTime) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // 3. Speichern in DB
  try {
    const newEntry = await prisma.timeEntry.create({
      data: {
        user: { connect: { id: session.user.id}},
        startTime: new Date(startTime),
        location: workLocation,
      },
    });
    return NextResponse.json({ success: true, entry: newEntry });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
