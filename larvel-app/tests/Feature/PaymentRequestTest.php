<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Tests\AuthenticatedTestCase;

class PaymentRequestTest extends AuthenticatedTestCase
{
    /**
     * A user can get list of payment requests
     *
     * @return void
     */
    public function test_can_get_list_of_requests()
    {
        $response = $this->json('GET', 'api/payment-links');

        $response->assertStatus(200);
    }


     /**
     * A user can create a payment request
     *
     * @return void
     */
    public function test_a_user_can_create_a_payment_request()
    {
        
        $formData = [
            "name" => 'First Payment',
            "description" => "Description for first payment",
            "expire_on" => "2021-12-12",
            "amount" => 10000
        ];
        $response = $this->json('POST', 'api/create-payment-link', $formData, ['Accept' => 'application/json'])
        ->assertStatus(201);
        $response->assertStatus(201);
    }


     /**
     * A user cannot create a payment request without amount
     *
     * @return void
     */
    public function test_a_user_cannot_create_a_location_without_an_existing_state()
    {
        $formData = [
            "name" => 'First Payment',
            "description" => "Description for first payment",
            "expire_on" => "2021-12-12"
            
        ];
         $this->json('POST', 'api/create-payment-link', $formData, ['Accept' => 'application/json'])
        ->assertStatus(422);
        
    }
}
