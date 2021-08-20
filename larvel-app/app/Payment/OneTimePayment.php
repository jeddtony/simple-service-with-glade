<?php

namespace App\Payment;

use App\Models\PaymentRequest;
use Illuminate\Http\Request;

class OneTimePayment implements Payment{

    protected $basePaymentUrl;

    public function __construct()
    {
        $this->basePaymentUrl = 'http://localhost:3000/pay/'; //should be an env variable
    }
    // implement Payment function
    public function storePayment(Request $request, $url)
    {
        $paymentRequest = PaymentRequest::create([
            'user_id' => auth()->user()->id,
            'name' => $request->name,
            'description' => $request->description,
            'expire_on' => $request->expire_on,
            'url' => $url,
            'full_url' => $this->basePaymentUrl . ''. $url,
            'amount' => $request->amount
        ]);
        return $paymentRequest;
    }
}