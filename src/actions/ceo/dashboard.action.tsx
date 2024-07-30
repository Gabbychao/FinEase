"use server";
import { useFetch } from "@/lib/fetch";

export async function getAllPaymentRecords() {
  const response = await useFetch(`${process.env.SERVER_API}/payment`, {
    method: "GET",
  });
  if (response.status === 500) {
    return {
      error: "Something went wrong",
    };
  }
  const payments = await response.json();
  return payments;
}

export async function getAllExpenses() {
  const response = await useFetch(`${process.env.SERVER_API}/expenses`, {
    method: "GET",
  });

  if (response.status === 500) {
    return {
      error: "Something went wrong",
    };
  }
  const expenses = await response.json();
  return expenses;
}

export async function getAllCustomers() {
  const response = await useFetch(`${process.env.SERVER_API}/customer`, {
    method: "GET",
  });

  if (response.status === 500) {
    return {
      error: "Something went wrong",
    };
  }
  const customers = await response.json();
  return customers;
}

export async function getAllitems() {
  const response = await useFetch(`${process.env.SERVER_API}/item`, {
    method: "GET",
  });

  if (response.status === 500) {
    return {
      error: "Something went wrong",
    };
  }
  const items = await response.json();
  return items;
}
