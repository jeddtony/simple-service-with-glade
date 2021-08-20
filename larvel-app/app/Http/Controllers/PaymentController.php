<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\PaymentRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $userId = auth()->user()->id;
        $payments = Payment::where('user_id', $userId)
        ->with('paymentRequest')->get();

        return $this->formatSuccessResponse('Payment History', $payments);
    }

     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getOnePaymentRequestHistory($paymentRequestId)
    {
        $payments = Payment::where('payment_request_id', $paymentRequestId)
        ->with('paymentRequest')->get();

        return $this->formatSuccessResponse('Payment History', $payments);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|min:3|max:255',
            'last_name' => 'required|max:255',
            'email' => 'required',
            'phone' => 'required',
            'payment_request_url' => 'required',
            'txn_ref' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->formatInputErrorResponse($validator->errors());
        }

        $paymentRequest = PaymentRequest::where(['url' => $request->payment_request_url, 
        'is_active' => 1])->first();

        if(!$paymentRequest){
            return $this->notFoundResponse('The payment link does not exist');
        }

        $payment = Payment::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'payment_request_id' => $paymentRequest->id,
            'user_id' => $paymentRequest->user_id,
            'txn_ref' => $request->txn_ref
        ]);

        return $this->formatSuccessResponse('The payment details', $payment);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function show(Payment $payment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function edit(Payment $payment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Payment $payment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Payment $payment)
    {
        //
    }
}
