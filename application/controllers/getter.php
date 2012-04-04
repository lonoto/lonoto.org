<?php

class Getter extends CI_Controller {
	public function __construct()
	{
		parent::__construct();
		//$this->load->model('marker_model'); 
	}

	public function index(){
		//$this->load->view( 'marker' );
		//$this->geturl();
	}
 	
	public function geturl() {
		$url = $this->input->get('url');
		
		//$url='http://cultura.elpais.com/cultura/2012/03/21/actualidad/1332344780_802398.html';
							
		 $curl = curl_init();
		 curl_setopt($curl, CURLOPT_URL, $url);
		 curl_setopt ($curl, CURLOPT_RETURNTRANSFER, 1);				
		 $html = curl_exec($curl);
		 curl_close ($curl);
		
		//$meta_tags = get_meta_tags($url);
		//print_r($meta_tags);	
		
		$result = $this->getUrlData($html);
		$this->getImageLinks($html);
		//print_r($result);	
	}
	function url_exist($url){//se passar a URL existe
	    $c=curl_init();
	    curl_setopt($c,CURLOPT_URL,$url);
	    curl_setopt($c,CURLOPT_HEADER,1);//get the header
	    curl_setopt($c,CURLOPT_NOBODY,1);//and *only* get the header
	    curl_setopt($c,CURLOPT_RETURNTRANSFER,1);//get the response as a string from curl_exec(), rather than echoing it
	    curl_setopt($c,CURLOPT_FRESH_CONNECT,1);//don't use a cached version of the url
	    if(!curl_exec($c)){
	        //echo $url.' inexists';
	        return false;
	    }else{
	        //echo $url.' exists';
	        return true;
	    }
	    //$httpcode=curl_getinfo($c,CURLINFO_HTTP_CODE);
	    //return ($httpcode<400);
	}
	
	public function getImageLinks($html){
		$doc=new DOMDocument();
		@$doc->loadHTML($html);
		$xml=simplexml_import_dom($doc); // just to make xpath more simple
		$images=$xml->xpath('//img');
		foreach ($images as $img) {
		    echo $img['src'] . ' ' . $img['alt'] . ' ' . $img['title'];
			echo '<br>';
		}	
	}
	public function getUrlData($html)
	{
		$doc = new DOMDocument();
		@$doc->loadHTML($html);
		$nodes = $doc->getElementsByTagName('title');

		//get and display what you need:
		$title = $nodes->item(0)->nodeValue;
		echo "Title: $title". '<br/><br/>';

		$metas = $doc->getElementsByTagName('meta');

		$description = null;
		$keywords = null;
		$lang = null;
		$author = null;
		$image_links = null;
		
		for ($i = 0; $i < $metas->length; $i++)
		{
			$meta = $metas->item($i);
			if($meta->getAttribute('name') == 'description'){
			    $description = $meta->getAttribute('content');
			}
			if($meta->getAttribute('name') == 'keywords'){
			    $keywords = $meta->getAttribute('content');
			}
			if($meta->getAttribute('lang') == 'lang'){
			    $lang = $meta->getAttribute('lang');
			}
			if($meta->getAttribute('author') == 'author'){
			    $author = $meta->getAttribute('author');
			}
		}
		echo "Description: $description". '<br/><br/>';
		echo "Keywords: $keywords";
		echo "lang: $lang";
		echo "author: $author";
		echo "image links: $image_links";

		
		$meta_array = array('title' => $title, 'description' => $description, 'lang' => $lang, 'author' => $author, 'image'=> $image_links);
		return $meta_array;
	}
}	
