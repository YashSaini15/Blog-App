import { NextResponse } from "next/server";
import prisma from "../../../utils/connect";
import { getAuthSession } from "../../../utils/auth";

// CREATE A POST
export const POST = async (req) => {
  const session = await getAuthSession();
 
  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated" }, { status: 401 })
    );
  }
  try {
    const body = await req.json();
    const newContact = await prisma.contact.create({
      data: { ...body },
    });
    return new NextResponse(JSON.stringify(newContact), { status: 200 });
  } catch (error) {
    console.log(error.message, "error");

    return new NextResponse(
      JSON.stringify(
        { message: "Something went wrong", error: error.message },
        { status: 500 }
      )
    );
  }
};
