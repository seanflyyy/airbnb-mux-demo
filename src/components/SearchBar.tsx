"use client";

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Search, Users } from 'lucide-react';

export const SearchBar = () => {
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    // Implement search functionality
    console.log({ location, dates, guests });
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="w-full md:w-1/3">
        <Input
          placeholder="Where are you going?"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full"
        />
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full md:w-auto justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dates.from ? (
              dates.to ? (
                <>{format(dates.from, 'LLL dd, y')} - {format(dates.to, 'LLL dd, y')}</>
              ) : (
                format(dates.from, 'LLL dd, y')
              )
            ) : (
              <span>Select dates</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={{ from: dates.from, to: dates.to }}
            onSelect={(range) => setDates({ from: range?.from, to: range?.to })}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <div className="flex items-center gap-2 w-full md:w-auto">
        <Button
          variant="outline"
          className="w-full md:w-auto"
          onClick={() => setGuests(Math.max(1, guests - 1))}
        >
          -
        </Button>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>{guests} guest{guests !== 1 ? 's' : ''}</span>
        </div>
        <Button
          variant="outline"
          className="w-full md:w-auto"
          onClick={() => setGuests(guests + 1)}
        >
          +
        </Button>
      </div>

      <Button
        className="w-full md:w-auto bg-[#FF5A5F] hover:bg-[#FF5A5F]/90"
        onClick={handleSearch}
      >
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </div>
  );
};