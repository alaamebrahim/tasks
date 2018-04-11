<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Factory as Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\DB\Repositories\RoleRepository as RoleRepo;


class Authenticate
{
    private $roleRepo;
    /**
     * Create a new middleware instance.
     *
     * @param  \Illuminate\Contracts\Auth\Factory  $auth
     * @return void
     */
    public function __construct(RoleRepo $roleRepo)
    { 
        $this->roleRepo = $roleRepo;
    }
    
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        $current_user = JWTAuth::parseToken()->authenticate();
        if(!$current_user) {
            return response('Unauthorized.', 401);
        }
        $role_name = $this->roleRepo->getRoleName($current_user['attributes']['role_id']);
        if($role_name !== 'root' && $role_name !== 'admin') {
            return response('Unauthorized.', 401);
        }
        return $next($request);
    }
}
