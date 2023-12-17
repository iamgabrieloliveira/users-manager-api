<?php

declare(strict_types=1);

namespace App\Exceptions;

use Illuminate\Database\Eloquent\Model;

class UnableToDeleteModelException extends ApplicationException
{
    public function __construct(
        public readonly Model $model,
    ) {
        parent::__construct('Unable to delete model');
    }
}
