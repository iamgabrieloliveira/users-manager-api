<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\DataTransferObjects\User\AuthenticateUserDTO;
use Illuminate\Foundation\Http\FormRequest;

class AuthenticateUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'email' => 'required',
            'password' => 'required',
        ];
    }

    public function getDTO(): AuthenticateUserDTO
    {
        return new AuthenticateUserDTO(
            email: $this->validated('email'),
            password: $this->validated('password'),
        );
    }
}
