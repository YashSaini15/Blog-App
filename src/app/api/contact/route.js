import { NextResponse } from "next/server";
import prisma from "../../../utils/connect";
import { getAuthSession } from "../../../utils/auth";

// CREATE A POST
export const POST = async (req) => {
  console.log("API Contact Handler Triggered");
  const session = await getAuthSession();
  console.log(session, "+++++");

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated" }, { status: 401 })
    );
  }
  try {
    const body = await req.json();
    console.log("request body: " + body);

    const newContact = await prisma.contact.create({
      data: { ...body },
    });
    console.log("Contact submitted:", newContact);
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
