<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Exceptions\UnableToDeleteModelException;
use App\Http\Requests\IndexUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Resources\UserResource;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function __construct(
        private readonly UserService $userService,
    ) {
        //
    }

    public function index(IndexUserRequest $request): JsonResponse
    {
        $users = $this->userService->listUsers($request->getSearch());

        return $this->ok([
            'users' => UserResource::collection($users),
        ]);
    }

    public function store(StoreUserRequest $request): JsonResponse
    {
        $dto = $request->getDTO();

        $user = $this->userService->store($dto);

        return $this->created($user->id);
    }

    public function update(User $user, UpdateUserRequest $request): JsonResponse
    {
        $dto = $request->getDTO();

        $user = $this->userService->update($user, $dto);

        return $this->noContent();
    }

    public function show(User $user): JsonResponse
    {
        return $this->ok([
            'user' => UserResource::make($user),
        ]);
    }

    /**
     * @throws UnableToDeleteModelException
     */
    public function destroy(User $user): JsonResponse
    {
        $this->userService->destroy($user);

        return $this->noContent();
    }
}
