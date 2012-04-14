<?php
class Marker_model extends CI_Model {

	//`id`,`time_created`,`lat`,`lng`,`icon`,`draggable`,`animation`,`onclick`,`link`,`user`,`title`,`content`,`fuente`,
  


	public function __construct()
	{
		$this->load->database();
	}
	
	public function get_all_markers(){
		//get markers
		$query = $this->db->get('marker');

		if( $query->num_rows() > 0 ){
			return $query->result();
			
			//foreach ($query->result('marker') as $row)
			// {
			// 	echo $row->id;
			// 	echo $row->lat;
			//   echo $row->lng;
			//}
		}
		else {
	            return array();
	    }
	}
	public function add_marker($data_received){
		
		$this->db->insert('marker', $data_received); 

		   //$data["datos"] = $this->ejemplo_model->get_ejemplos($this->input->post('nom1'),$this->input->post('nom2'));
		//$data["datos"] contendrá un array del tipo Array("0" => Array("value" => value1, "name" => name1), "1" => Array("value" => value2, "name" => name2)...)
		 //  $this->load->view('json/json_example_view',$data);
	
	}
}




