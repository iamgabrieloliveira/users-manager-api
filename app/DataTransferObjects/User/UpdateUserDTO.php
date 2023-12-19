<?php

declare(strict_types=1);

namespace App\DataTransferObjects\User;

readonly class UpdateUserDTO
{
    public function __construct(
        public ?string $username,
        public ?string $firstName,
        public ?string $lastName,
        public ?string $email,
        public ?string $password,
    ) {
        //
    }

    public function toArray(): array
    {
        $data = [];

        foreach ($this as $key => $value) {
            if ($value !== null) {
                $data[str($key)->snake()->toString()] = $value;
            }
        }

        return $data;
    }
}
