import Link from "next/link";
import React from "react";
import ProfileMenu from "./ProfileMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";


export default function Navbar() {
  return (
    <header className="m-5 flex items-center">
      <Link
        href="/"
        className="md-flex md:inline items-center text-[48px] text-white font-medium hidden"
      >
        FinEase
      </Link>
      <nav className="hidden flex-col gap-6 text-lg text-white font-medium md:w-full md:flex md:flex-row md:justify-end md:items-end md:gap-8 md:text-[20px] lg:gap-6">
        <Link
          href="#"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>
        <Link
          href="/manage-finances"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Manage Finances
        </Link>
        <Link
          href="/expenses-tracking"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Expenses Tracking
        </Link>
        <Link
          href="/financial-forecasting"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Financial Forecasting
        </Link>
      </nav>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-[#098486]">
          <nav className="grid gap-6 text-lg text-white font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-[40px] font-semibold mb-10"
            >
              Finease
            </Link>
            <Link href="/" className="hover:text-foreground">
              Dashboard
            </Link>
            <Link
              href="/manage-finances"
              className="text-muted-foreground hover:text-foreground"
            >
              Manage Finances
            </Link>
            <Link
              href="/expenses-tracking"
              className="text-muted-foreground hover:text-foreground"
            >
              Expenses Tracking
            </Link>
            <Link
              href="/financial-forecasting"
              className="text-muted-foreground hover:text-foreground"
            >
              Financial Forecasting
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-[700px] md-w-[300px] flex justify-items-end items-end">
        <div className="w-full"></div>
        <ProfileMenu />
      </div>
    </header>
  );
}
