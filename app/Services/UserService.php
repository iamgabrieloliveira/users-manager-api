<?php

declare(strict_types=1);

namespace App\Services;

use App\DataTransferObjects\User\StoreUserDTO;
use App\Models\User;
use App\Repositories\Contracts\UserRepositoryContract;

class UserService
{
    public function __construct(
        private readonly UserRepositoryContract $userRepository,
    ) {
        //
    }

    public function store(StoreUserDTO $DTO): User
    {
        $user = $this->userRepository->store($DTO);

        return $user;
    }
}
