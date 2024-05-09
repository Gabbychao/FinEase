"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";

const Categories = z.enum(["Salary", "Freelance", "Investment", "Other"]);
const ModeOfPayment = z.enum([
  "Cash",
  "Credit Card",
  "Bank Transfer",
  "Online Payment Systems",
  "Other",
]);

const formSchema = z.object({
  expensesTitle: z.string().min(1),
  category: Categories,
  amount: z.number().nonnegative(),
  expenseDate: z.date(),
  modeOfPayment: ModeOfPayment,
  notes: z.string().min(1),
});

export default function AddExpenses() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expensesTitle: "",
      category: "Freelance",
      amount: 0,
      expenseDate: new Date(),
      modeOfPayment: "Cash",
      notes: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-[500px] flex flex-col gap-5 justify-center items-center"
      >
        <FormField
          control={form.control}
          name="expensesTitle"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-[16px] font-medium">
                  Input Expenses Title
                </FormLabel>
                <FormControl>
                  <Input {...field} className="w-[340px] md:w-[555px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="flex gap-1">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-[16px] font-medium">
                    Select Category
                  </FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-[170px] md:w-[245px] h-[60px] rounded-[5px] bg-white drop-shadow-xl">
                        <SelectValue placeholder="Select Income Source" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#119fa4] text-white font-medium w-[150px] md:w-[245px]">
                        <SelectGroup>
                          <SelectLabel>Income Sources</SelectLabel>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="blueberry">Blueberry</SelectItem>
                          <SelectItem value="grapes">Grapes</SelectItem>
                          <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-[16px] font-medium">
                    Input Amount
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="w-[170px] md:w-[245px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <div className="flex gap-1">
          <FormField
            control={form.control}
            name="expenseDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-medium">
                  Input Date
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[160px] md:w-[245px] h-[60px] pl-3 text-[20px] flex justify-center text-left font-medium bg-white text-black rounded-[5px] drop-shadow-xl border border-input",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white " align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="modeOfPayment"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-[16px] font-medium">
                    Select Mode of Payment
                  </FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-[160px] md:w-[245px] h-[60px] rounded-[5px] bg-white drop-shadow-xl">
                        <SelectValue placeholder="Select Income Source" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#119fa4] text-white font-medium ">
                        <SelectGroup>
                          <SelectLabel>Income Sources</SelectLabel>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="blueberry">Blueberry</SelectItem>
                          <SelectItem value="grapes">Grapes</SelectItem>
                          <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <FormField
          control={form.control}
          name=""
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-[16px] font-medium">
                  Attach Receipt
                </FormLabel>
                <FormControl>
                  <Input type="file" {...field} className="bg-white w-[340px] md:w-[555px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-[16px] font-medium">
                  Input Notes
                </FormLabel>
                <FormControl>
                  <Textarea {...field} className="w-[340px] md:w-[555px]"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="flex gap-2 justify-center">
          <Button type="submit">Submit</Button>
          <Button asChild variant="outline">
            <Link href="/">Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}