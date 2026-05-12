"use client";

import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ArrowUpRight } from "lucide-react";
import { cta } from "@/data/portfolio";

const NAV_ITEMS = [
  { label: "Pourquoi moi", action: () => document.querySelector("#pourquoi-moi")?.scrollIntoView({ behavior: "smooth" }) },
  { label: "Projets", action: () => document.querySelector("#projets")?.scrollIntoView({ behavior: "smooth" }) },
  { label: "Approche", action: () => document.querySelector("#approche")?.scrollIntoView({ behavior: "smooth" }) },
  { label: "Stack", action: () => document.querySelector("#stack")?.scrollIntoView({ behavior: "smooth" }) },
  { label: "Expérience", action: () => document.querySelector("#experience-ovh")?.scrollIntoView({ behavior: "smooth" }) },
  { label: "Contact", action: () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }) },
];

const EXTERNAL_ITEMS = [
  { label: "LinkedIn", href: cta.secondaryCtas.find((c) => c.label === "LinkedIn")?.href ?? "#" },
  { label: "GitHub", href: cta.secondaryCtas.find((c) => c.label === "GitHub")?.href ?? "#" },
  { label: "YouTube", href: cta.secondaryCtas.find((c) => c.label === "YouTube")?.href ?? "#" },
  { label: "Repo source", href: "https://github.com/" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Console signature
  useEffect(() => {
    console.log(
      "%c Benoît Baillon %c Si tu lis ça, on devrait se parler. → benoitbaillon78@gmail.com",
      "background: #0066FF; color: #fff; padding: 4px 8px; border-radius: 4px; font-weight: bold;",
      "color: #475569;"
    );
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Chercher une section, un projet..." />
      <CommandList>
        <CommandEmpty>Aucun résultat.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {NAV_ITEMS.map((item) => (
            <CommandItem
              key={item.label}
              onSelect={() => {
                item.action();
                setOpen(false);
              }}
            >
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Liens externes">
          {EXTERNAL_ITEMS.map((item) => (
            <CommandItem
              key={item.label}
              onSelect={() => {
                window.open(item.href, "_blank");
                setOpen(false);
              }}
            >
              <ArrowUpRight size={14} className="mr-2 text-text-tertiary" />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
