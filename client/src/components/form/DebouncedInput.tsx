import { Input, type InputProps } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';

type DebouncedInputProps = InputProps & {
    delay: number;
    initialValue: string | null;
    icon?: React.ReactNode;
    onStopTyping: (content: string) => void;
    onChange: (content: string) => void;
};

export default function DebouncedInput({ onStopTyping, onChange, delay, icon, initialValue, ...rest }: DebouncedInputProps) {
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
            value={initialValue}
            onChange={(event) => {
                const content = event.target.value;

                setInputValue(content);
                onChange(content);
            }}
        />
    );
}
