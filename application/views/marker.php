<html>
 
<head>
    <title>CRUD Operations using jQuery and Codeigniter</title>
 
    <base href="<?php echo base_url(); ?>" />
 </head>
 
<body>
    <table id="records"></table>
  
    <script type="text/template" id="readTemplate">
        <tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${email}</td>
        </tr>
    </script>
  
</body>
</html>