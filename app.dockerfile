FROM php:8.2-alpine

RUN apk --no-cache add \
        libzip-dev \
        gettext-dev \
        libpng-dev \
        libjpeg-turbo-dev \
        freetype-dev \
        postgresql-dev \
        autoconf \
        git \
        linux-headers \
        gettext \
        freetype \
    && mkdir /app


## Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

#####################################
# PHP extensions:
#####################################

## Install xdebug
RUN apk add --no-cache --virtual .build-deps $PHPIZE_DEPS \
    && pecl install xdebug \
    && docker-php-ext-enable xdebug

RUN docker-php-ext-install \
    exif \
    pcntl \
    zip \
    pdo_pgsql \
    bcmath \
    intl \
    gettext

WORKDIR /app

EXPOSE 8000

CMD /bin/sh -c "composer install && php artisan serve --host 0.0.0.0 --port 8000"
