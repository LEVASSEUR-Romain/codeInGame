<?php
$table = [];
$sqlQuery = stream_get_line(STDIN, 256 + 1, "\n");
$regex = "/SELECT (?'select'.*) FROM [a-z]*| WHERE (?'where'.*) = (?'cible'.*)| ORDER BY (?'order'.*) (?'sens'.*)/";
preg_match_all($regex, $sqlQuery, $tblQuery);
fscanf(STDIN, "%d", $ROWS);
$tableHeader = stream_get_line(STDIN, 256 + 1, "\n");
array_push($table, explode(" ", $tableHeader));
for ($i = 0; $i < $ROWS; $i++) {
    $tableRow = stream_get_line(STDIN, 256 + 1, "\n");
    array_push($table, explode(" ", $tableRow));
}
$return = [];

// le debut de la requete
for ($i = 1; $i < count($table); $i++) {
    if ($tblQuery['select'][0] === "*") {
        $return[0] = implode(" ", $table[0]);
        $return[$i] = implode(" ", $table[$i]);
    }
    if ($tblQuery['select'][0] !== "*") {
        $return[0] = $tblQuery['select'];
    }
    if (isset($tblQuery['where'][1])) {
        if ($tblQuery['cible'][1] === $table[$i]) {
            $return[$i] = $table[$i];
        }

    }
}

for ($i = 0; $i < count($return); $i++) {
    echo ("$return[$i]\n");
}
