<?php

function start_block_init()
{
	$blocks = [
<<<<<<< HEAD
		['name' => 'spatial-canvas'],
		['name' => 'section-hero'],
		['name' => 'section-services'],
		['name' => 'section-trajectory'],
		['name' => 'section-portfolio'],
		['name' => 'section-contact']
=======
		['name' => 'video-background'],
		['name' => 'dual-vertical-slider']
>>>>>>> 627e0935e60de76cd1d1662a3b1653bbbcc8c0b9

	];
	foreach ($blocks as $block) {
		register_block_type(START_THEME_DIR . '/blocks/' . $block['name']);
	}
}


// Registre Theme Category
function start_block_categories($block_categories, $editor_context)
{
	array_unshift(
		$block_categories,
		array(
			'slug'  => 'start-category',
			'title' => __('Theme', 'start-blocks-category'),
			'icon'  => null,
		)
	);

	return $block_categories;
}
