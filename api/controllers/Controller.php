<?php 

abstract class Controller {
    abstract public function getJsonBody();

    abstract public function echoJsonResponse($data);
  }







?>