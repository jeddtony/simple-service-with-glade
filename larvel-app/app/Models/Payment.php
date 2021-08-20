<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = ['first_name', 'last_name', 'email', 'phone', 'payment_request_id', 
        'user_id', 'txn_ref'];

    public function paymentRequest() {
        return $this->belongsTo('App\Models\PaymentRequest', 'payment_request_id', 'id');
    }
}
