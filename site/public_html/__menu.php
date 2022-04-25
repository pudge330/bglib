<?php
$menuData = include __DIR__ . '/../src/menu.php';
$currentPage = $docs->getTrimmedUri();
$currentPageInGroup = function($items) use ($docs, $currentPage) {
	foreach ($items as $itemKey => $itemName) {
		if ($currentPage == $docs->trimSlashes($itemKey)) {
			return true;
		}
	}
	return false;
};
?>
<div class="accordion accordion-flush" id="accordionMenu">
	<?php
		$groupIndex = 0;
		foreach ($menuData as $menuGroup) {
			$groupIndex++;
			$isCurrentPageInGroup = $currentPageInGroup($menuGroup['items']);
	?>
		<div class="accordion-item">
			<h2 class="accordion-header" id="menuGroup<?=$groupIndex?>">
				<button class="accordion-button<?=(!$isCurrentPageInGroup ? ' collapsed' : ' current-group')?>" type="button" data-bs-toggle="collapse" data-bs-target="#menuCollapse<?=$groupIndex?>" aria-expanded="<?=($isCurrentPageInGroup ? 'true' : 'false')?>" aria-controls="menuCollapse<?=$groupIndex?>">
					<?=$menuGroup['name']?>
				</button>
			</h2>
			<div id="menuCollapse<?=$groupIndex?>" class="accordion-collapse collapse<?=($isCurrentPageInGroup ? ' show' : '')?>" aria-labelledby="menuGroup<?=$groupIndex?>">
				<div class="accordion-body">
					<ul class="nav flex-column">
						<?php
							foreach ($menuGroup['items'] as $itemKey => $itemName) {
								$isCurrentPage = $currentPage == $docs->trimSlashes($itemKey);
						?>
							<li class="nav-item<?=($isCurrentPage ? ' active-item' : '')?>">
								<a class="nav-link" href="<?=$itemKey?>"><?=$itemName?></a>
							</li>
						<?php } ?>
					</ul>
				</div>
			</div>
		</div>
	<?php } ?>
</div>