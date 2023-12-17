<?php

declare(strict_types=1);

namespace App\Repositories\Contracts;

use App\DataTransferObjects\User\StoreUserDTO;
use App\Models\User;

interface UserRepositoryContract extends RepositoryContract
{
    public function store(StoreUserDTO $DTO): User;

    public function delete(User $user): bool;
}
