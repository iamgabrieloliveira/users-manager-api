<?php

use App\Repositories\Contracts\RepositoryContract;

arch('every file should use strict types enabled')
    ->expect('App')
    ->classes()
    ->toUseStrictTypes();

arch('avoid use debug statements')
    ->expect(['dd', 'dump', 'ray', 'var_dump'])
    ->not()
    ->toBeUsed();

arch('controllers should have suffix \'Controller\'')
    ->expect('App\Http\Controllers')
    ->classes()
    ->toHaveSuffix('Controller');

arch('avoid use final classes')
    ->expect('App')
    ->classes()
    ->not()
    ->toBeFinal();

arch('every Data Transfer Object should be readonly class and have suffix DTO and to have constructor')
    ->expect('App\DataTransferObjects')
    ->classes()
    ->toBeReadonly()
    ->toHaveConstructor()
    ->toHaveSuffix('DTO');

arch('every repository implementations should have \'Repository\' suffix and implement RespositoryContract')
    ->expect('App\Repositories\Implementations')
    ->classes()
    ->toImplement(RepositoryContract::class)
    ->toHaveSuffix('Repository');
