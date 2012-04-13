<?php
class Admin_model extends CI_Model {
	function __construct(){
		$this->load->database();		
	}
	
	public function verify_user($email,$password)
	{
		$q = $this
			->db
			->where('email_address', $email)
			->where('password',sha1($password))
			->limit(1)	
			->get('users');
			
			
		if ($q->num_rows > 0){
			//print_r('$q->num_rows');
			//echo '<pre>';
			//print_r($q->row());
			//echo '</pre>';
			return $q->row();
		}	
		return false;
	}
}