import {
  Bars,
  Bell,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

const SideBar = () => {
  const navItems = [
    { icon: House, label: "Home", href: "/dashboard" },
    { icon: Magnifier, label: "Search", href: "/dashboard/search" },
    { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
    { icon: Envelope, label: "Add Job", href: "/dashboard/recruiter/jobs/new" },
    { icon: Person, label: "Profile", href: "/dashboard/profile" },
    { icon: Gear, label: "Settings", href: "/" },
  ];

  const navList = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          type="button"
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div>
      <aside className="hidden w-60 shrink-0  border-r border-default p-4 md:block">
        {navList}
      </aside>
      <div className="md:hidden">
        <Drawer>
          <Button variant="secondary">
            <Bars />
            Menu
          </Button>
          <Drawer.Backdrop>
            <Drawer.Content placement="left">
              <Drawer.Dialog>
                <Drawer.CloseTrigger />
                <Drawer.Header>
                  <Drawer.Heading>Navigation</Drawer.Heading>
                </Drawer.Header>
                <Drawer.Body>{navList}</Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </div>
  );
};

export default SideBar;
