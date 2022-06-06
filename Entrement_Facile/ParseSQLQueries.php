<?php
$table = [];
$saveStart = [];
$saveStartNotChange = [];
$sqlQuery = stream_get_line(STDIN, 256 + 1, "\n");
$regex = "/SELECT (?P<select>.+) FROM (?P<selectCible>.+?)(?: WHERE (?P<where>.+) = (?P<wherecible>.+?))?(?: ORDER BY (?P<order>.*) (?P<sens>.*))?$/";
preg_match_all($regex, $sqlQuery, $tblQuery);
fscanf(STDIN, "%d", $ROWS);
$tableHeader = stream_get_line(STDIN, 256 + 1, "\n");
array_push($saveStart, explode(" ", $tableHeader));
$saveStart = $saveStart[0];
$saveStartNotChange = $saveStart;
for ($i = 0; $i < $ROWS; $i++) {
    $tableRow = stream_get_line(STDIN, 256 + 1, "\n");
    array_push($table, explode(" ", $tableRow));
}
$return = [];
// ORDER BY
if (!empty($tblQuery['order'][0])) {
    $order = $tblQuery['order'][0];
    $sens = $tblQuery['sens'][0];
    $key = array_search($order, $saveStart);
    if ($sens == "DESC") {
        usort($table, function ($a, $b) use ($key) {
            return $b[$key] > $a[$key];
        });
    }
    if ($sens == "ASC") {
        usort($table, function ($a, $b) use ($key) {
            return $b[$key] < $a[$key];
        });
    }
}

// le select
if ($tblQuery['select'][0] !== '*') {
    $list = explode(", ", $tblQuery['select'][0]);
    $selectAll = [];
    for ($i = 0; $i < count($list); $i++) {
        $key = array_search($list[$i], $saveStart);
        $selectAll[$i] = $key;
    }
}
for ($i = 0; $i < count($table); $i++) {
    $select = $tblQuery['select'][0];
    if ($i == 0) {
        if ($select !== "*") {
            // on trie save start
            $save = $saveStart;
            $saveStart = [];
            for ($j = 0; $j < count($selectAll); $j++) {
                $saveStart[$j] = $save[$selectAll[$j]];
            }
        }
    }

    if ($select === "*") {
        $return[$i] = $table[$i];
    }
    if ($select !== "*") {
        foreach ($selectAll as $key) {
            $return[$i][] = $table[$i][$key];
        }
    }
}
// le where
if (!empty($tblQuery['where'][0])) {
    $where = $tblQuery['where'][0];
    $cible = $tblQuery['wherecible'][0];
    $key = array_search($where, $saveStartNotChange);
    $return = array_filter($return, function ($a, $k) use ($key, $cible, $table) {
        return $table[$k][$key] == $cible;
    }, ARRAY_FILTER_USE_BOTH);
    $return = array_values($return);
}

array_unshift($return, $saveStart);
$forboucle = $return;
for ($i = 0; $i < count($forboucle); $i++) {
    if (count($forboucle[$i]) > 1) {
        $return[$i] = implode(" ", $forboucle[$i]);
    } else {
        $return[$i] = $forboucle[$i];
    }
}

for ($i = 0; $i < count($return); $i++) {
    echo ("$return[$i]\n");
}
