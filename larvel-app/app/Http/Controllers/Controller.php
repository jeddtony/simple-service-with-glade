<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    public function formatSuccessResponse( $message, $data)
    {
        return response()->json(['status' => true, 'message' => $message, 'data' => $data], 200);
    }

    public function formatCreatedResponse($message, $data)
    {
        return response()->json(['status' => true, 'message' => $message, 'data' => $data], 201);
    }

    public function formatInputErrorResponse($message)
    {
        return response()->json(['status' => false, 'message' => $message], 422);
    }

    public function notFoundResponse($message)
    {
        return response()->json(['status' => false, 'message' => $message], 404);
    }
}
