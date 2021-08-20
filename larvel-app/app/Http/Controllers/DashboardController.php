<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\PaymentRequest;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    //
    public function getDashboardDetails() {
        $userId = auth()->user()->id;
        $paymentRequestCount = PaymentRequest::where('user_id', $userId)->count();
        $paymentCount = Payment::where('user_id', $userId)->count();

        $data = [
            'payment_request_count' => $paymentRequestCount,
            'payment_count' => $paymentCount
        ];

        return $this->formatSuccessResponse('Dashboard details', $data);
    }
}
