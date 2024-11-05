"use client"

import * as React from "react"
import {
  Eye, LogOut,
  Settings,
} from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sidebar,
  SidebarContent,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {useEmployeStore} from "@/store";


const data = [
  {
    label: "View Profile Detail",
    icon: Eye,
    component: "Profile", // Composant à afficher
  },
  {
    label: "Settings",
    icon: Settings,
    component: "SettingsComponent", // Composant à afficher
  },
  {
    label: "Logout",
    icon: LogOut,
    action: () => {
      console.log("Logout clicked");
      // Ajoutez votre logique de déconnexion ici
    },
  },
]

export function NavActions() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = React.useState(false); // État pour gérer l'affichage du dialogue
  const setEmail = useEmployeStore(state => state.setEmail);
    const setFullname = useEmployeStore(state => state.setFullname);
    const setCode = useEmployeStore(state => state.setCode);


  React.useEffect(() => {
    setIsOpen(true)
  }, [])

  const handleLogout = () => {
    console.log("User logged out");
    setEmail("");
    setFullname("");
    setCode("");
    setShowLogoutDialog(false); // Fermez le dialogue après la déconnexion
  };

  return (
      <div className="flex items-center gap-2 text-sm">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent
              className="w-56 overflow-hidden rounded-lg p-0"
              align="end"
          >
            <Sidebar collapsible="none" className="bg-transparent">
              <SidebarContent>
                {data.map((element, index) => (
                    <SidebarMenuButton key={index}>
                      {element.label === "Logout" ? (
                          <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
                            <DialogTrigger>
                              <div className="flex items-center gap-2 p-3">
                                <element.icon className="w-4 h-4"/>
                                <span>{element.label}</span>
                              </div>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{element.label}</DialogTitle>
                                <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
                              </DialogHeader>
                              <DialogFooter>
                                <Button onClick={() => setShowLogoutDialog(false)}>Annuler</Button>
                                <Button onClick={handleLogout}>Confirmer</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                      ) : (
                          <div className="flex items-center gap-2 p-3" onClick={() => {/* Logique pour afficher le composant ou naviguer */}}>
                            <element.icon className="w-4 h-4"/> <span>{element.label}</span>
                          </div>
                      )}
                    </SidebarMenuButton>
                ))}
              </SidebarContent>
            </Sidebar>
          </PopoverContent>
        </Popover>
      </div>
  )
}
