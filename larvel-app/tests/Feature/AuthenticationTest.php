<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function testRequiredFieldsForRegistration()
    {
        $this->json('POST', 'api/register', ['Accept' => 'application/json'])
            ->assertStatus(422)
            ->assertJson([
                "message" => "The given data was invalid.",
                "errors" => [
                    "name" => ["The name field is required."],
                    "email" => ["The email field is required."],
                    "password" => ["The password field is required."],
                ]
            ]);
    }

    public function testSuccessfulRegistration()
    {
        $userData = [
            "name" => "John Doe",
            "email" => "doe@example.com",
            "password" => "demo12345",
        ];

        $this->json('POST', 'api/register', $userData, ['Accept' => 'application/json'])
            ->assertStatus(201);
            // ->assertJsonStructure([
            //     "user" => [
            //         'id',
            //         'name',
            //         'email',
            //         'created_at',
            //         'updated_at',
            //     ],
            //     "access_token",
            //     "message"
            // ]);
    }

    public function testMustEnterEmailAndPassword()
    {
        $this->json('POST', 'api/login')
            ->assertStatus(422)
            ->assertJson([
                "status" => false,
                "message" => [
                    'email' => ["The email field is required."],
                    'password' => ["The password field is required."],
                ]
            ]);
    }
}
