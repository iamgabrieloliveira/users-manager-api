<?php

declare(strict_types=1);

namespace App\Services;

use App\DataTransferObjects\User\StoreUserDTO;
use App\Exceptions\UnableToDeleteModelException;
use App\Models\User;
use App\Repositories\Contracts\UserRepositoryContract;
use Illuminate\Database\Eloquent\Collection;

class UserService
{
    public function __construct(
        private readonly UserRepositoryContract $userRepository,
    ) {
        //
    }

    /**
     * @param ?string $name
     * @return Collection<User>
     */
    public function listUsers(?string $name): Collection
    {
        if (blank($name)) {
            return $this->userRepository->all();
        }

        return $this->userRepository->searchByName($name);
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
