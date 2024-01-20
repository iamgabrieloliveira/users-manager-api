<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Arr;
use Symfony\Component\HttpFoundation\Response;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function created(int $id): JsonResponse
    {
        return response()->json(['id' => $id], Response::HTTP_CREATED);
    }

    public function noContent(): JsonResponse
    {
        return response()->json([], Response::HTTP_NO_CONTENT);
    }

    public function ok(array $data = []): JsonResponse
    {
      return response()->json($data, Response::HTTP_OK);
    }

    public function withErrors(array $errors, int $statusCode = Response::HTTP_FORBIDDEN): JsonResponse
    {
        return response()->json(['errors' => $errors], $statusCode);
    }

    /** @param string|string[] $errors */
    public function unauthorized(array|string $errors = []): JsonResponse
    {
        return $this->withErrors(Arr::wrap($errors), Response::HTTP_UNAUTHORIZED);
    }

    public function paginated(LengthAwarePaginator $pagination, array $data): JsonResponse
    {
        return $this->ok([
            'pagination' => [
                'total' => $pagination->total(),
                'current_page' => $pagination->currentPage(),
                'next_page_url' => $pagination->nextPageUrl(),
                'last_page' => $pagination->lastPage(),
            ],
            ...$data,
        ]);
    }
}
