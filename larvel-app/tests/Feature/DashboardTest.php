<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Tests\AuthenticatedTestCase;

class DashboardTest extends AuthenticatedTestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        $response = $this->json('GET', 'api/dashboard');

        $response->assertStatus(200);
    }
}
