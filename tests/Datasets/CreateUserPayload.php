<?php

declare(strict_types=1);

use App\Rules\PasswordLengthRule;
use App\Rules\UsernameLengthRule;

function validPayload(array $override = []): array {
    return [[
        'first_name' => fake()->firstName(),
        'last_name' => fake()->lastName(),
        'username' =>  fake()->userName(),
        'password' => fake()->password(minLength: PasswordLengthRule::PASSWORD_MINIMUM_LENGTH),
        'email' => fake()->email(),
        ...$override,
    ]];
}

dataset('create user valid payloads', fn () => ([
    validPayload(),
    validPayload(),
    validPayload(),
    validPayload(),
]));

function shortUserName(): string {
    return substr(fake()->userName(), 0, UserNameLengthRule::USERNAME_MINIMUM_LENGTH- 1);
}

function shortPassword(): string {
    return fake()->password(maxLength: PasswordLengthRule::PASSWORD_MINIMUM_LENGTH - 1);
}

dataset('create user invalid payloads', fn () => ([
    'First name is empty string' => validPayload(['first_name' => '']),
    'First name is is null' => validPayload(['first_name' => null]),

    'Last name is empty string' => validPayload(['last_name' => '']),
    'Last name is is null' => validPayload(['last_name' => null]),

    'User name is empty string' => validPayload(['username' => '']),
    'User name is is null' => validPayload(['username' => null]),
    'User name length is less than minimum' => validPayload(['username' => shortUserName()]),

    'Email is empty string' => validPayload(['email' => '']),
    'Email is is null' => validPayload(['email' => null]),
    'Email is not a valid email' => validPayload(['email' => fake()->word()]),

    'Password is empty string' => validPayload(['password' => '']),
    'Password is is null' => validPayload(['password' => null]),
    'Password length is less than minimum' => validPayload(['password' => shortPassword()]),
]));
