"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import axios from "axios";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";

interface ComboboxProps {
  options: { label: string; value: string }[]
  value?: string | null;
  courseId: string;
}

export const Combobox = ({options, value, courseId}: ComboboxProps) => {
  const [open, setOpen] = React.useState(false);

  const router = useRouter();

  const sourceRef = React.useRef<HTMLButtonElement>(null);
  const targetRef = React.useRef<HTMLDivElement>(null);

  const onChange = async (value: string, courseId: string) => {
    try {
        await axios.patch(`/api/courses/${courseId}`, {categoryId: value});
        toast.success(`Category updated successfully.`);
        console.log(`Category updated successfully.`);
        router.refresh();
    }

    catch(error) {
      console.log(`${error}`);
      toast.error(`Something went wrong.`);
    }
  }

  const handleResize = () => {
    if(sourceRef.current) {
      const sourceWidth = sourceRef.current.getBoundingClientRect().width;
      if(targetRef.current) {
        targetRef.current.style.width = `${sourceWidth}px`;
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          ref={sourceRef}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : "Select option..."}
          <ChevronsUpDown className="text-rose-500 ml-2 h-4 w-4 shrink-0 opacity-100"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent
          className={`p-0`}
          ref={targetRef}
      >
        <Command>
          <CommandInput placeholder="Search option..." />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup className={`max-h-72 overflow-auto`}>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.label} // This is .label and not .value because we when we type it should search the label and not the value, which is a uuid.
                onSelect={() => {
                    onChange(option.value === value ? "" : option.value, courseId).then(r => console.log(r))
                    setOpen(false)
                  }
                }
              >
                <Check
                  className={cn(
                    "text-rose-500 mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
};