<?php
include_once "inc/header.php";

$directory = "../../public/images/gallery/";

include_once "inc/navigation.php";
?>
    <div class="gallery__wrapper clearfix">
        <?php
        $images = opendir($directory);
        $i = 0;
        while ($image = readdir($images)) {
            if ($image !== "." && $image !== "..") {
                echo('<div class="column-medium-4 gallery__image" data-attr="' . $i . '" style="background-image: url(' . ROOTDIR . '/images/gallery/' . $image . ')"></div>');
                $i++;
            }
        } closedir($images)?>
    </div>
    <div class="popup">
        <?php
        $images = opendir($directory);
        $i = 0;
        while ($image = readdir($images)) {
            if ($image !== "." && $image !== "..") {
                echo('<img class="popup-img" data-attr="' . $i . '" src="' . ROOTDIR . '/images/gallery/' . $image . '">');
                $i++;
            }
        } closedir($images)?>
    </div>
<?php
include_once "inc/footer.php";
?>