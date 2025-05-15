
import { 
  Folder, 
  FolderPlus, 
  Home, 
  Megaphone, 
  MessageSquare, 
  Mic, 
  Search 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const navItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Folder, label: "Projects", active: false },
    { icon: MessageSquare, label: "Prompts", active: false },
    { icon: Megaphone, label: "SEO Tools", active: false },
  ];

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-sidebar border-r border-border transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      <div className="flex flex-col h-full overflow-y-auto">
        <div className="flex items-center h-16 px-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-brand-600 text-white flex items-center justify-center font-bold">L</div>
            <span className="font-semibold text-lg">Lovable Studio</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-1 p-2">
          <Button variant="outline" className="w-full justify-start gap-2 mb-2 bg-background">
            <Search className="h-4 w-4" />
            Search
          </Button>
          
          <div className="space-y-1">
            {navItems.map((item, index) => (
              <Button
                key={index}
                variant={item.active ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  item.active && "bg-accent text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-1">
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-sm font-medium">Projects</span>
              <Button variant="ghost" size="icon" className="h-5 w-5">
                <FolderPlus className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="ghost" className="w-full justify-start pl-6 text-sm font-normal">
              Personal
            </Button>
            <Button variant="ghost" className="w-full justify-start pl-6 text-sm font-normal">
              Work
            </Button>
            <Button variant="ghost" className="w-full justify-start pl-6 text-sm font-normal">
              Client Projects
            </Button>
          </div>
        </div>
        
        <div className="mt-auto p-4 border-t border-border">
          <Button variant="outline" className="w-full gap-2">
            <Mic className="h-4 w-4" />
            Voice Input
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
