<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IndexUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'q' => ['sometimes', 'string'],
        ];
    }

    public function getSearch(): ?string
    {
        return $this->validated('q');
    }
}
