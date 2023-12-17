<?php

declare(strict_types=1);

namespace App\DataTransferObjects\User;

readonly class StoreUserDTO
{
    public function __construct(
        public string $userName,
        public string $firstName,
        public string $lastName,
        public string $email,
        public string $password,
    ) {
        //
    }
}
