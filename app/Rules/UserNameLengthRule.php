<?php

declare(strict_types=1);

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class UserNameLengthRule implements ValidationRule
{
    public const USER_NAME_MINIMUM_LENGTH = 3;

    private function message(): string
    {
        return sprintf('User name length must be greater than %s characters', self::USER_NAME_MINIMUM_LENGTH);
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (strlen($value) < self::USER_NAME_MINIMUM_LENGTH) {
            $fail($this->message());
        }
    }
}
