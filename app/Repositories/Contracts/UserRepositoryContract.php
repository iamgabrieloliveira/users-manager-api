<?php

declare(strict_types=1);

namespace App\Repositories\Contracts;

use App\DataTransferObjects\User\StoreUserDTO;
use App\DataTransferObjects\User\UpdateUserDTO;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

interface UserRepositoryContract extends RepositoryContract
{
    /** @return Collection<User> */
    public function all(): Collection;

    /**
    * @param string $name
    * @return Collection<User>
    */
    public function searchByName(string $name): Collection;

    public function store(StoreUserDTO $DTO): User;

    public function delete(User $user): bool;

    public function update(User $user, UpdateUserDTO $DTO): User;
}
