<?php

declare(strict_types=1);

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response as HttpCode;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $e): Response|JsonResponse|RedirectResponse|HttpCode
    {
        return match(get_class($e)) {
            ValidationException::class => $this->handleValidationException($e),
            UnableToDeleteModelException::class => $this->handleUnableToDeleteModelException($e),
            default => parent::render($request, $e),
        };
    }

    private function handleValidationException(ValidationException $e): JsonResponse
    {
        return response()->json([
            'message' => 'Validation Error',
            'errors' => $e->errors(),
        ], HttpCode::HTTP_BAD_REQUEST);
    }

    private function handleUnableToDeleteModelException(UnableToDeleteModelException $e): JsonResponse
    {
        $modelName = str($e->model::class)->lower()->explode('\\')->last();

        return response()->json([
            'message' => sprintf('Unable to delete %s', $modelName),
        ], HttpCode::HTTP_BAD_REQUEST);
    }
}
