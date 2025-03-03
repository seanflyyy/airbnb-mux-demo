"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Logo } from './Logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 w-full bg-white dark:bg-gray-900 z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />

        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            <Link href="/homes" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Homes
            </Link>
            <Link href="/experiences" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Experiences
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/messages" className="w-full">Messages</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/notifications" className="w-full">Notifications</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/trips" className="w-full">Trips</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/wishlists" className="w-full">Wishlists</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/manage-listing" className="w-full">Manage listings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/host/experience" className="w-full">Host an experience</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/host/refer" className="w-full">Refer a Host</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/account" className="w-full">Account</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/gift-cards" className="w-full">Gift cards</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/help" className="w-full">Help Center</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button className="w-full text-left" onClick={() => console.log('Logout')}>Log out</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col space-y-4 mt-6">
              <Link href="/homes" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Homes
              </Link>
              <Link href="/experiences" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Experiences
              </Link>
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
              </Button>
              <Button variant="outline" className="w-full">Sign up</Button>
              <Button className="w-full">Login</Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};