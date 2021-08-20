<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentRequest extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'name', 'description', 
    'full_url', 'expire_on', 'url', 'amount', 'is_subscription'];

    public function user() {
        return $this->belongsTo('App\Models\User');
    }
}
