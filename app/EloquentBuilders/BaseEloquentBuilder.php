<?php

declare(strict_types=1);

namespace App\EloquentBuilders;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Query\Expression;

class BaseEloquentBuilder extends Builder
{
    public function whereLike(Expression|string $column, string $search): BaseEloquentBuilder
    {
        return $this->where(
            $column,
            'ILIKE',
            "%$search%",
        );
    }

    public function orWhereLike(Expression|string $column, string $search): BaseEloquentBuilder
    {
        return $this->orWhere(
            $column,
            'ILIKE',
            "%$search%",
        );
    }
}
