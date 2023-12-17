<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Exceptions\UnableToDeleteModelException;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function __construct(
        private readonly UserService $userService,
    ) {
        //
    }

    public function store(StoreUserRequest $request): JsonResponse
    {
        $dto = $request->getDTO();

        $user = $this->userService->store($dto);

        return $this->created($user->id);
    }

    /**
     * @throws UnableToDeleteModelException
     */
    public function destroy(User $user): JsonResponse
    {
        $this->userService->delete($user);

        return $this->noContent();
    }
}
