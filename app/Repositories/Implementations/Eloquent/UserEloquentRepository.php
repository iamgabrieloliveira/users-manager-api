<?php

declare(strict_types=1);

namespace App\Repositories\Implementations\Eloquent;

use App\DataTransferObjects\User\StoreUserDTO;
use App\Models\User;
use App\Repositories\Contracts\UserRepositoryContract;

class UserEloquentRepository implements UserRepositoryContract
{
    public function store(StoreUserDTO $DTO): User
    {
        return User::query()->create([
            'first_name' => $DTO->firstName,
            'last_name'  => $DTO->lastName,
            'email'      => $DTO->email,
            'password'   => $DTO->password,
            'user_name'  => $DTO->userName,
        ]);
    }

    public function delete(User $user): bool
    {
        return (bool) $user->delete();
    }
}
