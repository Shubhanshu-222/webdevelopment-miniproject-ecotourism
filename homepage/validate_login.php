<?php
require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;

function validateUser($email, $password) {
    $spreadsheet = IOFactory::load('D:\Projects\Semester1\WebTechnology_MidSemProject\useraccounts.xlsx');
    $worksheet = $spreadsheet->getActiveSheet();
    foreach ($worksheet->getRowIterator() as $row) {
        $cellIterator = $row->getCellIterator();
        $cellIterator->setIterateOnlyExistingCells(false);

        $rowData = [];
        foreach ($cellIterator as $cell) {
            $rowData[] = $cell->getValue();
        }

        if ($rowData[0] === $email && $rowData[1] === $password) {
            return true;
        }
    }
    return false;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    if (validateUser($email, $password)) {
        echo "Login successful";
        // Redirect or perform further actions here
    } else {
        echo "Invalid email or password";
    }
}
?>
