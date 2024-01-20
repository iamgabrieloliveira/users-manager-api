import Image from 'next/image';

type Size = 'small' | 'medium' | 'large';

type MortyIconProps = {
    size: Size,
}

const sizes: {
    [key : Size] : number,
} = {
    small: 40,
    medium: 125,
    large: 200,
} as const;

export default function MortyIcon({ size }: MortyIconProps) {
    const sizeValue = sizes[size];

    return (
        <Image
            className="mx-auto"
            width={sizeValue}
            height={sizeValue}
            src="/evil-morty.png"
            alt="Evil Morty Icon"
        />
    );
}
