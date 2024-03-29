<?php

declare(strict_types=1);

namespace App\Repositories\Implementations\Eloquent;

use App\DataTransferObjects\User\StoreUserDTO;
use App\DataTransferObjects\User\UpdateUserDTO;
use App\Models\User;
use App\Repositories\Contracts\UserRepositoryContract;
use Illuminate\Database\Eloquent\Collection;

class UserEloquentRepository implements UserRepositoryContract
{
    public function store(StoreUserDTO $DTO): User
    {
        return User::query()->create([
            'first_name' => $DTO->firstName,
            'last_name'  => $DTO->lastName,
            'email'      => $DTO->email,
            'password'   => $DTO->password,
            'username'   => $DTO->username,
        ]);
    }

    public function update(User $user, UpdateUserDTO $DTO): User
    {
        $user->update($DTO->toArray());

        return $user;
    }

    public function delete(User $user): bool
    {
        return (bool) $user->delete();
    }

    public function all(): Collection
    {
        return User::all();
    }

    public function searchByName(string $name): Collection
    {
        return User::query()->filterByName($name)->get();
    }
}
