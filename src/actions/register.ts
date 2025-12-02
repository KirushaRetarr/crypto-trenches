"use server";
import { IFormData } from "@/types/form-data";
import { prisma } from "@/lib/prisma";

export async function registerUser(formData: IFormData) {
  const { email, password, confirmPassword } = formData;
  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        password: password,
      },
    });
    console.log("user created", user);
  } catch (error) {
    console.error("that isn't correct request", error);
  }
}

