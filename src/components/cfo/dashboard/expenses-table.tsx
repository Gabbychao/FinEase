"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Activity } from "lucide-react";
import { getAllExpenses } from "@/actions/cfo/expenses.action";
import { getAllCategory } from "@/actions/cfo/category.action"; 
import { getUserData } from "@/actions/auth/user.action";
import { useToast } from "@/components/ui/use-toast";
import { formatNumber } from "@/lib/utils";

export default function ExpensesTable() {
  const { toast } = useToast();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const user = await getUserData();
      const [expenses, categories] = await Promise.all([
        getAllExpenses(user.id),
        getAllCategory(user.id),
      ]);
      const categoryMap = categories.reduce((acc, category) => {
        acc[category.id] = category.categoryName;
        return acc;
      }, {});
      const updatedExpenses = expenses.map((expense) => ({
        ...expense,
        categoryName: categoryMap[expense.categoryId] || "Unknown Category",
      }));
      setData(updatedExpenses);
    } catch (error) {
      console.error("Failed to fetch expenses", error);
      toast({
        title: "Error",
        description: "Failed to fetch items. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Card x-chunk="dashboard-01-chunk-5">
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {loading ? (
          <div>Loading...</div>
        ) : (
          data.map((expense) => (
            <div key={expense.id} className="flex items-center gap-4">
              <Avatar className="h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>
                  {expense.categoryName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {expense.categoryName}
                </p>
              </div>
              <div className="ml-auto font-medium">
                - ₱{formatNumber(parseFloat(expense.amount).toFixed(2))}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
