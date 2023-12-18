<?php

declare(strict_types=1);

namespace App\Providers;

use App\Repositories\Contracts\UserRepositoryContract;
use App\Repositories\Implementations\Eloquent\UserEloquentRepository;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\ServiceProvider;
use Illuminate\Testing\TestResponse;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->bindRepositories();
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Model::preventLazyLoading(! app()->isProduction());

        $this->bindMacros();
    }

    private function bindMacros(): void
    {
        JsonResponse::macro( 'asAssertable',
            function (): TestResponse {
                /** @var $response JsonResponse */
                $response = $this;

                return TestResponse::fromBaseResponse($response);
            }
        );
    }

    private function bindRepositories(): void
    {
        $this->app->bind(
            UserRepositoryContract::class,
            UserEloquentRepository::class,
        );
    }
}
