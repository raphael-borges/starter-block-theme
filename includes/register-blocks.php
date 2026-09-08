<?php

function start_block_init()
{
	$blocks = [
		['name' => 'video-background'],
		['name' => 'dual-vertical-slider']

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
