<?php

declare(strict_types=1);

namespace App\Services;

use App\DataTransferObjects\User\StoreUserDTO;
use App\Exceptions\UnableToDeleteModelException;
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
        return $this->userRepository->store($DTO);
    }

    /**
     * @throws UnableToDeleteModelException
     */
    public function destroy(User $user): void
    {
        $successfully = $this->userRepository->delete($user);

        if (! $successfully) {
            throw new UnableToDeleteModelException($user);
        }
    }
}
