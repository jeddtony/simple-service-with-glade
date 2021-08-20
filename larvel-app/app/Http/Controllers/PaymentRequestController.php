<?php

namespace App\Http\Controllers;

use App\Models\PaymentRequest;
use App\Payment\OneTimePayment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PaymentRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $user_id = auth()->user()->id;
        $paymentLinks = PaymentRequest::where('user_id', $user_id)->get();
        return $this->formatSuccessResponse('List of payment links', $paymentLinks);
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
            'name' => 'required|min:3|max:255',
            'description' => 'required|max:255',
            'expire_on' => 'required',
            'amount' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->formatInputErrorResponse($validator->errors());
        }

        $url = null;
        
        
        do {
            # code...
            $url = makeRandomToken(); // can use md5 hashing
            $currentTime = Carbon::now();
            $matchStatement = ['url' => $url, 'is_active' => true];
            $urlExist = PaymentRequest::where($matchStatement)
            ->whereDate('expire_on', '>=', $currentTime )->first();
        } while ($urlExist);

        // should be in a try catch block 
        $basePaymentUrl = 'http://localhost:3000/pay/'; //should be an env variable
        // $paymentRequest = PaymentRequest::create([
        //     'user_id' => auth()->user()->id,
        //     'name' => $request->name,
        //     'description' => $request->description,
        //     'expire_on' => $request->expire_on,
        //     'url' => $url,
        //     'full_url' => $basePaymentUrl . ''. $url,
        //     'amount' => $request->amount
        // ]);

        $oneTimePayment = new OneTimePayment();
        $paymentRequest = $oneTimePayment->storePayment($request, $url);

        return $this->formatCreatedResponse('Payment link created', $paymentRequest);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PaymentRequest  $paymentRequest
     * @return \Illuminate\Http\Response
     */
    public function show(PaymentRequest $paymentRequest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\PaymentRequest  $paymentRequest
     * @return \Illuminate\Http\Response
     */
    public function edit( $paymentRequestLink)
    {
        //
        $paymentRequest = PaymentRequest::where('url', $paymentRequestLink)->with('user')->first();
        return $this->formatSuccessResponse('Payment request detail', $paymentRequest);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\PaymentRequest  $paymentRequest
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PaymentRequest $paymentRequest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PaymentRequest  $paymentRequest
     * @return \Illuminate\Http\Response
     */
    public function destroy(PaymentRequest $paymentRequest)
    {
        //
    }
}
