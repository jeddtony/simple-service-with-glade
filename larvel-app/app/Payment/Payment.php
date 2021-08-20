<?php

namespace App\Payment;

use Illuminate\Http\Request;

interface Payment {
    public function storePayment(Request $request, $url);
}