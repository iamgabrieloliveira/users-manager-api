<?php

declare(strict_types=1);

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class UsernameLengthRule implements ValidationRule
{
    public const USERNAME_MINIMUM_LENGTH = 3;

    private function message(): string
    {
        return sprintf('Username length must be greater than %s characters', self::USERNAME_MINIMUM_LENGTH);
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (strlen($value) < self::USERNAME_MINIMUM_LENGTH) {
            $fail($this->message());
        }
    }
}
