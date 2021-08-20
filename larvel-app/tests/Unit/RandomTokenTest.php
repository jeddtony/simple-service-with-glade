<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class RandomTokenTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_example()
    {
        $this->assertTrue(true);
    }

     /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_token_generated_must_not_be_null()
    {
        $tokenGenerated = makeRandomToken();
        $this->assertNotNull( $tokenGenerated);
    }
}
