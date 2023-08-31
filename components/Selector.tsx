import * as React from 'react';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface SelectorProps {
    options: { id: string; name: string }[];
    label: string;
    onChange: (value: string) => void;
    value: string;
}

export function Selector({ options, label, onChange, value = '' }: SelectorProps) {
    return (
        <Select onValueChange={onChange} value={value} defaultValue=''>
            <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder={`Select a ${label}`} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    <SelectItem key={label} value={''}>
                        All
                    </SelectItem>
                    {options.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                            {option.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
