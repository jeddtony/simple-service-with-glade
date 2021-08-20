<?php

function makeRandomToken() {
    $numberOfUsers = 30;
    $firstTwoLetters = 'RE';
    $length = 16;
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    $numberToUse = $numberOfUsers % strlen($characters);

  $ret = '';
  for($i = 0; $i < $length; ++$i) {
    $random = str_shuffle($characters);
    $ret .= $random[0];
  }

  $firstString = substr($ret, 0, strlen($ret)/ 2);
  $firstString = $firstTwoLetters. ''. $firstString. ''.$numberToUse;
  $secondString = substr($ret, strlen($ret)/2);

    return $firstString. ''.$secondString;
}