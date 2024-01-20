<?php

declare(strict_types=1);

namespace App\DataTransferObjects\User;

readonly class AuthenticateUserDTO
{
    public function __construct(
        public string $email,
        public string $password,
    ) {
        //
    }
}