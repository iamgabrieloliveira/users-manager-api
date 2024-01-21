import { Input, type InputProps } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';

type DebouncedInputProps = InputProps & {
    delay: number;
    icon?: React.ReactNode;
    onStopTyping: (content: string) => void;
};

export default function DebouncedInput({ onStopTyping, delay, icon, ...rest }: DebouncedInputProps) {
    const [inputValue, setInputValue] = useState<string | null>(null);

    const debounced = useDebounce(inputValue, delay);
    
    useEffect(() => {
        if (inputValue === null) return;

        onStopTyping(inputValue);
    }, [debounced]);
    
    return (
        <Input
            {...rest}
            startContent={icon}
            onChange={(event) => setInputValue(event.target.value)}
        />
    );
}
