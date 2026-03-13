"use client";

import React from "react";
import {
  Boxes,
  CloudCog,
  LayoutGrid,
  Rocket,
  Server,
  Bot,
  type LucideIcon,
} from "lucide-react";
import { useLocale } from "next-intl";
import type {
  ServiceCard,
  ServiceIconKey,
  LocalizedField,
} from "@/data/services";

const iconMap: Record<ServiceIconKey, LucideIcon> = {
  rocket: Rocket,
  server: Server,
  layout: LayoutGrid,
  blocks: Boxes,
  cloud: CloudCog,
  sparkles: Bot,
};

export function ServiceHoverList({
  items,
  className = "",
}: {
  items: ServiceCard[];
  className?: string;
}) {
  const locale = useLocale() as keyof LocalizedField;

  return (
    <div className={`grid gap-8 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {items.map((item) => {
        const Icon = iconMap[item.icon];

        return (
          <article
            key={item.id}
            tabIndex={0}
            className={[
              "group relative rounded-2xl border border-gray-100 bg-white/45 backdrop-blur-sm shadow-sm",
              "transition-[border-color,background-color,box-shadow] duration-300 ease-out",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700",
              "[@media(hover:hover)]:hover:border-[#0B0F14] [@media(hover:hover)]:hover:bg-white/70 [@media(hover:hover)]:hover:shadow-lg",
              "[@media(hover:hover)]:focus-within:border-[#0B0F14] [@media(hover:hover)]:focus-within:bg-white/70 [@media(hover:hover)]:focus-within:shadow-lg",
            ].join(" ")}
          >
            <div className="pointer-events-none absolute left-5 top-5 h-5 w-5 opacity-0 transition-opacity duration-200 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:opacity-100">
              <span className="absolute left-0 top-0 h-full w-[2px] bg-[#0B0F14]/60" />
              <span className="absolute left-0 top-0 h-[2px] w-full bg-[#0B0F14]/60" />
            </div>

            <div className="pointer-events-none absolute bottom-5 right-5 h-5 w-5 opacity-0 transition-opacity duration-200 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:opacity-100">
              <span className="absolute bottom-0 right-0 h-full w-[2px] bg-[#0B0F14]/60" />
              <span className="absolute bottom-0 right-0 h-[2px] w-full bg-[#0B0F14]/60" />
            </div>

            <div className="p-8 text-center">
              <Icon className="mx-auto mb-4 h-7 w-7 text-neutral-500 transition-colors duration-200 [@media(hover:hover)]:group-hover:text-neutral-700 [@media(hover:hover)]:group-focus-within:text-neutral-700" />

              <h3 className="font-sans text-xl font-bold text-[#0B0F14]">
                {item.title[locale]}
              </h3>

              <p className="mt-3 font-sans text-gray-600">
                {item.description[locale]}
              </p>

              <div
                className={[
                  "overflow-hidden transition-[max-height,opacity] duration-300 ease-out",
                  "max-h-0 opacity-0",
                  "[@media(hover:hover)]:group-hover:max-h-32 [@media(hover:hover)]:group-hover:opacity-100",
                  "[@media(hover:hover)]:group-focus-within:max-h-32 [@media(hover:hover)]:group-focus-within:opacity-100",
                ].join(" ")}
              >
                <p className="mt-4 font-sans text-sm font-medium text-gray-600">
                  {item.deliverables[locale]}
                </p>

                {item.techLine ? (
                  <p className="mt-2 font-sans text-sm text-gray-500">
                    {item.techLine}
                  </p>
                ) : null}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
