<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
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
}
