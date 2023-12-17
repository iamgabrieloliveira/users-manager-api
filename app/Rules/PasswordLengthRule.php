<?php

declare(strict_types=1);

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class PasswordLengthRule implements ValidationRule
{
    public const PASSWORD_MINIMUM_LENGTH = 8;

    public function message(): string
    {
        return sprintf('Password length must be greater than %s characters', self::PASSWORD_MINIMUM_LENGTH);
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (str($value) < self::PASSWORD_MINIMUM_LENGTH) {
            $fail($this->message());
        }
    }
}
