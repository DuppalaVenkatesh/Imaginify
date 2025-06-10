"use client";

import { navLinks } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export const Sidebar = () => {
  const pathName = usePathname();
  return (
    <aside className="sidebar h-full border-r-[1px]">
      <div className="flex flex-col size-full gap-4">
        <Link href="/">
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={180}
            height={28}
          />
        </Link>
        <nav className="flex flex-col h-full justify-between">
          <SignedIn>
            <ul className="flex flex-col">
              {navLinks.slice(0, 6).map((link) => {
                const isActive = pathName === link.route;
                return (
                  <li
                    key={link.route}
                    className={`flex items-center px-6 py-4 rounded-full group ${
                      isActive
                        ? "bg-gradient-to-br from-purple-700 to-blue-600 text-white"
                        : "text-gray-700"
                    }`}
                  >
                    <Link className="inline-flex gap-2" href={link.route}>
                      <Image
                        src={link.icon}
                        alt="nav-element"
                        width={24}
                        height={24}
                        className={`${isActive && "brightness-200"}`}
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </SignedIn>
          <SignedIn>
            <ul className="flex flex-col">
              {navLinks.slice(6).map((link) => {
                const isActive = pathName === link.route;
                return (
                  <li
                    key={link.route}
                    className={`flex items-center px-6 py-4 rounded-full group ${
                      isActive
                        ? "bg-gradient-to-br from-purple-700 to-blue-600 text-white"
                        : "text-gray-700"
                    }`}
                  >
                    <Link className="inline-flex gap-2" href={link.route}>
                      <Image
                        src={link.icon}
                        alt="nav-element"
                        width={24}
                        height={24}
                        className={`${isActive && "brightness-200"}`}
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li
                className={`flex items-center cursor-pointer px-6 py-4 gap-2 text-gray-700`}
              >
                <UserButton showName />
              </li>
            </ul>
          </SignedIn>
          <SignedOut>
            <Button
              asChild
              className="bg-gradient-to-br from-purple-700 to-blue-600 bg-cover button"
            >
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};
