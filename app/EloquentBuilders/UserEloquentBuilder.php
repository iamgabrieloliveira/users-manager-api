<?php

declare(strict_types=1);

namespace App\EloquentBuilders;

class UserEloquentBuilder extends BaseEloquentBuilder
{
    public function filterByName(string $name): BaseEloquentBuilder
    {
        $fullName = $this->raw('CONCAT(first_name, \' \', last_name)');

        return $this
            ->whereLike($fullName, $name)
            ->orWhereLike('username', $name);
    }
}
