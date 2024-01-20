<?php

declare(strict_types=1);

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthenticationController::class, 'authenticate']);
    Route::get('me', [AuthenticationController::class, 'me']);
    Route::post('logout', [AuthenticationController::class, 'logout']);
});

Route::middleware(['middleware' => 'auth:api'])
    ->apiResource('user', UserController::class)->except('store');

Route::post('user', [UserController::class, 'store'])->name('user.store');

