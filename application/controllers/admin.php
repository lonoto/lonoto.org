<?php if(! defined('BASEPATH')) exit('No direct script access allows'); 

class Admin extends CI_Controller {

	function __construct(){
		parent::__construct();
		$this->load->library('session');
		
	}
	public function index(){
		$this->load->view('index.php');  		
	}
	
	public function login(){
		$username = $this->session->userdata('username');
		echo "\n USERNAME:".$username;
		
		if (isset($_SESSION['username'])){
		 	redirect('index');  //FIXME
		 	$this->load->view('index.php');  		
		}
		$this->load->library('form_validation');
		$this->form_validation->set_rules('email_address','Email Address','required|valid_email');
		$this->form_validation->set_rules('password','Password','required|min_length[4]');		
		
		if ($this->form_validation->run() !== false){
				//when validation passed. Get from the db
				$this->load->model('admin_model');
				$res = $this
						->admin_model
						->verify_user(
							$this->input->post('email_address'),
							$this->input->post('password')
						);
				if ($res !== false){
					//person has an account
					$newdata = array(
					                   'username'  => $this->input->post('email_address'),
					                   'email'     => $this->input->post('email_address'),
					                   'logged_in' => TRUE
					               );

					$this->session->set_userdata($newdata);

					
					//$_SESSION['username'] = $this->input->post('email_address');
					redirect('index');
					$this->load->view('index.php');  		
				}		
		}
		$this->load->view('login.php');
	}
	public function log_out(){
		session_destroy();  //or use unset
		$this->load>view('index.php');
	}
	
	public function register(){
		
	}
}	

/*
//we need to check if the SESSION is set:
in construct:
parent::__construct();
session_start();

if (!isset($_SESSION['username'])){
	redirect('admin');
}

*/