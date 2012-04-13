<html lang='eng'>
<head>
	<title>403 Forbidden</title>
	<style>label: {display:block;} .errors{color:red;}</style>
</head>
<body>

<h1>Login!!!!!!</h1>

<?php echo form_open('login'); ?>
<p>
	<?php 
		echo form_label('Email Address:','email_address'); 
		echo form_input('email_address',set_value('email_address'),'id=email_address');?>
</p>	
<?php echo form_close(); ?>

<?php echo form_open('admin'); ?>
<p>
	<?php 
		echo form_label('Password:','password'); 
		echo form_password('password','','id=password');
	?>
</p>	

<p>
	<?php echo form_submit('submit','Login'); ?>
	<?php echo form_close(); ?>
	
	<div class="errors"> <?php echo validation_errors(); ?>
	</div>
</p>
</body>
</html>