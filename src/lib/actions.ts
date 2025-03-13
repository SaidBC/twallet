"use server";

import {
  AuthFormState,
  ClaimRewardFormState,
  IcreateUserApiResponse,
  IPaymentResponse,
  PaymentFormState,
} from "@/types";
import createUserSchema from "./schemas/createUserSchema";
import axios from "axios";
import { createSession, deleteSession } from "./sessions";
import { revalidatePath } from "next/cache";
import loginSchema from "./schemas/loginSchema";
import prisma from "./prisma";
import bcrypt from "bcryptjs";
import paymentSchema from "./schemas/paymentSchema";
import { cookies, headers } from "next/headers";
import { signIn, signOut } from "@/auth";
import { getToken } from "next-auth/jwt";

export async function signInWithCredentials(
  prevState: any,
  formData: FormData
): Promise<AuthFormState> {
  const validatedData = loginSchema.safeParse(Object.fromEntries(formData));
  if (!validatedData.success)
    return {
      isSuccess: false,
      isError: true,
      errors: validatedData.error.flatten().fieldErrors,
    };
  const user = await prisma.user.findFirst({
    where: {
      accountName: validatedData.data.accountName,
    },
  });
  if (!user)
    return {
      isSuccess: false,
      isError: true,
      errors: {
        credentials: ["Invalid credentials"],
      },
    };
  const isMatch = await bcrypt.compare(
    validatedData.data.password,
    user.password
  );
  if (!isMatch)
    return {
      isSuccess: false,
      isError: true,
      errors: {
        credentials: ["Invalid credentials"],
      },
    };
  await signIn("credentials", {
    ...Object.fromEntries(formData),
    redirect: false,
  });
  return {
    isSuccess: true,
    isError: false,
    errors: {},
  };
}

export async function signUpWithCredentials(
  prevState: any,
  formData: FormData
) {
  const validatedData = createUserSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!validatedData.success)
    return {
      isSuccess: false,
      isError: true,
      errors: validatedData.error,
    };
  try {
    const res = await axios.post<IcreateUserApiResponse>(
      "http://localhost:3000/api/users",
      validatedData.data
    );
    if (!res.data.success)
      return {
        isSuccess: false,
        isError: true,
        errors: res.data.error,
      };
    await signIn("credentials", {
      accountName: formData.get("accountName"),
      password: formData.get("password"),
      redirect: false,
    });
    return {
      isSuccess: true,
      isError: false,
      errors: {},
    };
  } catch (error) {
    console.error(error);
  }
}

export async function logout() {
  await signOut();
  revalidatePath("/");
}

export async function sendPayment(
  prevState: any,
  formData: FormData
): Promise<PaymentFormState> {
  const validatedData = paymentSchema.safeParse(Object.fromEntries(formData));
  if (!validatedData.success)
    return {
      isSuccess: false,
      isError: true,
      errors: validatedData.error.flatten().fieldErrors,
    };
  try {
    const token = await getToken({
      raw: true,
      req: {
        headers: await headers(),
      },
    });
    if (!token)
      return {
        isError: true,
        isSuccess: false,
        errors: {
          request: ["Token is no provided"],
        },
      };
    const payment = await axios.post<IPaymentResponse>(
      "http://localhost:3000/api/me/payment",
      Object.fromEntries(formData),
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (payment.data.errors)
      return {
        isError: true,
        isSuccess: false,
        errors: payment.data.errors,
      };
    return {
      isError: false,
      isSuccess: true,
      errors: {},
    };
  } catch (error) {
    console.error(error);
    return {
      isError: true,
      isSuccess: false,
      errors: {},
    };
  }
}

interface IClaimRewardsResponse {
  success: boolean;
  errors?: {
    request: string[];
  };
  data?: any;
}

export async function claimRewards(): Promise<ClaimRewardFormState> {
  const token = await getToken({
    raw: true,
    req: {
      headers: await headers(),
    },
  });
  if (!token)
    return {
      isError: true,
      isSuccess: false,
      errors: {
        request: ["Token is not provided"],
      },
    };
  const res = await axios.post<IClaimRewardsResponse>(
    "http://localhost:3000/api/me/rewards",
    {},
    {
      headers: {
        authorization: "Bearer " + token,
      },
    }
  );
  const data = res.data;
  if (!data.success && data.errors) {
    revalidatePath("/rewards");
    return {
      isError: true,
      isSuccess: false,
      errors: data.errors,
    };
  }
  return {
    isError: false,
    isSuccess: true,
    errors: {},
  };
}
