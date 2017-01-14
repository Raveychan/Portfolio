<?php
include_once "inc/header.php";

$directory = "../public/assets/images/gallery/";

include_once "inc/navigation.php";
?>
<title>My Work</title>

    <div class="gallery__wrapper clearfix">
        <?php
        $images = opendir($directory);
        $i = 0;
        while ($image = readdir($images)) {
            if ($image !== "." && $image !== "..") {
                echo('<div class="column-medium-4 gallery__image" data-attr="' . $i . '" style="background-image: url(' . $GLOBALS['ROOTDIR'] . '/assets/images/gallery/' . $image . ')"><div class="gallery__overlay" data-attr="' . $i . '"><p class="gallery__overlay__p">SHOW</p></div></div>');
                $i++;
            }
        }
        closedir($images) ?>
    </div>
    <div class="popup">
        <?php
        $images = opendir($directory);
        $i = 0;
        while ($image = readdir($images)) {
            if ($image !== "." && $image !== "..") {
                echo('<img class="popup-img" data-attr="' . $i . '" src="' . $GLOBALS['ROOTDIR'] . '/assets/images/gallery/' . $image . '">');
                $i++;
            }
        }
        closedir($images) ?>
    </div>
<?php
include_once "inc/footer.php";
?>