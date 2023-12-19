<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\DataTransferObjects\User\UpdateUserDTO;
use App\Rules\PasswordLengthRule;
use App\Rules\UsernameLengthRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'username'  =>  ['sometimes', 'required', new UsernameLengthRule],
            'first_name' => ['sometimes', 'required'],
            'last_name'  => ['sometimes', 'required'],
            'email'      => ['sometimes', 'required', 'email'],
            'password'   => ['sometimes', 'required', new PasswordLengthRule],
        ];
    }

    public function getDTO(): UpdateUserDTO
    {
        return new UpdateUserDTO(
            username: $this->validated('username'),
            firstName: $this->validated('first_name'),
            lastName: $this->validated('last_name'),
            email: $this->validated('email'),
            password: $this->validated('password'),
        );
    }
}
