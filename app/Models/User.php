<?php

declare(strict_types=1);

namespace App\Models;

use App\EloquentBuilders\UserEloquentBuilder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

/**
 * App\Models\User
 *
 * @property int $id
 * @property string $first_name
 * @property string $last_name
 * @property string $username
 * @property string $email
 * @property mixed $password
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Laravel\Sanctum\PersonalAccessToken> $tokens
 * @property-read int|null $tokens_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static UserEloquentBuilder|User newModelQuery()
 * @method static UserEloquentBuilder|User newQuery()
 * @method static UserEloquentBuilder|User query()
 * @method static UserEloquentBuilder|User whereCreatedAt($value)
 * @method static UserEloquentBuilder|User whereEmail($value)
 * @method static UserEloquentBuilder|User whereFirstName($value)
 * @method static UserEloquentBuilder|User whereId($value)
 * @method static UserEloquentBuilder|User whereLastName($value)
 * @method static UserEloquentBuilder|User wherePassword($value)
 * @method static UserEloquentBuilder|User whereUpdatedAt($value)
 * @method static UserEloquentBuilder|User whereUserName($value)
 * @mixin \Eloquent
 */
class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'username',
        'email',
        'first_name',
        'last_name',
        'password',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'password' => 'hashed',
    ];

    public function newEloquentBuilder($query): UserEloquentBuilder
    {
        return new UserEloquentBuilder($query);
    }

    public function getJWTIdentifier(): int
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims(): array
    {
        return [];
    }
}
