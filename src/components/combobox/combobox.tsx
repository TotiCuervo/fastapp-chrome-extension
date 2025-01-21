'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '../../lib/utils'
import Button from '../buttons/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from '../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import './styles.css'

export interface ComboboxOption {
    value: string
    label: string
}

export interface ComboboxGroup {
    label?: string
    options: ComboboxOption[]
}

export type ComboBoxGroups = ComboboxGroup[]

export interface ComboBoxProps {
    value: string | null
    groups: ComboBoxGroups
    onChange: (value: string) => void
    onSearchChange?: (value: string) => void
}

export default function Combobox({ value = null, groups = [], onChange, onSearchChange }: ComboBoxProps) {
    const [open, setOpen] = React.useState(false)

    const options: ComboboxOption[] = groups.reduce((acc: ComboboxOption[], group) => {
        return [...acc, ...(group.options || [])]
    }, [])

    return (
        <Popover
            open={open}
            onOpenChange={(open) => {
                setOpen(open)
            }}
        >
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                    {value
                        ? options.find((option) => option.value.toUpperCase() === value.toUpperCase())?.label
                        : 'Select option...'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="PopoverContent p-0">
                <Command>
                    <CommandInput onValueChange={onSearchChange} placeholder="Search..." />
                    <CommandEmpty>No option found.</CommandEmpty>
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Suggestions">
                            <CommandItem>
                                <span>Calendar</span>
                            </CommandItem>
                            <CommandItem>
                                <span>Search Emoji</span>
                            </CommandItem>
                            <CommandItem>
                                <span>Calculator</span>
                            </CommandItem>
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="Settings">
                            <CommandItem>
                                <span>Profile</span>
                            </CommandItem>
                            <CommandItem>
                                <span>Billing</span>
                            </CommandItem>
                            <CommandItem>
                                <span>Settings</span>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
