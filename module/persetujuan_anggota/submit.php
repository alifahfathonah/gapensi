<?php
	include('../../config/db_config.php');
	
	$id_badan_usaha	= $_REQUEST['id_badan_usaha'];
	$id_propinsi	= $_REQUEST['id_propinsi'];
	$nrbu			= $_REQUEST['nrbu'];
	
	$dbh->beginTransaction();
	
	try {
		$current_year	= date('Y');
		$current_date	= date('d-m-Y');
		// update table kta_badan_usaha set field nrbu
		$dbh->exec("
			update	kta_badan_usaha
			set		nrbu			= $nrbu
			where	id_badan_usaha	= $id_badan_usaha
		");
		// check if badan_usaha is already has nomor KTA
		$q = "
			SELECT		count(*) as total
			FROM		kta_nomor_urut 	AS A
			WHERE		A.id_badan_usaha	= $id_badan_usaha
		";
		
		$result	= $dbh->query($q)->fetchAll();

		foreach ($result as $row){
			$total	= $row['total'];								
		}
		if (($total < 1)) {
		// insert into table kta_nomor_urut
			$dbh->exec("
				insert into	kta_nomor_urut (
						id_badan_usaha 
					,	id_propinsi
					,	masa_berlaku
					,	tgl_pengambilan
					,	nrbu
				)
				values (
						$id_badan_usaha
					,	'$id_propinsi'
					,	1
					,	now()
					,	$nrbu
				)
			");
		}
		

		// update table kta_proses set status = '4' (Persetujuan)
		$dbh->exec("
			update	kta_proses_status
			set		status			= '4'
			,		tgl_persetujuan = now()
			where	id_badan_usaha	= $id_badan_usaha
			and	tahun	= $current_year
		");
		
		$dbh->commit();
		
		echo "{success:true, info:'Data telah tersimpan.'}";
	} catch (PDOexception $e) {
		$dbh->rollBack();
		
		$msg = $e->getMessage();
		
		echo "{success:false, info:'".str_replace("'",'',$msg)."'}"; 
	}
?>