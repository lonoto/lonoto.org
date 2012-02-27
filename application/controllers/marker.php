<?php
class Marker extends CI_Controller {
	public function __construct()
	{
		parent::__construct();
		$this->load->model('marker_model'); 
	}

	public function index(){
		$this->load->view( 'marker' );
	}
 	public function all() {
		echo json_encode( $this->marker_model->get_all_markers() );
	}
	public function add(){
		// Function to fetch the post call and send the marker data to the model for storing in db
		$post_data = $this->input->post();
		$this->marker_model->add_marker($post_data);
	}
	
}	

