
import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  return (
    <header className="w-full border-b">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded bg-brand-600 text-white flex items-center justify-center font-bold mr-2">L</div>
              <span className="font-semibold text-xl">Lovable Studio</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
