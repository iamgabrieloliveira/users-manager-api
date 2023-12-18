<?php

declare(strict_types=1);

namespace App\Exceptions;

use Illuminate\Database\Eloquent\Model;

class UnableToDeleteModelException extends ApplicationException
{
    public $message = 'Unable to delete model';

    public function __construct(
        public readonly Model $model,
    ) {
        parent::__construct();
    }

    public function buildMessage(): string
    {
        $modelName = str($this->model::class)->lower()->explode('\\')->last();
        return sprintf('Unable to delete %s', $modelName);
    }
}
