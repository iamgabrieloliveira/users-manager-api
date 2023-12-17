<?php

declare(strict_types=1);

use App\Rules\PasswordLengthRule;
use App\Rules\UserNameLengthRule;

function validPayload(array $override = []): array {
    return [[
        'first_name' => fake()->firstName(),
        'last_name' => fake()->lastName(),
        'user_name' =>  fake()->userName(),
        'password' => fake()->password(),
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
    return substr(fake()->userName(), 0, UserNameLengthRule::USER_NAME_MINIMUM_LENGTH + 1);
}

function shortPassword(): string {
    return fake()->password(maxLength: PasswordLengthRule::PASSWORD_MINIMUM_LENGTH - 1);
}

dataset('create user invalid payloads', fn () => ([
    'First name is empty string' => validPayload(['first_name' => '']),
    'First name is is null' => validPayload(['first_name' => null]),

    'Last name is empty string' => validPayload(['last_name' => '']),
    'Last name is is null' => validPayload(['last_name' => null]),

    'User name is empty string' => validPayload(['user_name' => '']),
    'User name is is null' => validPayload(['user_name' => null]),
    'User name length is less than minimum' => validPayload(['user_name' => shortUserName()]),

    'Email is empty string' => validPayload(['email' => '']),
    'Email is is null' => validPayload(['email' => null]),
    'Email is not a valid email' => validPayload(['email' => fake()->word()]),

    'Password is empty string' => validPayload(['password' => '']),
    'Password is is null' => validPayload(['password' => null]),
    'Password length is less than minimum' => validPayload(['password' => shortPassword()]),
]));
