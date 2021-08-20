<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PaymentRequestController;
use App\Http\Controllers\SeatController;
use App\Http\Controllers\StateController;
use App\Http\Controllers\TripController;
use App\Http\Controllers\TripDestinationController;
use App\Http\Controllers\VehicleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/login', function () {
    return response()->json('Invalid auth', 401);
})->name('login');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function() {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Create payment links
    Route::post('/create-payment-link', [PaymentRequestController::class, 'store']);
    Route::get('/payment-links', [PaymentRequestController::class, 'index']);
    Route::get('/payment-links/{paymentRequestLink}', [PaymentRequestController::class, 'edit']);
    Route::get('/payment-history', [PaymentController::class, 'index']);
    Route::get('/payment-history/{paymentRequestId}', [PaymentController::class, 'getOnePaymentRequestHistory']);
    Route::get('/dashboard', [DashboardController::class, 'getDashboardDetails']);
});

Route::post('/make-payment', [PaymentController::class, 'store']);
