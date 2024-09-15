<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignUpRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function login(LoginRequest $loginRequest){
     $credentials=$loginRequest->validated();
     if(!Auth::attempt($credentials)){
      return response([
        "message"=>"Provided email or password are not correct"
      ]);
     }
     /** @var User $user **/
     $user=Auth::user();
    $token= $user->createToken('main')->plainTextToken;

    return response([
        "user"=>$user,
        "token"=>$token
    ]);
    }
    public function signup(SignUpRequest $signUpRequest){
      $data=$signUpRequest->validated();
      $user=User::create([
        'name'=>$data["name"],
        'email'=>$data['email'],
        'password'=>bcrypt($data["password"])
      ]);
       /** @var User $user **/
      $token=$user->createToken('main')->plainTextToken;
      return response([
        "user"=>$user,
        "token"=>$token
      ]);
    }
    public function logout(Request $request) {
      $user = $request->user();
      /** @var User $user **/
      $user->currentAccessToken()->delete();

      // Return a success response
 /*      return response()->json([
          'message' => 'Logged out successfully'
      ], 200); */
  }

}
