<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\DataTransferObjects\User\StoreUserDTO;
use Illuminate\Validation\Rule;
use App\Rules\{PasswordLengthRule, UsernameLengthRule};
use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'username' => ['required', new UsernameLengthRule()],
            'first_name' => ['required'],
            'last_name' => ['required'],
            'email' => ['required', 'email', Rule::unique('users', 'email')->whereNull('deleted_at')],
            'password' => ['required', new PasswordLengthRule],
        ];
    }

    public function getDTO(): StoreUserDTO
    {
        return new StoreUserDTO(
            username: $this->validated('username'),
            firstName: $this->validated('first_name'),
            lastName: $this->validated('last_name'),
            email: $this->validated('email'),
            password: $this->validated('password'),
        );
    }
}
