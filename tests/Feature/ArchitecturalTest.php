<?php

arch('every file should use strict types enabled')
    ->expect('App')
    ->toUseStrictTypes();

arch('avoid use debug statements')
    ->expect(['dd', 'dump', 'ray', 'var_dump'])
    ->not()
    ->toBeUsed();
