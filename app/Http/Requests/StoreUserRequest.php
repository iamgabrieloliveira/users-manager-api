<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\DataTransferObjects\User\StoreUserDTO;
use App\Rules\{PasswordLengthRule, UserNameLengthRule};
use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'user_name'  => ['required', new UserNameLengthRule],
            'first_name' => ['required'],
            'last_name'  => ['required'],
            'email'      => ['required', 'email'],
            'password'   => ['required', new PasswordLengthRule],
        ];
    }

    public function getDTO(): StoreUserDTO
    {
        return new StoreUserDTO(
            userName: $this->validated('user_name'),
            firstName: $this->validated('first_name'),
            lastName: $this->validated('last_name'),
            email: $this->validated('email'),
            password: $this->validated('password'),
        );
    }
}
